# node-freshdesk-api
Node wrapper for [Freshdesk v2 API](http://developer.freshdesk.com/api/#introduction)

## Install
```
npm i node-freshdesk-api
```

## Usage
```
var fd = require('node-freshdesk-api');
var freshdesk = new fd('https://domain.freshdesk.com', 'yourApiKey');
```

## Functions and Responses
- **createTicket(ticket, callback)** - Create a new ticket, list of [parameters](http://developer.freshdesk.com/api/#create_ticket)
- **getTicket(id, callback)** - Get a ticket by its id
- **updateTicket(id, ticket, callback)** - Update a ticket by its id, list of [parameters](http://developer.freshdesk.com/api/#update_ticket)
- **deleteTicket(id, callback)** - Delete a ticket by its id
- **restoreTicket(id, callback)** - Restore a ticket by its id
- **listAllTickets(filter, callback)** - List All Tickets, check list of [filters](http://developer.freshdesk.com/api/#list_all_tickets)
- **listAllTicketFields(callback)** - List All Ticket Fields
- **listAllConversations(id, callback)** - List All Conversations of a Ticket by its id
- **listAllTimeEntries(id, callback)** - List All Time Entries of a Ticket by its id

## Examples

### Create a new ticket
```
freshdesk.createTicket({
    name: 'test ticket',
    email: 'test@test.com',
    subject: 'test sub',
    description: 'test description',
    status: 2,
    priority: 1
}, function (err, data) {
    console.log(err || data);
})
```

### Update a ticket
```
freshdesk.updateTicket(21, {
    description: 'updated description',
    status: 2,
    priority: 1
}, function (err, data) {
    console.log(err || data);
})
```

### Get a ticket
```
freshdesk.getTicket(21, function (err, data) {
    console.log(err || data);
})
```

### Delete a ticket
```
freshdesk.deleteTicket(21, function (err, data) {
    console.log(err || data);
})
```

## Contribute
Feature Request, Bugs and Ideas can be added [here.](https://github.com/arjunkomath/node-freshdesk-api/issues)

## About Author
Built with <3 by Arjun Komath, [arjunkomath@gmail.com](mailto:arjunkomath@gmail.com)
 
## License
- See the [LICENSE](https://github.com/arjunkomath/node-freshdesk-api/blob/master/LICENSE) file for license rights and limitations (MIT).
