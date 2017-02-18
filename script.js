window.onload = function() {
  const ctx = new AudioContext();
  const audio = document.getElementById('song');
  const audioSrc = ctx.createMediaElementSource(audio);
  const analyser = ctx.createAnalyser();
  const canvas = document.getElementById('canvas');
  const ctxCanvas = canvas.getContext('2d');
  ctxCanvas.fillStyle = 'green';


  audioSrc.connect(analyser);
  analyser.connect(ctx.destination);
  analyser.fftSize = 64;

  const frequencyData = new Uint8Array(analyser.frequencyBinCount);

  function renderFrame() {
     analyser.getByteFrequencyData(frequencyData);
     ctxCanvas.clearRect(0, 0, 300, 300);
     frequencyData.forEach((value, i) => {
       ctxCanvas.fillRect(value, i*10, 10, 10);
     });
     console.log(frequencyData);
     requestAnimationFrame(renderFrame);
  }

  audio.play();
  renderFrame();
};
