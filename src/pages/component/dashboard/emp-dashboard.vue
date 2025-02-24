<template>
  <div id="dashbordcard" class="row q-pa-sm q-pt-md">

      <q-card class="card1 ">
              <div class="q-pa-md text-white">
                <q-icon
                  name="group"
                  style="border-radius: 10px"
                  class="q-pa-sm bg-blue-10 text-h4"
                />
              </div>
            <div class="text-grey-8 text-h5">Total Categary</div>
            <div class="text-h6 q-pl-md" >{{totalusers}}</div>

      </q-card>

      <q-card class="card1 ">
              <div class="q-pa-md text-white">
                <q-icon
                  name="time_to_leave"
                  style="border-radius: 10px"
                  class="q-pa-sm bg-green-9 text-h4"
                />
              </div>
            <div class="text-grey-8 text-h5">Paid Orders</div>
            <div class="text-h6 q-pl-md" >$ 27,202</div>
      </q-card>

      <q-card class="card1 ">
            <div class="col-2">
              <div class="q-pa-md text-white">
                <q-icon
                  name="payment"
                  style="border-radius: 10px"
                  class="q-pa-sm bg-secondary text-h4"
                />
              </div>
              <div class="text-grey-8 text-h5">Paid Orders</div>
              <div class="text-h6 q-pl-md" >$ 27,202</div>

        </div>
      </q-card>

      <q-card class="card1 ">
              <div class="q-pa-md text-white">
                <q-icon
                  name="add_shopping_cart"
                  style="border-radius: 10px"
                  class="q-pa-sm bg-secondary text-h4"
                />
              </div>
            <div class="text-grey-8 text-h5">Mechanics</div>
            <div class="text-h6 q-pl-md" >{{totalusers}}</div>
      </q-card>

  </div>

  <div class="col q-px-sm q-py-md">
      <q-table
        dense
        title="Recent Orders"
        class="col-auto"
        :rows="rows"
        :columns="columns"
        row-key="name"
        v-model:selected="selected"
      >
        <template v-slot:top-right>
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
            </div>
          </td>
        </template>
        <template v-slot:body-cell-no="props">
          <td :props="props" class="print-hide">
            {{ 1 }}
          </td>
        </template>
      </q-table>
    </div>
</template>

<script>
// import tabs from "../component/tabs.vue";
import AuthenticationService from 'src/pages/authentication/AuthenticationService';
import api from 'src/pages/component/categories/apiClass';
import { ref } from 'vue'
import { Dialog } from 'quasar'
import axios from 'axios'

const API_URL = 'http://localhost:2024'

export default {
  components: {
    // tabs,
  },
  setup() {},
  data() {

    return {
      totalusers:0,
      columns: [
        {
          name: "dep_id",
          required: true,
          label: "S.No",
          align: "left",
          field: (row) => row.dep_id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "service_name",
          align: "left",
          label: "Service Name",
          field: "service_name",
          sortable: true,
        },
        { name: "quantity", align: "left", label: "Quantity", field: "quantity" },
        { name: "service_per_quantty", align: "left", label: "Service per Quantity", field: "service_per_quantity" },

        { name: "discount", align: "left", label: "discount", field: "discount" },
        { name: "tax", align: "left", label: "Tax", field: "tax" },
        { name: "total", align: "left", label: "Total", field: "total" },
        {
          name: "Action",
          align: "right",
          label: "Action",
          field: "Action",
          sortable: false,
        },
      ],
      rows: [],
      depL:"",
    };

  },

  mounted(){
    this.getDep()
    var token = AuthenticationService.getToken()
      if(!token){
        console.log("token hase expire now...")
      }
      else{
        console.log("token", token)
        axios.get(`${API_URL}/employees`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if(response.status === 401){
          this.totalusers = response.data.length
          console.log("data", response)
          this.rows = response.data

          }
          else{
          this.totalusers = response.data.length

          }

        })
        .catch((error) => {
          console.log({error: "toekn hase expire"})
        })



    }
  },

  methods:{
      getDep(){
        api.getDepartment().then( res => {this.depL = res.data.length
          this.rows = res.data
        })
      }

  }
};
</script>
<style scoped>
#dashbordcard{
    display: flex;
   /* margin: 20px 15px; */
    gap: 15px;
    flex-wrap: wrap;
}
.col-2{
    display: flex;
    align-items: center;
    max-width: 20%;
    height: 100px;
    font-size: medium;
    flex-grow: 1;
}
.card1{
    display: flex;
    align-items: center;
    min-width: 15%;
    height: 100px;
    font-size: medium;
    flex-grow: 1;
    /* flex-wrap: wrap; */

}
</style>
