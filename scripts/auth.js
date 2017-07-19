/*
* Auth config module of the application.
*/
angular
.module('cadweb')
.config(function(api, $authProvider) {
    $authProvider.loginUrl = api.loginUrl;
    $authProvider.tokenHeader = 'Authorization';
    $authProvider.tokenType = 'Bearer';
});
