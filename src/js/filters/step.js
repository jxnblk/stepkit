
// Convert integer to 4/4 beat decimal string
module.exports = function() {
  return function(step) {
    var beat = Math.ceil(step/4);
    var tick = step%4 || 4;
    return beat + '.' + tick;
  };
};

