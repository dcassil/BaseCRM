//  https://developers.getbase.com/docs/rest/reference/users

function Service(request) {
    this.request = request;
}

Service.prototype = {
    find: function(params) {
        return this.request.get('users', params);
    },
    self: function() {
        return this.request.post('users/self');
    }
};

module.exports = Service;