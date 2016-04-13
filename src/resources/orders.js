//  https://developers.getbase.com/docs/rest/reference/orders

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(params) {
        return this.request.get('orders', params);
    },
    create: function(data) {
        return this.request.post('orders', data);
    },
    update: function(id, data) {
        return this.request.put('orders/' + id, data);
    },
    delete: function(id) {
        return this.request.delete('orders/' + id);
    }
};

module.exports = Service;