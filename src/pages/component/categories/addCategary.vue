<template>
<div class="q-pa-sm">
  <q-card class="q-pa-md">
    <q-form @reset="onReset"  class="q-gutter-md">
      <div class="text-h5">{{ title}}</div>

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
      v-model="item.description"
      dense
      label="description*"
      lazy-rules
    />
    <div >
      <q-btn :label="isEditing ? 'Update' : 'Submit'"  @click="onSubmit" color="primary" />
      <!-- <q-btn label="Clear" @click="onClear" type="reset" v-close-popup color="primary" flat class="q-ml-sm" /> -->
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
    };
  },

  methods: {
    onSubmit() {
      this.$emit('addCategary', this.item);
    },
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
