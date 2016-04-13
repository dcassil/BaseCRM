//  https://developers.getbase.com/docs/rest/reference/deal_sources

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(params) {
        return this.request.get('deal_sources', params);
    },
    create: function(data) {
        return this.request.post('deal_sources', data);
    },
    update: function(id, data) {
        return this.request.put('deal_sources/' + id, data);
    },
    delete: function(id) {
        return this.request.delete('deal_sources/' + id);
    }
};

module.exports = Service;