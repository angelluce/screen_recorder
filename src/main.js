const button = document.getElementById('start');

button.addEventListener('click', async () => {
    const media = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 10 } },
        audio: true
    });

    const recorder = new MediaRecorder(media, {
        mimeType: 'video/webm; codecs=vp8, opus'
    });

    recorder.start();

    const [video] = media.getVideoTracks();

    video.addEventListener('ended', () => {
        recorder.stop();
    });

    recorder.addEventListener('dataavailable', (e) => {
        const url = document.createElement('a');
        url.href = URL.createObjectURL(e.data);
        url.download = 'video.webm';
        url.click();
    });

});