var Freshdesk, request,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  hasProp = {}.hasOwnProperty;

request = require('request');

Freshdesk = (function() {
  function Freshdesk(url, apikey, headers) {
    var authKey, defaultHeaders, header;
    this.url = url;
    this.apikey = apikey;
    if (headers == null) {
      headers = {};
    }
    this.getUserByEmail = bind(this.getUserByEmail, this);
    this.updateUser = bind(this.updateUser, this);
    this.listUsers = bind(this.listUsers, this);
    this.createUser = bind(this.createUser, this);
    this.addNoteToTicket = bind(this.addNoteToTicket, this);
    this.ticketFields = bind(this.ticketFields, this);
    this.assignTicket = bind(this.assignTicket, this);
    this.restoreTicket = bind(this.restoreTicket, this);
    this.deleteTicket = bind(this.deleteTicket, this);
    this.pickTicket = bind(this.pickTicket, this);
    this.updateTicket = bind(this.updateTicket, this);
    this.getTicket = bind(this.getTicket, this);
    this.allTickets = bind(this.allTickets, this);
    this.listTickets = bind(this.listTickets, this);
    this.createTicket = bind(this.createTicket, this);
    this["delete"] = bind(this["delete"], this);
    this.put = bind(this.put, this);
    this.post = bind(this.post, this);
    this.get = bind(this.get, this);
    authKey = new Buffer(this.apikey + ":X").toString('base64');
    defaultHeaders = {
      'Authorization': "Basic " + authKey,
      'Content-Type': "application/json"
    };
    for (header in headers) {
      if (!hasProp.call(headers, header)) continue;
      defaultHeaders[header] = headers[header];
    }
    this.r = request.defaults({
      headers: defaultHeaders
    });
  }

  Freshdesk.prototype.get = function(path, cb) {
    return this.r.get({
      url: "" + this.url + path
    }, cb);
  };

  Freshdesk.prototype.post = function(path, data, cb) {
    return this.r.post({
      url: "" + this.url + path,
      json: data
    }, cb);
  };

  Freshdesk.prototype.put = function(path, data, cb) {
    return this.r.put({
      url: "" + this.url + path,
      json: data
    }, cb);
  };

  Freshdesk.prototype["delete"] = function(path, cb) {
    return this.r.del({
      url: "" + this.url + path
    }, cb);
  };

  Freshdesk.prototype.createTicket = function(data, cb) {
    return this.post('/helpdesk/tickets.json', data, cb);
  };

  Freshdesk.prototype.listTickets = function(cb) {
    return this.get('/helpdesk/tickets.json', cb);
  };

  Freshdesk.prototype.allTickets = function(cb) {
    return this.get('/helpdesk/tickets/filter/all_tickets?format=json', cb);
  };

  Freshdesk.prototype.getTicket = function(id, cb) {
    return this.get("/helpdesk/tickets/" + id + ".json", cb);
  };

  Freshdesk.prototype.updateTicket = function(id, data, cb) {
    return this.put("/helpdesk/tickets/" + id + ".json", data, cb);
  };

  Freshdesk.prototype.pickTicket = function(id, cb) {
    return this.put("/helpdesk/tickets/" + id + "/pick_tickets.json", {}, cb);
  };

  Freshdesk.prototype.deleteTicket = function(id, cb) {
    return this["delete"]("/helpdesk/tickets/" + id + ".json", cb);
  };

  Freshdesk.prototype.restoreTicket = function(id, cb) {
    return this.put("/helpdesk/tickets/" + id + "/restore.json", cb);
  };

  Freshdesk.prototype.assignTicket = function(id, user_id, cb) {
    return this.put("/helpdesk/tickets/" + id + "/assign.json?responder_id=" + user_id, cb);
  };

  Freshdesk.prototype.ticketFields = function(cb) {
    return this.get("/ticket_fields.json", cb);
  };

  Freshdesk.prototype.addNoteToTicket = function(id, note, is_private, cb) {
    var data;
    data = {
      helpdesk_note: {
        "body_html": note,
        "private": is_private
      }
    };
    return this.post("/helpdesk/tickets/" + id + "/conversations/note.json", data, cb);
  };

  Freshdesk.prototype.createUser = function(data, cb) {
    return this.post('/contacts.json', contact, cb);
  };

  Freshdesk.prototype.listUsers = function(cb) {
    return this.get('/contacts.json?state=all', cb);
  };

  Freshdesk.prototype.updateUser = function(id, data, cb) {
    return this.put("/contacts/" + id + ".json", data, cb);
  };

  Freshdesk.prototype.getUserByEmail = function(email_id, cb) {
    var query;
    query = encodeURIComponent("email is " + email_id);
    return this.get("/contacts.json?state=all&query=" + query, function(err, res, body) {
      var users;
      users = JSON.parse(body);
      if (users.length !== 0) {
        return cb(users[0]);
      }
      return cb(null);
    });
  };

  return Freshdesk;

})();

module.exports = Freshdesk;
