"use strict";

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
});
