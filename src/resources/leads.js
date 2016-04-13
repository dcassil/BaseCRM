//  https://developers.getbase.com/docs/rest/reference/leads

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(params) {
        return this.request.get('leads', params);
    },
    create: function(data) {
        return this.request.post('leads', data);
    },
    update: function(id, data) {
        return this.request.put('leads/' + id, data);
    },
    delete: function(id) {
        return this.request.delete('leads/' + id);
    },
    upsert: function(params, data) {
        return this.request.post('leads', data, params);
    }
};

module.exports = Service;