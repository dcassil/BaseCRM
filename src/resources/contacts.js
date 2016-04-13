//  https://developers.getbase.com/docs/rest/reference/contacts

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(params) {
        return this.request.get('contacts', params);
    },
    create: function(data) {
        return this.request.post('contacts', data);
    },
    update: function(id, data) {
        return this.request.put('contacts/' + id, data);
    },
    delete: function(id) {
        return this.request.delete('contacts/' + id);
    },
    upsert: function(params, data) {
        return this.request.post('contacts', data, params);
    }
};

module.exports = Service;