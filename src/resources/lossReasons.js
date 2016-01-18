//  https://developers.getbase.com/docs/rest/reference/loss_reasons

function LossReasons(crm) {
    this.crm = crm;
}

LossReasons.prototype.find = function(data) {
    if(typeof data === 'number') {
        return this.crm.find('loss_reasons/' + data);
    }
    return this.crm.find('loss_reasons', data);
};

LossReasons.prototype.create = function(data) {
    return this.crm.create('loss_reasons', data, 'loss_reason');
};

LossReasons.prototype.update = function(id, data) {
    return this.crm.update('loss_reasons/' + id, data);
};

LossReasons.prototype.delete = function(id) {
    return this.crm.delete('loss_reasons/' + id);
};

module.exports = LossReasons;