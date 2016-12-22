/**
 * @module Index of API client
 * @author Arjun Komath <arjunkomath@gmail.com>
 */

var request = require('request');

var Freshdesk = function (domain, apikey) {
    this.domain = domain;
    this.apikey = apikey;
}

Freshdesk.prototype.response = function (cb) {
    return function (error, response, body) {
        // console.log(response.statusCode);
        if (!error && response.statusCode == 200) {
            try {
                var data = JSON.parse(body);
            } catch (err) {
                cb(err);
            }
            return cb(null, data);
        } else if (!error && body) {
            try {
                var data = JSON.parse(body);
            } catch (err) {
                cb(err);
            }
            return cb(data);
        } else if (!error && response.statusCode == 204) {
            return cb(null, {
                message: 'The server has successfully fulfilled the request and that there is no additional content to send in the response payload body'
            });
        } else return cb(error);
    }
}

Freshdesk.prototype.req = function (method, url, qs, data, cb) {
    authKey = new Buffer(this.apikey + ":X").toString('base64');
    var options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Basic " + authKey
        },
        url: url, // for debugging set to: "https://httpbin.org/get"
        qs: qs
    }

    if(data)
        options.body = JSON.stringify(data);
    request(options, this.response(cb))
}

/**
 * listAllTickets API method
 *
 * @see http://developers.freshdesk.com/api/#list_all_tickets
 *
 * @param  {dict}               params Dictionary with request parameters for the API method, for example : `{"company_id": "YOUR_ID"}`
 * @param  {Function}           cb     Callback function
 * @return {Array of Tickets}          The array of tickets found
 */
Freshdesk.prototype.listAllTickets = function (params, cb) {
    this.req('GET', `${this.domain}/api/v2/tickets`, params, null, cb)
}

Freshdesk.prototype.listAllTicketFields = function (cb) {
    this.req('GET', `${this.domain}/api/v2/ticket_fields`, null, null, cb)
}

Freshdesk.prototype.createTicket = function (data, cb) {
    this.req('POST', `${this.domain}/api/v2/tickets`, null, data, cb)
}

Freshdesk.prototype.getTicket = function (id, cb) {
    this.req('GET', `${this.domain}/api/v2/tickets/${id}`, null, null, cb)
}

Freshdesk.prototype.updateTicket = function (id, data, cb) {
    this.req('PUT', `${this.domain}/api/v2/tickets/${id}`, null, data, cb)
}

Freshdesk.prototype.deleteTicket = function (id, cb) {
    this.req('DELETE', `${this.domain}/api/v2/tickets/${id}`, null, null, cb)
}

Freshdesk.prototype.restoreTicket = function (id, cb) {
    this.req('PUT', `${this.domain}/api/v2/tickets/${id}/restore`, null, null, cb)
}

Freshdesk.prototype.listAllConversations = function (id, cb) {
    this.req('GET', `${this.domain}/api/v2/tickets/${id}/conversations`, null, cb)
}

Freshdesk.prototype.listAllTimeEntries = function (id, cb) {
    this.req('GET', `${this.domain}/api/v2/tickets/${id}/time_entries`, null, null, cb)
}

//Conversations

Freshdesk.prototype.createReply = function (id, data, cb) {
    this.req('POST', `${this.domain}/api/v2/tickets/${id}/reply`, null, data, cb)
}

Freshdesk.prototype.createNote = function (id, data, cb) {
    this.req('POST', `${this.domain}/api/v2/tickets/${id}/notes`, null, data, cb)
}

Freshdesk.prototype.updateConversation = function (id, data, cb) {
    this.req('PUT', `${this.domain}/api/v2/conversations/${id}`, null, data, cb)
}

Freshdesk.prototype.deleteConversation = function (id, cb) {
    this.req('DELETE', `${this.domain}/api/v2/conversations/${id}`, null, null, cb)
}

//Contacts

Freshdesk.prototype.createContact = function (data, cb) {
    this.req('POST', `${this.domain}/api/v2/contacts`, null, data, cb)
}

Freshdesk.prototype.getContact = function (id, cb) {
    this.req('GET', `${this.domain}/api/v2/contacts/${id}`, null, null, cb)
}

Freshdesk.prototype.listAllContacts = function (params, cb) {
    this.req('GET', `${this.domain}/api/v2/contacts`, params, null, cb)
}

Freshdesk.prototype.updateContact = function (id, data, cb) {
    this.req('PUT', `${this.domain}/api/v2/contacts/${id}`, null, data, cb)
}

Freshdesk.prototype.deleteContact = function (id, cb) {
    this.req('DELETE', `${this.domain}/api/v2/contacts/${id}`, null, null, cb)
}

Freshdesk.prototype.makeAgent = function (id, cb) {
    this.req('PUT', `${this.domain}/api/v2/contacts/${id}/make_agent`, null, null, cb)
}

Freshdesk.prototype.listAllContactFields = function (cb) {
    this.req('GET', `${this.domain}/api/v2/contact_fields`, null, null, cb)
}

Freshdesk.prototype.listAllCompanies = function (cb) {
    this.req('GET', `${this.domain}/api/v2/companies`, null, null, cb)
}

module.exports = Freshdesk;
