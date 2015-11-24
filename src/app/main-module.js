/**
 * Created by dennis on 27/07/2015.
 */
import angular from 'angular';

const crmPlugins = angular.module('booksApp', [
    // angular modules
    'ngAnimate',
    'ngMaterial',
    'ui.bootstrap',
    'restangular',
    'LocalStorageModule',
    'ui.router'
]);

export default crmPlugins;
