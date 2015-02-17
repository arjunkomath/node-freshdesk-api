request = require 'request'

class Freshdesk
  constructor: (@url, @apikey, headers = {}) ->
    authKey = new Buffer("#{@apikey}:X").toString('base64')
    defaultHeaders = {
      'Authorization': "Basic #{authKey}"
      'Content-Type': "application/json"
    }

    # Add any other headers supplied by you to the requests
    for own header of headers
      defaultHeaders[header] = headers[header]

    # This request object will be used in the base methods
    @r = request.defaults({
      headers: defaultHeaders
    })

  get: (path, cb) =>
    @r.get({
      url: "#{@url}#{path}"
    }, cb)

  post: (path, data, cb) =>
    @r.post({
      url: "#{@url}#{path}"
      json: data
    }, cb)

  put: (path, data, cb) =>
    @r.put({
      url: "#{@url}#{path}"
      json: data
    }, cb)

  delete: (path, cb) =>
    @r.del({
      url: "#{@url}#{path}"
    }, cb)

  # Ticket Methods
  createTicket: (data, cb) =>
    @post '/helpdesk/tickets.json', data, cb

  listTickets: (cb) =>
    @get '/helpdesk/tickets.json', cb

  getTicket: (id, cb) =>
    @get "/helpdesk/tickets/#{id}.json", cb

  updateTicket: (id, data, cb) =>
    @put "/helpdesk/tickets/#{id}.json", data, cb

  pickTicket: (id, cb) =>
    @put "/helpdesk/tickets/#{id}/pick_tickets.json", {}, cb

  deleteTicket: (id, cb) =>
    @delete "/helpdesk/tickets/#{id}.json", cb

  restoreTicket: (id, cb) =>
    @put "/helpdesk/tickets/#{id}/restore.json", cb

  assignTicket: (id, user_id, cb) =>
    @put "/helpdesk/tickets/#{id}/assign.json?responder_id=#{user_id}", cb

  ticketFields: (cb) =>
    @get "/ticket_fields.json", cb

  addNoteToTicket: (id, note, is_private, callback) =>
    data =
      helpdesk_note:
        body: note,
        private: is_private
    @post "/helpdesk/tickets/#{id}/conversations/note.json", data, cb


  # User Methods
  createUser: (data, cb) =>
    @post '/contacts.json', contact, cb

  listUsers: (cb) =>
    @get '/contacts.json?state=all', cb

  updateUser: (id, data, cb) =>
    @put "/contacts/#{id}.json", data, cb

  getUserByEmail: (email_id, cb) =>
    query = encodeURIComponent("email is #{email_id}")
    @get "/contacts.json?state=all&query=#{query}",
      (err, res, body) ->
        users = JSON.parse body
        if users.length isnt 0
          return cb users[0]
        return cb null

module.exports = Freshdesk
