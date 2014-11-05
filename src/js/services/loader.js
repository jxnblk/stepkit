
module.exports = function($http, $q, bumpkit) {

  var self = this;

  this.init = function() {
    var deferred = $q.defer();
    $http.get('data/kits.json').success(function(response) {
      bumpkit.kits = response;
      self.loadKit(bumpkit.kits[0], function(tracks) {
        deferred.resolve(tracks);
      });
    });
    return deferred.promise;
  };

  this.loadKit = function(kit, callback) {
    var total = 0;
    for (var i = 0; i < kit.samples.length; i++) {
      (function(index) {
        bumpkit.loadBuffer(kit.samples[index].url, function(response) {
          bumpkit.tracks[index].name = kit.samples[index].name;
          bumpkit.tracks[index].sampler.buffer(response);
          total++;
          if (total == kit.samples.length) {
            if (callback) callback(bumpkit.tracks);
          };
        })
      })(i);
    }
  };

  this.loadSample = function(index, sample) {
    console.log('to do: load ' + sample + ' in track ' + index + 1);
  };

};

