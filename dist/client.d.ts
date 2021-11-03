export = Freshdesk;
/**
 * Freshdesk APIv2 client.
 *
 * @class
 * @public
 */
declare class Freshdesk {
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
    constructor(baseUrl: string, apiKey: string);
    baseUrl: string;
    _auth: string;
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
     * @param  {Freshdesk.TicketsFilter}    params  Dictionary with request parameters for the API method, for example : `{"company_id": "YOUR_ID"}`
     * @param  {Freshdesk.requestCallback<Array.<Freshdesk.Tickets>>}  cb
     * Callback function {@link Freshdesk.requestCallback}
     */
    listAllTickets(params: any, cb: any): void;
    /**
     * Filter tickets
     * @param {*} query Query tickets, refer https://developers.freshdesk.com/api/#filter_tickets
     * @param {*} page Page number for pagination
     * @param {*} cb
     */
    filterTickets(query: any, page: any, cb: any): void;
    listAllTicketFields(params: any, cb: any): void;
    createTicket(data: any, cb: any): void;
    getTicket(id: any, cb: any): void;
    updateTicket(id: any, data: any, cb: any): void;
    deleteTicket(id: any, cb: any): void;
    restoreTicket(id: any, cb: any): void;
    listAllConversations(id: any, cb: any): void;
    listAllTicketTimeEntries(id: any, cb: any): void;
    createReply(id: any, data: any, cb: any): void;
    createNote(id: any, data: any, cb: any): void;
    updateConversation(id: any, data: any, cb: any): void;
    deleteConversation(id: any, cb: any): void;
    createContact(data: any, cb: any): void;
    getContact(id: any, cb: any): void;
    listAllContacts(params: any, cb: any): void;
    updateContact(id: any, data: any, cb: any): void;
    deleteContact(id: any, cb: any): void;
    makeAgent(id: any, cb: any): void;
    listAllContactFields(cb: any): void;
    /**
     * Filter Contacts.
     *
     * Allows to get a list of contacts filtered with a query.
     *
     * **Query example:**: `"(contact_field:integer OR contact_field:'string') AND contact_field:boolean"`
     *
     * More documentation on the Freshdesk Developer Portal (link below).
     *
     * @see {@link https://developer.freshdesk.com/api/#filter_contacts}
     *
     * @category Contacts
     *
     * @param  {String}  query  The query, used to filter contacts
     * @param  {Freshdesk.requestCallback<Array.<Freshdesk.ContactViewData>>}  cb
     * Callback function {@link Freshdesk.requestCallback}
     */
    filterContacts(query: string, cb: any): void;
    /**
     * Agent settings, for {@link updateAgent}.
     *
     * @category Agents
     *
     * @name Freshdesk.AgentData
     * @typedef {Object}
     * @property  {Boolean}        [occasional]     Set to true if this is an occasional agent (true => occasional, false => full-time)
     * @property  {String}         [signature]      Signature of the agent in HTML format
     * @property  {Number}         [ticket_scope]   Ticket permission of the agent (1 -> Global Access, 2 -> Group Access, 3 -> Restricted Access). Current logged in agent can't update his/her ticket_scope
     * @property  {Array.<Number>} [group_ids]      Group IDs associated with the agent
     * @property  {Array.<Number>} [role_ids]       Role IDs associated with the agent. At least one role should be associated with the agent. Current logged in agent can't update his/her role_ids
     * @property  {String}         [name]           Name of the Agent
     * @property  {String}         [email]          Email address of the Agent.
     * @property  {String}         [phone]          Telephone number of the Agent.
     * @property  {Number}         [mobile]         Mobile number of the Agent
     * @property  {String}         [job_title]      Job title of the Agent
     * @property  {String}         [language]       Language of the Agent. Default language is "en"
     * @property  {String}         [time_zone]      Time zone of the Agent. Default value is time zone of the domain
     */
    /**
     * Agent settings, returned by view-methods.
     *
     * @category Companies
     *
     * @name Freshdesk.AgentResponse
     * @typedef {Object}
     * @property {Boolean}         [available]               If the agent is in a group that has enabled "Automatic Ticket Assignment", this attribute will be set to true if the agent is accepting new tickets
     * @property {Date}            [available_since]         Timestamp that denotes when the agent became available/unavailable (depending on the value of the 'available' attribute)
     * @property {Number}          [id]                      User ID of the agent
     * @property {Boolean}         [occasional]              Set to true if this is an occasional agent (true => occasional, false => full-time)
     * @property {String}          [signature]               Signature of the agent in HTML format
     * @property {Number}          [ticket_scope]            Ticket permission of the agent (1 -> Global Access, 2 -> Group Access, 3 -> Restricted Access)
     * @property {Array.<Number>}  [group_ids]               Group IDs associated with the agent
     * @property {Array.<Number>}  [role_ids]                Role IDs associated with the agent
     * @property {Date}            [created_at]              Agent creation timestamp
     * @property {Date}            [updated_at]              Agent updated timestamp
     * @property {Object}          [contact]
     * @property {String}          [contact.active]          Set to true if the agent is verified
     * @property {String}          [contact.email]           Email address of the agent
     * @property {String}          [contact.job_title]       Job title of the agent
     * @property {String}          [contact.language]        Language of the agent. Default language is "en"
     * @property {Date}            [contact.last_login_at]   Timestamp of the agent's last successful login
     * @property {Number}          [contact.mobile]          Mobile number of the agent
     * @property {String}          [contact.name]            Name of the agent
     * @property {Number}          [contact.phone]           Telephone number of the agent
     * @property {String}          [contact.time_zone]       Time zone of the agent
     * @property {Date}            [contact.created_at]      Creation timestamp
     * @property {Date}            [contact.updated_at]      Timestamp of the last update
     */
    /**
     * Filter-settings for {@link listAllAgents}.
     *
     * @name  Freshdesk.AgentFilter
     * @typedef  {Object} Freshdesk.AgentFilter
     * @property {String}          [email]   Email
     * @property {String | Number} [mobile]  Mobile number
     * @property {String | Number} [phone]   Phone number
     * @property {string}          [state]   Agent state, **one of `fulltime`/`occasional`**
     */
    /**
     * View an Agent.
     *
     * @see {@link https://developers.freshdesk.com/api/#view_agent}
     *
     * @category Agents
     *
     * @param {Number}  id  Agent ID
     * @param {Freshdesk.requestCallback<Freshdesk.AgentResponse>} cb
     * Callback function {@link Freshdesk.requestCallback}
     */
    getAgent(id: number, cb: any): void;
    /**
     * List All Agents.
     *
     * @see {@link https://developers.freshdesk.com/api/#list_all_agents}
     *
     * @category Agents
     *
     * @param {Freshdesk.AgentFilter}  params  Agent filter
     * @param {Freshdesk.requestCallback<Array.<Freshdesk.AgentResponse>>}  cb
     * Callback function {@link Freshdesk.requestCallback}
     */
    listAllAgents(params: any, cb: any): void;
    /**
     * Update an Agent.
     *
     * @see {@link https://developers.freshdesk.com/api/#update_agent}
     *
     * @category Agents
     *
     * @param {Number}               id         Agent ID
     * @param {Freshdesk.AgentData}  data       New values for Agent's fields
     * @param {Freshdesk.requestCallback<Freshdesk.AgentResponse>} cb
     * Callback function {@link Freshdesk.requestCallback}
     */
    updateAgent(id: number, data: any, cb: any): void;
    /**
     * Delete an Agent.
     *
     * @see {@link https://developers.freshdesk.com/api/#delete_agent}
     *
     * @category Agents
     *
     * @param {Number}                     id  Agent ID
     * @param {Freshdesk.requestCallback}  cb  Callback function {@link Freshdesk.requestCallback}
     *
     */
    deleteAgent(id: number, cb: any): void;
    /**
     * Currently Authenticated Agent.
     *
     * @see {@link https://developers.freshdesk.com/api/#me}
     *
     * @category Agents
     *
     * @param {Freshdesk.requestCallback<Freshdesk.AgentResponse>} cb
     * Callback function {@link Freshdesk.requestCallback}
     */
    currentAgent(cb: any): void;
    /**
     * View a Role.
     *
     * @see {@link https://developers.freshdesk.com/api/#view_role}
     *
     * @category Roles
     *
     * @param  {Number}                             id      Unique ID of the Role
     * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
     */
    getRole(id: number, cb: any): void;
    /**
     * List All Roles.
     *
     * @see {@link https://developers.freshdesk.com/api/#list_all_roles}
     *
     * @category Roles
     *
     * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
     * @return {void}          `void`
     */
    listAllRoles(cb: any): void;
    /**
     * Company settings, for {@link updateCompany} and {@link createCompany}.
     *
     * @category Companies
     *
     * @name Freshdesk.CompanyData
     * @typedef  {Object}
     * @property {Object.<string, Object>}   [custom_fields]   Key value pairs containing the names and values of custom fields. Only dates in the format YYYY-MM-DD are accepted as input for custom date fields. Read more here
     * @property {string}                    [description]     Description of the company
     * @property {Array.<string>}            [domains]         Domains of the company. Email addresses of contacts that contain this domain will be associated with that company automatically.
     * @property {string}                    [name]            **UNIQUE** Name of the company
     * @property {string}                    [note]            Any specific note about the company
     */
    /**
     * Company settings, returned by view-methods.
     *
     * @category Companies
     *
     * @name Freshdesk.CompanyViewData
     * @typedef  {Object}
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
     * @category Companies
     *
     * @param  {Object}                             data    [description]
     * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
     * @return {void}          `void`
     */
    createCompany(data: any, cb: any): void;
    /**
     * View a Company.
     *
     * @see {@link http://developer.freshdesk.com/api/#view_company}
     *
     * @category Companies
     *
     * @param  {Number}  id  Company ID
     * @param  {Freshdesk.requestCallback<Freshdesk.CompanyViewData>}  cb
     * Callback function
     */
    getCompany(id: number, cb: any): void;
    /**
     * Search Companies.
     *
     * @see {@link https://developers.freshdesk.com/api/#search_companies}
     *
     * @category Companies
     *
     * @param  {*}  params Object containing parameter keys (name)
     * @param  {Freshdesk.requestCallback<Freshdesk.CompanyViewData>}  cb
     * Callback function
     */
    searchCompany(params: any, cb: any): void;
    /**
     * List All Companies.
     *
     * @see {@link http://developer.freshdesk.com/api/#list_all_companies}
     *
     * @category Companies
     *
     * @param  {*}  params Object containing parameter keys
     * @param  {Freshdesk.requestCallback<Array.<Freshdesk.CompanyViewData>>}  cb
     * Callback function {@link Freshdesk.requestCallback}
     */
    listAllCompanies(params: any, cb: any): void;
    /**
     * Filter Companies.
     *
     * Allows to get a list of companies filtered with a query.
     *
     * **Query example:**: `"(company_field:integer OR company_field:'string') AND company_field:boolean"`
     *
     * More documentation on the Freshdesk Developer Portal (link below).
     *
     * @see {@link https://developer.freshdesk.com/api/#filter_companies}
     *
     * @category Companies
     *
     * @param  {String}  query  The query, used to filter companies
     * @param  {Freshdesk.requestCallback<Array.<Freshdesk.CompanyViewData>>}  cb
     * Callback function {@link Freshdesk.requestCallback}
     */
    filterCompanies(query: string, cb: any): void;
    listAllCompanyFields(cb: any): void;
    /**
     * Updates company.
     *
     * @see {@link http://developer.freshdesk.com/api/#update_company}
     *
     * @category Companies
     *
     * @param  {Number}                             id      Company ID
     * @param  {Freshdesk.UpdateCompanyData}        data    New settings for company
     * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
     * @return {void}          `void`
     */
    updateCompany(id: number, data: any, cb: any): void;
    /**
     * Delete a Company.
     *
     * Note:
     *   1. Deleting a company does not delete the contacts that are associated with it. However the association will be removed.
     *   2. Once deleted, a company cannot be restored.
     *
     * @see {@link http://developer.freshdesk.com/api/#delete_company}
     *
     * @category Companies
     *
     * @param  {Number}                             id      Company ID
     * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
     */
    deleteCompany(id: number, cb: any): void;
    /**
     * Time Entry data, returned by view-alike methods.
     *
     * @category TimeEntries
     *
     * @name Freshdesk.TimeEntryResponse
     * @typedef  {Object}
     * @property {Number}        agent_id             The ID of the agent to whom this time-entry is associated
     * @property {Boolean}       billable             Set to true if the time entry is billable
     * @property {Number}        id                   Unique ID of the time entry
     * @property {Date}          executed_at          Time at which this time-entry was added/created
     * @property {String}        note                 Description of the time entry
     * @property {Date}          start_time           The time at which the time-entry is added or the time of the last invoked "start-timer" action using a toggle
     * @property {Number}        ticket_id            The ID of the ticket to which this time entry is associated
     * @property {String}        time_spent           The duration in hh:mm format
     * @property {Boolean}       timer_running        Set to 'true' if the timer is currently running
     * @property {Date}          created_at           Time Entry creation timestamp
     * @property {Date}          updated_at           Time Entry updated timestamp
     */
    /**
     * Time Entry data, for {@link createTimeEntry} and {@link updateTimeEntry}.
     *
     * @category TimeEntries
     *
     * @name Freshdesk.TimeEntryData
     * @typedef  {Object}
     * @property {Number}        agent_id              The agent to whom this time-entry is associated. One agent can have only one timer running. Everything else will be stopped if new timer is on for an agent
     * @property {Boolean}       billable              Set as true if the entry is billable. Default value is true
     * @property {Date}          executed_at           Time at which this time-entry id added/created
     * @property {String}        note                  Description on this time-entry
     * @property {Date}          start_time            The time at which the time-entry is added or the time of the last invoked "start-timer" action using a toggle
     * @property {String}        time_spent            The number of hours (in hh:mm format). Used to set the total time_spent
     * @property {Boolean}       timer_running         Indicates if the timer is running
     */
    /**
     * Create a Time Entry
     *
     * Note:
     * 1. If the `time_spent` is not specified and the `timer_running` attribute is not specified, then the `timer_running` attribute will automatically be set to `true`
     * 2. If the `start_time` is specified and the `timer_running` attribute is not specified, then the `timer_running` attribute will automatically be set to `true`
     * 3. The `start_time` cannot be greater than the current time
     * 4. The `start_time` cannot be given in the API request if the `timer_running` attribute is set to `false`
     *
     * @category TimeEntries
     *
     * @see {@link https://developer.freshdesk.com/api/#create_time_entry}
     *
     * @param  {Number}                             ticket_id  Ticket Number ID
     * @param  {Freshdesk.TimeEntryData}            data       New time entry data
     * @param  {Freshdesk.requestCallback}          cb         Callback function {@link Freshdesk.requestCallback}
     */
    createTimeEntry(ticket_id: number, data: any, cb: any): void;
    /**
     * List All Time Entries
     *
     * @category TimeEntries
     *
     * @see {@link https://developer.freshdesk.com/api/#list_all_time_entries}
     *
     * @param  {Object}       params                    Filters to view only specific time entries
     * @param  {Object}       [params.company_id]       Filter by _Company ID_
     * @param  {Object}       [params.agent_id]         Filter by _Agent ID_
     * @param  {Date}         [params.executed_before]  Filter by executed date
     * @param  {Date}         [params.executed_after]   Filter by executed date
     * @param  {Boolean}      [params.billable]         View only billable/not billable items. **Not a `String`, it is a `Boolean`**
     * @param  {Freshdesk.requestCallback<Array.<Freshdesk.TimeEntryResponse>>}  cb
     * Callback function {@link Freshdesk.requestCallback}
     */
    listAllTimeEntries(params: {
        company_id?: any;
        agent_id?: any;
        executed_before?: Date;
        executed_after?: Date;
        billable?: boolean;
    }, cb: any): void;
    /**
     * Update a Time Entry
     *
     * Note:
     * 1. The `start_time` cannot be updated if the timer is already running
     * 2. The `start_time` cannot be be updated unless the `timer_running` attribute is updated from `true` to `false`
     * 3. The `start_time` cannot be greater than the current time
     * 4. The `timer_running` attribute cannot be set to the same value as before
     * 5. The `agent_id` cannot be updated if the timer is already running
     *
     * @category TimeEntries
     *
     * @see {@link https://developer.freshdesk.com/api/#update_time_entry}
     *
     * @param  {Number}                             id      Time Entry ID
     * @param  {Freshdesk.TimeEntryData}            data    New time entry data
     * @param  {Freshdesk.requestCallback<Freshdesk.TimeEntryResponse>}  cb
     * Callback function {@link Freshdesk.requestCallback}
     */
    updateTimeEntry(id: number, data: any, cb: any): void;
    /**
     * Start/Stop Timer
     *
     * @category TimeEntries
     *
     * @see {@link https://developer.freshdesk.com/api/#toggle_time_entry}
     *
     * @param  {Number}   id      Time Entry ID
     * @param  {Freshdesk.requestCallback<Freshdesk.TimeEntryResponse>} cb
     * Callback function {@link Freshdesk.requestCallback}
     */
    toggleTimer(id: number, cb: any): void;
    /**
     * Delete a Time Entry
     *
     * Note:
     * Deleted time entries cannot be restored.
     *
     * @category TimeEntries
     *
     * @see {@link https://developer.freshdesk.com/api/#delete_time_entry}
     *
     * @param  {Number}                             id      Time entry ID
     * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
     */
    deleteTimeEntry(id: number, cb: any): void;
    /**
     * View Helpdesk Settings
     *
     * @category Settings
     *
     * @see {@link https://developer.freshdesk.com/api/#settings}
     *
     * @param  {Freshdesk.requestCallback}          cb      Callback function {@link Freshdesk.requestCallback}
     */
    getSettings(cb: any): void;
}
declare namespace Freshdesk {
    export { FreshdeskError };
}
declare const FreshdeskError: typeof utils.FreshdeskError;
import utils = require("./utils");
