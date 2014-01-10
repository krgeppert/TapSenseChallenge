'use strict';

angular.module('tapSenseApp')
  .factory('computer', function () {
    var numberOfLosers = 0;
    var WordTree = function(){
      this.isWinner = false;
      this.children = {};
      this.wordsBeneath = 0;
      this.isWord = false;
      this.winners = [];
      this.losers = [];
    };
    WordTree.prototype.addWinners = function(){
      if (!this.wordsBeneath){
        this.isWinner = true;
        return true;
      }
      _.each(this.children, function(child, letter){
        if (child.addWinners()){
          this.winners.push(letter);
        }
      },this);
      if (_.every(this.children, function(child){
        return !child.isWinner && _.every(child.children, function(grandChild){
          return grandChild.isWinner;
        });
      })) {
        this.isWinner = true;
        return true;
      }
    };
    WordTree.prototype.addLosers = function(){
      var that = this;
      _.each(this.children, function(child, letter){
        if (child.addLosers()){
          this.losers.push(letter);
        }
      }, that);
      if (this.wordsBeneath && _.every(this.children, function(child){return child.isWinner;})) {
        this.isLoser = true;
        numberOfLosers++;
        return true;
      }
    };
    WordTree.prototype.getWordsBeneath = function(prefix, result){
      var result = result || [];
      for (var key in this.children){
        if (this.children[key].isWord){
          result.push(prefix + key);
        }
        this.children[key].getWordsBeneath(prefix + key, result);
      }
      return result;
    };
    WordTree.prototype.addWord = function(word, index){
      if (index < word.length){
        if (!this.children[word[index]]){
          this.children[word[index]] = new WordTree();
        }
        this.wordsBeneath++;
        this.children[word[index]].addWord(word, ++index);
      } else {
        this.isWord = true;
      }
    };

    var tree = new WordTree();
    var i = 0;
    for (var word in window.wordMap){
      // if (i++ > 200) break;
      tree.addWord(word, 0);
    }
    window.tree = tree;
    tree.addWinners();
    tree.addLosers();
    console.log(numberOfLosers);
    var Computer = function(){};
    Computer.prototype.getSubmission = function(prefix){
      var choices;
      var node = tree;
      for (var i = 0; i < prefix.length; i++){
        node = node.children[prefix[i]];
      }
      if (node.winners.length){
        console.log('you will lose, mua ha ha');
        var winningChoice = node.winners[Math.floor(Math.random() * node.winners.length)];
        choices = node.children[winningChoice].getWordsBeneath(prefix + winningChoice);
        if (!choices.length) return prefix + winningChoice;
      } else {
        var notBadChoices = [];
        console.log(node.losers);
        for (var letter in node.children){
          if (!_.contains(this.losers, letter)){
            notBadChoices.push(letter);
          }
        }
        if (!notBadChoices.length){
          choices = node.getWordsBeneath(prefix);
        } else {
          var aChoice = notBadChoices[Math.floor(Math.random() * notBadChoices.length)];
          choices = node.children[aChoice].getWordsBeneath(prefix + aChoice);
        }
      }
      return choices[Math.floor(Math.random() * choices.length)];
    };
    return new Computer();
  });
