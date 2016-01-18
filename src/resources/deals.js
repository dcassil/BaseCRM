//  https://developers.getbase.com/docs/rest/reference/deals

function Deals(crm) {
    this.crm = crm;
}

Deals.prototype.find = function(data) {
    if(typeof data === 'number') {
        return this.crm.find('deals/' + data);
    }
    return this.crm.find('deals', data);
};

Deals.prototype.create = function(data) {
    return this.crm.create('deals', data, 'deal');
};

Deals.prototype.update = function(id, data) {
    return this.crm.update('deals/' + id, data);
};

Deals.prototype.delete = function(id) {
    return this.crm.delete('deals/' + id);
};

module.exports = Deals;