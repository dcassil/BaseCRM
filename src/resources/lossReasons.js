//  https://developers.getbase.com/docs/rest/reference/loss_reasons

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(params) {
        return this.request.get('loss_reasons', params);
    },
    create: function(data) {
        return this.request.post('loss_reasons', data);
    },
    update: function(id, data) {
        return this.request.put('loss_reasons/' + id, data);
    },
    delete: function(id) {
        return this.request.delete('loss_reasons/' + id);
    }
};

module.exports = Service;