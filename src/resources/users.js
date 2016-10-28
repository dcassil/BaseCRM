//  https://developers.getbase.com/docs/rest/reference/users

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(params, callback) {
        return this.request.get('users', params, callback);
    },
    self: function(callback) {
        return this.request.get('users/self', callback);
    }
};

module.exports = Service;