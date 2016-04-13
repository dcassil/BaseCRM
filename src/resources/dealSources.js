//  https://developers.getbase.com/docs/rest/reference/deal_sources

var Model = require('../model');

function Service(request) {
    this.request = request;
}

Service.prototype = {
    constructor: Service,

    find: function(params) {
        return this.request.get('deal_sources', params, Model);
    },
    create: function(data) {
        return this.request.post('deal_sources', data, null, Model);
    },
    update: function(id, data) {
        return this.request.put('deal_sources/' + id, data, Model);
    },
    delete: function(id) {
        return this.request.delete('deal_sources/' + id);
    }
};

module.exports = Service;