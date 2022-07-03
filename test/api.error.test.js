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

const fs = require("fs");
const path = require("path");
const { expect } = require("chai");

const Freshdesk = require("..");
const { MockAgent, setGlobalDispatcher } = require("undici");
const { FormData } = require("form-data");
const nock = require("nock");

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

	describe('form error', () => {
		let res = null;
		let data = {
			description: "Details about the issue...",
			subject: "Support Needed...",
			email: "tom@outerspace.com",
			priority: 1,
			status: 2,
			cc_emails: ["ram@freshdesk.com", "diana@freshdesk.com"],
			attachments: [
				fs.createReadStream(path.resolve("./SECURITY.md")),
			],
		};

		beforeEach(() => {
			res = {
				cc_emails: ["ram@freshdesk.com", "diana@freshdesk.com"],
				fwd_emails: [],
				reply_cc_emails: [
					"ram@freshdesk.com",
					"diana@freshdesk.com",
				],
				email_config_id: null,
				group_id: null,
				priority: 1,
				requester_id: 129,
				responder_id: null,
				source: 2,
				status: 2,
				subject: "Support needed..",
				company_id: 1,
				id: 1,
				type: "Question",
				to_emails: null,
				product_id: null,
				fr_escalated: false,
				spam: false,
				urgent: false,
				is_escalated: false,
				created_at: "2015-07-09T13:08:06Z",
				updated_at: "2015-07-23T04:41:12Z",
				due_by: "2015-07-14T13:08:06Z",
				fr_due_by: "2015-07-10T13:08:06Z",
				description_text: "Some details on the issue ...",
				description: "<div>Some details on the issue ..</div>",
				tags: [],
				attachments: [],
			};

			nock("https://test.freshdesk.com")
				.post(`/api/v2/tickets`, (body) => {
					return body.includes(
						`Content-Disposition: form-data; name="attachments[]"; filename="SECURITY.md"`
					);
				})
				.replyWithError("Form error");
		});

		it("should throw an error while submitting form", function (done) {
			freshdesk.createTicket(data, (err, data) => {
				expect(err).is.not.null;
				expect(err.message).to.equal("Form error")
				expect(data).to.be.undefined;

				done();
			});
		});
	})
});


