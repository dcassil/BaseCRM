//  https://developers.getbase.com/docs/rest/reference/associated_contacts

function Service(request) {
    this.request = request;
}

Service.prototype = {
    constructor: Service,

    find: function(dealId, params) {
        if(typeof dealId !== 'number') {
            dealId = dealId.id;
        }
        return this.request.get('deals/' + dealId + '/associated_contacts', params);
    },
    create: function(dealId, data) {
        if(typeof dealId !== 'number') {
            dealId = dealId.id;
        }
        return this.request.post('deals/' + dealId + '/associated_contacts', data);
    },
    remove: function(dealId, id) {
        if(typeof dealId !== 'number') {
            dealId = dealId.id;
        }
        return this.request.delete('deals/' + dealId + '/associated_contacts/' + id);
    }
};

module.exports = Service;