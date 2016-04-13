//  https://developers.getbase.com/docs/rest/reference/associated_contacts

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(dealId, params) {
        return this.request.get('deals/' + dealId + '/associated_contacts', params);
    },
    create: function(dealId, data) {
        return this.request.post('deals/' + dealId + '/associated_contacts', data);
    },
    remove: function(dealId, id) {
        return this.request.delete('deals/' + dealId + '/associated_contacts/' + id);
    }
};

module.exports = Service;