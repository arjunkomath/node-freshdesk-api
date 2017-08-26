/**
 * A module with the main client-class {@link module:client~Freshdesk}.
 *
 * @module
 * @author Arjun Komath <arjunkomath@gmail.com>
 * @author Maksim Koryukov <maxkoryukov@gmail.com>
 */

'use strict'

const utils           = require('./utils')
const makeRequest     = utils.makeRequest
const FreshdeskError  = utils.FreshdeskError


/**
 * Freshdesk APIv2 client.
 *
 * @class
 * @public
 */
class Freshdesk {

	/**
	 * This callback is called on API call ended.
	 * @name Freshdesk.requestCallback
	 * @callback Freshdesk.requestCallback
	 * @param {Error}  [error]  Indicates, that error occured during call
	 * @param {Object} [data]   Contains actual data
	 */

	/**
	 * Freshdesk APIv2 client
	 *
	 * @class
	 * @param {string} baseUrl    Base URL for the API calls, for example `https://demo.freshdesk.com`
	 * @param {string} apiKey     API key
	 * @public
	 */
	constructor (baseUrl, apiKey) {
		this.baseUrl = baseUrl
		this._auth = 'Basic ' + new Buffer(`${apiKey}:X`).toString('base64')
	}

	/**
	 * Filter-settings for {@link listAllTickets}.
	 *
	 * @name  TicketsFilter
	 *
	 * @typedef  {Object}                   Freshdesk.TicketsFilter
	 * @property {string} [filter]          Predefined filters, one of `new_and_my_open`, `watching`, `spam`, `deleted`
	 * @property {string} [requester_id]    Requester
	 * @property {string} [email]           Requester
	 * @property {string} [company_id]      Company ID
	 * @property {string} [updated_since]   Updated since.
	 */

	/**
	 * listAllTickets API method.
	 *
	 * @see {@link http://developers.freshdesk.com/api/#list_all_tickets}
	 *
	 * @param  {Freshdesk.TicketsFilter}            params  Dictionary with request parameters for the API method, for example : `{"company_id": "YOUR_ID"}`
	 * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
	 * @return {Array.<Freshdesk.Tickets>}                  The array of tickets found
	 */
	listAllTickets (params, cb) {
		makeRequest('GET', this._auth, `${this.baseUrl}/api/v2/Tickets`, params, null, cb)
	}

	listAllTicketFields(params, cb) {
		// param shift
		if (utils.isNil(cb) && utils.isFunction(params)) {
			cb = params
			params = undefined
		}

		const qs = {}
		if (params) {
			if (params.type) {
				qs['type'] = params.type
			}
		}

		makeRequest('GET', this._auth, `${this.baseUrl}/api/v2/ticket_fields`, qs, null, cb)
	}

	createTicket(data, cb) {
		makeRequest('POST', this._auth, `${this.baseUrl}/api/v2/tickets`, null, data, cb)
	}

	getTicket(id, cb) {
		makeRequest('GET', this._auth, `${this.baseUrl}/api/v2/tickets/${id}`, null, null, cb)
	}

	updateTicket(id, data, cb) {
		makeRequest('PUT', this._auth, `${this.baseUrl}/api/v2/tickets/${id}`, null, data, cb)
	}

	deleteTicket(id, cb) {
		makeRequest('DELETE', this._auth, `${this.baseUrl}/api/v2/tickets/${id}`, null, null, cb)
	}

	restoreTicket(id, cb) {
		makeRequest('PUT', this._auth, `${this.baseUrl}/api/v2/tickets/${id}/restore`, null, null, cb)
	}

	listAllConversations(id, cb) {
		makeRequest('GET', this._auth, `${this.baseUrl}/api/v2/tickets/${id}/conversations`, null, null, cb)
	}

	listAllTimeEntries(id, cb) {
		makeRequest('GET', this._auth, `${this.baseUrl}/api/v2/tickets/${id}/time_entries`, null, null, cb)
	}

	//Conversations

	createReply(id, data, cb) {
		makeRequest('POST', this._auth, `${this.baseUrl}/api/v2/tickets/${id}/reply`, null, data, cb)
	}

	createNote(id, data, cb) {
		makeRequest('POST', this._auth, `${this.baseUrl}/api/v2/tickets/${id}/notes`, null, data, cb)
	}

	updateConversation(id, data, cb) {
		makeRequest('PUT', this._auth, `${this.baseUrl}/api/v2/conversations/${id}`, null, data, cb)
	}

	deleteConversation(id, cb) {
		makeRequest('DELETE', this._auth, `${this.baseUrl}/api/v2/conversations/${id}`, null, null, cb)
	}

	//Contacts

	createContact(data, cb) {
		makeRequest('POST', this._auth, `${this.baseUrl}/api/v2/contacts`, null, data, cb)
	}

	getContact(id, cb) {
		makeRequest('GET', this._auth, `${this.baseUrl}/api/v2/contacts/${id}`, null, null, cb)
	}

	listAllContacts(params, cb) {
		makeRequest('GET', this._auth, `${this.baseUrl}/api/v2/contacts`, params, null, cb)
	}

	updateContact(id, data, cb) {
		makeRequest('PUT', this._auth, `${this.baseUrl}/api/v2/contacts/${id}`, null, data, cb)
	}

	deleteContact(id, cb) {
		makeRequest('DELETE', this._auth, `${this.baseUrl}/api/v2/contacts/${id}`, null, null, cb)
	}

	makeAgent(id, cb) {
		makeRequest('PUT', this._auth, `${this.baseUrl}/api/v2/contacts/${id}/make_agent`, null, null, cb)
	}

	listAllContactFields(cb) {
		makeRequest('GET', this._auth, `${this.baseUrl}/api/v2/contact_fields`, null, null, cb)
	}

	//Agents

	getAgent(id, cb) {
		makeRequest('GET', this._auth, `${this.baseUrl}/api/v2/agents/${id}`, null, null, cb)
	}

	listAllAgents(params, cb) {
		makeRequest('GET', this._auth, `${this.baseUrl}/api/v2/agents`, params, null, cb)
	}

	updateAgent(id, data, cb) {
		makeRequest('PUT', this._auth, `${this.baseUrl}/api/v2/agents/${id}`, null, data, cb)
	}

	deleteAgent(id, cb) {
		makeRequest('DELETE', this._auth, `${this.baseUrl}/api/v2/agents/${id}`, null, null, cb)
	}

	currentlyAuthedAgent(cb) {
		makeRequest('GET', this._auth, `${this.baseUrl}/api/v2/agents/me`, null, null, cb)
	}

	// Roles

	/**
	 * View a Role.
	 *
	 * @see {@link https://developers.freshdesk.com/api/#view_role}
	 *
	 * @tag Roles
	 *
	 * @param  {integer}                            id      Unique ID of the Role
	 * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
	 * @return {void}          `void`
	 */
	getRole(id, cb) {
		makeRequest('GET', this._auth, `${this.baseUrl}/api/v2/roles/${id}`, null, null, cb)
	}

	/**
	 * List All Roles.
	 *
	 * @see {@link https://developers.freshdesk.com/api/#list_all_roles}
	 *
	 * @tag Roles
	 *
	 * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
	 * @return {void}          `void`
	 */
	listAllRoles(cb) {
		makeRequest('GET', this._auth, `${this.baseUrl}/api/v2/roles`, null, null, cb)
	}

	// Companies

	/**
	 * Company settings, for {@link updateCompany} and {@link createCompany}.
	 *
	 * @tag Companies
	 *
	 * @name Freshdesk.CompanyData
	 * @typedef {Object}
	 * @property {Object.<string, Object>}   [custom_fields]   Key value pairs containing the names and values of custom fields. Only dates in the format YYYY-MM-DD are accepted as input for custom date fields. Read more here
	 * @property {string}                    [description]     Description of the company
	 * @property {Array.<string>}            [domains]         Domains of the company. Email addresses of contacts that contain this domain will be associated with that company automatically.
	 * @property {string}                    [name]            **UNIQUE** Name of the company
	 * @property {string}                    [note]            Any specific note about the company
	 */

	/**
	 * Company settings, returned by view-methods.
	 *
	 * @tag Companies
	 *
	 * @name Freshdesk.CompanyViewData
	 * @typedef {Object}
	 * @property {string}                    name              **UNIQUE** Name of the company
	 * @property {string}                    description       Description of the company
	 * @property {Array.<string>}            domains           Domains of the company. Email addresses of contacts that contain this domain will be associated with that company automatically.
	 * @property {string}                    note              Any specific note about the company
	 * @property {Date}                      created_at        Creation date
	 * @property {Date}                      updated_at        Last update date
	 * @property {Object.<string, Object>}   custom_fields     Key value pairs containing the names and values of custom fields. Only dates in the format YYYY-MM-DD are accepted as input for custom date fields. Read more here
	 */

	/**
	 * Creates company.
	 *
	 * @see {@link http://developer.freshdesk.com/api/#create_company}
	 *
	 * @tag Companies
	 *
	 * @param  {Object}                             data    [description]
	 * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
	 * @return {void}          `void`
	 */
	createCompany(data, cb) {
		makeRequest('POST', this._auth, `${this.baseUrl}/api/v2/companies`, null, data, cb);
	}

	/**
	 * View a Company.
	 *
	 * @see {@link http://developer.freshdesk.com/api/#view_company}
	 *
	 * @tag Companies
	 *
	 * @param  {integer}                            id      Company ID
	 * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
	 * @return {Freshdesk.CompanyViewData}                  Company information
	 */
	getCompany(id, cb) {
		makeRequest('GET', this._auth, `${this.baseUrl}/api/v2/companies/${id}`, null, null, cb)
	}

	/**
	 * List All Companies.
	 *
	 * @see {@link http://developer.freshdesk.com/api/#list_all_companies}
	 *
	 * @tag Companies
	 *
	 * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
	 * @return {Array.<Freshdesk.CompanyViewData>}          Company information
	 */
	listAllCompanies(cb) {
		makeRequest('GET', this._auth, `${this.baseUrl}/api/v2/companies`, null, null, cb)
	}

	/**
	 * Updates company.
	 *
	 * @see {@link http://developer.freshdesk.com/api/#update_company}
	 *
	 * @tag Companies
	 *
	 * @param  {integer}                            id      Company ID
	 * @param  {Freshdesk.UpdateCompanyData}        data    New settings for company
	 * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
	 * @return {void}          `void`
	 */
	updateCompany(id, data, cb) {
		makeRequest('PUT', this._auth, `${this.baseUrl}/api/v2/companies/${id}`, null, data, cb);
	}

	/**
	 * Delete a Company.
	 *
	 * Note:
	 *   1. Deleting a company does not delete the contacts that are associated with it. However the association will be removed.
	 *   2. Once deleted, a company cannot be restored.
	 *
	 * @see {@link http://developer.freshdesk.com/api/#delete_company}
	 *
	 * @tag Companies
	 *
	 * @param  {integer}                            id      Company ID
	 * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
	 */
	deleteCompany(id, cb) {
		makeRequest('DELETE', this._auth, `${this.baseUrl}/api/v2/companies/${id}`, null, null, cb)
	}

}

module.exports = Freshdesk

module.exports.FreshdeskError = FreshdeskError
