//  https://developers.getbase.com/docs/rest/reference/products

var Model = require('../model');

function Service(request) {
    this.request = request;
}

Service.prototype = {
    constructor: Service,

    find: function(params) {
        return this.request.get('products', params, Model);
    },
    create: function(data) {
        return this.request.post('products', data, null, Model);
    },
    update: function(id, data) {
        return this.request.put('products/' + id, data, Model);
    },
    delete: function(id) {
        return this.request.delete('products/' + id);
    }
};

module.exports = Service;