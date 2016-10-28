//  https://developers.getbase.com/docs/rest/reference/deal_sources

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(params, callback) {
        return this.request.get('deal_sources', params, callback);
    },
    create: function(data, callback) {
        return this.request.post('deal_sources', data, null, callback);
    },
    update: function(id, data, callback) {
        return this.request.put('deal_sources/' + id, data, callback);
    },
    delete: function(id, callback) {
        return this.request.delete('deal_sources/' + id, callback);
    }
};

module.exports = Service;