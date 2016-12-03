/**
 * Created by Development on 11/30/2016.
 */
var app = angular.module("dashboard", [
    "ngWebSocket"
]);

app.controller("roundCtrl", function ($scope, $http, $websocket) {
    /*$http.get("/round_info").then(function (res) {
     $scope.data = eval(res).data.data;
     console.log($scope.data);
     });*/
    var dataStream = $websocket("ws://"+window.location.host+"/general");

    dataStream.onMessage(function (message) {
        if ((message instanceof String) && message === "update") {
            $scope.refreshData();
        }
    });
    $scope.join = function (id) {
        console.log("Joining round: " + id);
        $http.get("/join_round/" + id+"/");
    };
    $scope.refreshData = function () {
        $http.get("/round_info").then(function (res) {
            $scope.data = eval(res.data).data
        });
    };
    $scope.refreshData();
});