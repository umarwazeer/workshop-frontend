<template>
  <div class="card" style="padding: 30px 0px">
        <!-- <div class="left"> -->
      <!-- <h4> Hello! Wellcome in to the SORS Care Service Management System</h4> -->
      <!-- <q-img id="img2" width="60vh" height="40vmax" src="~assets/car-machine.png" class="" ></q-img> -->
        <!-- </div> -->

      <div class="right  q-pa-md shadow-20 q-mt-xl rounded">
        <div class="q-py-md ">
          <q-img src="~assets/login3.png" class="" position="absolute" width="8rem" height="8rem"/>
          </div>
        <div class="q-gutter-md">
          <div
            class="text-h4 text-center   text-cyan-9  text-h4 text-center text-italic text-weight-bolder text-secondary"
          >
            User Register
          </div>
          <q-input
            label="User Name"
            dense
            outlined
             :rules="rules"
            v-model="item.username"
          >

          </q-input>

          <q-input
            label="Email"
            dense
            outlined
             :rules="rules"
            v-model="item.email"
          >

          </q-input>

          <q-input
            type="password"
            v-model="item.password1"
            outlined
            dense
            clearablel
            label="New Password"
          >
           <template v-slot:append>
              <q-icon

                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <q-input
            type="password"
            v-model="item.password2"
            outlined
            dense
            clearablel
            label="Confirm Password"
            class="q-pt-md"
          >
           <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <!-- <a href="#" class="text-right text-light-blue-10">forgot password</a> -->
        </div>
        <div class="text-center ">
          <q-btn class="text-h6 text-capitalize submit-btn submit  full-width q-ma-xl q-pa-sm text-white" @click="regiser"
            >Register Now</q-btn
          >
        </div>
        </div>
  </div>
</template>
<script>
import { Notify } from "quasar";
import { date, LocalStorage } from "quasar";
import axios from "axios";
import { useQuasar } from 'quasar'

import AuthenticationService from './AuthenticationService'


export default {
  name: "login",
  data() {
const $q = useQuasar()

    return {
      isPwd: true,
      required: true,
        rules: [
        value => {
          if (value) return true
          return 'You must enter a first name.'
        },

      ],

      item: {
        username: "",
        password1:"",
        password2:"",
        // remember: "",
      },
    };
  },
  mounted(){

  },
  methods: {
    regiser() {
        axios.then(response => {

          this.$router.push('/')
           this. $q.notify({
          type: 'positive',
          position: 'bottom',
          message: `Wellcome in HRM you Successfully Loged In`
        })

        })
        .catch(error => {
            this.$q.notify({
              position: 'center',
                type: "negative",
                message: `Something went wrong when trying to verify please Enter a valid username and Password `,
              });
          console.error(error)
        })

    },
  },
};
</script>
<style scoped>
.card{
  position: relative;
  display: flex;
  padding: 100px;
  margin: 10px;
  /* padding-left: 0px; */
  justify-content:center;
  align-self: center;
  align-items: center;
  align-content: center;

}
.right{
  padding: 10px;
  width: 25rem;
  align-self: center;
  padding: 1rem;
  border-radius:5px;
  /* position: relative; */
  top: 100px;
  align-items: center;
  text-align: center;

}
h4{
  font-size: 2.125rem;
  font-weight: 400;
  line-height: 3.5rem;
  letter-spacing: 0.00735em;
  font-family: revert;
  color: navy;
}

.submit-btn{
  background-color: #1b7ad8;
  padding: 0px;
  margin: 30px;
}

.rounded{
  border-radius: 10px;
}
@media (max-width:600px) {
  #img2{
    margin-top: 50px;

  }
  .q-header{
    height: 50px;
    align-items: center;
    justify-content:space-evenly;
  }
}
</style>
