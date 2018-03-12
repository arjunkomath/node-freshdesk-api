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
