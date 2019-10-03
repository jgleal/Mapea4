/**
 * @module M
 */
import 'assets/css/fonts';
import 'assets/css/mapea';
import 'assets/css/animations';
import 'impl/projections';
import MapImpl from 'impl/Map';
import Map from './Map';
import { isNullOrEmpty } from './util/Utils';
import Exception from './exception/exception';
import './util/Window';
import './util/polyfills';


/**
 * This function sets the configuration variables
 *
 * @function
 * @param {String} configKey key of the configuration variable
 * @param {*} configValue value of the configuration variable
 * @api
 */
export const config = (configKey, configValue) => {
  config[configKey] = configValue;
};

/**
 * This function creates a new map using the parameters
 * specified by the user
 *
 * @function
 * @param {string|Mx.parameters.Map} parameters to build the map
 * @param {Mx.parameters.MapOptions} options custom options to build the map
 * @returns {M.Map}
 * @api
 */
export const map = (parameters, options) => {
  // checks if the user specified an implementation
  if (isNullOrEmpty(MapImpl)) {
    Exception('No se ha especificado ninguna implementación');
  }
  return new Map(parameters, options);
};

/**
 * Flag that indicates if the proxy is
 * enabled to use
 * @type {boolean}
 */
export let useproxy = true;

/**
 * This function enables/disables the proxy
 *
 * @public
 * @function
 * @param {boolean} enable
 * @api
 */
export const proxy = (enable) => {
  if (typeof enable === 'boolean') {
    useproxy = enable;
  }
};

/**
 * Lists of hosts that proxy will ignore
 * @type {Array}
 */
export const proxyExceptions = [];

/**
 * Add an url to the list of hosts that proxy will ignore
 * @public
 * @function
 * @param {String} url
 * @api
 */
export const addProxyException = (url) => {
  const urlOrigin = new URL(url).origin;
  if (proxyExceptions.indexOf(urlOrigin) === -1) proxyExceptions.push(urlOrigin);
};

/**
 * Remove an url from the list of hosts that proxy will ignore
 * @public
 * @function
 * @param {String} url
 * @api
 */
export const removeProxyException = (url) => {
  const urlOrigin = new URL(url).origin;
  const loc = proxyExceptions.indexOf(urlOrigin);
  if (loc !== -1) proxyExceptions.splice(loc, 1);
};
