//  https://developers.getbase.com/docs/rest/reference/lead_sources

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(params) {
        return this.request.get('lead_sources', params);
    },
    create: function(data) {
        return this.request.post('lead_sources', data);
    },
    update: function(id, data) {
        return this.request.put('lead_sources/' + id, data);
    },
    delete: function(id) {
        return this.request.delete('lead_sources/' + id);
    }
};


module.exports = Service;