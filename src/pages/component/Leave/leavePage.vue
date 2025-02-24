<template>
  <q-card flat class="q-pa-sm">
    <div class="text-h5 q-py-sm q-px-md ">
      <div>Create Leave</div>
    </div>
     <!-- <div class="q-px-md q-gutter-sm">
        <q-dialog v-model="toolbar">
          <q-card>
            <q-toolbar>
              <q-avatar>
                <img src="~assets/umar.png" />
              </q-avatar>
              <q-toolbar-title
                ><span class="text-weight-bold">M umar khan</span>
                {{ item.username }}</q-toolbar-title
              >
              <q-btn flat round dense icon="close" v-close-popup />
            </q-toolbar>
            <q-card-section> 12/23/1023 </q-card-section>
            <q-card-section>
              To
              <div>From Date :{{ item.to_date }}</div>
              <div>Department :{{ item.deparmtent }}</div>
            </q-card-section>

            <q-card-section> Dear Sir, {{ item.description }} </q-card-section>
            <q-card-section> On Date :{{ item.on_date }} </q-card-section>

            <span class="row">
              <q-btn
                class="col-12 bg-secondary text-capitalize text-white"
                type="text"
                @click="toolbar = true"
                label="Apply Leave Request"
              >
              </q-btn>
            </span>
          </q-card>
        </q-dialog>
      </div> -->
    <div class="row q-px-sm">
      <div class="col-md-6 q-pt-md col-sm-5 col-xs-12 q-gutter-y-md q-px-xs">
        <q-input type="text" label="Enter Employee Id " outlined v-model="item.emp_id" dense />
        <div class="col-auto q-gutter-x-md q-gutter-md">
          <q-select
            class="col-auto"
            label="Leave type"
            options-dense
            :options="leaveTypes"
            v-model="item.leave_type"
            dense
            outlined
          >
          <template v-slot:append >
                  <q-btn
                    round
                    dense
                    flat
                    color="primary"
                    icon="add"
                    @click="openDialog"
                    @click.stop
                  />

                </template>
              </q-select>
               <!-- Include the add leave type dialog -->
    <add-leave-type-dialog v-model="dialogVisible" ref="addLeaveTypeDialog"  @add-leave-type="handleAddLeaveType" />
    <q-input   dense
          class="col"
          label="On Request Date"
            outlined
            clearable
            v-model="item.on_date"
            mask="####-##-##"
            :rules="['####-##-##']"
>
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="item.on_date">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
        </div>
        <q-input
        class="col-auto"
        dense
        label="Total Days"
        outlined
        readonly
        v-model="item.totalDays"
      ></q-input>

      </div>

      <div class="col-md-6 q-pt-md col-sm-5 col-xs-12 q-gutter-y-md q-px-xs">
        <div class="row">
          <q-input   dense
          class="col"
          label="From Date"
            outlined
            clearable
            v-model="item.from_date"
            mask="####-##-##"
            :rules="['####-##-##']"
            @change="calculateTotalDays"
>
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="item.from_date">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>

         <q-input
          class="col q-pl-sm"
          dense
          label="To Date"
          outlined
          clearable
          v-model="item.to_date"
          mask="####-##-##"
          :rules="['####-##-##']"
          @change="calculateTotalDays"
          >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date v-model="item.to_date">
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
        </div>

        <q-input
          type="textarea"
          v-model="item.description"
          label="description"
          dense
          outlined
        />
        <span class="row">
          <q-btn
            class="col-12 bg-secondary text-white"
            type="text"
            @click="saveRequest"
            label="Save Request"
          >
          </q-btn>
        </span>
      </div>
    </div>
  </q-card>
</template>
<script>
import {} from "vue";
import { ref } from "vue";
import axios from "axios";
import AddLeaveTypeDialog from '../Leave/AddLeaveTypeDialog.vue';
// /V/zLpp;qp=2C2f namecheap login password
// !@#umarkhan580 profreehost.com password
export default {
  props: ['leaveData'], // Define props to receive leave record data


  components: {
    AddLeaveTypeDialog // Register the dialog component
  },


  setup() {},
  data() {
    return {
      dialogVisible: false,
      toolbar: false,
      proxyDate: new Date().toISOString().substr(0, 10), // Today's date
      item: {
        emp_id:"",
        // description: "Dear my boss I would like to request a half-day leave on [date] from [start time] to [end time]. I need to attend a personal appointment during that time. I am willing to make up for any missed work or assist with any urgent tasks before I leave",
        description: "",
        totalDays: "",
        leave_type: "",
        on_date: new Date().toISOString().substr(0, 10), // Today's date
        from_date: "",
        to_date: "",
      },
      leaveTypes:[
            'Paternity leave',
            'Sick leave',
            'Bereavement leave',
            'Sabbatical leave',
            'Unpaid leave',
            'Annual leave',
            'Maternity leave',
            'Public holidays',
            'Casual leave'
            ]
    };
  },

  computed: {
    // totalDays() {
    //   if (this.item.from_date && this.item.to_date) {
    //     const fromDate = new Date(this.item.from_date);
    //     const toDate = new Date(this.item.to_date);
    //     const timeDifference = toDate.getTime() - fromDate.getTime();
    //     const daysDifference = timeDifference / (1000 * 3600 * 24);
    //     return Math.abs(Math.round(daysDifference));
    //   }
    //   return '';
    // },
  },

  mounted() {
    // Fill the form fields with leave record data when the component is mounted
    this.fillForm();
  },

  methods: {
    fillForm(leaveData) {
      if (this.item && this.item.emp_id) {
      // Fill the form fields with leave record data
      this.item.emp_id = leaveData.emp_id;
      this.item.description = leaveData.description;
      this.item.total_days = leaveData.total_days;
      this.item.leave_type = leaveData.leave_type;
      this.item.on_date = leaveData.on_date;
      this.item.from_date = leaveData.from_date;
      this.item.to_date = leaveData.to_date;
      // Update other form fields as needed
      console.log("Employee ID:", this.item.emp_id);
    } else {
        console.error("Employee ID is not available");
      }
    },

    openDialog() {
      console.log('Opening dialog...');

      this.dialogVisible = true; // Update dialog visibility
    },
    handleAddLeaveType(newLeaveType) {
      console.log('Adding new leave type:', newLeaveType);

      this.leaveTypes.push(newLeaveType);
    },


    calculateTotalDays() {
    if (this.item.from_date && this.item.to_date) {
      const fromDate = new Date(this.item.from_date);
      const toDate = new Date(this.item.to_date);
      const timeDifference = toDate.getTime() - fromDate.getTime();
      this.item.totalDays = Math.abs(Math.round(timeDifference / (1000 * 3600 * 24)));
      console.log("totalDays", this.totalDays)
    } else {
      this.item.totalDays = ''; // Reset totalDays if either from_date or to_date is empty
    }
  },
    // Method to calculate the difference in days between from and to dates
    // calculateDaysDifference() {
    //   if (this.item.from_date && this.item.to_date) {
    //     const fromDate = new Date(this.item.from_date);
    //     const toDate = new Date(this.item.to_date);
    //     const timeDifference = toDate.getTime() - fromDate.getTime();
    //     return Math.abs(Math.round(timeDifference / (1000 * 3600 * 24)));
    //   }
    //   return '';
    // },

    // Fetch employee details when emp_id is entered
    fetchEmployeeDetails() {
      // Make API call to fetch employee details based on emp_id
      axios.get(`http://127.0.0.1:2024/employee/${this.item.emp_id}`).then((res) => {
        const employee = res.data; // Assuming the API response contains employee details
        this.item.userName = employee.name;
        this.item.gender = employee.gender;
      }).catch((error) => {
        console.error("Error fetching employee details:", error);
      });
    },
    // Save the leave request
    saveRequest() {
          // Check if leaveData exists
          if (!this.leaveData) {
            // Send a POST request to create a new leave request
            axios.post("http://127.0.0.1:2024/leave", this.item)
              .then((response) => {
                // Handle success response
                console.log("Leave request created successfully:", response.data);
                // Show success notification
                this.$q.notify({
                  color: "positive",
                  message: "Leave request created successfully",
                });
                // Clear form fields
                this.clearForm();
              })
              .catch((error) => {
                console.error("Error creating leave request:", error);
                // Show error notification
                this.$q.notify({
                  color: "negative",
                  message: "Failed to create leave request",
                });
              });
          } else {
            // Send a PUT request to update the leave details
            axios.put(`http://127.0.0.1:2024/leave/${this.leaveData.id}`, this.item)
              .then((response) => {
                // Handle success response
                console.log("Leave details updated successfully:", response.data);
                // Show success notification
                this.$q.notify({
                  color: "positive",
                  message: "Leave details updated successfully",
                });
              })
              .catch((error) => {
                console.error("Error updating leave details:", error);
                // Show error notification
                this.$q.notify({
                  color: "negative",
                  message: "Failed to update leave details",
                });
              });
          }
},

    // Clear form fields after leave request is created
    clearForm() {
      this.item = {
        description: "",
        emp_id: "",
        userName: "",
        department: "",
        total_days: "",
        leave_type: "",
        on_date: new Date().toISOString().substr(0, 10), // Today's date
        from_date: "",
        to_date: "",
      };
    },
  },
};
</script>

