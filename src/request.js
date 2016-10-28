var rp = require('request-promise');
var extend = require('extend');
var path = require('path');

function Request(options) {
    this.options = options;
}

Request.prototype = {
    headers: function(headers) {
        this.__headers = extend(this.__headers, headers);
        return this;
    },
    
    send: function(options, callback) {
        var headers = this.headers(options.headers).headers({
            'user-agent': this.options.userAgent,
            authorization: 'bearer ' + this.options.accessToken
        }).__headers;
        this.__headers = null;
        
        return rp({
            method: options.method,
            baseUrl: this.options.baseUrl,
            uri: path.join('/v2', options.resource),
            body: options.data,
            qs: options.params,
            headers: headers,
            timeout: Math.max(0, options.timeout || this.options.timeout) * 1000,
            json: true
        }).then(callback);
    },
    
    get: function(resource, params, callback) {
        var isId = typeof params === 'number';
        
        if(params instanceof Function) {
            callback = params;
            params = null;
        }
    
        return this.send({
            method: 'GET',
            resource: path.join(resource, isId ? '' + params : ''),
            params: isId ? null : params
        }, function(res) {
            return res.meta.type === 'collection' ?
                res.items.map(function(item) {
                    return item.data;
                }) :
                res.data;
        }).then(callback);
    },
    post: function(resource, data, params, callback) {
        return this.send({
            method: 'POST',
            resource: path.join(resource, params && Object.keys(params).length ? 'upsert' : ''),
            params: params,
            data: {
                data: data
            }
        }, function(res) {
            return res && res.data;
        }).then(callback);
    },
    put: function(resource, data, callback) {
        return this.send({
            method: 'PUT',
            resource: resource,
            data: {
                data: data
            }
        }, function(res) {
            return res.data;
        }).then(callback);
    },
    delete: function(resource, callback) {
        return this.send({
            method: 'DELETE',
            resource: resource
        }, function() {
            return true;
        }).then(callback);
    }
};

module.exports = Request;