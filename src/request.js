var rp = require('request-promise');
var extend = require('extend');
var path = require('path');

function EmptyModel(data) {
    return data;
}

function Request(options) {
    this.options = options;
}

Request.prototype.send = function(options) {
    return rp({
        method: options.method,
        baseUrl: this.options.baseUrl,
        uri: path.join('/v2', options.resource),
        body: options.data,
        qs: options.params,
        headers: extend(options.headers, {
            'user-agent': this.options.userAgent,
            authorization: 'bearer ' + this.options.accessToken
        }),
        timeout: Math.max(0, options.timeout || this.options.timeout) * 1000,
        json: true
    });
};

Request.prototype.get = function(resource, params, Model) {
    var isId = typeof params === 'number';

    return request.send({
        method: 'GET',
        resource: path.join(resource, isId ? '' + params : ''),
        params: isId ? null : params
    }).then(function(res) {
        Model = Model || EmptyModel;

        return res.meta.type === 'collection' ?
            res.items.map(function(item) {
                return new Model(item.data, this);
            }.bind(this)) :
            new Model(res.data, this);
    }.bind(this));
};
Request.prototype.post = function(resource, data, params, Model) {
    return this.send({
        method: 'POST',
        resource: path.join(resource, params && Object.keys(params).length ? 'upsert' : ''),
        params: params,
        data: {
            data: data
        }
    }).then(function(res) {
        return new (Model || EmptyModel)(res.data, this);
    }.bind(this));
};
Request.prototype.put = function(resource, data, Model) {
    return this.send({
        method: 'PUT',
        resource: resource,
        data: {
            data: data
        }
    }).then(function(res) {
        return new (Model || EmptyModel)(res.data, this);
    }.bind(this));
};
Request.prototype.delete = function(resource) {
    return this.send({
        method: 'DELETE',
        resource: resource
    }).then(function() {
        return true;
    });
};

module.exports = Request;