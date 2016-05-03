/**
 * Main Client File
 * Created by arjun on 03/05/16.
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
        } if (!error && body) {
            try {
                var data = JSON.parse(body);
            } catch (err) {
                cb(err);
            }
            return cb(data);
        } else return cb(error);
    }
}

Freshdesk.prototype.req = function (method, url, data, cb) {
    authKey = new Buffer(this.apikey + ":X").toString('base64');
    var options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Basic " + authKey
        },
        url: url
    }
    if(data)
        options.body = JSON.stringify(data);
    request(options, this.response(cb))
}

Freshdesk.prototype.listAllTickets = function (cb) {
    this.req('GET', '{domain}/api/v2/tickets'.replace('{domain}', this.domain), null, cb)
}

Freshdesk.prototype.listAllTicketFields = function (cb) {
    this.req('GET', '{domain}/api/v2/ticket_fields'.replace('{domain}', this.domain), null, cb)
}

Freshdesk.prototype.createTicket = function (data, cb) {
    this.req('POST', '{domain}/api/v2/tickets'.replace('{domain}', this.domain), data, cb)
}

Freshdesk.prototype.getTicket = function (id, cb) {
    this.req('GET', '{domain}/api/v2/tickets/{id}'.replace('{domain}', this.domain).replace('{id}', id), null, cb)
}

Freshdesk.prototype.updateTicket = function (id, data, cb) {
    this.req('PUT', '{domain}/api/v2/tickets/{id}'.replace('{domain}', this.domain).replace('{id}', id), data, cb)
}

Freshdesk.prototype.deleteTicket = function (id, cb) {
    this.req('DELETE', '{domain}/api/v2/tickets/{id}'.replace('{domain}', this.domain).replace('{id}', id), null, cb)
}

Freshdesk.prototype.listAllConversations = function (id, cb) {
    this.req('GET', '{domain}/api/v2/tickets/{id}/conversations'.replace('{domain}', this.domain).replace('{id}', id), null, cb)
}

Freshdesk.prototype.listAllTimeEntries = function (id, cb) {
    this.req('GET', '{domain}/api/v2/tickets/{id}/time_entries'.replace('{domain}', this.domain).replace('{id}', id), null, cb)
}

module.exports = Freshdesk;