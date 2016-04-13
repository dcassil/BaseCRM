var extend = require('extend');

function Model(data, request) {
    extend(this, data);

    Object.defineProperty(this, '__service', {
        value: request
    });
}

Model.prototype = {
    constructor: Model,

    update: function(data) {
        return this.__service.update(this.data.id, data);
    },
    delete: function() {
        return this.__service.delete(this.data.id);
    }
};

module.exports = Model;