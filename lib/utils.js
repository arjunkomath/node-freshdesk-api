/*
Node wrapper for Freshdesk v2 API

Copyright (C) 2016-2018 Arjun Komath <arjunkomath@gmail.com>
Copyright (C) 2016-2018 Maksim Koryukov <maxkoryukov@gmail.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the MIT License, attached to this software package.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

You should have received a copy of the MIT License along with this
program. If not, see <https://opensource.org/licenses/MIT>.

http://spdx.org/licenses/MIT
*/

/**
 * Freshdesk API utilities
 *
 * @module
 */

"use strict";

const debug = require("debug")("freshdesk-api");
const FormData = require("form-data");
const { request } = require("undici");

/**
 * Freshdesk's API protocol violations
 *
 * @param {String}  message Error message
 * @param {Number}  status  HTTP status of the received Freshdesk-response. Could be useful for debugging
 * @param {Object}  data    Parsed response of the Freshdesk API
 */
class FreshdeskError extends Error {
	constructor(message, data, res, req) {
		super();

		this.name = "FreshdeskError";
		this.message = message || "Error in Freshdesk's client API";
		this.stack = new Error().stack;

		this.data = data;

		this.status = res.statusCode;

		this.apiTarget = `${req.method} ${req.path}`;
		this.requestId = res.headers["x-request-id"];
		this.retryAfter = parseInt(res.headers["retry-after"]);
	}
}

function createResponseHandler(cb) {
	return function(error, response, body, request) {
		if (error) {
			debug("Error on request: [%s], req path [%s] raw body: %o", error);
			return cb(error);
		}

		const extra = {
			pageIsLast: true,
			requestId: ""
		};

		debug("Got API response, status [%s]", response.status);

		if (
			response &&
			response.headers &&
			"string" === typeof response.headers.link
		) {
			debug(
				"Detected http-header LINK, page is not last",
				response.headers.link
			);
			extra.pageIsLast = false;
			// TODO: reconsider this property
			extra._headersLink = response.headers.link;
		}

		if (
			response &&
			response.headers &&
			"string" === typeof response.headers["x-request-id"]
		) {
			extra.requestId = response.headers["x-request-id"];
		}

		switch (response.statusCode) {
			// SUCCESS
			// https://httpstatuses.com/200 OK
			// https://httpstatuses.com/201 Created
			case 200:
			case 201:
				return cb(null, body, extra);

			// SUCCESS for DELETE operations
			// https://httpstatuses.com/204 No Content
			case 204:
				return cb(null, null, extra);

			// https://httpstatuses.com/404 Not found
			case 404:
				debug("path:[%s] raw body: %o", request.path);

				// In most casses 404 means, that there is no such entity on requested
				// Freshdesk domain. For example, you are trying to update non-existent
				// contact
				// But, it also could be a result of wrong URL (?!?!?)
				//
				// In most cases the body is EMPTY, so we will just warn about wrong entity
				return cb(
					new FreshdeskError(
						"The requested entity was not found",
						body,
						response,
						request
					)
				);

			// https://httpstatuses.com/409 Conflict  - NOT UNIQUE, where unique required
			case 409:
			default:
				debug("path:[%s] raw body: %o", request.path);
				return cb(new FreshdeskError(body.description, body, response, request));
		}
	};
}

// TODO: try to make less params here
async function makeRequest(method, auth, url, qs, data, cb) {
	// eslint-disable-line max-params
	const options = {
		method: method,
		headers: {
			"Content-Type": "application/json",
			Authorization: auth
		},
		query: qs
	};

	const fullUrl = new URL(url);
	const req = {
		...options,
		url,
		path: fullUrl.pathname
	};

	if (data) {
		if ("attachments" in data && Array.isArray(data.attachments)) {
			const fd = new FormData();

			for (let [entryKey, entryValue] of Object.entries(data)) {
				if (Array.isArray(entryValue)) {
					for (let arrElement of entryValue) {
						fd.append(entryKey + "[]", arrElement);
					}
				} else {
					fd.append(entryKey, entryValue);
				}
			}

			const promise = new Promise((resolve, reject) => {
				fd.submit({
					host: fullUrl.hostname,
					port: fullUrl.port,
					path: fullUrl.pathname,
					protocol: fullUrl.protocol,
					headers: {
						Authorization: auth
					}
				}, function(err, res) {
					if (err) {
						return reject(err);
					}
					let body = "";
					res.on("readable", () => {
						const value = res.read();
						if (value !== null) {
							body += value;
						}
					});
					res.on("end", () => {
						let resolvedBody;
						if ((res.headers["content-type"] && res.headers["content-type"].startsWith("application/json")) ||
							(res.headers["Content-Type"] && res.headers["Content-Type"].startsWith("application/json"))) {
							resolvedBody = JSON.parse(body);
						} else {
							resolvedBody = body;
						}
						resolve({
							responseBody: resolvedBody,
							response: res
						});
					});
					res.on("error", (err) => {
						reject(err);
					});
				});
			});

			try {
				const { response, responseBody } = await promise;
				return createResponseHandler(cb)(null, response, responseBody, req);
			} catch (err) {
				cb(err);
			}
		} else {
			options.body = JSON.stringify(data);
		}
	}

	try {
		const response = await request(url, options);
		const data = (response.statusCode !== 204 && (!response.headers["content-type"] || response.headers["content-type"].startsWith("application/json"))) ? await response.body.json() : await response.body.text();
		return createResponseHandler(cb)(null, response, data, req);
	} catch (error) {
		const data = request.body;
		return createResponseHandler(cb)(
			error,
			req,
			data,
			req
		);
	}
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
function isNil(value) {
	if (value === null || typeof value === "undefined") {
		return true;
	}

	return false;
}

/**
 * Checks if value is classified as a Function object.
 *
 * @private
 *
 * @param  {*}       value    The value to check.
 * @return {boolean}          Returns `true` if value is a `function`; else `false`.
 */
function isFunction(value) {
	return typeof value === "function";
}

module.exports.makeRequest = makeRequest;
module.exports.FreshdeskError = FreshdeskError;
module.exports.isNil = isNil;
module.exports.isFunction = isFunction;

// For testing
module.exports.createResponseHandler = createResponseHandler;
