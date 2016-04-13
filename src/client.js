var extend = require('extend');

var Request = require('./request');

var account = require('./resources/account');
var AssociatedContacts = require('./resources/associatedContacts');
var Contacts = require('./resources/contacts');
var DealSources = require('./resources/dealSources');
var Deals = require('./resources/deals');
var LeadSources = require('./resources/leadSources');
var Leads = require('./resources/leads');
var LineItems = require('./resources/lineItems');
var LossReasons = require('./resources/lossReasons');
var Notes = require('./resources/notes');
var Orders = require('./resources/orders');
var pipelines = require('./resources/pipelines');
var Products = require('./resources/products');
var stages = require('./resources/stages');
var Tags = require('./resources/tags');
var Tasks = require('./resources/tasks');
var Users = require('./resources/users');

function Client(options) {
    var request = this.request = new Request(extend({
        accessToken: '',
        baseUrl: 'https://api.getbase.com',
        userAgent: 'BaseCRM/v2 NodeJS/' + process.version,
        timeout: 30
    }, options));
    
    this.account = account;
    this.associatedContacts = new AssociatedContacts(request);
    this.contacts = new Contacts(request);
    this.dealSources = new DealSources(request);
    this.deals = new Deals(request);
    this.leadSources = new LeadSources(request);
    this.leads = new Leads(request);
    this.lineItems = new LineItems(request);
    this.lossReasons = new LossReasons(request);
    this.notes = new Notes(request);
    this.orders = new Orders(request);
    this.pipelines = pipelines;
    this.products = new Products(request);
    this.stages = stages;
    this.tags = new Tags(request);
    this.tasks = new Tasks(request);
    this.users = new Users(request);
}

module.exports = Client;