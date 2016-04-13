//  https://developers.getbase.com/docs/rest/reference/line_items

function Service(request) {
    this.request = request;
}

Service.prototype = {
    constructor: Service,

    find: function(orderId, params) {
        return this.request.get('orders/' + orderId + '/line_items', params);
    },
    create: function(orderId, data) {
        return this.request.post('orders/' + orderId + '/line_items', data);
    },
    remove: function(orderId, id) {
        return this.request.delete('orders/' + orderId + '/line_items/' + id);
    }
};

module.exports = Service;