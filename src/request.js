var rp = require('request-promise');
var extend = require('extend');
var path = require('path');

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

Request.prototype.get = function(resource, params, headers) {
    var isId = typeof params === 'number';

    return this.send({
        method: 'GET',
        resource: path.join(resource, isId ? '' + params : ''),
        headers: headers,
        params: isId ? null : params
    }).then(function(res) {
        return res.meta.type === 'collection' ?
            res.items.map(function(item) {
                return item.data;
            }) :
            res.data;
    });
};
Request.prototype.post = function(resource, data, params, headers) {
    return this.send({
        method: 'POST',
        resource: path.join(resource, params && Object.keys(params).length ? 'upsert' : ''),
        headers: headers,
        params: params,
        data: {
            data: data
        }
    }).then(function(res) {
        return res && res.data;
    });
};
Request.prototype.put = function(resource, data, headers) {
    return this.send({
        method: 'PUT',
        resource: resource,
        headers: headers,
        data: {
            data: data
        }
    }).then(function(res) {
        return res.data;
    });
};
Request.prototype.delete = function(resource, headers) {
    return this.send({
        method: 'DELETE',
        resource: resource,
        headers: headers
    }).then(function() {
        return true;
    });
};

module.exports = Request;