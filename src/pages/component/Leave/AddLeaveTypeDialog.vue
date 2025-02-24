<template>
  <q-dialog v-model="dialogVisible">
    <q-card>
      <q-card-section>
        <q-input v-model="newLeaveType" label="New Leave Type" outlined />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Cancel" color="primary" @click="closeDialog" v-close-popup />
        <q-btn label="Add" color="primary" @click="addLeaveType"  v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      newLeaveType: ''
    };
  },
  methods: {
    closeDialog() {
      this.dialogVisible = false;
    },
    addLeaveType() {
      if (this.newLeaveType) {
        this.$emit('add-leave-type', this.newLeaveType);
        this.closeDialog();
      }
    }
  }
};
</script>
