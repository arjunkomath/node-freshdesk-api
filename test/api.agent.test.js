/*
Node wrapper for Freshdesk v2 API

Copyright (C) 2016-2017 Maksim Koryukov <maxkoryukov@gmail.com>
Davin Smith <https://github.com/davinthesmith>

This program is free software: you can redistribute it and/or modify
it under the terms of the MIT License, attached to this software package.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

You should have received a copy of the MIT License along with this
program. If not, see <https://opensource.org/licenses/MIT>.

http://spdx.org/licenses/MIT
*/

'use strict'

const nock = require('nock')

const Freshdesk = require('..')

describe('api.agent', function(){

	const freshdesk = new Freshdesk('https://test.freshdesk.com', 'TESTKEY')

	describe('update', () => {

		it('should send PUT request to /api/v2/agents/NNNN', (done) => {

			const res = {
				"id":22000991607,
				"deleted":false,
				"description":null,
				"email":"gwuzi@mail.ru",
				"name":"Clark Kent"
			}

			// SET UP expected request

			nock('https://test.freshdesk.com')
				.put('/api/v2/agents/22000991607', {
					"name": "Clark Kent"
				})
				.reply(200, res)


			freshdesk.updateAgent(22000991607, {"name": "Clark Kent"}, (err, data, extra) => {
				expect(err).is.null
				expect(data).to.deep.equal(res)
				expect(extra).to.exist
				done()
			})
		})
	})

	describe('get', () => {

		it('should send GET request to /api/v2/agents/NNNN', (done) => {

			const res = {
				"id":22000991607,
				"deleted":false,
				"description":null,
				"email":"gwuzi@mail.ru",
				"name":"Clark Kent"
			}

			// SET UP expected request

			nock('https://test.freshdesk.com')
				.get('/api/v2/agents/22000991607')
				.reply(200, res)


			freshdesk.getAgent(22000991607, (err, data, extra) => {
				expect(err).is.null
				expect(data).to.deep.equal(res)
				expect(extra).to.exist
				done()
			})
		})
	})

	describe('listAllAgents', () => {

		it('should send GET request to /api/v2/agents', (done) => {

			const res = [
				{
					"id":22000991607,
					"deleted":false,
					"description":null,
					"email":"gwuzi@mail.ru",
					"name":"Clark Kent"
				}, {
					"id":22000991608,
					"deleted":false,
					"description":null,
					"email":"donna@example.com",
					"name":"Donna Example"
				}

			]

			// SET UP expected request

			nock('https://test.freshdesk.com')
				.get('/api/v2/agents')
				.query({"page": 12, "per_page": 10})
				.reply(200, res, {
					"link": '< https://test.freshdesk.com/api/v2/agents?page=13&per_page=10>;rel="next"',
				})

			const options = {
				"page": 12,
				"per_page": 10,
			}

			freshdesk.listAllAgents(options, (err, data, extra) => {
				expect(err).is.null
				expect(data).to.deep.equal(res)
				expect(extra).to.exist
				expect(extra).to.be.an('object')
					.that.have.property('pageIsLast', false)

				done()
			})
		})
	})
})
