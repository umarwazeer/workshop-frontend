<template>
  <div class="row q-gutter-y-md q-pa-md">

    <div class="col q-pr-md">
      <div class="col q-py-sm">
        <div class="text-h5">Leave Report</div>
      </div>
    <q-separator />

      <q-table
        dense
        title=""
        class="col-auto"
        :rows="rows"
        :filter="filter"
        :columns="columns"
        row-key="id"
        selection="multiple"
        :visible-columns="visibleColumns"

        :pagination.sync="pagination"
        @focusin.native="activateNavigation"
        @focusout.native="deactivateNavigation"
        @keydown.native="onKey"
        v-model:selected.sync="selected"

      >

      <template v-slot:body-cell-status="props">
          <td :props="props" class="">
            <div class="q-gutter-sm">
              <q-btn
                v-if="props.row.status === 'approved'"
                label="Approved"
                class="text-capitalize"
                color="positive"
                icon="check_circle"
                dense
              />
              <q-btn
                v-else-if="props.row.status === 'rejected'"
                label="Rejected"
                class="text-capitalize"
                color="negative"
                icon="highlight_off"
                dense
              />
              <q-btn
                v-else
                @click="viewLeave(props.row.id)"
                label="View Leave"
                outline
                class="text-capitalize"
                icon="edit"
                color="cyan-8"
                dense
              />
              <!-- <q-btn
                v-if="props.row.status !== 'approved' && props.row.status !== 'rejected'"
                @click="rejectLeave(props.row.id)"
                label="Reject"
                class="text-capitalize"
                color="negative"
                icon="close"
                dense
              /> -->
              <q-btn
            v-if="props.row.status !== 'approved' && props.row.status !== 'rejected'"
            @click="approveLeave(props.row.id)"
            label="Approve Leave"
            class="text-capitalize"
            color="positive"
            icon="check_circle"
            dense
          />
          <q-btn
            v-if="props.row.status !== 'approved' && props.row.status !== 'rejected'"
            @click="declineLeave(props.row.id)"
            label="Decline Leave"
            outline
            rounded
            class="text-capitalize"
            color="negative"
            icon="highlight_off"
            dense
          />
            </div>
          </td>
        </template>
        <template v-slot:top>
          <q-input
            label="Type a keyword here"
            class="q-py-sm"
            style="width: 250px"
            outlined
            dense
            rounded
            v-model="filter"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        <q-space/>
        <q-select
          v-model="status"
          :options="statusOptions"
          @update:model-value="handleStatusChange(props.row)"
          dense
          outlined
        >
          <template v-slot:option="option">
            <q-item v-bind="option.itemProps">
              <q-item-section>{{ option.label }}</q-item-section>
            </q-item>
          </template>
        </q-select>
          <div class="q-px-md ">
            <q-btn
              label="Leave request"
              color="cyan-9"
              icon="add"
              rounded
              class="text-capitalize rounded"
              @click="addLeave = true"
            />
          </div>

          <q-select
          v-model="visibleColumns"
          multiple
          outlined
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          option-value="name"
          options-cover
          style="min-width: 150px"
        />

            <q-dialog class="" v-model="addLeave" >
              <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="q-pt-none">
          <leave-page />
        </q-card-section>
      </q-card>
            </q-dialog>
        </template>
        <template v-slot:body-cell-Action="props">
          <td :props="props" class="print-hide">
            <div class="q-gutter-sm q-pr-md" flat>
              <q-btn
                class="float-right"
                @click="del(props.row.id)"
                color="red"
                icon="delete"
                dense
                round
                outline
              >
              </q-btn>
              <q-btn
                class="float-right"
                outline
                color="primary"
                round
                @click="edit(props.row.id)"
                icon="mode_edit"
                dense
              >
              </q-btn>
              <!-- <q-btn
          class="float-right"
          outline
          color="positive"
          round
          @click="approveLeave(props.row.id)"
          icon="check_circle"
          dense
          label="Approve Leave"
        >
        </q-btn>
        <q-btn
          class="float-right"
          outline
          color="negative"
          round
          @click="declineLeave(props.row.id)"
          icon="highlight_off"
          dense
          label="Decline Leave"
        >
        </q-btn> -->
            </div>
          </td>
        </template>
        <template v-slot:body-cell-no="props">
          <td :props="count" class="print-hide">
            {{ this.count}}
          </td>
        </template>
      </q-table>
    </div>
    <!-- <div class="col-4 col-6-md"> -->
      <!-- <q-card>
        <div class="q-pa-sm text-h6 text-body-1">Approved Leaves</div>
        <q-list>
          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="primary" name="local_bar" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Bar XYZ</q-item-label>
              <q-item-label caption>Have a drink.</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="red" name="local_gas_station" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Gas Station</q-item-label>
            <q-item-label caption>Fill your gas tank.</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable>
          <q-item-section avatar>
            <q-icon color="amber" name="local_movies" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Cinema XYZ</q-item-label>
            <q-item-label caption>Watch a movie.</q-item-label>
          </q-item-section>
        </q-item>
      </q-card> -->
      <!-- <add-dep/> -->
    <!-- </div> -->
    <!-- Leave details dialog -->
  <LeaveDetailsDialog
    :visible="viewLeaveDialog"
    :leave="selectedLeave"
    @approve="approveLeave"
    @close="closeLeaveDialog"
  />
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from "axios";
import leavePage from "./leavePage.vue";
import LeaveDetailsDialog from "./LeaveDetailsDialog.vue";

// import add_form from './add_form.vue';
export default {
  components: { leavePage, LeaveDetailsDialog  },
  // components: { add_form },
  data() {
    return {
      addLeave: false,
      filter: "",
      status:"Approve Leave",
      selected: [],
      count:"",
      viewLeaveDialog: false,
      selectedLeave: null,
      visibleColumns: ref([ 'ID', 'leave_type', 'emp_name', 'on_date', 'from_date', 'to_date', 'status' ]),
      columns: [
        {
          name: "id",
          required: true,
          label: "ID",
          align: "left",
          field: (row) => row.id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "leave_type",
          align: "left",
          label: "Leave_Type",
          field: "leave_type",
          sortable: true,
        },
        {
          name: "description",
          align: "left",
          label: "Description",
          field: (row) => {
            // Split the description text into words
            const words = row.description.split(' ');
            // Limit the number of words to display
            const maxWords = 5; // Adjust the number of words as needed
            // Join the first few words with a space
            const truncatedDescription = words.slice(0, maxWords).join(' ');
            // Add ellipsis if there are more words in the description
            return words.length > maxWords ? truncatedDescription + '...' : truncatedDescription;
          },
          sortable: true,
        },
        {
          name: "dep_name",
          align: "left",
          label: "Dep_Name",
          field: "dep_name",
          sortable: true,
        },
        {
          name: "emp_name",
          align: "left",
          label: "Emp_Name",
          field: "emp_name",
          sortable: true,
        },

        {
          name: "on_date",
          align: "left",
          label: "On_date",
          field: "on_date",
          sortable: true,
        },
        {
          name: "from_date",
          align: "left",
          label: "from_date",
          field: "from_date",
          sortable: true,
        },
        {
          name: "status",
          align: "left",
          label: "Status",
          field: "status",
          sortable: true,
        },
        {
          name: "to_date",
          align: "left",
          label: "to_date",
          field: "to_date",
          sortable: true,
        },


        {
          name: "Action",
          align: "right",
          label: "Action",
          field: "Action",
          sortable: false,
        },
      ],
       statusOptions: [
        { label: "Approve Leave", value: "approved" },
        { label: "Decline Leave", value: "rejected" },
        { label: "Pending", value: "pending" },
        // Add more options if needed
      ],
      rows: [],
    };
  },
  mounted() {

    this.get_leave();
  },
  methods: {
    async approveLeave(id) {
      try {
        // API call to approve leave
        const response = await axios.post("/api/leave/approve", { id });
        if (response.status === 200) {
          console.log("Leave approved for ID:", id);
          const leave = this.rows.find((row) => row.id === id);
          if (leave) {
            leave.status = "approved";
          }
          // Display a success message
          this.$q.notify({
            message: "Leave approved successfully",
            type: "positive",
          });
        }
      } catch (error) {
        console.error("Error approving leave:", error);
        // Display an error message
        this.$q.notify({
          message: "Failed to approve leave",
          type: "negative",
        });
      }
    },
    async declineLeave(id) {
      try {
        // API call to decline leave
        const response = await axios.post("/api/leave/decline", { id });
        if (response.status === 200) {
          console.log("Leave declined for ID:", id);
          const leave = this.rows.find((row) => row.id === id);
          if (leave) {
            leave.status = "rejected";
          }
          // Display a success message
          this.$q.notify({
            message: "Leave declined successfully",
            type: "positive",
          });
        }
      } catch (error) {
        console.error("Error declining leave:", error);
        // Display an error message
        this.$q.notify({
          message: "Failed to decline leave",
          type: "negative",
        });
      }
    },

    viewLeave(id) {
      axios.get(`http://127.0.0.1:2024/leave/${id}`)
        .then((response) => {
          this.selectedLeave = response.data;
          this.viewLeaveDialog = true;
        })
        .catch((error) => {
          console.error("Error fetching leave details:", error);
        });
    },

    approveLeave(id) {
      // Update leave status to 'approved' in the backend
      axios.put(`http://127.0.0.1:2024/leave/${id}`, { status: "approved" })
        .then(() => {
          // Update leave status in the frontend
          this.selectedLeave.status = "approved";
          // Close the dialog
          this.closeLeaveDialog();
          // Optionally, show a success message
          this.$q.notify({
            type: "positive",
            message: "Leave approved successfully",
          });
        })
        .catch((error) => {
          console.error("Error approving leave:", error);
          // Optionally, show an error message
          this.$q.notify({
            type: "negative",
            message: "Failed to approve leave",
          });
        });
    },

    rejectLeave(id) {
      axios.put(`http://127.0.0.1:2024/leave/${id}`, { status: "rejected" })
        .then(() => {
          // Update leave status in the frontend
          const leaveIndex = this.rows.findIndex(leave => leave.id === id);
          if (leaveIndex !== -1) {
            this.rows[leaveIndex].status = "rejected";
          }
          this.$q.notify({
            type: "negative",
            message: "Leave rejected successfully",
          });
        })
        .catch((error) => {
          console.error("Error rejecting leave:", error);
          this.$q.notify({
            type: "negative",
            message: "Failed to reject leave",
          });
        });
    },


    closeLeaveDialog() {
      this.viewLeaveDialog = false;
      this.selectedLeave = null;
    },

    get_leave() {
      axios.get("http://127.0.0.1:2024/leave").then((res) => {
        this.rows = res.data;
        console.log("res", res.data)
        //   for(let i=1; i<res.data.length; i++){
        //       this.count = i
        //       console.log("count", this.count)

        //   }

      });
    },

    del(id) {
      axios
        .delete("http://127.0.0.1:2024/leave/" + id)
        .then((response) => {
          console.log(response.data.name);
          alert(id + "record delete  successfully.. ");
          this.get_leave();
        })
        .catch((error) => {
          console.log(error);
          this.$q.notify({
            type: "negative",
            message: `Something went wrong when trying to verify`,
          });
        });
    },

    edit(id) {
        axios.get(`http://127.0.0.1:2024/leave/${id}`)
          .then((response) => {
            // Navigate to the leave page and pass the leave record data as route params
            // this.$router.push({ name: 'editLeave', params: { leaveData: response.data } });
            this.$router.push('/leavePage');
          })
          .catch((error) => {
            console.error("Error fetching leave details:", error);
            // Handle error
          });
      },

  },
};
</script>
