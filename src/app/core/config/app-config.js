import {Config, Inject, Run} from 'annotations/ng-decorator';

class Configuration {
    @Config()
    @Inject('$compileProvider', '$httpProvider', '$urlRouterProvider', 'localStorageServiceProvider')
    static configFactory($compileProvider, $httpProvider, $urlRouterProvider, localStorageServiceProvider) {
        $httpProvider.useApplyAsync(true);

        $urlRouterProvider.otherwise('/books');
        $urlRouterProvider.when('/', '/books');

        localStorageServiceProvider.setPrefix('booksApp');
        localStorageServiceProvider.setStorageType('sessionStorage');

    }
}
