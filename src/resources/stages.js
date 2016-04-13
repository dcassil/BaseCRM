//  https://developers.getbase.com/docs/rest/reference/stages

module.exports = function(params) {
    return this.request.get('stages', params);
};
