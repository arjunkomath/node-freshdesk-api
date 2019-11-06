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

'use strict'

const request         = require('request')
const debug           = require('debug')('freshdesk-api')

/**
 * Freshdesk's API protocol violations
 *
 * @param {String}  message Error message
 * @param {Number}  status  HTTP status of the received Freshdesk-response. Could be useful for debugging
 * @param {Object}  data    Parsed response of the Freshdesk API
 */
class FreshdeskError extends Error{
	constructor (message, data, res) {
		super()

		this.name = 'FreshdeskError'
		this.message = message || 'Error in Freshdesk\'s client API'
		this.stack = (new Error()).stack

		this.data = data

		this.status = res.statusCode
		this.apiTarget = `${res.request.method} ${res.request.uri.href}`
		this.requestId = res.headers['x-request-id']
	}
}


function createResponseHandler (cb) {
	return function (error, response, body) {
		if (error) {
			debug('Error on request: [%s], req path [%s] raw body: %o',
				error,
				response ? response.request.path : undefined,
				response ? response.request.body : undefined
			)
			return cb(error)
		}

		let data = null
		const extra = {
			pageIsLast: true,
			requestId: '',
		}

		debug('Got API response, status [%s]', response.statusCode)

		if (response
			&& response.headers
			&& 'string' === typeof response.headers.link
		) {
			debug('Detected http-header LINK, page is not last', response.headers.link)
			extra.pageIsLast = false
			// TODO: reconsider this property
			extra._headersLink = response.headers.link
		}

		if (response
			&& response.headers
			&& 'string' === typeof response.headers['x-request-id']
		) {
			extra.requestId = response.headers['x-request-id']
		}

		switch(response.statusCode) {
		// SUCCESS
		// https://httpstatuses.com/200 OK
		// https://httpstatuses.com/201 Created
		case 200:
		case 201:
			try {
				data = JSON.parse(body)
			} catch (err) {
				if (err instanceof SyntaxError) {
					debug('Valid HTTP status [%s], but not a JSON resp. Path:[%s] raw body: %o',
						response.statusCode,
						response.request.path,
						response.request.body
					)
					return cb(new FreshdeskError('Not a JSON response from API', body, response))
				}

				// unknown error
				return cb(err)
			}
			return cb(null, data, extra)

		// SUCCESS for DELETE operations
		// https://httpstatuses.com/204 No Content
		case 204:
			return cb(null, null, extra)

		// https://httpstatuses.com/404 Not found
		case 404:
			debug('path:[%s] raw body: %o',
				response.request.path,
				response.request.body
			)

			// In most casses 404 means, that there is no such entity on requested
			// Freshdesk domain. For example, you are trying to update non-existent
			// contact
			// But, it also could be a result of wrong URL (?!?!?)
			//
			// In most cases the body is EMPTY, so we will just warn about wrong entity
			return cb(new FreshdeskError('The requested entity was not found', data, response))

		// https://httpstatuses.com/409 Conflict  - NOT UNIQUE, where unique required
		case 409:
		default:
			debug('path:[%s] raw body: %o',
				response.request.path,
				response.request.body
			)

			try {
				data = JSON.parse(body)
			} catch (err) {
				if (err instanceof SyntaxError) {
					// data is not a JSON, so lets return it "AS IS"
					debug('Unexpected HTTP status [%s], and not a JSON resp. Path:[%s] raw body: %o',
						response.statusCode,
						response.request.path,
						response.request.body
					)
					return cb(new FreshdeskError('Not a JSON response from API', body, response))
				}

				// unknown error
				return cb(err)
			}

			return cb(new FreshdeskError(data.description, data, response))
		}
	}
}

// TODO: try to make less params here
function makeRequest(method, auth, url, qs, data, cb) {		// eslint-disable-line max-params
	const options = {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': auth
		},
		url: url, // for debugging set to: "https://httpbin.org/get"
		qs: qs
	}

	let formData = false
	if (data) {
		if (data.hasOwnProperty('attachments') && Array.isArray(data.attachments)) {
			formData = true
			options.headers['Content-Type'] = 'multipart/form-data'
		} else {
			options.body = JSON.stringify(data)
		}
	}

	if (!formData) {
		return request(options, createResponseHandler(cb))
	}

	// Handle attachments
	const r = request(options, createResponseHandler(cb))
	const form = r.form();
	for (let i = 0; i < Object.keys(data).length; i++) {
		const key = Object.keys(data)[i]
		if (key === 'attachments') {
			for (let i = 0; i < data[key].length; i++) {
				form.append('attachments[]', data[key][i])
			}
		} else {
			form.append(key, data[key])
		}
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
	if (value === null || typeof value === 'undefined') {
		return true
	}

	return false
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
	return typeof value === 'function'
}

module.exports.makeRequest = makeRequest
module.exports.FreshdeskError = FreshdeskError
module.exports.isNil = isNil
module.exports.isFunction = isFunction
