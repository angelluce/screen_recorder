const button = document.getElementById('start');
const toast = document.getElementById('toast');
let isRecording = false;

showToast('Hola, bienvenido :)');

button.addEventListener('click', async () => {
    if (isRecording) {
        showToast('Ya hay una grabación activa');
        return;
    }

    try {
        const media = await navigator.mediaDevices.getDisplayMedia({
            video: { frameRate: { ideal: 10 } },
            audio: true
        });

        const recorder = new MediaRecorder(media, {
            mimeType: 'video/webm; codecs=vp8, opus'
        });

        recorder.start();
        isRecording = true;

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

        recorder.addEventListener('stop', () => {
            isRecording = false;
        });
    } catch (err) {
        showToast('No se ha iniciado la grabación');
        // console.error('Error al iniciar la grabación:', err);
        isRecording = false;
    }
});

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}