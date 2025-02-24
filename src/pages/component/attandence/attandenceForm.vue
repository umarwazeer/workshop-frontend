<template>
  <div class="col-4 q-pa-sm">
    <div>
      <!-- <q-btn @click="captureImage = true">CaptureImage</q-btn>
      <q-dialog v-model="captureImage" persistent> -->
      <!-- <camera/> -->
      <!-- </q-dialog> -->
    </div>
    <form @submit.prevent="submitForm">
      <q-item-section class="q-gutter-md q-pa-md">
        <q-input
          type="text"
          outlined
          dense
          label="enter your Employee Id"
          style="width: 300px"
        ></q-input>
        <q-btn type="submit" @click="mark = true" color="cyan-9" class="text-capitalize"
          >Applye
        </q-btn>
         <q-dialog v-model="mark" persistent>
          <div class="col- col-8" width="500px">
            <new_attandence  />
            <q-btn flat round dense icon="close"  v-close-popup />
              <!-- <div class="q-px-sm q-py-sm absolute-right">
                <q-btn flat round dense icon="close" v-close-popup />
              </div> -->
            </div>
         </q-dialog>
      </q-item-section>
    </form>
  </div>
</template>

<script>
// import Test from '../test.vue';
import Camera from "./camera.vue";
import new_attandence from './new_attandence.vue';

export default {
  components: {
    Camera,
    Test,
    new_attandence,
  },
  data() {
    return {
      captureImage: false,
      name: "",
      mark: false,
    };
  },
  methods: {
    submitForm() {
      const attendanceData = {
        name: this.name,
        image: this.$route.params.imageData,
      };

      // Send attendanceData to the server and store it in the database
      // You can use Axios or any other HTTP library to send the data

      // Example Axios code:
      // axios.post('/api/attendance', attendanceData)
      //   .then(response => {
      //     console.log('Attendance recorded successfully');
      //   })
      //   .catch(error => {
      //     console.log('Error recording attendance:', error);
      //   });
    },
  },
};
</script>
