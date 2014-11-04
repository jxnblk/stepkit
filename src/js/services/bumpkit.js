
var Bumpkit = require('bumpkit');

module.exports = function($http) {

  bumpkit = new Bumpkit();

  bumpkit.kits = [];

  bumpkit.mixer = bumpkit.createMixer();

  bumpkit.tracks = [];

  for (var i = 0; i < 8; i++) {
    bumpkit.mixer.addTrack();
    bumpkit.tracks[i] = {};
    bumpkit.tracks[i].sampler = bumpkit.createSampler({ connect: bumpkit.mixer.tracks[i] });
    bumpkit.tracks[i].clip = bumpkit.createClip({ connect: bumpkit.tracks[i].sampler });
    bumpkit.tracks[i].clip.pattern = [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0];
  }

  bumpkit.metronome = {};
  bumpkit.metronome.beep = bumpkit.createBeep().frequency(512);
  bumpkit.metronome.clip = bumpkit.createClip({ connect: bumpkit.metronome.beep });
  bumpkit.metronome.clip.pattern = [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0];
  //bumpkit.metronome.clip.connect(bumpkit.metronome.beep);

  bumpkit.loopLength = 16;


  $http.get('data/kits.json').success(function(response) {
    bumpkit.kits = response;
    loadKit(bumpkit.kits[0]);
  });

  function loadKit(kit) {
    for (var i = 0; i < kit.samples.length; i++) {
      (function(index) {
        bumpkit.loadBuffer(kit.samples[index].url, function(response) {
          bumpkit.tracks[index].sampler.buffer(response);
          console.log(index, response);
        })
      })(i);
    }
  }


  return bumpkit;

};
