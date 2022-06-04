"use strict";

const { expect } = require("chai");
const utils = require("../lib/utils");

describe("utils.test", function () {
	describe("isNil", () => {
		const testCases = [
			[null, true],
			[undefined, true],
			[1, false],
			[true, false],
			[false, false],
			[0, false],
			["", false],
			["    ", false],
			[() => false, false],
		];

		testCases.forEach((tc) => {
			it(`should recognize [${tc[0]}]`, () => {
				const exp = tc[1];
				const act = utils.isNil(tc[0]);

				expect(act).equal(exp);
			});
		});
	});

	describe("isFunction", () => {
		const testCases = [
			[null, false],
			[undefined, false],
			[1, false],
			[true, false],
			[false, false],
			[0, false],
			["", false],
			["    ", false],
			[() => false, true],
			[utils.isFunction, true],
			[Math.round, true],
		];

		testCases.forEach((tc) => {
			it(`should recognize [${tc[0]}]`, () => {
				const exp = tc[1];
				const act = utils.isFunction(tc[0]);

				expect(act).equal(exp);
			});
		});
	});

	describe("createResponseHandler", () => {
		const cb = (error, data) => {
			return error || data;
		};

		it(`should handle error`, () => {
			const error = new Error("test error");
			const act = utils.createResponseHandler(cb)(error, {}, {});

			expect(act).equal(cb(error));
		});

		it(`should handle 404 response`, () => {
			const body = { foo: "bar" };
			const act = utils.createResponseHandler(cb)(
				null,
				{
					statusCode: 404,
					request: {},
					response: {},
					headers: {},
					data: body,
				},
				body,
				{
					method: 'GET'
				}
			);

			expect(act).to.be.instanceof(utils.FreshdeskError);
			expect(act.message).equal("The requested entity was not found");
			expect(act.data).equal(body);
		});
	});
});
