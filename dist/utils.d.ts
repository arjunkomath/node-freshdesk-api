export function makeRequest(method: any, auth: any, url: any, qs: any, data: any, cb: any): Promise<any>;
/**
 * Freshdesk's API protocol violations
 *
 * @param {String}  message Error message
 * @param {Number}  status  HTTP status of the received Freshdesk-response. Could be useful for debugging
 * @param {Object}  data    Parsed response of the Freshdesk API
 */
export class FreshdeskError extends Error {
    constructor(message: any, data: any, res: any);
    message: any;
    stack: string;
    data: any;
    status: any;
    apiTarget: string;
    requestId: any;
}
/**
 * Checks if value is null or undefined.
 *
 * @private
 *
 * @param  {*}       value    The value to check.
 * @return {boolean}          Returns `true` if value is `null` or `undefined`; else `false`.
 *
 */
export function isNil(value: any): boolean;
/**
 * Checks if value is classified as a Function object.
 *
 * @private
 *
 * @param  {*}       value    The value to check.
 * @return {boolean}          Returns `true` if value is a `function`; else `false`.
 */
export function isFunction(value: any): boolean;
export function createResponseHandler(cb: any): (error: any, response: any, body: any, request: any) => any;
