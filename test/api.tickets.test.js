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

const nock = require("nock");

const Freshdesk = require("..");

describe("api.tickets", function () {
	const freshdesk = new Freshdesk("https://test.freshdesk.com", "TESTKEY");

	describe("listAllTicketFields", () => {
		describe("without params", () => {
			let res = null;

			beforeEach(() => {
				res = [
					{
						id: 1,
						description: "Ticket requester",
						label: "Search a requester",
						name: "requester",
						position: 1,
						portal_cc: false,
						portal_cc_to: "company",
						type: "default_requester",
					},
				];

				// SET UP expected request
				nock("https://test.freshdesk.com")
					.get("/api/v2/ticket_fields")
					//.query({})
					.reply(200, res);
			});

			it("should send GET request to /api/v2/ticket_fields", function (done) {
				freshdesk.listAllTicketFields((err, data) => {
					expect(err).is.null;
					expect(data).to.deep.equal(res);

					done();
				});
			});

			it("(explicit null) should send GET request to /api/v2/ticket_fields", function (done) {
				freshdesk.listAllTicketFields(null, (err, data, extra) => {
					expect(err).is.null;
					expect(data).to.deep.equal(res);
					expect(extra)
						.to.be.an("object")
						.that.have.property("requestId", "");

					done();
				});
			});
		});

		describe("with params", () => {
			let res = null;

			beforeEach(() => {
				res = [
					{
						id: 1,
						description: "Ticket requester",
						label: "Search a requester",
						name: "requester",
						position: 1,
						portal_cc: false,
						portal_cc_to: "company",
						type: "default_requester",
					},
				];

				// SET UP expected request
				nock("https://test.freshdesk.com")
					.get("/api/v2/ticket_fields")
					.query({ type: "default_requester" })
					.reply(200, res);
			});

			it("should send GET request to /api/v2/ticket_fields?type=xx", function (done) {
				const params = { type: "default_requester" };

				freshdesk.listAllTicketFields(params, (err, data) => {
					expect(err).is.null;
					expect(data).to.deep.equal(res);

					done();
				});
			});
		});
	});

	describe("listAllTicket", () => {
		describe("without params", () => {
			let res = null;
			let params = {};

			beforeEach(() => {
				res = [
					{
						cc_emails: ["user@cc.com", "user2@cc.com"],
						fwd_emails: [],
						reply_cc_emails: ["user@cc.com", "user2@cc.com"],
						fr_escalated: false,
						spam: false,
						email_config_id: null,
						group_id: 2,
						priority: 1,
						requester_id: 5,
						responder_id: 1,
						source: 2,
						status: 2,
						subject: "Please help",
						to_emails: null,
						product_id: null,
						id: 18,
						type: "Lead",
						created_at: "2015-08-17T12:02:50Z",
						updated_at: "2015-08-17T12:02:51Z",
						due_by: "2015-08-20T11:30:00Z",
						fr_due_by: "2015-08-18T11:30:00Z",
						is_escalated: false,
						custom_fields: {
							category: "Default",
						},
					},
				];

				// SET UP expected request
				nock("https://test.freshdesk.com")
					.get("/api/v2/tickets")
					.query(params)
					.reply(200, res);
			});

			it("should send GET request to /api/v2/tickets", function (done) {
				freshdesk.listAllTickets(params, (err, data) => {
					expect(err).is.null;
					expect(data).to.deep.equal(res);

					done();
				});
			});
		});

		describe("with params", () => {
			let res = null;
			let params = { type: "default_requester" };

			beforeEach(() => {
				res = [
					{
						cc_emails: ["user@cc.com", "user2@cc.com"],
						fwd_emails: [],
						reply_cc_emails: ["user@cc.com", "user2@cc.com"],
						fr_escalated: false,
						spam: false,
						email_config_id: null,
						group_id: 2,
						priority: 1,
						requester_id: 5,
						responder_id: 1,
						source: 2,
						status: 2,
						subject: "Please help",
						to_emails: null,
						product_id: null,
						id: 18,
						type: "Lead",
						created_at: "2015-08-17T12:02:50Z",
						updated_at: "2015-08-17T12:02:51Z",
						due_by: "2015-08-20T11:30:00Z",
						fr_due_by: "2015-08-18T11:30:00Z",
						is_escalated: false,
						custom_fields: {
							category: "Default",
						},
					},
				];

				// SET UP expected request
				nock("https://test.freshdesk.com")
					.get("/api/v2/tickets")
					.query(params)
					.reply(200, res);
			});

			it("should send GET request to /api/v2/tickets", function (done) {
				freshdesk.listAllTickets(params, (err, data) => {
					expect(err).is.null;
					expect(data).to.deep.equal(res);

					done();
				});
			});
		});
	});

	describe("createTicket", () => {
		describe("with params", () => {
			let res = null;
			let data = {
				description: "Details about the issue...",
				subject: "Support Needed...",
				email: "tom@outerspace.com",
				priority: 1,
				status: 2,
				cc_emails: ["ram@freshdesk.com", "diana@freshdesk.com"],
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

				// SET UP expected request
				nock("https://test.freshdesk.com")
					.post(`/api/v2/tickets`, data)
					.reply(200, res);
			});

			it("should send POST request to /api/v2/tickets", function (done) {
				freshdesk.createTicket(data, (err, data) => {
					expect(err).is.null;
					expect(data).to.deep.equal(res);

					done();
				});
			});
		});
	});

	describe("updateTicket", () => {
		describe("with params", () => {
			let res = null;
			let ticket_id = "ticket_id";
			let data = {
				description: "Details about the issue...",
				subject: "Support Needed...",
				email: "tom@outerspace.com",
				priority: 1,
				status: 2,
				cc_emails: ["ram@freshdesk.com", "diana@freshdesk.com"],
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

				// SET UP expected request
				nock("https://test.freshdesk.com/")
					.put(`/api/v2/tickets/${ticket_id}`, data)
					.reply(200, res);
			});

			it("should send PUT request to /api/v2/tickets/id", function (done) {
				freshdesk.updateTicket(ticket_id, data, (err, data) => {
					expect(err).is.null;
					expect(data).to.deep.equal(res);

					done();
				});
			});
		});
	});

	describe("deleteTicket", () => {
		describe("with params", () => {
			let res = null;
			let ticket_id = "ticket_id";

			beforeEach(() => {
				res = null;

				// SET UP expected request
				nock("https://test.freshdesk.com/")
					.delete(`/api/v2/tickets/${ticket_id}`)
					.reply(204, res);
			});

			it("should send DELETE request to /api/v2/tickets/id", function (done) {
				freshdesk.deleteTicket(ticket_id, (err, data) => {
					expect(err).is.null;
					expect(data).to.deep.equal(res);

					done();
				});
			});
		});
	});

	describe("restoreTicket", () => {
		describe("with params", () => {
			let res = null;
			let ticket_id = "ticket_id";

			beforeEach(() => {
				res = null;

				// SET UP expected request
				nock("https://test.freshdesk.com/")
					.put(`/api/v2/tickets/${ticket_id}/restore`)
					.reply(204, res);
			});

			it("should send PUT request to /api/v2/tickets/id/restore", function (done) {
				freshdesk.restoreTicket(ticket_id, (err, data) => {
					expect(err).is.null;
					expect(data).to.deep.equal(res);

					done();
				});
			});
		});
	});
});
