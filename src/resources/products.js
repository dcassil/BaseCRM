//  https://developers.getbase.com/docs/rest/reference/products

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(params, callback) {
        return this.request.get('products', params, callback);
    },
    create: function(data, callback) {
        return this.request.post('products', data, null, callback);
    },
    update: function(id, data, callback) {
        return this.request.put('products/' + id, data, callback);
    },
    delete: function(id, callback) {
        return this.request.delete('products/' + id, callback);
    }
};

module.exports = Service;