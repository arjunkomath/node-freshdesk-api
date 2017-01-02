/*
Node wrapper for Freshdesk v2 API

Copyright (C) 2016-2017 Maksim Koryukov <maxkoryukov@gmail.com>

This program is free software: you can redistribute it and/or modify
it under the terms of the MIT License, attached to this software package.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

You should have received a copy of the MIT License along with this
program. If not, see <https://opensource.org/licenses/MIT>.

http://spdx.org/licenses/MIT
*/

"use strict";

const request = require('request');
const debug = require('debug')('freshdesk-api');


/**
 * Freshdesk's API protocol violations
 *
 * @param {[type]} message [description]
 * @param {[type]} data    [description]
 */
function FreshdeskError(message, data) {
	this.name = 'FreshdeskError';
	this.message = message || 'Error in Freshdesk\'s client API';
	this.stack = (new Error()).stack;
	this.data = data;
}
FreshdeskError.prototype = Object.create(Error.prototype);
FreshdeskError.prototype.constructor = FreshdeskError;


function createResponseHandler (cb) {
	return function (error, response, body) {
		if (error) {
			debug(`Unexpected status [${error}], req path [${response.request.path}] raw body: ${response.request.body}`);
			return cb(error);
		}

		let data = null;

		switch(response.statusCode) {
		// SUCCESS
		// https://httpstatuses.com/200 OK
		// https://httpstatuses.com/201 Created
		case 200:
		case 201:
			try {
				data = JSON.parse(body);
			} catch (err) {
				// TODO: catch only JSON-parse errors!!!
				debug(`Not a JSON resp with valid status [${response.statusCode}], req path [${response.request.path}] raw body: ${response.request.body}`);
				return cb(new FreshdeskError('Not a JSON response from API', body));
			}
			return cb(null, data);

		// SUCCESS for DELETE operations
		// https://httpstatuses.com/204 No Content
		case 204:
			return cb(null, null);

		// https://httpstatuses.com/409 Conflict  - NOT UNIQUE, where unique required
		case 409:
		default:
			try {
				data = JSON.parse(body);
			} catch (err) {
				// TODO: catch only JSON-parse errors!!!

				// probably, data is not a JSON, so lets return it "AS IS"
				debug(`Not a JSON resp for unexpected status [${response.statusCode}], req path [${response.request.path}] raw body: ${response.request.body}`);
				return cb(new FreshdeskError('Not a JSON response from API', body));
			}

			debug(`Unexpected/Error status [${response.statusCode}], req path [${response.request.path}] raw body: ${response.request.body}`);
			return cb(new FreshdeskError(data.description, data));
		}
	}
}

// TODO: try to make less params here
function makeRequest(method, auth, url, qs, data, cb) {		// eslint-disable-line max-params
	var options = {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': auth
		},
		url: url, // for debugging set to: "https://httpbin.org/get"
		qs: qs
	}

	if(data) {
		options.body = JSON.stringify(data);
	}

	request(options, createResponseHandler(cb))
}

module.exports.makeRequest = makeRequest;
module.exports.FreshdeskError = FreshdeskError;
