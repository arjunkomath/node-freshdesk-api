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

		let res = null

		beforeEach(() => {

			// SET UP expected request

			nock('https://test.freshdesk.com')
				.post('/api/v2/companies', {
					"name": "ACME"
				})
				.reply(200, res)
		})

		it('should send PUT request to /api/v2/companies', (done) => {

			freshdesk.updateCompany(res.id, {"name": "ACME 2"}, (err, data) => {
				expect(err).is.null
				expect(data.name).to.deep.equal("ACME 2")
				done()
			})

		})

		afterEach(() => {

			freshdesk.deleteCompany(res.id, (err, data) => {
				expect(err).is.null
				done()
			})
		})

	})

	describe('listAllCompanyFields', () => {

		describe('without params', () => {

			let res = null

			beforeEach(() => {
				res = [
				]

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
