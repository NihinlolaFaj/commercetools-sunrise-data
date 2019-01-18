import { config } from './config'
import { createClient } from '@commercetools/sdk-client'
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth'
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http'
import { createRequestBuilder, features } from '@commercetools/api-request-builder'
require('es6-promise').polyfill();
require('isomorphic-fetch');

export const client = createClient({
  // The order of the middlewares is important !!!
  middlewares: [
    createAuthMiddlewareForClientCredentialsFlow({
      host: config.authUrl,
      projectKey: config.projectKey,
      credentials: {
        clientId: config.clientId,
        clientSecret: config.clientSecret
      }
    }),
    createHttpMiddleware({ host: config.apiUrl, fetch })
  ]
})

const createProjectService = () => createRequestBuilder({ projectKey: config.projectKey }).project
const createZonesService = () => createRequestBuilder({ projectKey: config.projectKey }).zones
const createTaxService = () => createRequestBuilder({ projectKey: config.projectKey }).taxCategories
const createShippingMethodsService = () => createRequestBuilder({ projectKey: config.projectKey }).shippingMethods
const createCustomerGroupService = () => createRequestBuilder({ projectKey: config.projectKey }).customerGroups
const createStatesService = () => createRequestBuilder({ projectKey: config.projectKey }).states
const createCustomersService = () => createRequestBuilder({ projectKey: config.projectKey }).customers
const createCategories = () => createRequestBuilder({ projectKey: config.projectKey }).categories
const createOrders = () => createRequestBuilder({ projectKey: config.projectKey }).orders
const importOrders = () => createRequestBuilder({ projectKey: config.projectKey, customServices: { orders: { type: 'orders', endpoint: '/orders/import', features: [features.query, features.queryOne]}} }).orders
const createProducts = () => createRequestBuilder({ projectKey: config.projectKey }).products

export const projectService = createProjectService()
export const zonesService = createZonesService()
export const taxService = createTaxService()
export const shippingMethodService = createShippingMethodsService()
export const customerGroupService = createCustomerGroupService()
export const stateService = createStatesService()
export const customersService = createCustomersService()
export const categoriesService = createCategories()
export const ordersService = createOrders()
export const ordersImportService = importOrders()
export const productsService = createProducts()