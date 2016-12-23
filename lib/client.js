/**
 * @module Index of API client
 * @author Arjun Komath <arjunkomath@gmail.com>
 */

"use strict";

const request = require('request');


const handleResponse = function (cb) {
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

const makeRequest = function (method, auth, url, qs, data, cb) {
    var options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth
        },
        url: url, // for debugging set to: "https://httpbin.org/get"
        qs: qs
    }

    if(data) {
        options.body = JSON.stringify(data);
    }

    request(options, handleResponse(cb))
}

const Freshdesk = function (baseUrl, apiKey) {
    this.baseUrl = baseUrl;

    this._auth = 'Basic ' + new Buffer(apiKey + ":X").toString('base64');
}

Freshdesk.prototype = Object.create({
    /**
     * listAllTickets API method
     *
     * @see http://developers.freshdesk.com/api/#list_all_tickets
     *
     * @param  {dict}               params Dictionary with request parameters for the API method, for example : `{"company_id": "YOUR_ID"}`
     * @param  {Function}           cb     Callback function
     * @return {Array of Tickets}          The array of tickets found
     */
    listAllTickets (params, cb) {
        makeRequest('GET', this._auth, `${this.baseUrl}/api/v2/tickets`, params, null, cb)
    },

    listAllTicketFields(cb) {
        makeRequest('GET', this._auth, `${this.baseUrl}/api/v2/ticket_fields`, null, null, cb)
    },

    createTicket(data, cb) {
        makeRequest('POST', this._auth, `${this.baseUrl}/api/v2/tickets`, null, data, cb)
    },

    getTicket(id, cb) {
        makeRequest('GET', this._auth, `${this.baseUrl}/api/v2/tickets/${id}`, null, null, cb)
    },

    updateTicket(id, data, cb) {
        makeRequest('PUT', this._auth, `${this.baseUrl}/api/v2/tickets/${id}`, null, data, cb)
    },

    deleteTicket(id, cb) {
        makeRequest('DELETE', this._auth, `${this.baseUrl}/api/v2/tickets/${id}`, null, null, cb)
    },

    restoreTicket(id, cb) {
        makeRequest('PUT', this._auth, `${this.baseUrl}/api/v2/tickets/${id}/restore`, null, null, cb)
    },

    listAllConversations(id, cb) {
        makeRequest('GET', this._auth, `${this.baseUrl}/api/v2/tickets/${id}/conversations`, null, cb)
    },

    listAllTimeEntries(id, cb) {
        makeRequest('GET', this._auth, `${this.baseUrl}/api/v2/tickets/${id}/time_entries`, null, null, cb)
    },

    //Conversations

    createReply(id, data, cb) {
        makeRequest('POST', this._auth, `${this.baseUrl}/api/v2/tickets/${id}/reply`, null, data, cb)
    },

    createNote(id, data, cb) {
        makeRequest('POST', this._auth, `${this.baseUrl}/api/v2/tickets/${id}/notes`, null, data, cb)
    },

    updateConversation(id, data, cb) {
        makeRequest('PUT', this._auth, `${this.baseUrl}/api/v2/conversations/${id}`, null, data, cb)
    },

    deleteConversation(id, cb) {
        makeRequest('DELETE', this._auth, `${this.baseUrl}/api/v2/conversations/${id}`, null, null, cb)
    },

    //Contacts

    createContact(data, cb) {
        makeRequest('POST', this._auth, `${this.baseUrl}/api/v2/contacts`, null, data, cb)
    },

    getContact(id, cb) {
        makeRequest('GET', this._auth, `${this.baseUrl}/api/v2/contacts/${id}`, null, null, cb)
    },

    listAllContacts(params, cb) {
        makeRequest('GET', this._auth, `${this.baseUrl}/api/v2/contacts`, params, null, cb)
    },

    updateContact(id, data, cb) {
        makeRequest('PUT', this._auth, `${this.baseUrl}/api/v2/contacts/${id}`, null, data, cb)
    },

    deleteContact(id, cb) {
        makeRequest('DELETE', this._auth, `${this.baseUrl}/api/v2/contacts/${id}`, null, null, cb)
    },

    makeAgent(id, cb) {
        makeRequest('PUT', this._auth, `${this.baseUrl}/api/v2/contacts/${id}/make_agent`, null, null, cb)
    },

    listAllContactFields(cb) {
        makeRequest('GET', this._auth, `${this.baseUrl}/api/v2/contact_fields`, null, null, cb)
    },

    // Companies

    /**
     * createCompany
     *
     * @see http://developer.freshdesk.com/api/#create_company
     *
     * @param  {[type]}   data [description]
     * @param  {Function} cb   [description]
     * @return {[type]}        [description]
     */
    createCompany(data, cb) {
        makeRequest('POST', this._auth, `${this.baseUrl}/api/v2/companies`, null, data, cb);
    },

    listAllCompanies(cb) {
        makeRequest('GET', this._auth, `${this.baseUrl}/api/v2/companies`, null, null, cb)
    },
});


module.exports = Freshdesk;
