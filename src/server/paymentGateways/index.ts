import { RouterContext } from "@koa/router"
import OrdersService from "../services/orders/orders"
import PaymentGatewaysService from "../services/settings/paymentGateways"
import SettingsService from "../services/settings/settings"
import LiqPay from "./LiqPay"
import PayPalCheckout from "./PayPalCheckout"
import StripeElements from "./StripeElements"

const getOptions = orderId => {
  return Promise.all([
    OrdersService.getSingleOrder(orderId),
    SettingsService.getSettings(),
  ]).then(([order, settings]) => {
    if (order && order.payment_method_id) {
      return PaymentGatewaysService.getGateway(
        order.payment_method_gateway
      ).then(gatewaySettings => {
        // NEW: Validate amount > 0 (prevent zero-charge errors)
        const amount = Math.max(order.grand_total || 0, 0.01)
        if (order.grand_total <= 0) {
          console.warn(`Clamped zero/negative amount for order ${orderId} to 0.01`)
        }
        const options = {
          gateway: order.payment_method_gateway,
          gatewaySettings: gatewaySettings,
          order: order,
          amount: amount,
          currency: settings.currency_code,
        }

        return options
      })
    }
  })
}

const getPaymentFormSettings = async (orderID: string) => {
  const options = await getOptions(orderID)

  switch (options.gateway) {
    case "paypal-checkout":
      return PayPalCheckout.getPaymentFormSettings(options)
    case "liqpay":
      return LiqPay.getPaymentFormSettings(options)
    case "stripe-elements":
      return StripeElements.getPaymentFormSettings(options)
    default:
      // NEW: Log invalid gateway for debug
      console.error(`Invalid gateway: ${options.gateway} for order ${orderID}`)
      return Promise.reject("Invalid gateway")
  }
}

const paymentNotification = async (ctx: RouterContext, gateway) => {
  const gatewaySettings = await PaymentGatewaysService.getGateway(gateway)

  const options = {
    gateway: gateway,
    gatewaySettings: gatewaySettings,
    ctx,
  }

  switch (gateway) {
    case "paypal-checkout":
      return PayPalCheckout.paymentNotification(options)
    case "liqpay":
      return LiqPay.paymentNotification(options)
    default:
      return Promise.reject("Invalid gateway")
  }
}

const processOrderPayment = async order => {
  const orderAlreadyCharged = order.paid === true
  if (orderAlreadyCharged) {
    return true
  }

  const gateway = order.payment_method_gateway
  const gatewaySettings = await PaymentGatewaysService.getGateway(gateway)
  const settings = await SettingsService.getSettings()

  switch (gateway) {
    case "stripe-elements":
      return StripeElements.processOrderPayment({
        order,
        gatewaySettings,
        settings,
      })
    default:
      return Promise.reject("Invalid gateway")
  }
}

export default {
  getPaymentFormSettings: getPaymentFormSettings,
  paymentNotification: paymentNotification,
  processOrderPayment: processOrderPayment,
}