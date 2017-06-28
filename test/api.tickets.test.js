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

const nock = require('nock')

const Freshdesk = require('..')

describe('api.tickets', function(){

	const freshdesk = new Freshdesk('https://test.freshdesk.com', 'TESTKEY')

	describe('listAllTicketFields', () => {

		describe('without params', () => {

			let res = null

			beforeEach(() => {
				res = [
					{
						"id" : 1,
						"description" : "Ticket requester",
						"label" : "Search a requester",
						"name" : "requester",
						"position" : 1,
						"portal_cc" : false,
						"portal_cc_to" : "company",
						"type" : "default_requester"
					}
				]

				// SET UP expected request
				nock('https://test.freshdesk.com')
					.get('/api/v2/ticket_fields')
					//.query({})
					.reply(200, res)
			})

			it('should send GET request to /api/v2/ticket_fields', function(done) {
				freshdesk.listAllTicketFields((err, data) => {
					expect(err).is.null
					expect(data).to.deep.equal(res)

					done()
				})
			})

			it('(explicit null) should send GET request to /api/v2/ticket_fields', function(done) {
				freshdesk.listAllTicketFields(null, (err, data) => {
					expect(err).is.null
					expect(data).to.deep.equal(res)

					done()
				})
			})
		})

		describe('with params', () => {

			let res = null

			beforeEach(() => {
				res = [{
					"id" : 1,
					"description" : "Ticket requester",
					"label" : "Search a requester",
					"name" : "requester",
					"position" : 1,
					"portal_cc" : false,
					"portal_cc_to" : "company",
					"type" : "default_requester"
				}]

				// SET UP expected request
				nock('https://test.freshdesk.com')
					.get('/api/v2/ticket_fields')
					.query({'type': 'default_requester'})
					.reply(200, res)
			})

			it('should send GET request to /api/v2/ticket_fields?type=xx', function(done) {

				const params = {'type': 'default_requester'}

				freshdesk.listAllTicketFields(params, (err, data) => {
					expect(err).is.null
					expect(data).to.deep.equal(res)

					done()
				})
			})

		})

	})
})
