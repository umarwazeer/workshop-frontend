<template>
  <q-layout view="lHh Lpr lFf " class="main">

    <q-header class="header">
      <q-toolbar class=" flex flex-center justify-center  q-px-xl text-capitaliz">
        <q-toolbar-title class="" >
          <a href="/" style="text-decoration: none; color: #fff;"> Car Service Management System</a>
        </q-toolbar-title>
          <div class="item q-gutter-md">
          <q-btn label="User Login" class="text-capitalize" to="/LoginPage" flat> </q-btn>
          <q-btn label="Admin" class="text-capitalize" dense flat to="/SignUp" ></q-btn>
          <!-- <q-btn label="Sign in" to="/SignUp" dense flat /> -->
        </div>
        <q-btn flat round>
        <i class="ri-menu-3-line" @click="showing = true"></i>
        </q-btn>
        <div class="q-gutter-md row">
        <q-menu v-model="showing">
        <q-list style="min-width: 100px">
          <q-item clickable v-close-popup>
            <q-item-section>New tab</q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section>New incognito tab</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable v-close-popup>
            <q-item-section>Recent tabs</q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section>History</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
      </div>

      </q-toolbar>
    </q-header>
    <router-view />
  </q-layout>

</template>
<script>

import { defineComponent } from "vue";
import { ref } from 'vue'

export default defineComponent({
  name: "App",
  setup () {
    return {
      showing: ref(false)
    }
  }
});
</script>
<style>
.header{
background-color: #07529c;
padding: 6px;
}
.q-toolbar-title{
  margin-left: 30px;
}
.q-toolbar {
    /* position: relative; */
    justify-content: space-around;
    /* padding: 0px 35px;
    width: 100%; */
    /* padding-top: 0px; */

}
.q-gutter-md i{
  display: none;
}
@media (max-width: 600px) {
   .item {
    display: none;
   }
   .q-toolbar i{
    display: block;
   }
}
.q-toolbar i {
  font-size: 21px;
  font-weight: 800px;

}
</style>
