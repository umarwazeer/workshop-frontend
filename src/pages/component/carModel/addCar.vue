<template>
<div class="q-pa-sm">
  <q-card class="q-pa-md">
    <q-form @reset="onReset"  class="q-gutter-md">
      <div class="text-h5">{{ title}}</div>
    <!-- <q-input outlined v-model="item.id" dense label="Categary Id*" /> -->
    <q-input
      outlined
      type="text"
      v-model="item.owner_name"
      dense
      label="owner_name*"
      lazy-rules
    />
    <q-input
      outlined
      type="text"
      v-model="item.phone_number"
      dense
      label="phone_number*"
    />
    <q-input
      outlined
      type="text"
      v-model="item.registration_number"
      dense
      label="Registration_number*"
    />
    <q-input
      outlined
      type="text"
      v-model="item.model"
      dense
      label="Model*"
      lazy-rules
    />
    <q-input
      outlined
      type="text"
      v-model="item.color"
      dense
      label="Color number*"
      lazy-rules
    />
   <!-- File Input for Image Upload -->
          <q-file
          v-model="item.logo"
          label="Upload Logo"
          @update:model-value="onFileChange"
        />

        <!-- Preview Image -->
        <div v-if="item.logo">
          <img :src="item.logo" alt="Car Logo" class="q-mt-md" style="max-width: 150px; height: auto;">
        </div>


    <div>
      <q-btn label="Submit" @click="onSubmit"  color="primary" />
      <q-btn label="Clear" @click="onClear" type="reset" v-close-popup color="primary" flat class="q-ml-sm" />
    </div>
  </q-form>
  </q-card>

</div>

</template>

<script>
import axios from 'axios';

export default {
  name: "addCategary",
  props: ["item", "isEditing", "title"],

  data() {
    return {
      title:"New Car",
    };
  },

  methods: {

    onSubmit() {
      this.$emit('addCar','onFileChange' ,this.item);

    },
    onClear() {
      this.item.name = ''
      this.item.workshop = ''
      this.item.description = ''
    },
    // createDepartment() {
    //   console.log("this item", this.item)
    //   // this.newDep.id = Math.floor(Math.random() * 1000000 + 1);
    //   apiMaker.createDepartment(this.newDep).then((response) => {
    //     if (response.status == 201) {
    //       // this.newDep.name = "";
    //       this.get_department();
    //       this.$q.notify({
    //         type: "positive",
    //         position: "top",
    //         message: "Your data successfully added",
    //       });
    //     }
    //   }).catch((error) => {
    //     alert(error);
    //     console.log(error.data);
    //   });
    // },
  },
  watch: {
    isEditing(newVal) {
      this.title = newVal ? 'Edit Department' : 'New Department';
    }
  }
};
</script>
<style>
@media (max-width: 800px) {
  .q-form {
    /* background-color: lightblue; */
    width: auto;
  }
  .row > .col-3, .row > .col-xs-3 {
    height: auto;
    width: 100%;
}

}

</style>
