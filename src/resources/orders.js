//  https://developers.getbase.com/docs/rest/reference/orders

var SuperModel = require('../model');
var LineItems = require('./lineItems');

function Model(data, request) {
    var model = SuperModel.call(this, data, request);
    var lineItems = new LineItems(request);

    Object.defineProperty(this, 'lineItems', {
        value: {
            find: function(params) {
                return lineItems.find(this.id, params);
            },
            create: function(data) {
                return lineItems.create(this.id, data);
            },
            remove: function(id) {
                return lineItems.remove(this.id, id);
            }
        }
    });

    return model;
}

function Service(request) {
    this.request = request;
}

Service.prototype = {
    constructor: Service,

    find: function(params) {
        return this.request.get('orders', params, Model);
    },
    create: function(data) {
        return this.request.post('orders', data, null, Model);
    },
    update: function(id, data) {
        return this.request.put('orders/' + id, data, Model);
    },
    delete: function(id) {
        return this.request.delete('orders/' + id);
    }
};

module.exports = Service;