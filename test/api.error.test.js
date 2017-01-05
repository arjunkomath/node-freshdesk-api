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

describe('api.error', function(){

	//this.timeout(5000)
	//this.slow(3000)

	let freshdesk = new Freshdesk('https://test.freshdesk.com', 'TESTKEY')

	describe('on API response status 400', () => {

		before(()=>{
			nock('https://test.freshdesk.com')
				.get('/api/v2/companies/0')
				.reply(400, {msg:"err 123"})
		})

		it('should throw FreshdeskError', (done) => {

			freshdesk.getCompany(0, (err) => {
				expect(err).is.not.null
				expect(err).to.be.instanceof(Freshdesk.FreshdeskError)
				expect(err).has.property('status', 400)
				expect(err).has.property('message', "Error in Freshdesk's client API")
				expect(err).has.property('data').to.deep.equal({msg: "err 123"})

				done()
			})

			//throw(Freshdesk.FreshdeskError)
		})
	})
})
