//  https://developers.getbase.com/docs/rest/reference/notes

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(params) {
        return this.request.get('notes', params);
    },
    create: function(data) {
        return this.request.post('notes', data);
    },
    update: function(id, data) {
        return this.request.put('notes/' + id, data);
    },
    delete: function(id) {
        return this.request.delete('notes/' + id);
    }
};

module.exports = Service;