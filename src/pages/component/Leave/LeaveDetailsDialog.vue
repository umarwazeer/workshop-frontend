<template>
  <q-dialog :model-value="visible" @update:model-value="updateVisible">
    <q-card>
      <q-card-section>
        <q-card-title class="text-h6">
          {{ leave.status === 'approved' ? 'Leave Approved' : (leave.status === 'rejected' ? 'Leave Rejected' : 'Leave Details') }}
        </q-card-title>
      </q-card-section>

      <q-card-section v-if="leave.status !== 'rejected'">
        <q-list>
          <q-item>
            <q-item-label>Leave Type:</q-item-label>
            <div class="q-pl-md">{{ leave.leave_type }}</div>
          </q-item>
          <q-item>
            <q-item-label>Description:</q-item-label>
            <div class="q-pl-md">{{ leave.description }}</div>
          </q-item>
          <q-item>
            <q-item-label>Department:</q-item-label>
            <div class="q-pl-md">{{ leave.dep_name }}</div>
          </q-item>
          <q-item>
            <q-item-label>Employee:</q-item-label>
            <div class="q-pl-md">{{ leave.emp_name }}</div>
          </q-item>
          <q-item>
            <q-item-label>On Date:</q-item-label>
            <div class="q-pl-md">{{ leave.on_date }}</div>
          </q-item>
          <q-item>
            <q-item-label>From Date:</q-item-label>
            <div class="q-pl-md">{{ leave.from_date }}</div>
          </q-item>
          <q-item>
            <q-item-label>To Date:</q-item-label>
            <div class="q-pl-md">{{ leave.to_date }}</div>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Close" color="primary" @click="closeDialog" />
        <q-btn
          v-if="leave.status !== 'approved' && leave.status !== 'rejected'"
          label="Approve"
          color="positive"
          @click="approveLeave"
        />
        <q-btn
          v-if="leave.status !== 'approved' && leave.status !== 'rejected'"
          label="Reject"
          color="negative"
          @click="rejectLeave"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    leave: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    updateVisible(value) {
      this.$emit("update:visible", value);
    },

    closeDialog() {
      this.$emit("close");
    },
    approveLeave() {
      this.$emit("approve", this.leave.id);
    },

    rejectLeave() {
      axios.put(`http://127.0.0.1:2024/leave/${this.leave.id}`, { status: "rejected" })
        .then(() => {
          this.$q.notify({
            type: "negative",
            message: "Leave rejected successfully",
          });
          // Emit event to update leave status in parent component
          this.$emit('leave-updated', { id: this.leave.id, status: 'rejected' });
        })
        .catch((error) => {
          console.error("Error rejecting leave:", error);
          this.$q.notify({
            type: "negative",
            message: "Failed to reject leave",
          });
        });
    },


  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
