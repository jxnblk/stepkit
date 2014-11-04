
var Bumpkit = require('bumpkit');

module.exports = function() {

  bumpkit = new Bumpkit();

  bumpkit.mixer = bumpkit.createMixer()
                    .addTrack().addTrack().addTrack().addTrack()
                    .addTrack().addTrack().addTrack().addTrack();

  bumpkit.metronome = {};
  bumpkit.metronome.clip = bumpkit.createClip();
  bumpkit.metronome.clip.pattern = [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0];
  bumpkit.metronome.beep = bumpkit.createBeep().frequency(512);
  bumpkit.metronome.clip.connect(bumpkit.metronome.beep);

  bumpkit.loopLength = 16;

  //bumpkit.playPause();

  return bumpkit;

};
