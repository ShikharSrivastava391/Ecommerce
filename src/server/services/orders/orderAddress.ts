import { ObjectID } from "mongodb"
import { db } from "../../lib/mongo"
import parse from "../../lib/parse"
import OrdersService from "./orders"

class OrderAddressService {
  updateBillingAddress(id, data) {
    if (!ObjectID.isValid(id)) return Promise.reject("Invalid identifier")

    const orderObjectID = new ObjectID(id)
    const billingAddress = this.getValidDocumentForUpdate(
      id,
      data,
      "billing_address"
    )

    // NEW: Log update for audit
    console.log(`Updating billing address for order ${id}:`, { keys: Object.keys(data) })

    return db
      .collection("orders")
      .updateOne(
        {
          _id: orderObjectID,
        },
        { $set: billingAddress }
      )
      .then(res => OrdersService.getSingleOrder(id))
  }

  updateShippingAddress(id: string, data) {
    if (!ObjectID.isValid(id)) return Promise.reject("Invalid identifier")

    const orderObjectID = new ObjectID(id)
    const shippingAddress = this.getValidDocumentForUpdate(
      id,
      data,
      "shipping_address"
    )

    // NEW: Log update
    console.log(`Updating shipping address for order ${id}:`, { keys: Object.keys(data) })

    return db
      .collection("orders")
      .updateOne(
        {
          _id: orderObjectID,
        },
        { $set: shippingAddress }
      )
      .then(res => OrdersService.getSingleOrder(id))
  }

  getValidDocumentForUpdate(id, data, addressTypeName) {
    const keys = Object.keys(data)
    if (keys.length === 0) {
      return new Error("Required fields are missing")
    }

    const address = {}

    keys.forEach(key => {
      const value = data[key]
      if (key === "coordinates" || key === "details") {
        address[`${addressTypeName}.${key}`] = value
      } else if (key === 'email') {
        // NEW: Validate/sanitize email (lower, trim)
        const sanitized = (value || '').toLowerCase().trim()
        if (!sanitized || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitized)) {
          console.warn(`Invalid email for order ${id}, address ${addressTypeName}:`, value)
          return  // Skip invalid
        }
        address[`${addressTypeName}.${key}`] = sanitized
      } else {
        address[`${addressTypeName}.${key}`] = parse.getString(value)
      }
    })

    return address
  }
}

export default new OrderAddressService()