'use strict';

angular.module('tapSenseApp')
  .factory('wordMap', function () {

    return new PrefixTree();
  });
