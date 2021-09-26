/*
Node wrapper for Freshdesk v2 API

Copyright (C) 2016-2019 Arjun Komath <arjunkomath@gmail.com>

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

const Freshdesk = require("../lib/client");

describe("api.settings", function () {
	const freshdesk = new Freshdesk("https://test.freshdesk.com", "TESTKEY");

	describe("get", () => {
		it("should send GET request to /api/v2/settings/helpdesk", (done) => {
			const res = {
				id: 22000991607,
				deleted: false,
				description: null,
				email: "gwuzi@mail.ru",
				name: "Clark Kent",
			};

			// SET UP expected request

			nock("https://test.freshdesk.com")
				.get("/api/v2/settings/helpdesk")
				.reply(200, res);

			freshdesk.getSettings((err, data, extra) => {
				expect(err).is.null;
				expect(data).to.deep.equal(res);
				expect(extra).to.exist;
				done();
			});
		});
	});
});
