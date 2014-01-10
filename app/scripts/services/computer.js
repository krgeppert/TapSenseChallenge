'use strict';

angular.module('tapSenseApp')
  .factory('computer', function () {

    var WordTree = function(){
      this.isWinner = false;
      this.children = {};
      this.wordsBeneath = 0;
      this.isWord = false;
      this.winners = [];
    };
    WordTree.prototype.addWinners = function(){
      if (!this.wordsBeneath){
        this.isWinner = true;
        return true;
      }
      for (var key in this.children){
        if (this.children[key].addWinners()) this.winners.push(key);
      }
      if (_.every(this.children, function(child){
        return !child.isWinner && _.every(child.children, function(grandChild){ 
          return grandChild.isWinner; 
        });
      })) {
        this.isWinner = true;
        return true;
      }
      // if (this.wordsBeneath === this.winners.length) {
      //   this.hasOnlyWinners = true;
      //   parent.winners.push(this);
      // }
    };
    WordTree.prototype.getWordsBeneath = function(prefix, result){
      var result = result || [];
      for (var key in this.children){
        if (this.children[key].isWord) result.push(prefix + key);
        this.children[key].getWordsBeneath(prefix + key, result);
      }
      return result;
    };
    WordTree.prototype.addWord = function(word, index){
      if (index < word.length){
        if (!this.children[word[index]]) this.children[word[index]] = new WordTree();
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
    var Computer = function(){};
    Computer.prototype.getSubmission = function(prefix){
      var node = tree;
      for (var i = 0; i < prefix.length; i++){
        node = node.children[prefix[i]];
      }
      if (node.winners.length){
        console.log('you will lose, mua ha ha');
        var winningChoice = node.winners[Math.floor(Math.random() * node.winners.length)];
        var choices = node.children[winningChoice].getWordsBeneath(prefix + winningChoice);
        if (!choices.length) return prefix + winningChoice;
        return choices[Math.floor(Math.random() * choices.length)];
      } else {
        var choices = node.getWordsBeneath(prefix);
        return choices[Math.floor(Math.random() * choices.length)];
      }
    };
    return new Computer();
  });
