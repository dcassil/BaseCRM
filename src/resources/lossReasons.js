//  https://developers.getbase.com/docs/rest/reference/loss_reasons

var Model = require('../model');

function Service(request) {
    this.request = request;
}

Service.prototype = {
    constructor: Service,

    find: function(params) {
        return this.request.get('loss_reasons', params, Model);
    },
    create: function(data) {
        return this.request.post('loss_reasons', data, null, Model);
    },
    update: function(id, data) {
        return this.request.put('loss_reasons/' + id, data, Model);
    },
    delete: function(id) {
        return this.request.delete('loss_reasons/' + id);
    }
};

module.exports = Service;