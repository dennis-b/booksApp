import {Config, Inject, Run} from 'annotations/ng-decorator';

class Configuration {
    @Config()
    @Inject('$compileProvider', '$httpProvider', '$urlRouterProvider')
    static configFactory($compileProvider, $httpProvider, $urlRouterProvider) {
        $httpProvider.useApplyAsync(true);

        $urlRouterProvider.otherwise('/books');
        $urlRouterProvider.when('/', '/books');

    }
}
