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
    <q-input
      outlined
      type="text"
      v-model="item.workshop"
      dense
      label="Role*"
      lazy-rules
    />
    <q-input
      outlined
      type="text"
      v-model="item.description"
      dense
      label="workshop Name*"
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

export default {
  name: "add_form",
  props: ["item", "isEditing", "title"],

  data() {
    return {
      title:"Add New Categary",
      item: {
        name:"",
        workshop:"",
        description:"",

       }
    };
  },

  methods: {

    onSubmit() {

      this.$emit('add_form');
    },
    onClear() {
      this.item.name = ''
      this.item.workshop = ''
      this.item.description = ''
    }
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
