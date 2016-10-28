//  https://developers.getbase.com/docs/rest/reference/associated_contacts

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(dealId, params, callback) {
        return this.request.get('deals/' + dealId + '/associated_contacts', params, callback);
    },
    create: function(dealId, data, callback) {
        return this.request.post('deals/' + dealId + '/associated_contacts', data, null, callback);
    },
    remove: function(dealId, id, callback) {
        return this.request.delete('deals/' + dealId + '/associated_contacts/' + id, callback);
    }
};

module.exports = Service;