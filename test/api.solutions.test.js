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

'use strict'

const nock = require('nock')

const Freshdesk = require('..')

describe('api.solutions', function(){

	const freshdesk = new Freshdesk('https://test.freshdesk.com', 'TESTKEY')

	describe('list all solution categories', () => {

		it('should send GET request to /api/v2/solutions/categories', (done) => {

			const res = [
				{
					"id": 1,
					"name": "Default Category",
					"description": null,
					"created_at": "2016-09-08T05:50:39Z",
					"updated_at": "2016-09-08T05:50:39Z"
				}
			];


			// SET UP expected request

			nock('https://test.freshdesk.com')
				.get(`/api/v2/solutions/categories`)
				.reply(200, res)

			freshdesk.listAllSolutionCategories((err, data) => {
				expect(err).is.null
				expect(data).to.deep.equal(res)
				done()
			})

		})

	})

	describe('list all solution category folders', () => {

		it('should send GET request to /api/v2/solutions/categories/NNNN/folders', (done) => {

			const res = [
				{
					"id": 4,
					"name": "sample folder",
					"description": "This is created for demo purpose",
					"visibility": 4,
					"created_at": "2016-09-08T12:04:49Z",
					"updated_at": "2016-09-08T13:17:47Z",
					"company_ids": [1]
				}
			]


			// SET UP expected request

			nock('https://test.freshdesk.com')
				.get(`/api/v2/solutions/categories/3/folders`)
				.reply(200, res)

			freshdesk.listAllSolutionCategoryFolders(3, (err, data) => {
				expect(err).is.null
				expect(data).to.deep.equal(res)
				done()
			})

		})

	})

	describe('list all solution folder articles', () => {

		it('should send GET request to /api/v2/solutions/folders/NNNN/articles', (done) => {

			const res = [
				{
					"id": 1,
					"type": 1,
					"category_id": 3,
					"folder_id": 4,
					"thumbs_up": 0,
					"thumbs_down": 0,
					"hits": 0,
					"seo_data": {
						"meta_keywords": "sample, demo, article"
					},
					"agent_id": 1,
					"title": "article",
					"description": "this is a sample article with some <b> HTML Content </b>",
					"description_text": "this is a sample article with some  HTML Content ",
					"status": 1,
					"created_at": "2016-09-09T06:07:26Z",
					"updated_at": "2016-09-09T06:07:26Z"
				}
			]


			// SET UP expected request

			nock('https://test.freshdesk.com')
				.get(`/api/v2/solutions/folders/4/articles`)
				.reply(200, res)

			freshdesk.listAllSolutionFolderArticles(4, (err, data) => {
				expect(err).is.null
				expect(data).to.deep.equal(res)
				done()
			})

		})

	})

	describe('get a solution category', () => {

		it('should send GET request to /api/v2/solutions/categories/NNNN', (done) => {

			const res = {
				"id": 3,
				"name": "sample category",
				"description": "This is a sample category.",
				"created_at": "2016-09-06T10:00:13Z",
				"updated_at": "2016-09-06T10:00:13Z"
			}


			// SET UP expected request

			nock('https://test.freshdesk.com')
				.get(`/api/v2/solutions/categories/3`)
				.reply(200, res)

			freshdesk.getSolutionCategory(3, (err, data) => {
				expect(err).is.null
				expect(data).to.deep.equal(res)
				done()
			})

		})

	})

	describe('get a solution folder', () => {

		it('should send GET request to /api/v2/solutions/folders/NNNN', (done) => {

			const res = {
				"id": 4,
				"name": "sample folder",
				"description": "This is a sample folder",
				"visibility": 1,
				"category_id": 3,
				"created_at": "2016-09-08T12:04:49Z",
				"updated_at": "2016-09-08T12:04:49Z"
			}

			// SET UP expected request

			nock('https://test.freshdesk.com')
				.get(`/api/v2/solutions/folders/4`)
				.reply(200, res)

			freshdesk.getSolutionFolder(4, (err, data) => {
				expect(err).is.null
				expect(data).to.deep.equal(res)
				done()
			})

		})

	})

	describe('get a solution article', () => {

		it('should send GET request to /api/v2/solutions/articles/NNNN', (done) => {

			const res = {
				"id": 2,
				"type": 1,
				"category_id": 3,
				"folder_id": 4,
				"thumbs_up": 0,
				"thumbs_down": 0,
				"hits": 0,
				"tags": [],
				"seo_data": {},
				"agent_id": 2,
				"title": "sample article",
				"description": "updated description",
				"description_text": "updated description",
				"status": 2,
				"created_at": "2016-09-09T06:34:27Z",
				"updated_at": "2016-09-09T07:07:56Z"
			}

			// SET UP expected request

			nock('https://test.freshdesk.com')
				.get(`/api/v2/solutions/articles/2`)
				.reply(200, res)

			freshdesk.getSolutionArticle(2, (err, data) => {
				expect(err).is.null
				expect(data).to.deep.equal(res)
				done()
			})

		})

	})

})
