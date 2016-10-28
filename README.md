# BaseCRM

BaseCRM Official API V2 library client for NodeJS

## Installation

    $ npm install basecrm

## Usage

```javascript
var BaseCRM = require('basecrm');
```

### Build
__Using this api without authentication gives an error__

```javascript
//  BaseCRM equal to BaseCRM.Client
var client = new BaseCRM.Client({
  accessToken: '<YOUR_PERSONAL_ACCESS_TOKEN>'
});
```

### Options

The following options are available while instantiating a client:

 * __accessToken__: Personal access token
 * __baseUrl__: Base url for the api
 * __userAgent__: Default user-agent for all requests
 * __timeout__: Request timeout

### Resources and actions

All requests use Promise with REST.
 
##### [Account](https://developers.getbase.com/docs/rest/reference/account "API Documentation")

```javascript
//  RETRIEVE ACCOUNT DETAILS
client.account([callback])
  .then(function callback(data) {})
```

##### [Associated Contacts](https://developers.getbase.com/docs/rest/reference/associated_contacts "API Documentation")

```javascript
//  RETRIEVE DEAL'S ASSOCIATED CONTACTS
client.associatedContacts.find(dealId[, params][, callback])
  .then(function callback(items) {})
  
//  CREATE AN ASSOCIATED CONTACT
client.associatedContacts.create(dealId, data[, callback])
  .then(function callback(data) {})
  
//  REMOVE AN ASSOCIATED CONTACT
client.associatedContacts.remove(dealId, contactId[, callback])
  .then(function callback() {})
```

##### [Line Items](https://developers.getbase.com/docs/rest/reference/line_items "API Documentation")

```javascript
//  RETRIEVE ORDER'S LINE ITEMS
client.lineItems.find(orderId[, params][, callback])
  .then(function callback(items) {})
  
//  RETRIEVE A SINGLE LINE ITEM
client.lineItems.find(orderId, lineItemId[, callback])
  .then(function callback(items) {})
  
//  CREATE A LINE ITEM
client.lineItems.create(orderId, data[, callback])
  .then(function callback(data) {})
  
//  REMOVE A LINE ITEM
client.lineItems.remove(orderId, lineItemId[, callback])
  .then(function callback() {})
```
 
##### [Pipelines](https://developers.getbase.com/docs/rest/reference/pipelines "API Documentation") and [Stages](https://developers.getbase.com/docs/rest/reference/stages "API Documentation")

```javascript
//  RETRIEVE ALL PIPELINES
client.pipelines([params][, callback])
  .then(function callback(items) {})
  
//  RETRIEVE ALL STAGES
client.stages([params][, callback])
  .then(function callback(items) {})
```

##### [Contacts](https://developers.getbase.com/docs/rest/reference/contacts "API Documentation"), [Deal Sources](https://developers.getbase.com/docs/rest/reference/deal_sources "API Documentation"), [Deals](https://developers.getbase.com/docs/rest/reference/deals "API Documentation"), [Lead Sources](https://developers.getbase.com/docs/rest/reference/lead_sources "API Documentation"), [Leads](https://developers.getbase.com/docs/rest/reference/leads "API Documentation"), [Loss Reasons](https://developers.getbase.com/docs/rest/reference/loss_reasons "API Documentation"), [Notes](https://developers.getbase.com/docs/rest/reference/notes "API Documentation"), [Orders](https://developers.getbase.com/docs/rest/reference/orders "API Documentation"), [Products](https://developers.getbase.com/docs/rest/reference/products "API Documentation"), [Tags](https://developers.getbase.com/docs/rest/reference/tags "API Documentation") and [Tasks](https://developers.getbase.com/docs/rest/reference/tasks "API Documentation")

```javascript
var resource = client.contacts;  //  or client.dealSources, client.deals, client.leadSources, client.leads, client.lossReasons, client.notes, client.orders, client.products, client.tags and client.tasks

//  RETRIEVE ALL RESOURCES
resource.find([params][, callback])
  .then(function callback(items) {})
  
//  RETRIEVE A SINGLE RESOURCE
resource.find(id[, callback])
  .then(function callback(data) {})
  
//  CREATE A RESOURCE
resource.create(data[, callback])
  .then(function callback(data) {})
  
//  UPDATE A RESOURCE
resource.update(id[, data][, callback])
  .then(function callback(data) {})
  
//  DELETE A RESOURCE
resource.delete(id[, callback])
  .then(function callback() {})


// UPSERT A RESOURCE
var resource = client.contacts;  //  or client.deals and client.leads

resource.upsert(params, data[, callback])
  .then(function callback(data) {})
```

##### [Users](https://developers.getbase.com/docs/rest/reference/users "API Documentation")

```javascript
//  RETRIEVE ALL USERS
client.users.find([params][, callback])
  .then(function callback(items) {})

//  RETRIEVE A SINGLE USER
client.users.find(id[, callback])
  .then(function callback(data) {})
  
//  RETRIEVE AN AUTHENTICATING USER
client.users.self([callback])
  .then(function callback(data) {})
```

## Sync API

The following sample code shows how to perform a full synchronization flow using high-level wrapper.

First of all you need an instance of `BaseCRM.Client`. High-level `BaseCRM.Sync` wrapper uses `BaseCRM.Sync.Service` to interact with the Sync API.
In addition to the client instance, you must provide a device’s UUID within `deviceUUID` parameter. The device’s UUID must not change between synchronization sessions, otherwise the sync service will not recognize the device and will send all the data again.

```javascript
var client = new BaseCRM.Client({
  accessToken: '<YOUR_PERSONAL_ACCESS_TOKEN>'
});
var sync = new BaseCRM.Sync(client, '<YOUR_DEVICES_UUID>');
```

Now all you have to do is to call `fetch` method and pass a block that you might use to store fetched data to a database.

```javascript
var db = [];
sync.fetch(function(type, action, data) {
  return db.indexOf(type + '_' + JSON.stringify(data)) ? BaseCRM.Sync.ACK : BaseCRM.Sync.NACK;
});
```

Notice that you must return `BaseCRM.Sync.ACK` or `BaseCRM.Sync.NACK`.

## License
MIT

## Bug Reports
Report [here](https://github.com/yurypaleev/BaseCRM/issues).