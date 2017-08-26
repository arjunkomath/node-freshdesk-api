# Node Freshdesk SDK

[![Build Status](https://travis-ci.org/arjunkomath/node-freshdesk-api.svg?branch=master)](https://travis-ci.org/arjunkomath/node-freshdesk-api)
[![codecov](https://codecov.io/gh/arjunkomath/node-freshdesk-api/branch/master/graph/badge.svg)](https://codecov.io/gh/arjunkomath/node-freshdesk-api)

Node wrapper for [Freshdesk v2 API](http://developer.freshdesk.com/api/#introduction)

[![NPM](https://nodei.co/npm/freshdesk-api.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/freshdesk-api/)

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
var Freshdesk = require('freshdesk-api')
var freshdesk = new Freshdesk('https://yourdomain.freshdesk.com', 'yourApiKey')
```

Or, with promises:

```javascript
var Freshdesk = require('freshdesk-api')
var Promise   = require('bluebird')
var asyncFreshdesk = Promise.promisifyAll(
    new Freshdesk('https://yourdomain.freshdesk.com', 'yourApiKey')
)

// see usage examples
```

`bluebird` is not a dependency of this package, install it separately: `npm install bluebird`

## Examples

### Create a new ticket

```javascript
freshdesk.createTicket({
    name: 'test ticket',
    email: 'test@test.com',
    subject: 'test sub',
    description: 'test description',
    status: 2,
    priority: 1
}, function (err, data) {
    console.log(err || data)
})
```

### Update a ticket

```javascript
freshdesk.updateTicket(21, {
    description: 'updated description',
    status: 2,
    priority: 1
}, function (err, data, extra) {
    console.log(err || data)
})
```

### Get a ticket

```javascript
freshdesk.getTicket(21, function (err, data, extra) {
    console.log(err || data)
})
```

### Delete a ticket

```javascript
freshdesk.deleteTicket(21, function (err, data, extra) {
    console.log(err || data)
})
```

### Get a ticket PROMISIfied

_* for promisified version only_

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

## Callback

Every SDK method receives a `callback` parameter. It is a function, which will be called on Freshdesk response received.

Callback called with following arguments:
* `err` - `Error` instance (if occured) or `null`
* `data` - `object`. Freshdesk response, an object, parsed from JSON
* `extra` - additional data, gathered from response. For example, information about paging

### extra parameter

`extra` is an object with following fields:

* `pageIsLast` - indicates, that the response is generated from the last page, and there is no sense to play with `page` and `per_page` parameters. This parameter is useful for `listXXX` methods, called with pagination

## Extended/debugging output

To enable debug info, run your program with environment flags

* on linux
  ```bash
  $ DEBUG=freshdesk-api nodejs NAME-OF-YOUR-SCRIPT.js
  ```

## Functions and Responses

### Tickets

- **createTicket(ticket, callback)** - Create a new ticket, list of [parameters](http://developer.freshdesk.com/api/#create_ticket)
- **getTicket(id, callback)** - Get a ticket by its id
- **updateTicket(id, ticket, callback)** - Update a ticket by its id, list of [parameters](http://developer.freshdesk.com/api/#update_ticket)
- **deleteTicket(id, callback)** - Delete a ticket by its id
- **restoreTicket(id, callback)** - Restore a ticket by its id
- **listAllTickets(filter, callback)** - List All Tickets, check list of [filters](http://developer.freshdesk.com/api/#list_all_tickets)
- **listAllTicketFields(callback)** - List All Ticket Fields
- **listAllConversations(id, callback)** - List All Conversations of a Ticket by its id
- **listAllTimeEntries(id, callback)** - List All Time Entries of a Ticket by its id
- **listAllSatisfactionRatings** - **NOT IMPLEMENTED** http://developers.freshdesk.com/api/#view_ticket_satisfaction_ratings

### Conversations

- **createReply(id, reply, callback)** - Create a Reply for a ticket by its id, list of [parameters](http://developer.freshdesk.com/api/#reply_ticket)
- **createNote(id, note, callback)** - Create a Note for a ticket by its id, list of [parameters](http://developer.freshdesk.com/api/#add_note_to_a_ticket)
- **updateConversation(id, conversation, callback)** - Update a conversation by its id, list of [parameters](http://developer.freshdesk.com/api/#update_conversation)
- **deleteConversation(id, callback)** - Delete a conversation by its id

### Contacts

- **createContact(contact, callback)** - Create a new contact, list of [parameters](http://developer.freshdesk.com/api/#create_contact)
- **getContact(id, callback)** - Get a contact by its id
- **updateContact(id, contact, callback)** - Update a contact by its id, list of [parameters](http://developer.freshdesk.com/api/#update_contact)
- **deleteContact(id, callback)** - Delete a contact by its id
- **listAllContacts(filter, callback)** - List All Contact, check list of [filters](http://developer.freshdesk.com/api/#list_all_contacts)
- **listAllContactFields(callback)** - List All Contact Fields
- **makeAgent(id, callback)** - Make a contact an Agent, [read more](http://developer.freshdesk.com/api/#make_agent)

### Agents

Not implemented: http://developers.freshdesk.com/api/#agents

### Roles

- **getRole(id, callback)** - View a Role
- **listAllRoles(callback)** - List All Roles

### Groups

Not implemented: http://developers.freshdesk.com/api/#groups

### Companies

- **createCompany(data, callback)** - Create a new company record using [parameters](http://developers.freshdesk.com/api/#create_company)
- **getCompany(id, callback)** - Get company by ID; [read more](http://developers.freshdesk.com/api/#view_company)
- **listAllCompanies(callback)** - List all companies; [parameters](http://developers.freshdesk.com/api/#list_all_companies)
- **updateCompany(id, data, callback)** - Update a company by ID; [parameters](http://developers.freshdesk.com/api/#update_company)
- **deleteCompany(id, callback)** - Delelete a company by ID, [read more](http://developers.freshdesk.com/api/#delete_company)

### Discussions

Not implemented: http://developers.freshdesk.com/api/#discussions

### Solutions

Not implemented: http://developers.freshdesk.com/api/#solutions

### Surveys

Not implemented: http://developers.freshdesk.com/api/#surveys

### Satisfaction Ratings

Not implemented: http://developers.freshdesk.com/api/#satisfaction-ratings

### Time Entries

**createTimeEntry(ticketID, data, callback)** - Create new ticket [read more](https://developer.freshdesk.com/api/#create_time_entry)
**listAllTimeEntries(params, callback)** - Lists all time entries [read more](https://developer.freshdesk.com/api/#list_all_time_entries)
**updateTimeEntry(entryID, data, callback)** - Update a time entry by ID [read more](https://developer.freshdesk.com/api/#update_time_entry)
**toggleTimer(entryID, callback)** - Toggle timer on time entry by ID [read more](https://developer.freshdesk.com/api/#toggle_time_entry)
**deleteTimeEntry(id, callback)** - Deletes a time entry by ID [read more](https://developer.freshdesk.com/api/#delete_time_entry)

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

Not implemented: http://developers.freshdesk.com/api/#settings

## Contributors

- Arjun Komath [arjunkomath][email:arjunkomath]
- Kumar Harsh [@kumarharsh]
- Maksim Koryukov [@maxkoryukov]
- John Williamson [@velua]

Feature Request, Bugs and Ideas can be added [here.](https://github.com/arjunkomath/node-freshdesk-api/issues)

## About Author

Built with <3 by Arjun Komath (and contributors), [arjunkomath@gmail.com][email:arjunkomath]

## License

See the [LICENSE](https://github.com/arjunkomath/node-freshdesk-api/blob/master/LICENSE) file for license rights and limitations (MIT).

[@maxkoryukov]: https://www.npmjs.com/~maxkoryukov
[@kumarharsh]: https://github.com/kumarharsh
[email:arjunkomath]: mailto:arjunkomath@gmail.com
[@velua]: http://jjs.life
