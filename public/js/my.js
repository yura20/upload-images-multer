const app = angular.module('app', ['ngRoute']);

//Забираєм %2F та # з url сайту
app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
}]);
const link = 'http://localhost:8000';
//Створюєм адреси
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/template/home.html'
        })
        .otherwise({
            redirectTo: '/'
        });

});

//Контроллер
app.controller("myCtrl", function ($scope, $http, $window) {
    $scope.send = function () {
        var fd = new FormData();
        fd.append("test", $scope.myFile);
        $http.post('http://localhost:8000/images', fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            })
            .then(function successCallback() {
                console.log("Uploaded!");
				$window.location = link;
            }, function errorCallback(response) {
                console.log("Error!!!" + response.err);
            })
    }
});


//Директива з унікальним атрибутом - для передачі файлів
app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
