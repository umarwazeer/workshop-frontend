<template>
  <div class="q-pa-sm q-pl-sm">
    <q-card class="q-my-sm q-py-md">
          <inventory-form :title="title"/>
    </q-card>
    <q-separator />
    <q-table
      ref="myTable"
      :position="position"
      :class="tableClass"
      tabindex="0"
      title="Employee Salary"
      :rows="rows"
      :columns="columns"
      dense
      row-key="id"
      selection="multiple"
      v-model:selected.sync="selected"
      :pagination.sync="pagination"
      :filter="filter"
      @focusin.native="activateNavigation"
      @focusout.native="deactivateNavigation"
      @keydown.native="onKey"
    >
      <template v-slot:body-cell-status="props">
        <q-td>
          <q-badge
            :props="props"
            :class="props.row.status == 'Present' ? 'bg-cyan-4 text-white  q-px-xs   text-body2  text-body1' : 'bg-red-4 text-white  q-px-xs   text-body2  text-body1' "
            outline
          >
            {{ props.row.status }}
          </q-badge>
        </q-td>
      </template>


      <template v-slot:top-right>
          <q-btn
                color="primary"
                icon-right="clear"
                label="Clear report"
                class="q-ml-md"
                no-caps
                @click="clear"
              />

              <q-btn
                class="q-ml-md q-mr-md text-capitalize"
                label="generate Bill"
                icon="print"
                color="secondary"
                @click="bilGen = true"
              />
        <div class="row q-gutter-sm q-py-md">
          <div class="col">
            <q-input
              label="Type a keyword here"
              class=""
              style="width: 200px"
              outlined
              dense
              rounded
              v-model="filter"
            >
              <template v-slot:prepend>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
      </template>
    </q-table>

  </div>
  <q-dialog v-model="bilGen" style="width: 700px;"  >
   <bill-generate/>
  </q-dialog>
</template>

<script>
import axios from "axios";
import { ref } from 'vue'
import inventoryForm from "../Inventory/inventoryForm.vue"
import billGenerate from "./billGenerate.vue";
export default {
  components: {
    inventoryForm,
    billGenerate
  },
  setup () {
    const bilGen = ref(false)
    const dialog = ref(false)
    const position = ref('top')

    return {
      bilGen: ref(false),
      dialog,
      position,
      open (pos) {
        position.value = pos
        dialog.value = true
      }
    }
  },
  data() {
    return {
      title: " Bill generation",
      filter: "",
      selected: [],
      pagination: {},
      columns: [
        { name: "product_id", align: "left", label: "product_id", field: "product_id" },
        { name: "availability_quantity", align: "left", label: "availability_quantity", field: "availability_quantity" },
        { name: "reorder_level", align: "left", label: "reorder_level", field: "reorder_level" },
        { name: "reorder_quantity", required: true, label: "reorder_quantity", align: "left", field: "reorder_quantity" },
        { name: "last_updated", align: "center", label: "last_updated", align: "left", field: "last_updated", sortable: true },
        { name: "Action", align: "left", label: "Action", field: "Action" },
        ],
      rows: [],
    };
  },
  mounted() {
    this.showData();
  },
  computed: {
    tableClass() {
      return this.navigationActive === true ? "shadow-8 no-outline" : void 0;
    },
  },
  methods: {
    showData() {
      const token = localStorage.getItem('access_token'); // Assuming the JWT token is stored in localStorage
      axios.get(`http://127.0.0.1:2024/payroll`)
        .then(response => {
          this.rows = response.data;
          console.log("new response", response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    printReport() {
      // You can implement printing functionality here
      console.log("Printing report...");
    },
  },
};
</script>
