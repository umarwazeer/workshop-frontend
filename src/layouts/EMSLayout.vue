<template>
  <q-layout view="lHh Lpr lff" class="bg-grey-1">
    <q-header >
      <div class="header1 text-white print-hide">
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />
          <q-toolbar-title>Wellcome! Car Service Management System</q-toolbar-title>
          <div>
            <q-icon style="width: 40px; height: 40px; cursor: pointer; transition: 0.3s;">
            <!-- <q-img  src="~assets/bell2.png" style="border-radius: 50%" /> -->
          </q-icon>
            <q-btn  @click="confirm = true" flat icon="logout" />

            <q-dialog v-model="confirm" persistent>
           <q-card>

        <q-card-section class="row items-center">
          <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
          <span class="q-ml-sm text-h5">Now! You are Confirm To logout! </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Logout" @click="logout" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
          </div>

          <label class="q-pr-sm">Admin </label>
          <q-icon style="width: 30px; height: 30px">
            <q-img src="~assets/login3.png" style="border-radius: 50%" />
          </q-icon>

        </q-toolbar>

      </div>
    </q-header>

    <!-- <div v-else>
      <div class="text-h5 q-pa-md">Please log in to access the Home Page</div>
    </div> -->
    <q-page-container elevated fixednew_employee view="lHh Lpr lFf" class="bg-grey q-pt-xs print-hide"></q-page-container>

    <!-- Drawer -->
    <q-drawer
      class="bg-grey-10"
      id="bg-color"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :breakpoint="500"
      bordered
      :width="230"
      v-model="leftDrawerOpen"
    >
    <div class="text-center q-py-md ">
        <q-avatar size="60px">
          <q-img src="~assets/login3.png" style="max-width: 100%;" />
        </q-avatar>
        <q-item class="text-white">
          <q-item-section>
            <q-item-label class="text-body1">{{username}}</q-item-label>
            <q-item-label class="text-cyan-9 title1">Car Service Management Sysstem </q-item-label>
          </q-item-section>
        </q-item>
      </div>
      <q-list padding class="q-pt-sm">

        <!-- Dashboard -->
        <q-item clickable v-ripple active to="/emp-dashboard" class="text-white">
          <q-item-section avatar><q-icon name="group" /></q-item-section>
          <q-item-section><q-item-label>Dashboard</q-item-label></q-item-section>
        </q-item>

        <q-item clickable v-ripple active to="/empl-list" class="text-white">
          <q-item-section avatar><q-icon name="group" /></q-item-section>
          <q-item-section><q-item-label>Employee</q-item-label></q-item-section>
        </q-item>


        <!-- Payroll -->
          <q-item clickable v-ripple active to="/productTable" class="text-white">
            <q-item-section avatar><q-icon name="description" /></q-item-section>
            <q-item-section><q-item-label>Product list</q-item-label></q-item-section>
          </q-item>

        <q-item clickable v-ripple active to="/list_dep" class="text-white">
          <q-item-section avatar><q-icon name="group_work" /></q-item-section>
          <q-item-section><q-item-label>Categray</q-item-label></q-item-section>
        </q-item>

        <q-item clickable v-ripple active to="/carTable" class="text-white">
          <q-item-section avatar><q-icon name="group" /></q-item-section>
          <q-item-section><q-item-label>Car Model</q-item-label></q-item-section>
        </q-item>

        <q-item clickable v-ripple active to="/new_attandence" class="text-white">
          <q-item-section avatar><q-icon name="group" /></q-item-section>
          <q-item-section><q-item-label>Reports</q-item-label></q-item-section>
        </q-item>

        <q-item clickable v-ripple active to="/bill_model" class="text-white">
          <q-item-section avatar><q-icon name="group" /></q-item-section>
          <q-item-section><q-item-label>Bill Model</q-item-label></q-item-section>
        </q-item>

        <q-item clickable v-ripple active to="/" class="text-white">
          <q-item-section avatar><q-icon name="group_add" /></q-item-section>
          <q-item-section><q-item-label>Add Service</q-item-label></q-item-section>
        </q-item>


        <q-item clickable v-ripple active to="/inventory" class="text-white">
          <q-item-section avatar><q-icon name="group" /></q-item-section>
          <q-item-section><q-item-label>Inventory</q-item-label></q-item-section>
        </q-item>

           <!-- Account Settings -->
          <q-item clickable v-ripple active to="/AccountSettings" class="text-white">
          <q-item-section avatar><q-icon name="settings" /></q-item-section>
          <q-item-section><q-item-label>Account Settings</q-item-label></q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Main Content -->
    <q-page-container style="padding-top: 0px;">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import { exportFile, useQuasar } from "quasar";
import { Dialog } from "quasar";
import { AppFullscreen } from "quasar";
import { Dark } from "quasar";
import AuthenticationService from "../pages/authentication/AuthenticationService";

export default {
  name: "MainLayout",
  setup() {
    return {
      darkmode:false,
      medium: ref(false),
      confirm: ref(false),
    };
  },

  data() {
    return {
      username:"",
      value: false,
      fullscreen: false,
      list: {
        userName: "",
        password: "",
      },
      leftDrawerOpen: false,
    };
  },

  computed: {
    isAuthenticated() {
      return AuthenticationService.isAuthenticated();
    },
  },
  mounted() {
    this.getuserdata()
    this.isAuthenticated,
    this.performApiRequest();

  },
  methods: {
    logout(){
      AuthenticationService.logout();
      this.$router.push("/LoginPage");

    },
    async getuserdata(){
      await AuthenticationService.getUserDetail().then((res) => {
      this.username = res.data.email
          console.log("userDetail", res.data)
          })
    },
    async performApiRequest() {
      try {
        const response = await AuthenticationService.getEmployees();
        // this.showSessionExpiredDialog();
        // alert("session hase expire....")

        console.log("Response:", response);
      } catch (error) {
        console.error("Error:", error);
        if (error.response && error.response.status === 401) {
          this.showSessionExpiredDialog();

          try {
            // Attempt to refresh the access token
            // await AuthenticationService.refreshAccessToken();
            // Retry the original API request with the new access token
            const response = await AuthenticationService.getEmployees();
            console.log("Response after token refresh:", response);
          } catch (refreshError) {
            console.error("Error refreshing token:", refreshError);
            // Show a dialog to the user indicating session expiration
            this.showSessionExpiredDialog();
          }
        }
      }
    },


  async refreshAccessToken() {
    try {
      const access_token = localStorage.getItem('access_token');
      const refreshTokenResponse = await AuthenticationService.refreshToken(access_token);
      // Update the access token in local storage with the new token
      const new_access_token = refreshTokenResponse.data.access_token;
      localStorage.setItem('access_token', new_access_token);
    } catch (error) {
      throw new Error("Error refreshing access token");
    }
  },


  showSessionExpiredDialog() {
    this.$q.dialog({
      title: 'Session Expired',
      message: 'Your session has expired. Please log in again.',
      // to:'LoginPage',
      ok: {
        push: true,
        handler: () => {
          // Redirect the user to the login page
          this.$router.push('/LoginPage');
        }
      }
    });
  },


    newEmployee() {
      this.$router.push("/new_employee");
    },


    add() {
      this.$router.push("new_employee");
    },
    btn() {
      this.$router.push("empl-list");
    },

    reloadPage() {
      window.location.reload();
    },
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
};
</script>
<style scoped>

body{
  padding-top:0px;
}
#expenstion:hover{
  background-color: #1d3655;
  color: #fff;
}
.title1{
  margin-top: 4px;
  font-size: medium;
  color: #24cde0 !important;
  font-family: 'Roboto';
  font-weight: 500;
}
.header1{
  background-color: #1b7ad8;

}
.text-black {
    color: #272021c7 !important;
    font-size: larger;
    font-family: system-ui;
    padding-left: inherit;
}
.bg-grey-10{
  transition: .3s;
}
/* #bg-color{
    background: #001013 !important;
    color: #fff;
} */
/* .q-pr-sm {
    font-size: 1.2vw;
    padding-right: 0px 12px;
} */
</style>


