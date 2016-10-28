//  https://developers.getbase.com/docs/rest/reference/line_items

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(orderId, params, callback) {
        return this.request.get('orders/' + orderId + '/line_items', params, callback);
    },
    create: function(orderId, data, callback) {
        return this.request.post('orders/' + orderId + '/line_items', data, null, callback);
    },
    remove: function(orderId, id, callback) {
        return this.request.delete('orders/' + orderId + '/line_items/' + id, callback);
    }
};

module.exports = Service;