// js vendor files
import 'babel/polyfill';

import $ from 'jquery'
import _ from 'lodash';
import moment from 'moment';
import angular from 'angular';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-ui-router';
import 'angular-ui-bootstrap';
import 'restangular';

//----------------app files-----------------------------------------------------
import './core/core';
import './routes/routes';
import './books/service/books-service';
import './books/filter/start-from-pagination-filter';
import mainModule from './main-module';


angular.element(document).ready(function () {
    angular.bootstrap(document, [mainModule.name], {
        strictDi: true
    });
});
