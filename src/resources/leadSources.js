//  https://developers.getbase.com/docs/rest/reference/lead_sources

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(params, callback) {
        return this.request.get('lead_sources', params, callback);
    },
    create: function(data, callback) {
        return this.request.post('lead_sources', data, null, callback);
    },
    update: function(id, data, callback) {
        return this.request.put('lead_sources/' + id, data, callback);
    },
    delete: function(id, callback) {
        return this.request.delete('lead_sources/' + id, callback);
    }
};


module.exports = Service;