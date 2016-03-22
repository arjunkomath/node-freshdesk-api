var Freshdesk, request,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

request = require('request');

Freshdesk = (function() {
  function Freshdesk(_at_url, _at_apikey) {
    var authKey, defaultHeaders;
    this.url = _at_url;
    this.apikey = _at_apikey;
    this.getContactByEmail = __bind(this.getContactByEmail, this);
    this.updateContact = __bind(this.updateContact, this);
    this.listContacts = __bind(this.listContacts, this);
    this.createContact = __bind(this.createContact, this);
    this.addNoteToTicket = __bind(this.addNoteToTicket, this);
    this.pickTicket = __bind(this.pickTicket, this);
    this.updateTicket = __bind(this.updateTicket, this);
    this.getTicket = __bind(this.getTicket, this);
    this.listTickets = __bind(this.listTickets, this);
    this.allTickets = __bind(this.allTickets, this);
    this.createTicket = __bind(this.createTicket, this);
    this["delete"] = __bind(this["delete"], this);
    this.put = __bind(this.put, this);
    this.post = __bind(this.post, this);
    this.get = __bind(this.get, this);
    authKey = new Buffer(this.apikey + ":X").toString('base64');
    defaultHeaders = this.r = request.defaults({
      headers: {
        'Authorization': "Basic " + authKey,
        'Content-Type': 'application/json'
      }
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
    console.log('putting', "" + this.url + path);
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

  Freshdesk.prototype.addNoteToTicket = function(id, note, is_private, callback) {
    var data;
    data = {
      helpdesk_note: {
        body: note,
        "private": is_private
      }
    };
    return this.post("/helpdesk/tickets/" + id + "/conversations/note.json", data, cb);
  };

  Freshdesk.prototype.createContact = function(data, cb) {
    return this.post('/contacts.json', contact, cb);
  };

  Freshdesk.prototype.listContacts = function(cb) {
    return this.get('/contacts.json?state=all', cb);
  };

  Freshdesk.prototype.updateContact = function(id, data, cb) {
    return this.put("/contacts/" + id + ".json", data, cb);
  };

  Freshdesk.prototype.getContactByEmail = function(email_id, cb) {
    return this.get("/contacts.json?state=all&query=email%20is%20" + email, function(err, res, body) {
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
