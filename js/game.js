/**
 * Created by Development on 12/1/2016.
 */
var app = angular.module('game', []);

var Suite = function (val, icn) {
    this.val = val;
    this.icn = icn;
    this.urlName = angular.uppercase(icn);
};

var Index = function (val) {
    this.serialized = val;
    this.val = null;
    //Parse val to int
    this.val = val === "J" ? 11 : val === "Q" ? 12 : this.val = val === "K" ? 13 : this.val = val === "A" ? 14 : this.val = val === "2" ? 15 : eval(val);

}

var suites = {
    spade: new Suite(0, "spade"),
    club: new Suite(1, "club"),
    diamond: new Suite(2, "diamond"),
    heart: new Suite(3, "heart")
};

var Card = function (index, suite) {
    this.suite = suite;
    this.number = number;
};

var Deck = function () {
    this.cards = [];
    for (var i = 3; i < 52; i++) {
        this.cards.push(new Card(new Index(i), suites.spade));
        this.cards.push(new Card(new Index(i), suites.club));
        this.cards.push(new Card(new Index(i), suites.diamond));
        this.cards.push(new Card(new Index(i), suites.heart));
    }
};

Deck.prototype.getCards = function () {
    return this.cards;
};

Deck.prototype.randomize = function () {
    var array = this.cards;
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    this.cards = array;
};

var Hand = function () {
    this.cards = [];

    this.numCards = 13;

};


app.controller("hand-ctrl", ['$scope', function ($scope) {
    $scope.hand = []
}]);

app.directive("card", function () {
    return {
        template: "<div style=\'width: 7.69%;height: auto;display: inline-block;\'>\n    <img src=\'/img/Cards/Hearts/Two.png\' alt=\'\' style=\'height: auto;display: inline-block;\'>\n</div>",
        restrict: "E"
    }
});