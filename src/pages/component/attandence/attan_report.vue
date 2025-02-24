<template>
  <div class="q-pa-md">
    <div class="column items-start">
      <div class="col q-py-sm q-gutter-x-md">
        <q-btn
          style="width: 200px"
          class="q-py-xs text-capitalize"
          label="attandence"
          rounded
          icon="add"
          to="/new_attandence"
          @click="check_attandence = true"
          color="cyan-9"
        />
          <q-btn color="cyan-10" class="text-capitalize" @click="check = true">Mark By Id</q-btn>
          <q-btn color="primary" class="text-capitalize" @click="filterDialog = true">Filter</q-btn>

          <!-- <q-dialog v-model="check" persistent>
            <q-card class="col-auto">
              <div class="q-px-sm q-py-sm absolute-right">
                          <q-btn flat round dense icon="close" v-close-popup />

              </div>
              <q-item-section>
                <attandence-form />
              </q-item-section>
            </q-card>
          </q-dialog> -->

        <q-dialog v-model="check" persistent>
          <div class="col- col-8" width="500px">
            <q-btn flat class="align-right" round dense icon="close"  v-close-popup />
            <new_attandence  />
            </div>
        </q-dialog>

        <!-- Filter Dialog -->
        <q-dialog v-model="filterDialog" persistent>
          <q-card class="row ">
            <q-card-section class="col-md-12">
              <q-input class="col-" v-model="filters.fromDate" label="From Date" type="date" />
              <q-input class="col-" v-model="filters.toDate" label="To Date" type="date" />
              <q-select
              map-options
              option-value="dep_id"
              option-label="name"
              behavior="menu"
              label="Department"
              options-dense
              v-model="filters.department"
              :options="options"
          />            </q-card-section>
            <q-card-actions>
              <q-btn flat label="Apply" @click="applyFilters" />
              <q-btn flat label="Cancel" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>

      </div>
    </div>
    <div class="row">
      <div class="col q-pt-lg">
        <div class="text-h5">Attandence Report</div>
      </div>
      <div class="col-9 q-py-lg">

      </div>
    </div>
    <q-separator />
    <q-table
      ref="myTable"
      :class="tableClass"
      tabindex="0"
      title="Attandence"
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
            :class="
              props.row.status == 'Present'
                ? 'bg-cyan-4 text-white  q-px-xs   text-body2  text-body1'
                : 'bg-red-4 text-white  q-px-xs   text-body2  text-body1' "
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
          <div class="col">
            <q-btn
              class="q-ml-md text-capitalize"
              label="print attandence"
              icon="print"
              color="secondary"
            />
          </div>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import axios from "axios";
import new_attandence from "../attandence/new_attandence.vue";
import camera from "../attandence/camera.vue";
import AttandenceForm from "./attandenceForm.vue";
export default {
  components: {
    new_attandence,
    camera,
    AttandenceForm,
  },
  data() {
    return {
      check: false,
      filterDialog: false, // Controls the visibility of the filter dialog

      filters: {
        request_date: "",
        fromDate: "",
        toDate:"",
        status:"",
        department: "",
      },

      proxyDate: "",
      check_attendance: false,
      options: [],
      navigationActive: false,
      filter: "",
      selected: [],
      pagination: {},
      statusOptions: [
        { label: "Present", value: "Present" },
        { label: "Absent", value: "Absent" },
      ],
      columns: [
      { name: "emp_id", align: "left", label: "Employee_Id", field: "emp_id" },
        {
          name: "emp_name",
          required: true,
          label: "UserName",
          align: "left",
          field: (row) => row.emp_name,
          format: (val) => `${val}`,
          sortable: true,
        },

        {
          name: "dep_name",
          align: "center",
          label: "Deparmtment",
          align: "left",
          field: "dep_name",
          sortable: true,
        },
        { name: "date", label: "Date", field: "date", align:"left", sortable: true },
        {
          name: "status",
          align: "left",
          label: "Status",
          field: "status",
          required: true,
          sortable: true,
        },
        {
          name: "emp_gender",
          label: "gender",
          align: "center",
          field: "emp_gender",
          required: true,
          sortable: true,
        },
        {
          name: "check_in_time",
          label: "Check in",
          field: "check_in_time",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
        {
          name: "check_out_time",
          label: "Check out",
          field: "check_out_time",
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
        },
      ],
      rows: [],
    };
  },
  mounted() {
    this.get_dep();
    this.showData();
  },

  computed: {
    tableClass() {
      return this.navigationActive === true ? "shadow-8 no-outline" : void 0;
    },
  },

  methods: {
    get_dep() {
      axios
        .get("http://127.0.0.1:2024/department")
        .then((response) => {
          // this.options = response.data;
          this.options = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    showData() {
      this.loading = true;
      const { fromDate, toDate, department, status } = this.filters;
      const params = {};
      if (fromDate) params.fromDate = fromDate;
      if (toDate) params.toDate = toDate;
      if (department) params.department = department;
      if (status) params.status = status;

      axios
        .get("http://127.0.0.1:2024/attendance", { params })
        .then((response) => {
          this.rows = response.data;
          console.log("Filtered response", response);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    applyFilters() {
      this.filterDialog = false;
      this.showData();
    },
    showAllData() {
      // Show loading overlay
      this.loading = true;

      axios
        .get("http://127.0.0.1:2024/attendance")
        .then((response) => {
          this.rows = response.data;
          console.log("All data response", response);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          // Hide loading overlay
          this.loading = false;
        });
    },

    activateNavigation() {
      this.navigationActive = true;
    },

    deactivateNavigation() {
      this.navigationActive = false;
    },

    onKey(evt) {
      if (
        this.navigationActive !== true ||
        [33, 34, 35, 36, 38, 40].indexOf(evt.keyCode) === -1 ||
        this.$refs.myTable === void 0
      ) {
        return;
      }

      evt.preventDefault();

      const { computedRowsNumber, computedRows } = this.$refs.myTable;

      if (computedRows.length === 0) {
        return;
      }

      const currentIndex =
        this.selected.length > 0 ? computedRows.indexOf(this.selected[0]) : -1;
      const currentPage = this.pagination.page;
      const rowsPerPage =
        this.pagination.rowsPerPage === 0
          ? computedRowsNumber
          : this.pagination.rowsPerPage;
      const lastIndex = computedRows.length - 1;
      const lastPage = Math.ceil(computedRowsNumber / rowsPerPage);

      let index = currentIndex;
      let page = currentPage;

      switch (evt.keyCode) {
        case 36: // Home
          page = 1;
          index = 0;
          break;
        case 35: // End
          page = lastPage;
          index = rowsPerPage - 1;
          break;
        case 33: // PageUp
          page = currentPage <= 1 ? lastPage : currentPage - 1;
          if (index < 0) {
            index = 0;
          }
          break;
        case 34: // PageDown
          page = currentPage >= lastPage ? 1 : currentPage + 1;
          if (index < 0) {
            index = rowsPerPage - 1;
          }
          break;
        case 38: // ArrowUp
          if (currentIndex <= 0) {
            page = currentPage <= 1 ? lastPage : currentPage - 1;
            index = rowsPerPage - 1;
          } else {
            index = currentIndex - 1;
          }
          break;
        case 40: // ArrowDown
          if (currentIndex >= lastIndex) {
            page = currentPage >= lastPage ? 1 : currentPage + 1;
            index = 0;
          } else {
            index = currentIndex + 1;
          }
          break;
      }

      if (page !== this.pagination.page) {
        this.pagination = {
          ...this.pagination,
          page,
        };

        this.$nextTick(() => {
          const { computedRows } = this.$refs.myTable;
          this.selected = [
            computedRows[Math.min(index, computedRows.length - 1)],
          ];
        });
      } else {
        this.selected = [computedRows[index]];
      }
    },
  },
};
</script>
