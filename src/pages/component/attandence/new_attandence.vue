<template>
  <div class="row q-px-md">
    <q-card class="col-12-md col-md-12 q-pa-md">
      <div class="text-h5 q-ml-sm q-pb-sm q-mt-md">Mark Attendance</div>
      <div class="row q-py-md q-gutter-md">
        <!-- Toggle Button to Show All or Filtered Records -->
        <q-toggle
          v-model="showAll"
          label="Show All Records"
          color="primary"
          @change="show=!show"
        />

        <!-- Filters for Employee ID and Name -->
        <q-input
          class="items-center"
          dense
          placeholder="Enter your employee ID"
          clearable
          outlined
          @change="show"
          v-model="emp_id"
          style="width: 200px"
          icon="search"
        />
        <q-input
          class="items-center"
          dense
          placeholder="Enter your employee name"
          clearable
          outlined
          @change="show"
          v-model="emp_name"
          style="width: 200px"
          icon="search"
        />
      </div>

      <!-- Table to Display Records -->
      <q-table :rows="rows" :columns="columns" :filter="filter" dense row-key="id">
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td>{{ props.row.id }}</q-td>
            <q-td>{{ props.row.name }}</q-td>
            <q-td>
              <q-select v-model="selectedStatus[props.row.id]" outlined dense :options="options" label="Status" />
            </q-td>
            <q-td>
              <q-input v-model="props.row.check_in_time" outlined dense type="time" label="Check-in Time" />
            </q-td>
            <q-td>
              <q-input v-model="props.row.check_out_time" outlined dense type="time" label="Check-out Time" />
            </q-td>
            <q-td>
              <q-input v-model="date" outlined dense type="date" label="Date" />
            </q-td>
          </q-tr>
        </template>
      </q-table>

      <div class="q-pa-md text-center">
        <q-btn class="items-center text-capitalize text-body" @click="add" color="cyan-9" style="width: 300px">
          Apply
        </q-btn>
      </div>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";
import attandenceClass from "src/pages/component/attandence/attandenceClass";
import employeeClass from "src/pages/component/employee/employeeClass";

export default {
  data() {
    return {
      showAll: false, // true when 'Show All' is active
      date: new Date().toISOString().substr(0, 10),
      emp_id: "",
      emp_name: "",
      rows: [],
      columns: [
        { name: "id", required: true, label: "Employee ID", align: "left", field: "id", sortable: true },
        { name: "name", required: true, label: "Employee Name", align: "left", field: "name", sortable: true },
        { name: "status", required: true, label: "Status", align: "left", field: "status", sortable: true },
        { name: "check_in_time", required: true, label: "Check-in Time", align: "center", field: "check_in_time", sortable: true },
        { name: "check_out_time", required: true, label: "Check-out Time", align: "center", field: "check_out_time", sortable: true },
        { name: "date", required: true, label: "Date", align: "center", field: "date", sortable: true },
      ],
      options: ["Absent", "Present", "Leave"],
      selectedStatus: {},
    };
  },

  mounted() {
    // this.show();
  },

   watch: {
    showAll() {
      this.show(); // Call show method whenever showAll changes
    },
    // emp_id() {
    //   this.show(); // Call show when emp_id changes
    // },
    // emp_name() {
    //   this.show(); // Call show when emp_name changes
    // },
  },


  methods: {
    show(){
      if(this.showAll  === true){
      employeeClass.getEmployee().then((res) => {
          this.rows = res.data;
          console.log("All attendance records:", res.data);
        });
      } if(this.showAll === false){
           this.rows = null
      }

      // if (this.showAll) {
      //   // Fetch and show all records
      //   console.log("Showing all records...");
      //   employeeClass.getEmployee().then((res) => {
      //     this.rows = res.data;
      //     console.log("All attendance records:", res.data);
      //   });
      // } else {
      //   console.log("no records...")
      // }
    },












    // show() {
    //   if (this.showAll) {
    //     // Fetch and show all records
    //     console.log("outer console:");

    //     employeeClass.getEmployee().then(res => {
    //       this.rows = res.data;
    //       console.log("Showing all attendance records:", res.data);
    //     });
    //   } else {
    //     // Fetch filtered records based on emp_id or emp_name
    //     if (this.emp_id || this.emp_name) {
    //       console.log("Fetching filtered records...");
    //       // Replace the below with your API call logic
    //       attandenceClass.getEmployee({ emp_id: this.emp_id, emp_name: this.emp_name }).then(res => {
    //         this.rows = res.data;
    //         console.log("Filtered records:", res.data);
    //       });
    //     }
    //   }
    // },

    add() {
      const attendanceData = this.rows.map(employee => ({
        emp_id: employee.id,
        status: this.selectedStatus[employee.id],
        date: this.date,
        check_in_time: `${this.date} ${employee.check_in_time}`,
        check_out_time: `${this.date} ${employee.check_out_time}`,
      }));
      console.log("Attendance data:", attendanceData);
      axios
        .post("http://127.0.0.1:2024/attendance", attendanceData, {
          headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        })
        .then(response => {
          console.log("Attendance marked successfully:", response.data);
          this.$q.notify({ type: "positive", message: "Attendance marked successfully" });
        })
        .catch(error => {
          console.error("Error posting attendance data:", error);
        });
    },
  },
};
</script>
