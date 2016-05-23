/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
var call  = angular.module('Hospital_Records',['ngMaterial', 'ngRoute']);




call.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider.when("/login", {
        templateUrl: "parts/login.html",
    }).when("/", {
        templateUrl: "pages/index.html",
        controller: "homeCtrl"
    }).when("/registration",{
        templateUrl: "pages/registration.html",
        controller: "registrationCtrl"
    }).when("reports",{
        templateUrl: "pages/reports.html"
    }).when("programs",{
        templateUrl: "pages/programs.html"
    }).when("Radiology",{
        templateUrl: "pages/radiology.html",
    }).otherwise({redirectTo: '/'});

}]);

app.controller("homeCtrl", ["$scope", 'Api', function ($scope, Api) {
    $scope.session = Api.session;
    $scope.session.checkAuth();
    $scope.api = Api.userTest;
    $scope.logout = function () {
        Api.checkOut();
    };
}]);


app.controller('AppCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.toggleRight = buildToggler('right');
        $scope.isOpenRight = function () {
            return $mdSidenav('right').isOpen();
        };


        /**
         * Supplies a function that will continue to operate until the
         * time is up.
         */
        function debounce(func, wait, context) {
            var timer;
            return function debounced() {
                var context = $scope,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function () {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }
        /**
         * Build handler to open/close a SideNav; when animation finishes
         * report completion in console
         */
        function buildDelayedToggler(navID) {
            return debounce(function () {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        //$log.debug("toggle " + navID + " is done");
                    });
            }, 200);
        }
        function buildToggler(navID) {
            return function () {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        //$log.debug("toggle " + navID + " is done");
                    });
            };
        }
    })
    .controller('LinksCtrl', function ($scope, $timeout, $mdSidenav, $log) {
        $scope.homeLinks = [{
            name: "Registration",
            link: "registration"
        }, {
            name: "Campus",
            link: "campus"
        }, {
            name: "Faculties",
            link: "faculties"
        }, {
            name: "Gallery",
            link: "gallery"
        }, {
            name: "SRC's",
            link: "council"
        }, {
            name: "FAQs",
            link: "faq"
        }];
        $scope.close = function () {
            $mdSidenav('right').close()
                .then(function () {
                    $log.debug("close RIGHT is done");
                });
        };
    });