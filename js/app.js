// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('redmonica', ['ionic','redmonica.controllers','redmonica.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $ionicConfigProvider.tabs.position("bottom");
    $stateProvider //libreria  q maneja estados 
    .state('start',{ // primera vista
      url:'/start',
      templateUrl:"templates/start.html",
      controller:'startctrl'
    })
    .state('tabs', {
      url: "/tab",
      abstract:true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/home.html",
          controller: 'EstacionCtrl'
        }
      }
    })
    .state('tabs.facts', {
      url: '/home/:NivelID',
      views: {
        'home-tab': {
          templateUrl: 'templates/facts.html',
          controller: 'DetailCtrl'
        }
      }
    })
    .state('tabs.status', {
      url: '/status',
      views: {
        'status-tab': {
          templateUrl: 'templates/status.html',
          controller: 'GraficasGeneralCtrl'
        }
      }
    })
    .state('tabs.automatico', {
      url: "/automatico",
      views: {
        'automatico-tab': {
          templateUrl: "templates/automatico.html",
          controller:'AutomaticoCtrl'
        }
      }
    })
    .state('tabs.about', {
      url: "/about",
      views: {
        'about-tab': {
          templateUrl: "templates/about.html",
          controller:'locationctrl'
        }
      }
    })
 
    .state('tabs.contact', {
      url: "/contact",
      views: {
        'contact-tab': {
          templateUrl: "templates/contact.html"
        }
      }
    });


   $urlRouterProvider.otherwise("/start");

})

