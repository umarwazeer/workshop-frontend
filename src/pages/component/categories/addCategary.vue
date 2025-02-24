<template>
<div class="q-pa-sm">
  <q-card class="q-pa-md">
    <q-form @reset="onReset"  class="q-gutter-md">
      <div class="text-h5">{{ title}}</div>
    <!-- <q-input outlined v-model="item.id" dense label="Categary Id*" /> -->
    <q-input
      outlined
      type="text"
      v-model="item.name"
      dense
      label="Name*"
      lazy-rules
    />
    <!-- <q-input
      outlined
      type="text"
      v-model="item.workshop"
      dense
      label="Role*"
      lazy-rules
    /> -->
    <q-input
      outlined
      type="text"
      v-model="item.description"
      dense
      label="description*"
      lazy-rules
    />
    <div>
      <q-btn label="Submit" @click="onSubmit"  color="primary" />
      <q-btn label="Clear" @click="onClear" type="reset" v-close-popup color="primary" flat class="q-ml-sm" />
    </div>
  </q-form>
  </q-card>

</div>

</template>

<script>
import apiClass from './apiClass'

export default {
  name: "addCategary",
  props: ["item", "isEditing", "title"],

  data() {
    return {
      title:"New Categary",
      // item: {
      //   name:"",
      //   description:"",

      //  }
    };
  },

  methods: {

    onSubmit() {
      this.$emit('addCategary', this.item);

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
