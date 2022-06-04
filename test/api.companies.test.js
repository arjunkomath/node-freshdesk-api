/*
Node wrapper for Freshdesk v2 API

Copyright (C) 2016-2018 Maksim Koryukov <maxkoryukov@gmail.com>
Copyright (C) 2018 Ori Roniger <https://github.com/roniger>

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

describe("api.companies", function () {
	const freshdesk = new Freshdesk("https://test.freshdesk.com", "TESTKEY");
	let client
	beforeEach(() => {
		const mockAgent = new MockAgent()
		mockAgent.disableNetConnect()
		setGlobalDispatcher(mockAgent)
		client = mockAgent.get("https://test.freshdesk.com")
	})

	describe("create", () => {
		it("should send POST request to /api/v2/companies", (done) => {
			const res = {
				id: 1000,
				name: "ACME",
			};

			// SET UP expected request
			client
				.intercept({
					path: "/api/v2/companies",
					body: JSON.stringify({
						name: "ACME",
					}),
					method: 'POST',
				})
				.reply(200, res);

			freshdesk.createCompany({ name: "ACME" }, (err, data) => {
				expect(err).is.null;
				expect(data).to.deep.equal(res);
				done();
			});
		});
	});

	describe("update", () => {
		it("should send PUT request to /api/v2/companies", (done) => {
			const res = {
				id: 1000,
				name: "ACME",
			};

			// SET UP expected request
			client
				.intercept({
					path: "/api/v2/companies/1000",
					body: JSON.stringify({
						name: "ACME",
					}),
					method: 'PUT',
				})
				.reply(200, res);

			freshdesk.updateCompany(1000, { name: "ACME" }, (err, data) => {
				expect(err).is.null;
				expect(data).to.deep.equal(res);
				done();
			});
		});
	});

	describe("search for a company by name with query string", () => {
		it("should send GET request to /api/v2/companies/autocomplete", (done) => {
			let params = { name: "Super Nova" };

			const res = {
				companies: [
					{
						id: 8,
						name: "Super Nova",
					},
				],
			};

			// SET UP expected request
			client
				.intercept({
					path: "/api/v2/companies/autocomplete",
					method: 'GET',
					query: params,
				})
				.reply(200, res);

			freshdesk.searchCompany(params, (err, data) => {
				expect(err).is.null;
				expect(data).to.deep.equal(res);
				done();
			});
		});
	});

	describe("list all companies", () => {
		describe("without params", () => {
			let res = null;

			beforeEach(() => {
				res = [
					{
						id: 8,
						name: "Super Nova",
						description: "Space Shuttle Manufacturing",
						domains: ["supernova", "nova", "super"],
						note: null,
						created_at: "2014-01-08T09:08:53+05:30",
						updated_at: "2014-01-08T09:08:53+05:30",
						custom_fields: {
							website: "https://www.supernova.org",
							address: "123, Baker Street,\r\nNew York",
						},
					},
				];

				// SET UP expected request
				client
					.intercept({
						path: "/api/v2/companies",
						method: 'GET',
					})
					.reply(200, res);
			});

			it("should send GET request to /api/v2/companies", (done) => {
				freshdesk.listAllCompanies((err, data) => {
					expect(err).is.null;
					expect(data).to.deep.equal(res);
					done();
				});
			});
		});
	});

	describe("filter companies", () => {
		it("should send GET request to /api/v2/search/companies with query string", (done) => {
			const res = {
				total: 1,
				results: [
					{
						id: 33,
						name: "Lex Corp",
						description: "Sales and Marketing",
						note: "Sales division of Alexander Luthor's companies",
						domains: ["lexcorp.org", "lexcorp.us"],
						custom_fields: {
							sector: 5,
							private: true,
						},
						created_at: "2017-12-15T06:34:09Z",
						updated_at: "2017-12-15T06:34:09Z",
					},
				],
			};

			// SET UP expected request

			const filter = "domain:lexcorp.org";

			client
				.intercept({
					path: "/api/v2/search/companies?query=%22domain:lexcorp.org%22",
					method: 'GET',
				})
				.reply(200, res);

			freshdesk.filterCompanies(filter, (err, data) => {
				expect(err).is.null;
				expect(data).to.deep.equal(res);
				done();
			});
		});
	});

	describe("listAllCompanyFields", () => {
		describe("without params", () => {
			let res = null;

			beforeEach(() => {
				res = [
					{
						id: 1,
						name: "name",
						label: "Company name",
						field_type: "default_name",
						required_for_agent: true,
						position: 1,
						default: true,
						created_at: "2014-12-12T12:29:46+05:30",
						updated_at: "2014-12-12T12:29:46+05:30",
					},
				];

				// SET UP expected request

				client
					.intercept({
						path: "/api/v2/company_fields",
						method: 'GET',
					})
					.reply(200, res);
			});

			it("should send GET request to /api/v2/company_fields", function (done) {
				freshdesk.listAllCompanyFields((err, data) => {
					expect(err).is.null;
					expect(data).to.deep.equal(res);

					done();
				});
			});
		});
	});
});
