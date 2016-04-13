//  https://developers.getbase.com/docs/rest/reference/deals

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(params) {
        return this.request.get('deals', params);
    },
    create: function(data) {
        return this.request.post('deals', data);
    },
    update: function(id, data) {
        return this.request.put('deals/' + id, data);
    },
    delete: function(id) {
        return this.request.delete('deals/' + id);
    },
    upsert: function(params, data) {
        return this.request.post('deals', data, params);
    }
};

module.exports = Service;