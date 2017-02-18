// let source = ;
// let pTag = document.getElementsByClassName('number')[0];
//
// let audioCtx = new AudioContext();
// let analyser = audioCtx.createAnalyser();
// let audioBuffer = audioCtx.createMediaElementSource(source);
//
// audioBuffer.connect(analyser);
// analyser.connect(audioCtx.destination);
// audioBuffer.start = audioBuffer.noteOn();

// let audio = document.getElementsByClassName('song')[0];
// let context = new AudioContext();
// let source = context.createMediaElementSource(audio);
// let analyser = context.createAnalyser();
// analyser.fftSize = 2048;
//
// source.connect(analyser);
// analyser.connect(context.destination);

window.onload = function() {
  let ctx = new AudioContext();
  let audio = document.getElementById('song');
  let audioSrc = ctx.createMediaElementSource(audio);
  let analyser = ctx.createAnalyser();

  audioSrc.connect(analyser);
  analyser.connect(ctx.destination);
  analyser.fftSize = 64;

  let frequencyData = new Uint8Array(analyser.frequencyBinCount);

  function renderFrame() {
     analyser.getByteFrequencyData(frequencyData);
     console.log(frequencyData);
     requestAnimationFrame(renderFrame);
  }

  audio.play();
  renderFrame();
};
