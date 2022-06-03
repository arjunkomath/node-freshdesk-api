# Node wrapper for [Freshdesk v2 API](http://developer.freshdesk.com/api/#introduction)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Build Status](https://travis-ci.org/arjunkomath/node-freshdesk-api.svg?branch=master)](https://travis-ci.org/arjunkomath/node-freshdesk-api)
[![codecov](https://codecov.io/gh/arjunkomath/node-freshdesk-api/branch/master/graph/badge.svg)](https://codecov.io/gh/arjunkomath/node-freshdesk-api)

## Thanks 💙

<!--SPONSOR-->

[![DigitalOcean Referral Badge](https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg)](https://www.digitalocean.com/?refcode=aed42342d15d&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge)
<img height="60" src="https://resources.jetbrains.com/storage/products/company/brand/logos/WebStorm_icon.png"/>

## Install

```
npm install --save freshdesk-api
```

Also, you could use **version 1 of API**, provided by Kumar Harsh [@kumarharsh], but this version is obsolete, and marked as _deprecated_:

```shell
npm install freshdesk-api@APIv1
```

## Usage

```javascript
var Freshdesk = require("freshdesk-api");
var freshdesk = new Freshdesk("https://yourdomain.freshdesk.com", "yourApiKey");
```

Or, with promises:

```javascript
var Freshdesk = require("freshdesk-api");
var Promise = require("bluebird");
var asyncFreshdesk = Promise.promisifyAll(
	new Freshdesk("https://yourdomain.freshdesk.com", "yourApiKey")
);

// see usage examples
```

`bluebird` is not a dependency of this package, install it separately: `npm install bluebird`

## Examples

### Create a new ticket

```javascript
freshdesk.createTicket(
	{
		name: "test ticket",
		email: "test@test.com",
		subject: "test sub",
		description: "test description",
		status: 2,
		priority: 1,
	},
	function (err, data) {
		console.log(err || data);
	}
);
```

### Update a ticket

```javascript
freshdesk.updateTicket(
	21,
	{
		description: "updated description",
		status: 2,
		priority: 1,
	},
	function (err, data, extra) {
		console.log(err || data);
	}
);
```

### Get a ticket

```javascript
freshdesk.getTicket(21, function (err, data, extra) {
	console.log(err || data);
});
```

### Delete a ticket

```javascript
freshdesk.deleteTicket(21, function (err, data, extra) {
	console.log(err || data);
});
```

### Ticket attachments

```javascript
freshdesk.createTicket(
	{
		description: "test description",
		attachments: [
			fs.createReadStream("/path/to/file1.ext"),
			fs.createReadStream("/path/to/file2.ext"),
		],
	},
	function (err, data) {
		console.log(err || data);
	}
);
```

### Get a ticket PROMISIfied

_\* for promisified version only_

```javascript
asyncFreshdesk.getTicketAsync(21)
    .then((data, extra) => {
        console.log(data, extra)
    })

    .catch(Freshdesk.FreshdeskError, err => {
        // typed `catch` exists only in bluebird

        console.log('ERROR OCCURED', err)
    })
})

```

## Use with Webpack

Here is a part of `webpack.config`:

```js
webpackConfig.node = {
	// ...

	console: true,
	fs: "empty",
	net: "empty",
	tls: "empty",

	// ...
};
```

A little bit more [about webpack here](https://github.com/arjunkomath/node-freshdesk-api/issues/43)

## Callback

Every SDK method receives a `callback` parameter. It is a function, which will be called on Freshdesk response received.

Callback called with following arguments:

-   `err` - `Error` instance (if occured) or `null`
-   `data` - `object`. Freshdesk response, an object, parsed from JSON
-   `extra` - additional data, gathered from response. For example, information about paging

### extra parameter

`extra` is an object with following fields:

-   `pageIsLast` - indicates, that the response is generated from the last page, and there is no sense to play with `page` and `per_page` parameters. This parameter is useful for `listXXX` methods, called with pagination
-   `requestId` - value of `x-request-id` header from API response

## Extended/debugging output

To enable debug info, run your program with environment flags

-   on linux
    ```bash
    $ DEBUG=freshdesk-api nodejs NAME-OF-YOUR-SCRIPT.js
    ```

## Functions and Responses

### Tickets

-   **createTicket(ticket, callback)** - Create a new ticket, list of [parameters](http://developer.freshdesk.com/api/#create_ticket)
-   **getTicket(id, callback)** - Get a ticket by its id
-   **updateTicket(id, ticket, callback)** - Update a ticket by its id, list of [parameters](http://developer.freshdesk.com/api/#update_ticket)
-   **deleteTicket(id, callback)** - Delete a ticket by its id
-   **restoreTicket(id, callback)** - Restore a ticket by its id
-   **listAllTickets(filter, callback)** - List All Tickets, check list of [filters](http://developer.freshdesk.com/api/#list_all_tickets)
-   **filterTickets(query, page, callback)** - Filter tickets, based on ticket fields, [read more](https://developer.freshdesk.com/api/#filter_tickets)
-   **listAllTicketFields(callback)** - List All Ticket Fields
-   **listAllConversations(id, callback)** - List All Conversations of a Ticket by its id
-   **listAllTicketTimeEntries(id, callback)** - List All Time Entries of a Ticket by its id
-   **listAllSatisfactionRatings** - **NOT IMPLEMENTED** http://developers.freshdesk.com/api/#view_ticket_satisfaction_ratings

### Conversations

-   **createReply(id, reply, callback)** - Create a Reply for a ticket by its id, list of [parameters](http://developer.freshdesk.com/api/#reply_ticket)
-   **createNote(id, note, callback)** - Create a Note for a ticket by its id, list of [parameters](http://developer.freshdesk.com/api/#add_note_to_a_ticket)
-   **updateConversation(id, conversation, callback)** - Update a conversation by its id, list of [parameters](http://developer.freshdesk.com/api/#update_conversation)
-   **deleteConversation(id, callback)** - Delete a conversation by its id

### Contacts

-   **createContact(contact, callback)** - Create a new contact, list of [parameters](http://developer.freshdesk.com/api/#create_contact)
-   **getContact(id, callback)** - Get a contact by its id
-   **updateContact(id, contact, callback)** - Update a contact by its id, list of [parameters](http://developer.freshdesk.com/api/#update_contact)
-   **deleteContact(id, callback)** - Delete a contact by its id
-   **listAllContacts(filter, callback)** - List All Contact, check list of [filters](http://developer.freshdesk.com/api/#list_all_contacts)
-   **listAllContactFields(callback)** - List All Contact Fields
-   **makeAgent(id, callback)** - Make a contact an Agent, [read more](http://developer.freshdesk.com/api/#make_agent)
-   **filterContacts(query, callback)** - Filter contacts (beta), based on contact fields, [read more](http://developers.freshdesk.com/api/#filter_contacts)

### Agents

-   **getAgent(id, callback)** - Get agent by ID [read more](https://developer.freshdesk.com/api/#view_agent)
-   **listAllAgents(params, callback)** - List all agents [read more](https://developer.freshdesk.com/api/#list_all_agents)
-   **updateAgent(id, data, callback)** - Update an agent by ID [read more](https://developer.freshdesk.com/api/#update_agent)
-   **deleteAgent(id, callback)** - Delete an agent by ID [read more](https://developer.freshdesk.com/api/#delete_agent)
-   **currentAgent(callback)** - Currently Authenticated Agent[read more](https://developer.freshdesk.com/api/#me)

### Roles

-   **getRole(id, callback)** - View a Role
-   **listAllRoles(callback)** - List All Roles

### Groups

Not implemented: http://developers.freshdesk.com/api/#groups

### Companies

-   **createCompany(data, callback)** - Create a new company record using [parameters](http://developers.freshdesk.com/api/#create_company)
-   **getCompany(id, callback)** - Get company by ID; [read more](http://developers.freshdesk.com/api/#view_company)
-   **searchCompany(params, callback)** - Get company by name; [read more](https://developers.freshdesk.com/api/#search_companies)
-   **listAllCompanies(params, callback)** - List all companies; [parameters](http://developers.freshdesk.com/api/#list_all_companies)
-   **updateCompany(id, data, callback)** - Update a company by ID; [parameters](http://developers.freshdesk.com/api/#update_company)
-   **deleteCompany(id, callback)** - Delete a company by ID, [read more](http://developers.freshdesk.com/api/#delete_company)
-   **filterCompanies(query, callback)** - Filter companies (beta), based on company fields, [read more](http://developers.freshdesk.com/api/#filter_companies)
-   **listAllCompanyFields(callback)** - List All Company Fields

### Discussions

Not implemented: http://developers.freshdesk.com/api/#discussions

### Solutions

-   **createSolutionCategory(data, cb)** - Create a Solution Category [parameters](https://developer.freshdesk.com/api/#create_solution_category)
-   **createTranslatedSolutionCategory(id, language_code, data, cb)** - Create a translated solution category [parameters](https://developer.freshdesk.com/api/#create_solution_category)
-   **updateSolutionCategory(id, data, cb)** - Update a Solution Category [parameters](https://developer.freshdesk.com/api/#update_solution_category)
-   **updateTranslatedSolutionCategory(id, language_code, data, cb)** - Update a translated solution category [parameters](https://developer.freshdesk.com/api/#update_solution_category)
-   **getSolutionCategory(id, cb)** - View a Solution Category [parameters](https://developer.freshdesk.com/api/#view_solution_category)
-   **listAllSolutionCategories(cb)** - List all Solution Categories [parameters](https://developer.freshdesk.com/api/#list_all_solution_categories)
-   **deleteSolutionCategory(id, cb)** - Delete a Solution Category [parameters](https://developer.freshdesk.com/api/#delete_solution_category)
-   **createSolutionFolder(id, data, cb)** - Create a Solution Folder [parameters](https://developer.freshdesk.com/api/#create_solution_folder)
-   **createTranslatedSolutionFolder(id, language_code, data, cb)** - Create a translated solution folder [parameters](https://developer.freshdesk.com/api/#create_solution_folder)
-   **updateSolutionFolder(id, data, cb)** - Update a Solution Folder [parameters](https://developer.freshdesk.com/api/#update_solution_folder)
-   **updateTranslatedSolutionFolder(id, language_code, data, cb)** - Update a translated solution folder [parameters](https://developer.freshdesk.com/api/#update_solution_folder)
-   **getSolutionFolder(id, cb)** - View a Solution Folder [parameters](https://developer.freshdesk.com/api/#view_solution_folder)
-   **listAllSolutionCategoryFolders(id, cb)** - List all Solution Folders in a Category [parameters](https://developer.freshdesk.com/api/#list_all_solution_folders)
-   **deleteSolutionFolder(id, cb)** - Delete a Solution Folder [parameters](https://developer.freshdesk.com/api/#delete_solution_folder)
-   **createSolutionArticle(id, data, cb)** - Create a Solution Article [parameters](https://developer.freshdesk.com/api/#create_solution_article)
-   **createTranslatedSolutionArticle(id, language_code, data, cb)** - Create a translated solution article [parameters](https://developer.freshdesk.com/api/#create_solution_article)
-   **updateSolutionArticle(id, data, cb)** - Update a Solution Article [parameters](https://developer.freshdesk.com/api/#update_solution_article)
-   **updateTranslatedSolutionArticle(id, language_code, data, cb)** - Update a translated solution article [parameters](https://developer.freshdesk.com/api/#update_solution_article)
-   **getSolutionArticle(id, cb)** - View a Solution Article [parameters](https://developer.freshdesk.com/api/#view_solution_article)
-   **listAllSolutionFolderArticles(id, cb)** - List all Solution Articles in a Folder [parameters](https://developer.freshdesk.com/api/#list_all_solution_articles)
-   **deleteSolutionArticle(id, cb)** - Delete a Solution Article [parameters](https://developer.freshdesk.com/api/#delete_solution_article)
-   **searchSolutionArticles(term, cb)** - Search solution articles [parameters](https://developer.freshdesk.com/api/#search_solution_article)

### Surveys

Not implemented: http://developers.freshdesk.com/api/#surveys

### Satisfaction Ratings

Not implemented: http://developers.freshdesk.com/api/#satisfaction-ratings

### Time Entries

-   **createTimeEntry(ticketID, data, callback)** - Create new ticket [read more](https://developer.freshdesk.com/api/#create_time_entry)
-   **listAllTimeEntries(params, callback)** - Lists all time entries, if no params pass 'null' [read more](https://developer.freshdesk.com/api/#list_all_time_entries)
-   **updateTimeEntry(entryID, data, callback)** - Update a time entry by ID [read more](https://developer.freshdesk.com/api/#update_time_entry)
-   **toggleTimer(entryID, callback)** - Toggle timer on time entry by ID [read more](https://developer.freshdesk.com/api/#toggle_time_entry)
-   **deleteTimeEntry(id, callback)** - Deletes a time entry by ID [read more](https://developer.freshdesk.com/api/#delete_time_entry)

### Email Configs

Not implemented: http://developers.freshdesk.com/api/#email-configs

### Products

Not implemented: http://developers.freshdesk.com/api/#products

### Business Hours

Not implemented: http://developers.freshdesk.com/api/#business-hours

### SLA Policies

SLA = service level agreement

Not implemented: http://developers.freshdesk.com/api/#sla-policies

### Settings

-   **getSettings(callback)** - View Helpdesk Settings [read more](http://developers.freshdesk.com/api/#settings)

## License

See the [LICENSE](https://github.com/arjunkomath/node-freshdesk-api/blob/master/LICENSE) file for license rights and limitations (MIT).

[email:arjunkomath]: mailto:arjunkomath@gmail.com
[@maxkoryukov]: https://www.npmjs.com/~maxkoryukov
[@kumarharsh]: https://github.com/kumarharsh
[@davinthesmith]: https://github.com/davinthesmith
[@velua]: http://jjs.life
[@roniger]: https://github.com/roniger

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://techulus.com/"><img src="https://avatars.githubusercontent.com/u/2555067?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Arjun Komath</b></sub></a><br /><a href="https://github.com/arjunkomath/node-freshdesk-api/commits?author=arjunkomath" title="Code">💻</a> <a href="https://github.com/arjunkomath/node-freshdesk-api/commits?author=arjunkomath" title="Documentation">📖</a> <a href="https://github.com/arjunkomath/node-freshdesk-api/commits?author=arjunkomath" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/maxkoryukov"><img src="https://avatars.githubusercontent.com/u/8887971?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Maksim Koryukov</b></sub></a><br /><a href="https://github.com/arjunkomath/node-freshdesk-api/commits?author=maxkoryukov" title="Code">💻</a> <a href="https://github.com/arjunkomath/node-freshdesk-api/commits?author=maxkoryukov" title="Documentation">📖</a> <a href="https://github.com/arjunkomath/node-freshdesk-api/commits?author=maxkoryukov" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://strapi.guru/"><img src="https://avatars.githubusercontent.com/u/8593673?v=4?s=100" width="100px;" alt=""/><br /><sub><b>DMehaffy</b></sub></a><br /><a href="https://github.com/arjunkomath/node-freshdesk-api/commits?author=derrickmehaffy" title="Code">💻</a> <a href="https://github.com/arjunkomath/node-freshdesk-api/commits?author=derrickmehaffy" title="Documentation">📖</a> <a href="https://github.com/arjunkomath/node-freshdesk-api/commits?author=derrickmehaffy" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/Velua"><img src="https://avatars.githubusercontent.com/u/8017434?v=4?s=100" width="100px;" alt=""/><br /><sub><b>John Williamson</b></sub></a><br /><a href="https://github.com/arjunkomath/node-freshdesk-api/commits?author=Velua" title="Code">💻</a> <a href="https://github.com/arjunkomath/node-freshdesk-api/commits?author=Velua" title="Documentation">📖</a></td>
    <td align="center"><a href="https://woutertje.com/"><img src="https://avatars.githubusercontent.com/u/5398059?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Wouter van der Neut</b></sub></a><br /><a href="https://github.com/arjunkomath/node-freshdesk-api/commits?author=wvdneut" title="Code">💻</a> <a href="https://github.com/arjunkomath/node-freshdesk-api/commits?author=wvdneut" title="Documentation">📖</a> <a href="https://github.com/arjunkomath/node-freshdesk-api/commits?author=wvdneut" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://julianduque.co/"><img src="https://avatars.githubusercontent.com/u/733877?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Julián Duque</b></sub></a><br /><a href="https://github.com/arjunkomath/node-freshdesk-api/commits?author=julianduque" title="Code">💻</a></td>
    <td align="center"><a href="http://alphageek.com.au/"><img src="https://avatars.githubusercontent.com/u/2154482?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Michael Lambert</b></sub></a><br /><a href="https://github.com/arjunkomath/node-freshdesk-api/commits?author=nibynool" title="Code">💻</a> <a href="https://github.com/arjunkomath/node-freshdesk-api/commits?author=nibynool" title="Documentation">📖</a> <a href="https://github.com/arjunkomath/node-freshdesk-api/commits?author=nibynool" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!