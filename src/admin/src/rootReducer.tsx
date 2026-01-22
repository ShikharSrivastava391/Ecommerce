import { combineReducers } from "redux"

import productCategories from "modules/productCategories/reducer"
import products from "modules/products/reducer"
import customerGroups from "modules/customerGroups/reducer"
import customers from "modules/customers/reducer"
import orders from "modules/orders/reducer"
import orderStatuses from "modules/orderStatuses/reducer"
import pages from "modules/pages/reducer"
import settings from "modules/settings/reducer"
import apps from "modules/apps/reducer"
import files from "modules/files/reducer"

/**
 * NEW: JSDoc for root reducer – Combines eCommerce modules (products, orders, etc.).
 * Defaults ensure no undefined state on init.
 */
export default combineReducers({
  productCategories: productCategories || (state => state),  // NEW: Fallback
  products: products || (state => state),
  settings: settings || (state => ({ ...state, defaultSort: 'name' })),  // Clamp default
  customerGroups,
  customers,
  orders,
  orderStatuses,
  pages,
  apps,
  files,
})