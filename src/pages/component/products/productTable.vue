<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col q-pt-lg">
        <!-- <div class="text-h5">All Peoducts</div> -->
      </div>
      <div class="col-auto q-gutter-x-sm q-py-md">
        <q-btn
          label="Add Product"
          style="width: 160px"
          color="primary"
          dense
          icon="add"
          @click="open('top')"
          class="float-right text-capitalize text-body1"
        >
        </q-btn>
        <q-btn
          class="q-ml-md text-capitalize"
          label="Print Report"
          icon="print"
          color="secondary"
          @click="printReport"
        />
        <span class="row q-gutter-l-sm items-start q-pr-md">
        </span>
      </div>
    </div>
    <q-separator />
    <q-table
      ref="myTable"
      :position="position"
      :class="tableClass"
      tabindex="0"
      title="All Products"
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
    </q-table>
    <q-dialog v-model="dialog">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="q-pt-none">
          <new_product/>
        </q-card-section>
        <!-- <q-card-actions align="right" class="q-mr-lg q-pb-md q-gutter-x-md">
          <q-btn flat label="Cancle" dense class="text-primary " v-close-popup />
          <q-btn flat label="OK" dense class="text-white bg-primary" v-close-popup />
        </q-card-actions> -->
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from 'vue'
import new_product from "./new_product.vue";

export default {
  components: {
    new_product
  },
  setup () {
    const dialog = ref(false)
    const position = ref('top')

    return {
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
      filter: "",
      selected: [],
      pagination: {},
      columns: [
        { name: "id", align: "left", label: "id", field: "id" },
        { name: "name", required: true, label: "name", align: "left", field: "name" },
        { name: "price", align: "center", label: "price", align: "left", field: "price"},
        { name: "reorder_level", label: "reorder_level", field: "reorder_level", align: "left" },
        { name: "category", label: "category", field: "category", align: "left" },
        { name: "Action", align: "right", label: "Action", field: "Action" },


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
      const token = localStorage.getItem('access'); // Assuming the JWT token is stored in localStorage
      axios.get(`http://127.0.0.1:8000/api/products/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          this.rows = response.data.results;

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
