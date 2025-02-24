<template>
  <div>
    <q-card flat class="q-pa-sm">
      <div class="text-h5 q-py-sm q-px-md">Add New Product</div>
      <div class="row q-px-sm">
        <div class="col-md-6 q-pt-md col-sm-12 q-gutter-y-md q-px-xs">

          <q-input
            dense
            label="Pruduct Name"
            outlined
            v-model="item.name"
            clearable
          ></q-input>
          <q-input
            dense
            label="price"
            outlined
            v-model="item.price"
            clearable
          ></q-input>

        </div>
        <div class="col-md-6 col-sm-12 q-pt-md q-gutter-y-md q-px-xs">
          <q-select
            v-model="item.category"
            label="Categary"
            outlined
            :options="['Cash', 'Bank Transfer', 'Cheque']"
            dense
          ></q-select>
          <q-input
            type="quantity"
            v-model="item.quantity"
            label="Product Quantity"
            outlined
            dense
          ></q-input>

          <span class="row">
            <q-btn
              class="col-12 bg-secondary text-white"
              type="text"
              v-close-popup
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

const API_URL = 'http://127.0.0.1:8000/api'

export default {
  data() {
    return {
      item: {
        name: "",
        category: "",
        price: "",
        quantity: "",
      },

    };
  },
  methods: {

  async  saveSalary() {
      const token = localStorage.getItem('access')
        console.log("products", this.item)
      // Prepare data to send to the backend API
      // const requestData = {
      //   name: this.item.name,
      //   category: this.item.category,
      //   price: this.item.price,
      //   quantity: this.item.quantity,

      // };

      // Send the request to save salary to the backend API
      await axios
          .post(`${API_URL}/workshops/`, this.item,  {
          headers: {
            Authorization : `Bearer ${token}`
          }},
        )
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
    resetForm(){
        this.item.name = ''
        this.item.category = ''
        this.item.price = ''
        this.item.quantity = ''

    }

  },
};
</script>
