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

const { expect } = require("chai");

const Freshdesk = require("../lib/client");
const { MockAgent, setGlobalDispatcher } = require("undici");

describe("api.solutions", function () {
	const freshdesk = new Freshdesk("https://test.freshdesk.com", "TESTKEY");
	let client
	beforeEach(() => {
		const mockAgent = new MockAgent()
		mockAgent.disableNetConnect()
		setGlobalDispatcher(mockAgent)
		client = mockAgent.get("https://test.freshdesk.com")
	})

	describe("create a solution category", () => {
		it("should send a POST request to /api/v2/solutions/categories", (done) => {
			const res = {
				id: 3,
				name: "sample category",
				description: "This is a sample category.",
				created_at: "2016-09-06T10:00:13Z",
				updated_at: "2016-09-06T10:00:13Z",
			};
			const data = {
				name: "sample category",
				description: "This is a sample category.",
			};

			// SET UP expected request

			client
				.intercept({
					path: "/api/v2/solutions/categories",
					method: 'POST',
				})
				.reply(200, res);

			freshdesk.createSolutionCategory(data, (err, data) => {
				expect(err).is.null;
				expect(data).to.deep.equal(res);
				done();
			});
		});
	});

	describe("create a translated solution category", () => {
		it("should send a POST request to /api/v2/solutions/categories/NNNN/SSSS", (done) => {
			const res = {
				id: 3,
				name: "la categoría de la muestra",
				description: "este es creado para fines de demostración",
				created_at: "2016-09-08T07:04:07Z",
				updated_at: "2016-09-08T07:04:07Z",
			};
			const id = 3;
			const language_code = "es";
			const data = {
				name: "la categoría de la muestra",
				description: "este es creado para fines de demostración",
			};

			// SET UP expected request

			client
				.intercept({
					path: "/api/v2/solutions/categories/3/es",
					method: 'POST',
				})
				.reply(200, res);

			freshdesk.createTranslatedSolutionCategory(
				id,
				language_code,
				data,
				(err, data) => {
					expect(err).is.null;
					expect(data).to.deep.equal(res);
					done();
				}
			);
		});
	});

	describe("update a solution category", () => {
		it("should send a PUT request to /api/v2/solutions/categories/NNNN", (done) => {
			const res = {
				id: 3,
				name: "sample category",
				description: "updated description",
				created_at: "2016-09-06T10:00:13Z",
				updated_at: "2016-09-06T10:00:13Z",
			};
			const id = 3;
			const data = { description: "updated description" };

			// SET UP expected request

			client
				.intercept({
					path: "/api/v2/solutions/categories/3",
					method: 'PUT',
				})
				.reply(200, res);

			freshdesk.updateSolutionCategory(id, data, (err, data) => {
				expect(err).is.null;
				expect(data).to.deep.equal(res);
				done();
			});
		});
	});

	describe("update a translated solution category", () => {
		it("should send a PUT request to /api/v2/solutions/categories/NNNN/SSSS", (done) => {
			const res = {
				id: 3,
				name: "la categoría de la muestra",
				description: "actualizada descripción",
				created_at: "2016-09-08T07:04:07Z",
				updated_at: "2016-09-08T07:04:07Z",
			};
			const id = 3;
			const language_code = "es";
			const data = { description: "actualizada descripción" };

			// SET UP expected request

			client
				.intercept({
					path: "/api/v2/solutions/categories/3/es",
					method: 'PUT',
				})
				.reply(200, res);

			freshdesk.updateTranslatedSolutionCategory(
				id,
				language_code,
				data,
				(err, data) => {
					expect(err).is.null;
					expect(data).to.deep.equal(res);
					done();
				}
			);
		});
	});

	describe("get a solution category", () => {
		it("should send GET request to /api/v2/solutions/categories/NNNN", (done) => {
			const res = {
				id: 3,
				name: "sample category",
				description: "This is a sample category.",
				created_at: "2016-09-06T10:00:13Z",
				updated_at: "2016-09-06T10:00:13Z",
			};
			const id = 3;

			// SET UP expected request

			client
				.intercept({
					path: "/api/v2/solutions/categories/3",
					method: 'GET',
				})
				.reply(200, res);

			freshdesk.getSolutionCategory(id, (err, data) => {
				expect(err).is.null;
				expect(data).to.deep.equal(res);
				done();
			});
		});
	});

	describe("get a translated category", () => {
		it("should send GET request to /api/v2/solutions/categories/NNNN/SSSS", (done) => {
			const res = {
				id: 3,
				name: "la categoría de la muestra",
				description: "este es creado para fines de demostración",
				created_at: "2016-09-08T07:04:07Z",
				updated_at: "2016-09-08T07:04:07Z",
			};
			const id = 3;
			const language_code = 'es';

			// SET UP expected request

			nock("https://test.freshdesk.com")
				.get(`/api/v2/solutions/categories/3/es`)
				.reply(200, res);

			freshdesk.getTranslatedSolutionCategory(id, language_code, (err, data) => {
				expect(err).is.null;
				expect(data).to.deep.equal(res);
				done();
			});
		});
	});

	describe("list all solution categories", () => {
		it("should send GET request to /api/v2/solutions/categories", (done) => {
			const res = [
				{
					id: 1,
					name: "Default Category",
					description: null,
					created_at: "2016-09-08T05:50:39Z",
					updated_at: "2016-09-08T05:50:39Z",
				},
			];

			// SET UP expected request

			client
				.intercept({
					path: "/api/v2/solutions/categories",
					method: 'GET',
				})
				.reply(200, res);

			freshdesk.listAllSolutionCategories((err, data) => {
				expect(err).is.null;
				expect(data).to.deep.equal(res);
				done();
			});
		});
	});

	describe("delete a solution category", () => {
		it("should send DELETE request to /api/v2/solutions/categories/NNNN", (done) => {
			const res = null;
			const id = 3;

			// SET UP expected request

			client
				.intercept({
					path: "/api/v2/solutions/categories/3",
					method: 'DELETE',
				})
				.reply(204, res);

			freshdesk.deleteSolutionCategory(id, (err, data) => {
				expect(err).is.null;
				expect(data).to.deep.equal(res);
				done();
			});
		});
	});

	describe("create a solution folder", () => {
		it("should send a POST request to /api/v2/solutions/categories/NNNN/folders", (done) => {
			const res = {
				id: 4,
				name: "sample folder",
				description: "This is a sample folder",
				visibility: 1,
				category_id: 3,
				created_at: "2016-09-08T12:04:49Z",
				updated_at: "2016-09-08T12:04:49Z",
			};
			const id = 3;
			const data = {
				name: "sample folder",
				description: "This is a sample folder.",
				visibility: 1,
			};

			// SET UP expected request

			client
				.intercept({
					path: "/api/v2/solutions/categories/3/folders",
					method: 'POST',
				})
				.reply(200, res);

			freshdesk.createSolutionFolder(id, data, (err, data) => {
				expect(err).is.null;
				expect(data).to.deep.equal(res);
				done();
			});
		});
	});

	describe("create a translated solution folder", () => {
		it("should send a POST request to /api/v2/solutions/folders/NNNN/SSSS", (done) => {
			const res = {
				id: 4,
				name: "carpeta de la muestra",
				description: "este es creado para fines de demostración",
				visibility: 1,
				category_id: 3,
				created_at: "2016-09-08T13:01:01Z",
				updated_at: "2016-09-08T13:01:01Z",
			};
			const id = 4;
			const language_code = "es";
			const data = {
				name: "carpeta de la muestra",
				description: "este es creado para fines de demostración",
			};

			// SET UP expected request

			client
				.intercept({
					path: "/api/v2/solutions/folders/4/es",
					method: 'POST',
				})
				.reply(200, res);

			freshdesk.createTranslatedSolutionFolder(
				id,
				language_code,
				data,
				(err, data) => {
					expect(err).is.null;
					expect(data).to.deep.equal(res);
					done();
				}
			);
		});
	});

	describe("update a solution folder", () => {
		it("should send a PUT request to /api/v2/solutions/folders/NNNN", (done) => {
			const res = {
				id: 4,
				name: "sample folder",
				description: "updated description",
				visibility: 4,
				category_id: 3,
				created_at: "2016-09-08T12:04:49Z",
				updated_at: "2016-09-08T13:17:47Z",
				company_ids: [1],
			};
			const id = 3;
			const data = {
				description: "updated description",
				visibility: 4,
				company_ids: [1],
			};

			// SET UP expected request

			client
				.intercept({
					path: "/api/v2/solutions/folders/3",
					method: 'PUT',
				})
				.reply(200, res);

			freshdesk.updateSolutionFolder(id, data, (err, data) => {
				expect(err).is.null;
				expect(data).to.deep.equal(res);
				done();
			});
		});
	});

	describe("update a translated solution folder", () => {
		it("should send a PUT request to /api/v2/solutions/folders/NNNN/SSSS", (done) => {
			const res = {
				id: 4,
				name: "carpeta de la muestra",
				description: "actualizada Descripción",
				visibility: 4,
				category_id: 3,
				created_at: "2016-09-08T13:01:01Z",
				updated_at: "2016-09-08T13:27:08Z",
				company_ids: [1],
			};
			const id = 3;
			const language_code = "es";
			const data = { description: "actualizada descripción" };

			// SET UP expected request

			client
				.intercept({
					path: "/api/v2/solutions/folders/3/es",
					method: 'PUT',
				})
				.reply(200, res);

			freshdesk.updateTranslatedSolutionFolder(
				id,
				language_code,
				data,
				(err, data) => {
					expect(err).is.null;
					expect(data).to.deep.equal(res);
					done();
				}
			);
		});
	});

	describe("get a solution folder", () => {
		it("should send GET request to /api/v2/solutions/folders/NNNN", (done) => {
			const res = {
				id: 4,
				name: "sample folder",
				description: "This is a sample folder",
				visibility: 1,
				category_id: 3,
				created_at: "2016-09-08T12:04:49Z",
				updated_at: "2016-09-08T12:04:49Z",
			};
			const id = 4;

			// SET UP expected request

			client
				.intercept({
					path: "/api/v2/solutions/folders/4",
					method: 'GET',
				})
				.reply(200, res);

			freshdesk.getSolutionFolder(id, (err, data) => {
				expect(err).is.null;
				expect(data).to.deep.equal(res);
				done();
			});
		});
	});

	describe("get a translated solution folder", () => {
		it("should send GET request to /api/v2/solutions/folders/NNNN/SSSS", (done) => {
			const res = {
				id: 4,
				name: "carpeta de la muestra",
				description: "este es creado para fines de demostración",
				visibility: 1,
				category_id: 3,
				created_at: "2016-09-08T12:04:49Z",
				updated_at: "2016-09-08T12:04:49Z",
			};
			const id = 4;
			const language_code = "es";

			// SET UP expected request

			nock("https://test.freshdesk.com")
				.get(`/api/v2/solutions/folders/4/es`)
				.reply(200, res);

			freshdesk.getTranslatedSolutionFolder(id, language_code, (err, data) => {
				expect(err).is.null;
				expect(data).to.deep.equal(res);
				done();
			});
		});
	});

	describe("list all solution category folders", () => {
		it("should send GET request to /api/v2/solutions/categories/NNNN/folders", (done) => {
			const res = [
				{
					id: 4,
					name: "sample folder",
					description: "This is created for demo purpose",
					visibility: 4,
					created_at: "2016-09-08T12:04:49Z",
					updated_at: "2016-09-08T13:17:47Z",
					company_ids: [1],
				},
			];
			const id = 3;

			// SET UP expected request

			client
				.intercept({
					path: "/api/v2/solutions/categories/3/folders",
					method: 'GET',
				})
				.reply(200, res);

			freshdesk.listAllSolutionCategoryFolders(id, (err, data) => {
				expect(err).is.null;
				expect(data).to.deep.equal(res);
				done();
			});
		});
	});

	describe("delete a solution folder", () => {
		it("should send DELETE request to /api/v2/solutions/folders/", (done) => {
			const res = null;
			const id = 3;

			// SET UP expected request

			client
				.intercept({
					path: "/api/v2/solutions/folders/3",
					method: 'DELETE',
				})
				.reply(204, res);

			freshdesk.deleteSolutionFolder(id, (err, data) => {
				expect(err).is.null;
				expect(data).to.deep.equal(res);
				done();
			});
		});
	});

	describe("create a solution article", () => {
		it("should send a POST request to /api/v2/solutions/folders/NNNN/articles", (done) => {
			const res = {
				id: 2,
				title: "sample article",
				description:
					"this is a sample article with some <b> HTML Content </b>",
				description_text:
					"this is a sample article with some  HTML Content ",
				status: 1,
				agent_id: 1,
				type: 1,
				category_id: 3,
				folder_id: 4,
				thumbs_up: 0,
				thumbs_down: 0,
				hits: 0,
				tags: [],
				seo_data: {
					meta_keywords: "sample,demo,article",
				},
				created_at: "2016-09-09T06:34:27Z",
				updated_at: "2016-09-09T06:34:27Z",
			};
			const id = 4;
			const data = {
				title: "sample article",
				description:
					"this is a sample article with some <b> HTML Content </b>",
				status: 1,
				seo_data: { meta_keywords: ["sample", "demo", "article"] },
			};

			// SET UP expected request

			client
				.intercept({
					path: "/api/v2/solutions/folders/4/articles",
					method: 'POST',
				})
				.reply(200, res);

			freshdesk.createSolutionArticle(id, data, (err, data) => {
				expect(err).is.null;
				expect(data).to.deep.equal(res);
				done();
			});
		});
	});

	describe("create a translated solution article", () => {
		it("should send a POST request to /api/v2/solutions/articles/NNNN/SSSS", (done) => {
			const res = {
				id: 2,
				title: "artículo de la muestra",
				description:
					"este es un artículo de la muestra con un poco de <b> Contenido HTML </b>",
				description_text:
					"este es un artículo de la muestra con un poco de  Contenido HTML ",
				status: 1,
				agent_id: 1,
				type: 1,
				category_id: 3,
				folder_id: 4,
				thumbs_up: 0,
				thumbs_down: 0,
				hits: 0,
				tags: [],
				seo_data: {},
				created_at: "2016-09-09T07:02:27Z",
				updated_at: "2016-09-09T07:02:27Z",
			};
			const id = 2;
			const language_code = "es";
			const data = {
				title: "artículo de la muestra",
				description:
					"este es un artículo de la muestra con un poco de <b> Contenido HTML </b>",
				status: 1,
			};

			// SET UP expected request

			client
				.intercept({
					path: "/api/v2/solutions/articles/2/es",
					method: 'POST',
				})
				.reply(200, res);

			freshdesk.createTranslatedSolutionArticle(
				id,
				language_code,
				data,
				(err, data) => {
					expect(err).is.null;
					expect(data).to.deep.equal(res);
					done();
				}
			);
		});
	});

	describe("update a solution article", () => {
		it("should send a PUT request to /api/v2/solutions/articles/NNNN", (done) => {
			const res = {
				id: 2,
				type: 1,
				category_id: 3,
				folder_id: 4,
				thumbs_up: 0,
				thumbs_down: 0,
				hits: 0,
				tags: [],
				seo_data: {},
				agent_id: 2,
				title: "sample article",
				description: "updated description",
				description_text: "updated description",
				status: 2,
				created_at: "2016-09-09T06:34:27Z",
				updated_at: "2016-09-09T07:07:56Z",
			};
			const id = 2;
			const data = {
				description: "updated description",
				agent_id: 2,
				status: 2,
			};

			// SET UP expected request

			client
				.intercept({
					path: "/api/v2/solutions/articles/2",
					method: 'PUT',
				})
				.reply(200, res);

			freshdesk.updateSolutionArticle(id, data, (err, data) => {
				expect(err).is.null;
				expect(data).to.deep.equal(res);
				done();
			});
		});
	});

	describe("update a translated solution article", () => {
		it("should send a PUT request to /api/v2/solutions/articles/NNNN/SSSS", (done) => {
			const res = {
				id: 2,
				type: 1,
				category_id: 3,
				folder_id: 4,
				thumbs_up: 0,
				thumbs_down: 0,
				hits: 0,
				tags: [],
				seo_data: {},
				agent_id: 2,
				title: "artículo de la muestra",
				description: "actualizada descripción",
				description_text: "actualizada descripción",
				status: 2,
				created_at: "2016-09-09T07:02:27Z",
				updated_at: "2016-09-09T07:14:28Z",
			};
			const id = 2;
			const language_code = "es";
			const data = { description: "actualizada descripción", status: 2 };

			// SET UP expected request

			client
				.intercept({
					path: "/api/v2/solutions/articles/2/es",
					method: 'PUT',
				})
				.reply(200, res);

			freshdesk.updateTranslatedSolutionArticle(
				id,
				language_code,
				data,
				(err, data) => {
					expect(err).is.null;
					expect(data).to.deep.equal(res);
					done();
				}
			);
		});
	});

	describe("get a solution article", () => {
		it("should send GET request to /api/v2/solutions/articles/NNNN", (done) => {
			const res = {
				id: 2,
				type: 1,
				category_id: 3,
				folder_id: 4,
				thumbs_up: 0,
				thumbs_down: 0,
				hits: 0,
				tags: [],
				seo_data: {},
				agent_id: 2,
				title: "sample article",
				description: "updated description",
				description_text: "updated description",
				status: 2,
				created_at: "2016-09-09T06:34:27Z",
				updated_at: "2016-09-09T07:07:56Z",
			};
			const id = 2;

			// SET UP expected request

			client
				.intercept({
					path: "/api/v2/solutions/articles/2",
					method: 'GET',
				})
				.reply(200, res);

			freshdesk.getSolutionArticle(id, (err, data) => {
				expect(err).is.null;
				expect(data).to.deep.equal(res);
				done();
			});
		});
	});

	describe("get a translated solution article", () => {
		it("should send GET request to /api/v2/solutions/articles/NNNN/SSSS", (done) => {
			const res = {
				id: 2,
				type: 1,
				category_id: 3,
				folder_id: 4,
				thumbs_up: 0,
				thumbs_down: 0,
				hits: 0,
				tags: [],
				seo_data: {},
				agent_id: 2,
				title: "artículo de la muestra",
				description: "actualizada descripción",
				description_text: "actualizada descripción",
				status: 2,
				created_at: "2016-09-09T07:02:27Z",
				updated_at: "2016-09-09T07:14:28Z",
			};
			const id = 2;
			const language_code = "es";

			// SET UP expected request

			client
				.intercept({
					path: "/api/v2/solutions/articles/2/es",
					method: 'GET',
				})
				.reply(200, res);

			freshdesk.getTranslatedSolutionArticle(id, language_code, (err, data) => {
				expect(err).is.null;
				expect(data).to.deep.equal(res);
				done();
			});
		});
	});

	describe("list all solution folder articles", () => {
		it("should send GET request to /api/v2/solutions/folders/NNNN/articles", (done) => {
			const res = [
				{
					id: 1,
					type: 1,
					category_id: 3,
					folder_id: 4,
					thumbs_up: 0,
					thumbs_down: 0,
					hits: 0,
					seo_data: {
						meta_keywords: "sample, demo, article",
					},
					agent_id: 1,
					title: "article",
					description:
						"this is a sample article with some <b> HTML Content </b>",
					description_text:
						"this is a sample article with some  HTML Content ",
					status: 1,
					created_at: "2016-09-09T06:07:26Z",
					updated_at: "2016-09-09T06:07:26Z",
				},
			];
			const id = 4;

			// SET UP expected request

			client
				.intercept({
					path: "/api/v2/solutions/folders/4/articles",
					method: 'GET',
				})
				.reply(200, res);

			freshdesk.listAllSolutionFolderArticles(id, (err, data) => {
				expect(err).is.null;
				expect(data).to.deep.equal(res);
				done();
			});
		});
	});

	describe("delete a solution article", () => {
		it("should send DELETE request to /api/v2/solutions/articles/NNNN", (done) => {
			const res = null;
			const id = 2;

			// SET UP expected request

			client
				.intercept({
					path: "/api/v2/solutions/articles/2",
					method: 'DELETE',
				})
				.reply(204, res);

			freshdesk.deleteSolutionArticle(id, (err, data) => {
				expect(err).is.null;
				expect(data).to.deep.equal(res);
				done();
			});
		});
	});

	describe("search solution articles", () => {
		it("should send GET request to /api/v2/search/solutions?term=SSSS", (done) => {
			const res = [
				{
					id: 2,
					type: 1,
					category_id: 3,
					folder_id: 4,
					folder_visibility: 1,
					agent_id: 1,
					path: "3-sample-article-",
					modified_at: "2016-09-09T07:07:56Z",
					modified_by: 300000001,
					language_id: 6,
					title: "sample article",
					status: 2,
					created_at: "2016-09-09T02:07:56Z",
					updated_at: "2016-09-09T07:07:56Z",
					description: "<p>sample description</p>",
					description_text: "sample description",
					category_name: "sample category",
					folder_name: "sample folder",
				},
				{
					id: 3,
					type: 1,
					category_id: 5,
					folder_id: 2,
					folder_visibility: 1,
					agent_id: 3,
					path: "5-sample-article-2",
					modified_at: "2018-05-13T14:50:15Z",
					modified_by: 35005371819,
					language_id: 6,
					title: "sample article 2",
					status: 2,
					created_at: "2018-05-13T14:50:15Z",
					updated_at: "2018-05-13T14:50:15Z",
					description: "sample description 2",
					category_name: "sample category2",
					folder_name: "sample folder",
				},
			];
			const term = "sample";

			// SET UP expected request

			client
				.intercept({
					path: "/api/v2/search/solutions?term=sample",
					method: 'GET',
				})
				.reply(200, res);

			freshdesk.searchSolutionArticles(term, (err, data) => {
				expect(err).is.null;
				expect(data).to.deep.equal(res);
				done();
			});
		});
	});
});
