//  https://developers.getbase.com/docs/rest/reference/orders

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(params, callback) {
        return this.request.get('orders', params, callback);
    },
    create: function(data, callback) {
        return this.request.post('orders', data, null, callback);
    },
    update: function(id, data, callback) {
        return this.request.put('orders/' + id, data, callback);
    },
    delete: function(id, callback) {
        return this.request.delete('orders/' + id, callback);
    }
};

module.exports = Service;