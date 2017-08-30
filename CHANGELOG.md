# CHANGELOG

This is the history of changes of the `node-freshdesk-api` package

> This file should be filled by maintainers, using pull requests
> Please, follow this [guide](http://keepachangelog.com/en/0.3.0/)

## ?? // 2.4.x

* **TIME ENTRIES** implemented // thanks to @Velua
* **AGENTS** implemented // thanks to @davinthesmith and @Velua

* CI: Build over Node 8 **MUST NOT** fail

## 2017-08-26 // 2.3.2

* documentation improved (use JSDoc)
* enable tests on NodeJS 8 on Travis CI
* rename endpoint _ticket_: `Tickets` -> `ticket` (now lowercase)
* update deps

## 2017-06-29 // 2.3.0

* **ROLES** implemented
* update dependencies
* implement ticket field filtering by type (see https://developers.freshdesk.com/api/#list_all_ticket_fields)

* more tests
* several new functions in `utils` (internal stuff)

## 2017-03-07 // 2.2.0

* argument `extra` was added for callback-function to allow handle paging

## 2017-01-07 // 2.1.0

* Error Handling: filter for errors on JSON-parse, now it handles on JSON errors
* Error Handling: `apiTarget` field on FreshdeskError, containing the name of method and requested URL of the API
* Error Handling: HTTP status **404** handled correctly (there is an empty body)
* Test: added test for network errors

Fixed:

* bug `response.request is not defined`, caused by network-errors, in the `debug` call

## 2017-01-06 // 2.0.1

* `status` property on FreshdeskError
* more tests

## 2017-01-04 // 1.1.1

* Published APIv1 version `1.1.1`, using sources provided by Kumar Harsh (@kumarharsh, https://github.com/kumarharsh)
* This version marked as deprecated in favor of version 2.0.0

## 2017-01-02 // 2.0.0-beta.2

* Attach RAW data to FreshdeskError, when `JSON.parse` can't parse body of the request
