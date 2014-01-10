'use strict';

angular.module('tapSenseApp')
  .controller('MainCtrl', function ($scope) {
    $scope.gameState = 'unstarted';
    $scope.lettersToShow = '';
    var playerOne;
    var playerTwo;
    $scope.startGame = function(type){
      playerOne = {name : 'one', submissions: []};
      playerTwo = {name : 'two', submissions: []};
      $scope.players = [playerOne, playerTwo];
      $scope.lettersToShow = '';
      $scope.gameState = 'playing'
      $scope.activePlayer = playerOne;
      $scope.gameStarted = true;
    };
    $scope.submit = function(word){
      if (!isGoodWord(word)) $scope.gameOver();
      else {
        $scope.lettersToShow += word[$scope.lettersToShow.length];
        $scope.activePlayer = $scope.activePlayer === playerOne ? playerTwo : playerOne;
      }
      $scope.activePlayer.submissions.push(word);
    };
    $scope.gameOver = function(){
      $scope.gameState = 'finished';
    };
    $scope.toHome = function(){
      $scope.gameState = 'unstarted';
    }
    function isGoodWord(word){
      if (!window.wordMap[word]) return false;
      if (!($scope.lettersToShow.length < word.length)) return false;
      if (_.contains($scope.activePlayer.submissions, word)) return false;
      for (var i = 0; i < $scope.lettersToShow.length; i++){
        if (word[i] !== $scope.lettersToShow[i]) return false;
      }
      return true;
    }
  });
