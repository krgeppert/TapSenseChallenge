var fs = require('fs');
fs.readFile('./words.txt', function(err, data){
  if (err) throw err;
  var words = [];
  var word = '';
  for (var i = 0; i < data.length; i++){
    if (String.fromCharCode(data[i]) === ' ') {
      words.push(word);
      word = '';
    } else {
      word += String.fromCharCode(data[i]);
    }
  }
  fs.writeFile('wordMap.js', 'var allWords = ' + JSON.stringify(words), function(err){if (err) throw err;});
});
