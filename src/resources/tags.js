//  https://developers.getbase.com/docs/rest/reference/tags

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(params) {
        return this.request.get('tags', params);
    },
    create: function(data) {
        return this.request.post('tags', data);
    },
    update: function(id, data) {
        return this.request.put('tags/' + id, data);
    },
    delete: function(id) {
        return this.request.delete('tags/' + id);
    }
};

module.exports = Service;