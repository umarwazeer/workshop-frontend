<template>
  <div>
    <q-card flat class="q-px-sm">
      <div class="text-h5 q-pb-sm q-px-md">{{ title }}</div>
      <div class="row q-px-sm">
        <div class="row flex  col-md-12 q-gutter-md q-px-xs">
          <q-input
            type="text"
            label="Product ID"
            outlined
            v-model="item.product_id"
            dense
            clearable
            @blur="fetchEmployeeDetails"
          />
          <q-input
            dense
            label="availability_quantity"
            outlined
            v-model="item.availability_quantity"
            clearable
          ></q-input>

          <q-input
            dense
            label="reorder_level"
            outlined
            v-model="item.reorder_level"
            clearable
          ></q-input>

          <q-input
            type="date"
            v-model="item.reorder_quantity"
            label="reorder_quantity"
            outlined
            dense
          ></q-input>
          <q-input
            dense
            class="grow-1"
            label="last_updated"
            outlined
            v-model="item.last_updated"
          ></q-input>
          <span class="btn1">
            <q-btn
              class="col-12  q-mr-md text-capitalize text-primary"
              style="width: 10rem;"
              type="text"
              label="Erase"
            >
            </q-btn>
            <q-btn
              class="col-12 bg-primary text-capitalize text-white"
              type="text"
              @click="saveSalary"
              label="Save Salary"
            >
            </q-btn>

          </span>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    title: {
      type: String
    },

  },
  data() {
    return {
      // title: "Salary Management",
      item: {
        product_id: "",
        availability_quantity: "",
        reorder_level: "",
        reorder_quantity: "",
        last_updated: " ",
        payment_date: new Date().toISOString().substr(0, 10),
        payroll_period: "",
      },

    };
  },
  methods: {
    fetchEmployeeDetails() {
      if (this.item.employee_id) {
        axios
          .get(`http://127.0.0.1:2024/employee/${this.item.employee_id}`)
          .then((res) => {
            const employeeData = res.data;
          })
          .catch((error) => {
            console.error("Error fetching employee details:", error);
          });
      }
    },
    calculateTotalSalary() {
      const employeeId = parseInt(this.item.employee_id);
      const totalLeave = parseInt(this.item.total_leave);
      const basicSalary = parseFloat(this.item.basic_salary);
      const otherAllowances = parseFloat(this.item.other_allowances);
      const deductions = parseFloat(this.item.deductions);

      if (
        isNaN(employeeId) ||
        isNaN(totalLeave) ||
        isNaN(basicSalary) ||
        isNaN(otherAllowances) ||
        isNaN(deductions)
      ) {
        console.error("Invalid input values");
        return;
      }

      this.item.totalSalary = basicSalary + otherAllowances - deductions;
    },
    saveSalary() {
      // Validate form data before saving
      if (!this.validateFormData()) {
        return;
      }

      // Prepare data to send to the backend API
      const requestData = {
        employee_id: this.item.employee_id,
        basic_salary: this.item.basic_salary,
        other_allowances: this.item.other_allowances,
        deductions: this.item.deductions,
        totalSalary: this.item.totalSalary,
        description: this.item.description,
        payment_method: this.item.payment_method,
        payment_date: this.item.payment_date,
        payroll_period: this.item.payroll_period,
      };

      // Send the request to save salary to the backend API
      axios
        .post("http://127.0.0.1:2024/payroll", requestData)
        .then((response) => {
          console.log("Salary saved successfully:", response.data);
        // Salary saved successfully
        this.$q.notify({
              type: "positive",
              position: "top",
              message: "Salary saved successfully",
            });
        this.resetForm();
        })
        .catch((error) => {
          console.error("Error saving salary:", error);
          this.$q.notify({
              type: "negative",
              position: "top",
              message: "Error saving salary",
            });
        });
    },

    showNotification(message, type) {
      this.notificationMessage = message;
      this.notificationType = type;
      this.notify = true;

      setTimeout(() => {
        this.notify = false;
      }, 3000); // Hide notification after 3 seconds
    },
    validateFormData() {
      // Validate form data before submission
      // Add your validation logic here
      return true; // For simplicity, always return true for now
    },
    resetForm() {
      // Reset form fields after successful submission
      this.item = {
        employee_id: "",
        total_leave: 0,
        basic_salary: 0,
        other_allowances: 0,
        deductions: 0,
        totalSalary: 0,
        description: "",
        payment_method: "",
        payment_date: new Date().toISOString().substr(0, 10),
        payroll_period: "",
      };
    },
  },
};
</script>
<style scoped>
.q-gutter-x-md > *, .q-gutter-md > * {
  display: flex;
  flex-grow: 1;
}
.btn1{
  float: right;
  text-align: right;
}
</style>
