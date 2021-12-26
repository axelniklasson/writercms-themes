/* Angular init */
var writer = angular.module('writer', ['ui.router', 'angular-loading-bar', 'ngMap', 'ngFacebook',
'writer.controllers', 'writer.services', 'writer.filters', 'writer.directives', 'writer.interceptors']);

/* Module setup */
angular.module('writer.controllers', []);
angular.module('writer.services', []);
angular.module('writer.filters', []);
angular.module('writer.directives', []);
angular.module('writer.interceptors', []);

/* Moment.js init */
moment.locale('sv');

/* Router setup */
writer.config(function($stateProvider, $locationProvider, $urlRouterProvider,
    $httpProvider, cfpLoadingBarProvider, $urlMatcherFactoryProvider, $facebookProvider) {
        /* Crawler magic */
        $locationProvider.hashPrefix('!');
        $locationProvider.html5Mode(true);

        // Initialize ngFacebook
        $facebookProvider.setAppId('1539788846329411'); // PROD
        // $facebookProvider.setAppId('1606132839695011'); // DEV
        $facebookProvider.setPermissions('publish_actions');

        /* API Base URL */
        $httpProvider.defaults.base_url = '/api';
        // $httpProvider.defaults.base_url = 'http://localhost:3000';

        /* Remove spinner */
        cfpLoadingBarProvider.includeSpinner = false;

        /* Set delay prior to loading bar displayed */
        cfpLoadingBarProvider.latencyThreshold = 500;

        /* Fallback URL */
        $urlRouterProvider.otherwise('/posts');

        /* Interceptors */
        $httpProvider.interceptors.push('UnauthorizedInterceptor');
        $httpProvider.interceptors.push('LoadingInterceptor');

        $stateProvider
        .state('base', {
            templateUrl: 'partials/base.html',
            controller: 'BaseCtrl',
            abstract: true,
            data: { pageTitle: 'Asien 2017' }
        })
        .state('base.posts', {
            url: '/posts',
            templateUrl: 'partials/posts/posts.html',
            controller: 'PostCtrl',
            data: { pageTitle: 'Asien 2017 | Blogg' }
        })
        .state('base.archive', {
            url: '/archive?category&author',
            templateUrl: 'partials/posts/archive.html',
            controller: 'ArchiveCtrl',
            data: { pageTitle: 'Asien 2017 | Arkiv' }
        })
        .state('base.postdetail', {
            url: '/posts/:year/:month/:slug',
            templateUrl: 'partials/posts/posts-detail.html',
            controller: 'PostDetailCtrl',
            data: { pageTitle: 'Asien 2017 | Blogg' }
        })
        .state('base.route', {
            url: '/route',
            templateUrl: 'partials/route.html',
            controller: 'RouteCtrl',
            data: { pageTitle: 'Asien 2017 | Vår rutt' }
        })
        .state('base.about', {
            url: '/about',
            templateUrl: 'partials/about.html',
            controller: 'AboutCtrl',
            data: { pageTitle: 'Asien 2017 | Om oss' }
        })
        /* Admin states */
        .state('base.admin', {
            url: '/admin',
            templateUrl: 'partials/admin/base.html',
            authenticate: true,
            data: { pageTitle: 'Asien 2017 | Admin' }
        })
        .state('base.admin.login', {
            templateUrl: 'partials/admin/login.html',
            controller: 'LoginCtrl',
            data: { pageTitle: 'Asien 2017 | Logga in' }
        })
        .state('base.admin.dashboard', {
            url: '/dashboard',
            templateUrl: 'partials/admin/dashboard.html',
            controller: 'DashboardCtrl',
            authenticate: true,
            data: { pageTitle: 'Asien 2017 | Dashboard' }
        })
        .state('base.admin.posts', {
            url: '/posts',
            templateUrl: 'partials/admin/posts/posts.html',
            controller: 'AdminPostCtrl',
            authenticate: true,
            data: { pageTitle: 'Asien 2017 | Inlägg' }
        })
        .state('base.admin.posts.new', {
            url: '/new',
            templateUrl: 'partials/admin/posts/posts-new.html',
            controller: 'NewPostCtrl',
            authenticate: true,
            data: { pageTitle: 'Asien 2017 | Nytt inlägg' }
        })
        .state('base.admin.posts.detail', {
            url: '/:id',
            templateUrl: 'partials/admin/posts/posts-detail.html',
            controller: 'AdminPostDetailCtrl',
            authenticate: true,
            data: { pageTitle: 'Asien 2017 | Inlägg' }
        })
        .state('base.admin.categories', {
            url: '/categories',
            templateUrl: 'partials/admin/categories/categories.html',
            controller: 'AdminCategoriesCtrl',
            authenticate: true,
            data: { pageTitle: 'Asien 2017 | Kategorier' }
        })
        .state('base.admin.categories.new', {
            url: '/new',
            templateUrl: 'partials/admin/categories/categories-new.html',
            controller: 'NewCategoryCtrl',
            authenticate: true,
            data: { pageTitle: 'Asien 2017 | Ny kategori' }
        })
        .state('base.admin.categories.detail', {
            url: '/:id',
            templateUrl: 'partials/admin/categories/categories-detail.html',
            controller: 'AdminCategoryDetailCtrl',
            authenticate: true,
            data: { pageTitle: 'Asien 2017 | Kategori' }
        })
        .state('base.admin.users', {
            url: '/users',
            templateUrl: 'partials/admin/users/users.html',
            controller: 'AdminUsersCtrl',
            authenticate: true,
            data: { pageTitle: 'Asien 2017 | Användare' }
        })
        .state('base.admin.users.new', {
            url: '/new',
            templateUrl: 'partials/admin/users/users-new.html',
            controller: 'NewUserCtrl',
            authenticate: true,
            data: { pageTitle: 'Asien 2017 | Ny användare' }
        })
        .state('base.admin.users.detail', {
            url: '/:id',
            templateUrl: 'partials/admin/users/users-detail.html',
            controller: 'AdminUsersDetailCtrl',
            authenticate: true,
            data: { pageTitle: 'Asien 2017 | Användare' }
        })
        .state('base.admin.comments', {
            url: '/comments',
            templateUrl: 'partials/admin/comments/comments.html',
            controller: 'AdminCommentCtrl',
            authenticate: true,
            data: { pageTitle: 'Asien 2017 | Kommentarer' }
        })
        .state('base.admin.comments.detail', {
            url: '/:id',
            templateUrl: 'partials/admin/comments/comments-detail.html',
            controller: 'AdminCommentDetailCtrl',
            authenticate: true,
            data: { pageTitle: 'Asien 2017 | Kommentar' }
        })
        .state('base.admin.profile', {
            url: '/profile',
            templateUrl: 'partials/admin/profile.html',
            controller: 'ProfileCtrl',
            authenticate: true,
            data: { pageTitle: 'Asien 2017 | Min profil' }
        })
        .state('base.admin.settings', {
            url: '/settings',
            templateUrl: 'partials/admin/settings.html',
            controller: 'SettingsCtrl',
            authenticate: true,
            data: { pageTitle: 'Asien 2017 | Inställningar' }
        })
    });


    /* Adding authentication */
    writer.run(function ($rootScope, $state, $window, $location, AuthService) {
        $rootScope.authenticated = AuthService.isAuthenticated();

        // Load Facebook JS SDK
        (function(){
            // If we've already installed the SDK, we're done
            if (document.getElementById('facebook-jssdk')) {return;}

            // Get the first script element, which we'll use to find the parent node
            var firstScriptElement = document.getElementsByTagName('script')[0];

            // Create a new script element and set its id
            var facebookJS = document.createElement('script');
            facebookJS.id = 'facebook-jssdk';

            // Set the new script's source to the source of the Facebook JS SDK
            facebookJS.src = '//connect.facebook.net/en_US/all.js';

            // Insert the Facebook JS SDK into the DOM
            firstScriptElement.parentNode.insertBefore(facebookJS, firstScriptElement);
        }());

        // Initialize Google Analytics
        $window.ga('create', 'UA-72529449-3', 'auto');

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (toState.authenticate && !AuthService.isAuthenticated()) {
                $state.transitionTo('base.admin.login');
                event.preventDefault();
            }
        });
        $rootScope.$on('$stateChangeSuccess', function (evt, toState) {
            if (toState.name === 'base.admin') {
                $state.go('base.admin.dashboard');
            }
            $window.ga('send', 'pageview', $location.path());
        });
    });
