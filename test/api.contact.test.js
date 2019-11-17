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

'use strict'

const nock = require('nock')

const Freshdesk = require('..')

describe('api.contact', function () {

	const freshdesk = new Freshdesk('https://test.freshdesk.com', 'TESTKEY')

	describe('update', () => {

		it('should send PUT request to /api/v2/contacts/NNNN', (done) => {

			const res = {
				"id": 22000991607,
				"deleted": false,
				"description": null,
				"email": "gwuzi@mail.ru",
				"name": "Clark Kent",
			}

			// SET UP expected request

			nock('https://test.freshdesk.com')
				.put('/api/v2/contacts/22000991607', {
					"name": "Clark Kent",
				})
				.reply(200, res)


			freshdesk.updateContact(22000991607, {"name": "Clark Kent"}, (err, data, extra) => {
				expect(err).is.null
				expect(data).to.deep.equal(res)
				expect(extra).to.exist
				done()
			})
		})
	})

	describe('get', () => {

		it('should send GET request to /api/v2/contacts/NNNN', (done) => {

			const res = {
				"id": 22000991607,
				"deleted": false,
				"description": null,
				"email": "gwuzi@mail.ru",
				"name": "Clark Kent",
			}

			// SET UP expected request

			nock('https://test.freshdesk.com')
				.get('/api/v2/contacts/22000991607')
				.reply(200, res)


			freshdesk.getContact(22000991607, (err, data, extra) => {
				expect(err).is.null
				expect(data).to.deep.equal(res)
				expect(extra).to.exist
				done()
			})
		})
	})

	describe('delete', () => {

		it('should send DELETE request to /api/v2/contacts/NNNN', (done) => {

			const res = {}

			// SET UP expected request

			nock('https://test.freshdesk.com')
				.delete('/api/v2/contacts/22000991607')
				.reply(200, res)


			freshdesk.deleteContact(22000991607, (err, data, extra) => {
				expect(err).is.null
				expect(data).to.deep.equal(res)
				expect(extra).to.exist
				done()
			})
		})
	})

	describe('listAllContacts', () => {

		it('should send GET request to /api/v2/contacts', (done) => {

			const res = [
				{
					"id": 22000991607,
					"deleted": false,
					"description": null,
					"email": "gwuzi@mail.ru",
					"name": "Clark Kent",
				}, {
					"id": 22000991608,
					"deleted": false,
					"description": null,
					"email": "donna@example.com",
					"name": "Donna Example",
				},

			]

			// SET UP expected request

			nock('https://test.freshdesk.com')
				.get('/api/v2/contacts')
				.query({"page": 12, "per_page": 10})
				.reply(200, res, {
					"link": '< https://test.freshdesk.com/api/v2/contacts?page=13&per_page=10>;rel="next"',
				})

			const options = {
				"page": 12,
				"per_page": 10,
			}

			freshdesk.listAllContacts(options, (err, data, extra) => {
				expect(err).is.null
				expect(data).to.deep.equal(res)
				expect(extra).to.exist
				expect(extra).to.be.an('object')
					.that.have.property('pageIsLast', false)

				done()
			})
		})
	})

	describe('filter contacts', () => {

		it('should send GET request to /api/v2/search/contacts with query string', (done) => {

			const res = {
				"total": 1,
				"results": [
					{
						"active": true,
						"address": "11 Park Avenue,",
						"company_id": 331,
						"description": "alien hero",
						"email": "john@marsspace.com",
						"id": 112,
						"job_title": "Superhero",
						"language": "en",
						"mobile": "992339928",
						"name": "John Jonz",
						"phone": "+1992842882",
						"time_zone": "Eastern Time (US & Canada)",
						"twitter_id": "martian",
						"custom_fields": {
							"location": "Watch tower",
							"sector": "outer space",
						},
						"created_at": "2017-07-19T12:29:36Z",
						"updated_at": "2017-07-19T12:38:26Z",
					},
				],
			}


			// SET UP expected request

			const filter = "name:John Jonz"

			nock('https://test.freshdesk.com')
				.get(`/api/v2/search/contacts?query=%22name:John%20Jonz%22`)
				.reply(200, res)

			freshdesk.filterContacts(filter, (err, data) => {
				expect(err).is.null
				expect(data).to.deep.equal(res)
				done()
			})

		})

	})
})
