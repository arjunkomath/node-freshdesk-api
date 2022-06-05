const fs = require("fs");
const path = require("path");

const { fastify } = require("fastify");
const { expect } = require("chai");
const { setGlobalDispatcher, Agent } = require('undici')

const Freshdesk = require("../lib/client");

describe("e2e tests", () => {
	beforeEach(() => {
		const agent = new Agent({
			keepAliveTimeout: 10, // milliseconds
			keepAliveMaxTimeout: 10 // milliseconds
		})

		setGlobalDispatcher(agent)
	})

	it("correctly handles empty body", async function () {
		this.timeout(5000);
		const app = fastify();

		app.delete("/api/v2/solutions/categories/3", (request, reply) => {
			reply.code(204).send();
		});

		await app.ready();
		await app.listen({
			port: 9999,
			host: "0.0.0.0"
		});
		const freshdesk = new Freshdesk("http://0.0.0.0:9999", "TESTKEY");

		const promise = new Promise((resolve, reject) => {
			freshdesk.deleteSolutionCategory(3, (err, data) => {
				expect(err).is.null;
				expect(data).to.equal(null);
				resolve();
			});
		});
		await promise;
		await app.close();
	});

	it("correctly handles body", async function () {
		this.timeout(5000);
		const app = fastify();

		app.delete("/api/v2/solutions/categories/3", (request, reply) => {
			reply.code(200).send({ status: "ok" });
		});

		await app.ready();
		await app.listen({
			port: 9998,
			host: "0.0.0.0"
		});
		const freshdesk = new Freshdesk("http://0.0.0.0:9998", "TESTKEY");

		const promise = new Promise((resolve, reject) => {
			freshdesk.deleteSolutionCategory(3, (err, data) => {
				expect(err).is.null;
				expect(data).to.deep.equal({ status: "ok" });
				resolve();
			});
		});
		await promise;
		await app.close();
	});

	it("correctly handles forms", async function () {
		this.timeout(5000);
		const data = {
			description: "Details about the issue...",
			subject: "Support Needed...",
			email: "tom@outerspace.com",
			priority: 1,
			status: 2,
			cc_emails: ["ram@freshdesk.com", "diana@freshdesk.com"],
			attachments: [
				fs.createReadStream(path.resolve("./SECURITY.md"))
			]
		};

		const res = {
			cc_emails: ["ram@freshdesk.com", "diana@freshdesk.com"],
			fwd_emails: [],
			reply_cc_emails: [
				"ram@freshdesk.com",
				"diana@freshdesk.com"
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
			attachments: []
		};

		const app = fastify();
		app.register(require("fastify-multipart"));
		app.post("/api/v2/tickets", async (req, reply) => {
			expect(req.headers["authorization"]).to.equal("Basic VEVTVEtFWTpY");
			const content = await req.file();
			expect(content.fields).to.haveOwnProperty("description");
			expect(content.fields).to.haveOwnProperty("subject");
			expect(content.fields).to.haveOwnProperty("email");
			expect(content.fields).to.haveOwnProperty("priority");
			expect(content.fields).to.haveOwnProperty("status");
			expect(content.fields).to.haveOwnProperty("cc_emails[]");
			expect(content.fields).to.haveOwnProperty("attachments[]");
			expect(content).to.haveOwnProperty("file");
			reply.code(200).send(res);
		});

		await app.ready();
		await app.listen({
			port: 9997,
			host: "0.0.0.0"
		});

		const freshdesk = new Freshdesk("http://0.0.0.0:9997", "TESTKEY");

		const promise = new Promise((resolve, reject) => {
			freshdesk.createTicket(data, (err, data) => {
				expect(err).is.null;
				expect(data).to.deep.equal(res);
				resolve();
			});
		});
		await promise;
		await app.close();
	});
});
