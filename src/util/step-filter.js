
module.exports = function(step) {
  step = step + 1;
  var beat = Math.ceil(step/4);
  //if (beat == 0) beat = 1;
  var tick = step%4 || 4;
  return beat + '.' + tick;
};

