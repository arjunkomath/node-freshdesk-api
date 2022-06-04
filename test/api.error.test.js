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

const { expect } = require("chai");

const Freshdesk = require("..");
const { MockAgent, setGlobalDispatcher } = require("undici");

describe("api.error", function () {
	//this.timeout(5000)
	//this.slow(3000)

	const freshdesk = new Freshdesk("https://test.freshdesk.com", "TESTKEY");
	let client
	beforeEach(() => {
		const mockAgent = new MockAgent()
		mockAgent.disableNetConnect()
		setGlobalDispatcher(mockAgent)
		client = mockAgent.get("https://test.freshdesk.com")
	})

	describe("on API response status 400", () => {
		beforeEach(() => {
			client
				.intercept({
					path: /.*/,
					method: 'GET',
				})
				.reply(400, { msg: "err 123" });
		});

		it("should pass FreshdeskError to callback", (done) => {
			freshdesk.getCompany(2139, (err) => {
				expect(err).is.not.null;
				expect(err).to.be.instanceof(Freshdesk.FreshdeskError);
				expect(err).has.property("status", 400);
				expect(err).has.property(
					"message",
					"Error in Freshdesk's client API"
				);
				expect(err)
					.has.property("data")
					.to.deep.equal({ msg: "err 123" });
				expect(err)
					.has.property("apiTarget")
					.to.equal("GET /api/v2/companies/2139");

				done();
			});
		});
	});

	describe("on network error", () => {
		beforeEach(() => {
			client
				.intercept({
					path: /.*/,
					method: 'GET',
				})
				.replyWithError(new Error("my network error"));

		});

		it("should pass Error to callback", (done) => {
			freshdesk.getTicket(111, (err) => {
				expect(err).is.not.null;
				expect(err).to.be.instanceof(Error);
				expect(err).has.property("message", "my network error");

				done();
			});
		});
	});
});
