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

describe('api.companies', function(){

	const freshdesk = new Freshdesk('https://test.freshdesk.com', 'TESTKEY')

	describe('create', () => {

		it('should send POST request to /api/v2/companies', (done) => {

			const res = {
				"id": 1000,
				"name": "ACME"}


			// SET UP expected request

			nock('https://test.freshdesk.com')
				.post(`/api/v2/companies`, {
					"name": "ACME"
				})
				.reply(200, res)

			freshdesk.createCompany({"name": "ACME"}, (err, data) => {
				expect(err).is.null
				expect(data).to.deep.equal(res)
				done()
			})

		})

	})

	describe('update', () => {

		it('should send PUT request to /api/v2/companies', (done) => {

			const res = {
				"id": 1000,
				"name": "ACME"}


			// SET UP expected request

			nock('https://test.freshdesk.com')
				.put(`/api/v2/companies/1000`, {
					"name": "ACME"
				})
				.reply(200, res)

			freshdesk.updateCompany(1000, {"name": "ACME"}, (err, data) => {
				expect(err).is.null
				expect(data).to.deep.equal(res)
				done()
			})

		})

	})

	describe('list all companies', () => {

		it('should send GET request to /api/v2/companies', (done) => {

			const res = [
				{
					"id":8,
					"name":"Super Nova",
					"description":"Space Shuttle Manufacturing",
					"domains":["supernova","nova","super"],
					"note":null,
					"created_at":"2014-01-08T09:08:53+05:30",
					"updated_at":"2014-01-08T09:08:53+05:30",
					"custom_fields" : {
						"website": "https://www.supernova.org",
						"address": "123, Baker Street,\r\nNew York"
					}
				}]


			// SET UP expected request

			nock('https://test.freshdesk.com')
				.get(`/api/v2/companies`)
				.reply(200, res)

			freshdesk.listAllCompanies((err, data) => {
				expect(err).is.null
				expect(data).to.deep.equal(res)
				done()
			})

		})

	})

	describe('filter company', () => {

		it('should send GET request to /api/v2/search/companies with query string', (done) => {

			const res = {
				"total":1,
				"results":[
					{
						"id": 33,
						"name": "Lex Corp",
						"description": "Sales and Marketing",
						"note": "Sales division of Alexander Luthor's companies",
						"domains": [
							"lexcorp.org",
							"lexcorp.us"
						],
						"custom_fields": {
							"sector": 5,
							"private": true
						},
						"created_at": "2017-12-15T06:34:09Z",
						"updated_at": "2017-12-15T06:34:09Z"
					}
				]
			}


			// SET UP expected request

			const filter = "domain:lexcorp.org"

			nock('https://test.freshdesk.com')
				.get(`/api/v2/search/companies?query=${encodeURI('"' + filter + '"')}`)
				.reply(200, res)

			freshdesk.filterCompany(filter, (err, data) => {
				expect(err).is.null
				expect(data).to.deep.equal(res)
				done()
			})

		})

	})

	describe('listAllCompanyFields', () => {

		describe('without params', () => {

			let res = null

			beforeEach(() => {
				res = [
					{
						"id":1,
						"name":"name",
						"label":"Company name",
						"field_type":"default_name",
						"required_for_agent":true,
						"position":1,
						"default":true,
						"created_at":"2014-12-12T12:29:46+05:30",
						"updated_at":"2014-12-12T12:29:46+05:30"
					}]

				// SET UP expected request
				nock('https://test.freshdesk.com')
					.get('/api/v2/company_fields')
					//.query({})
					.reply(200, res)
			})

			it('should send GET request to /api/v2/company_fields', function(done) {
				freshdesk.listAllCompanyFields((err, data) => {
					expect(err).is.null
					expect(data).to.deep.equal(res)

					done()
				})
			})

		})

	})
})
