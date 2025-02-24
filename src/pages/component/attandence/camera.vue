<template>
  <div>
    <div>
        <q-btn icon="add_a_photo"></q-btn>
    </div>
    <video ref="video" width="260" height="200" autoplay></video>
    <canvas ref="canvas" style="display: none;">bbaksbf</canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    const video = this.$refs.video;
    const canvas = this.$refs.canvas;
    const context = canvas.getContext('2d');

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          video.srcObject = stream;
        })
        .catch(error => {
          console.log('Error accessing camera:', error);
        });
    }

    setInterval(() => {
      context.drawImage(video, 0, 0, 320, 240);
      const imageData = canvas.toDataURL('image/jpeg');
      this.$emit('image-captured', imageData);
    }, 100);
  }
};
</script>
