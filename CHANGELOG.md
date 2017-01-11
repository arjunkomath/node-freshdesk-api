# CHANGELOG

This is the history of changes of the `freshdesk-api` package

> This file should be filled by maintainers, using pull requests
> Please, follow this [guide](http://keepachangelog.com/en/0.3.0/)

## unreleased // ???

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
