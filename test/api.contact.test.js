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

describe('api.contact', function(){

	const freshdesk = new Freshdesk('https://test.freshdesk.com', 'TESTKEY')

	describe('update', () => {

		it('should send PUT request to /api/v2/contacts/NNNN', (done) => {

			const res = {
				data: {
					"id":22000991607,
					"deleted":false,
					"description":null,
					"email":"gwuzi@mail.ru",
					"name":"Clark Kent"
				}
			}

			// SET UP expected request

			nock('https://test.freshdesk.com')
				.put('/api/v2/contacts/22000991607', {
					"name": "Clark Kent"
				})
				.reply(200, res)


			freshdesk.updateContact(22000991607, {"name":"Clark Kent"}, (err, data) => {
				expect(err).is.null
				expect(data.data).to.deep.equal(res)
				done()
			})
		})
	})

	describe('get', () => {

		it('should send GET request to /api/v2/contacts/NNNN', (done) => {

			const res = {
				data: {
					"id":22000991607,
					"deleted":false,
					"description":null,
					"email":"gwuzi@mail.ru",
					"name":"Clark Kent"
				}
			}

			// SET UP expected request

			nock('https://test.freshdesk.com')
				.get('/api/v2/contacts/22000991607')
				.reply(200, res)


			freshdesk.getContact(22000991607, (err, data) => {
				expect(err).is.null
				expect(data.data).to.deep.equal(res)
				done()
			})
		})
	})
})
