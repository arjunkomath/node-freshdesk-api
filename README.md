# Node Freshdesk APIv1 

A NodeJS library for integrating your backend with Freshdesk.

[![npm version](https://badge.fury.io/js/freshdesk.svg)](https://badge.fury.io/js/freshdesk)

## Install

Note, that this package contains two API clients: **v1** and **v2**

To use version v1 of the package use:

```
npm install freshdesk-api@APIv1
```

## Usage

You'll need your API Key and the base url of your support portal handy for configuring the SDK. To get your API key, refer the [Freshdesk Docs](http://freshdesk.com/api#authentication).

```javascript
var Freshdesk = require('freshdesk-api')
var freshdesk = new Freshdesk('http://domain.freshdesk.com', 'MyR4nD0MAp1KeY');

Freshdesk.listTickets(function(err, res, body) {
  console.log("The tickets are: ", body);
});
```

## Supported Functions

Most of the functions pertaining **Tickets** and **Users** are implemented. For unimplemented routes, you can use the raw routes, such as `Freshdesk.get()` to make the requests directly.

Here are the currently supported functions. For a detailed explanation of the arguments you have to pass to each functions, refer to the [official docs](http://freshdesk.com/api).

* **createTicket** (data <object>, cb <function>)
  method: post
  url: `/helpdesk/tickets.json`,

* **listTickets** (cb <function>)
  method: get
  url: `/helpdesk/tickets.json`

* **allTickets** (cb <function>)
  method: get
  url: `/helpdesk/tickets/filter/all_tickets?format=json`

* **getTicket** (id <number>, cb <function>)
  method: get
  url: `/helpdesk/tickets/#{id}.json`

* **updateTicket** (id <number>, cb <function>)
  method: put
  url: `/helpdesk/tickets/#{id}.json`, data

* **pickTicket** (id <number>, cb <function>)
  method: put
  url: `/helpdesk/tickets/#{id}/pick_tickets.json`, {}

* **deleteTicket** (id <number>, cb <function>)
  method: delete
  url: `/helpdesk/tickets/#{id}.json`

* **restoreTicket** (id <number>, cb <function>)
  method: put
  url: `/helpdesk/tickets/#{id}/restore.json`

* **assignTicket** (id <number>, user_id <freshdesk_user_id>, cb <function>)
  method: put
  url: `/helpdesk/tickets/#{id}/assign.json?responder_id=#{user_id}`

* **ticketFields** (cb <function>)
  method: get
  url: `/ticket_fields.json`

* **addNoteToTicket** (id <number>, note <object>, cb <function>)
  method: post
  url: `/helpdesk/tickets/#{id}/conversations/note.json`

* **createUser** (cb <function>)
  method: post
  url: `/contacts.json`, contact

* **listUsers** (cb <function>)
  method: get
  url: `/contacts.json`state=all'

* **updateUser** (id <number>, cb <function>)
  method: put
  url: `/contacts/#{id}.json`, data

* **getUserByEmail** (email_id <string>, cb <function>)
  method: GET
  url: `/contacts.json?state=all&query=#{query}`

# Examples

### Get a Particular Ticket
```
Freshdesk.pickTicket(100, function(err, res) {
  console.log("My Ticket is", res.body);
});
```

### Create a New Ticket
```
var ticket = {
  'helpdesk_ticket': {
    'description': "Hello, I'm an ephemeral ticket created from the API. I will be deleted as soon as my creator wishes so...",
    'subject': "Efemeros",
    'email': 'efemeros@mailinator.com',
    'priority': '1',
    'status': '2',
    'custom_field': {
      // remove these comments, as they're not valid json
      // any custom fields you'd have configured in your app...
      // like:
      // 'location_XXXXX': 'Tristan da Cunha'
      // where XXXXX is a (possibly random) ID appended to your custom field
      // This would most probably be different for each portal.
    }
  }
};
Freshdesk.createTicket(100, function(err, res) {
  console.log("My Ticket is", res.body);
});
```

## Contributors

* Angad Nadkarni (@angadn) - Support for HTML tickets (kumarharsh/node-freshdesk#3)
* Scott Hasbrouck (@scotthasbrouck) - kumarharsh/node-freshdesk#1
* Martin Edwards (@mledwards) - kumarharsh/node-freshdesk#2

## Authors and Maintainers

Built and maintained by:

- Kumar Harsh [@kumarharsh] (**author of this version**)
- Arjun Komath [arjunkomath][email:arjunkomath]
- Maksim Koryukov [@maxkoryukov]

## Contributing

If you feel the need to add more functions, just fork this repo, add your functions and submit a PR. Wanna improve docs or the source, or even add tests? You're more than welcome :)
This is just a side project I created because I needed it, and the existing `node-freshdesk` [lacked some functions](https://github.com/capraconsulting/node-freshdesk/issues/2) which my project needed.

## License

See the [LICENSE](LICENSE) file for license rights and limitations (MIT).

[@maxkoryukov]: https://www.npmjs.com/~maxkoryukov
[@kumarharsh]: https://github.com/kumarharsh
[email:arjunkomath]: mailto:arjunkomath@gmail.com