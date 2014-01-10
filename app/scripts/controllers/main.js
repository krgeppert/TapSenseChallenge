'use strict';

angular.module('tapSenseApp')
  .controller('MainCtrl', function ($scope, computer) {
    $scope.gameState = 'unstarted';
    $scope.lettersToShow = '';
    var playerOne;
    var playerTwo;
    var oldType;
    $scope.startGame = function(type){
      oldType = type || oldType;
      playerOne = {name : 'one', submissions: []};
      playerTwo = {name : 'two', submissions: [], type: oldType};
      $scope.players = [playerOne, playerTwo];
      $scope.lettersToShow = '';
      $scope.gameState = 'playing'
      $scope.activePlayer = playerOne;
      $scope.gameStarted = true;
    };
    $scope.submit = function(word){
      word = word.toLowerCase();
      $scope.activePlayer.submissions.push(word);
      if (!isGoodWord(word)) {
        $scope.gameOver();
        return;
      }
      else {
        $scope.lettersToShow += word[$scope.lettersToShow.length];
        $scope.activePlayer = $scope.activePlayer === playerOne ? playerTwo : playerOne;
      }
      if ($scope.activePlayer.type === 'computer'){
        $scope.submit(computer.getSubmission($scope.lettersToShow));
      }
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
      for (var i = 0; i < $scope.lettersToShow.length; i++){
        if (word[i] !== $scope.lettersToShow[i]) return false;
      }
      return true;
    }
  });
