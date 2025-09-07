// assets/js/tts-dialog.js
// Global audio player for TTS previews
const previewPlayer = new Audio();

/**
 * Play a preview of generated voice audio.
 * @param {Blob} blob - Audio data blob to preview.
 */
async function previewVoice(blob) {
  let url;
  try {
    url = URL.createObjectURL(blob);
    previewPlayer.src = url;
    await previewPlayer.play();
    await new Promise((resolve) =>
      previewPlayer.addEventListener('ended', resolve, { once: true })
    );
  } finally {
    if (url) {
      URL.revokeObjectURL(url);
    }
  }
}
