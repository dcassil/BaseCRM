//  https://developers.getbase.com/docs/rest/reference/products

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(params) {
        return this.request.get('products', params);
    },
    create: function(data) {
        return this.request.post('products', data);
    },
    update: function(id, data) {
        return this.request.put('products/' + id, data);
    },
    delete: function(id) {
        return this.request.delete('products/' + id);
    }
};

module.exports = Service;