<template>
  <div class="q-ma-md q-mt-md">
    <div class="text-h5 q-pa-sm">
      Employee Data {{ this.rows.length }}
    </div>
    <q-dialog v-model="prompt" >
      <add_employee />
    </q-dialog>
      <q-card class="">
        <h3 class="print-only">The All Employee Reports and Data</h3>
        <q-table
          class="my-sticky-header-table q-pa-sm text-right"
          title=""
          :rows="rows"
          :filter="filter"
          :columns="columns"
          row-key="id"
          virtual-scroll
          :virtual-scroll-item-size="48"
          v-model:pagination.sync="pagination"
          :rows-per-page-options="[5]"
          v-model:selected.sync="selectedRows"
          selection="multiple"
          bordered
          outlined
        >

         <template v-slot:body-cell-image_path="props">
          <!-- <q-avatar :props="props" class="shadow-10">
                    <img src="file:///D:/projects/HR-manager/frontend/src/assets/webimage.png" class="rounded-image"  >
                  </q-avatar> -->
      <td :props="props">
        <img :src="props.row.image_path" class="rounded-image" />
      </td>
    </template>
        <!-- <template v-slot:body-cell-image_path="props">
           <td :props="props">
    <img :src="props.row.image_path" class="rounded-image" />
  </td>
      </template> -->
          <template v-slot:body-cell-selection="props">
            <q-td :props="props">
              <q-radio
                v-model="props.selected"
                :val="props.row"
                @change="handleRowSelection(props.row)"
              />
            </q-td>
          </template>
          <template v-slot:top-left>
            <q-input
            label="Type a keyword here"
            class=""
            style="width: 300px;"
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
          <template v-slot:top-right>
            <div class="q-pb-md print-hide">
              <q-btn label="Delete" dense v-if="this.selectedRows.length > 1" class="q-mx-md q-px-md  border-round-5 text-capitalize" @click="multiDelete" >
          <q-icon name="delete" size="1.5rem" class="q-pl-sm" color="red" /></q-btn>
              <q-btn
                color="primary"
                icon-right="print"
                label="Print table data"
                class="q-ml-md"
                no-caps
                @click="exportTable"
              />

              <q-btn
                class="q-ml-md text-capitalize"
                label="Add employee"
                icon="add"
                color="secondary"
                @click="prompt = true"
              />
            </div>
          </template>

          <template v-slot:body-cell-Action="props">
            <td :props="props" class="print-hide">
              <div class="q-gutter-sm" flat>
                <q-btn
                  class="float-right bg-red"
                  @click="del(props.row.id)"
                  color="#fff"
                  :disable="listItems.length === 2"
                  icon="delete"
                  dense
                ></q-btn>

                <q-btn
                  class="float-right bg-primary text-white"
                  @click="edit(props.row.id)"
                  flat
                  dense
                >
                  <i
                    class="ri-edit-box-line"
                    style="font-size: 21px; font-weight: 800px;"
                  ></i>
                </q-btn>
              </div>
            </td>
          </template>
        </q-table>
      </q-card>
  </div>
</template>
<script>
import { exportFile, useQuasar } from 'quasar'
import { ref } from 'vue'
import { Dialog } from 'quasar'
import axios from 'axios'
import add_employee from './add_employee.vue'
import add_form from '../categories/addCategary.vue'

const API_URL = 'http://127.0.0.1:8000/api'

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val

  formatted =
    formatted === void 0 || formatted === null ? '' : String(formatted)

  formatted = formatted.split('"').join('""')

  return `"${formatted}"`
}
const columns = [
  {
    name: 'id',
    required: true,
    label: 'emp_id',
    align: 'left',
    field: 'id',
    sortable: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Empoyee Name',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'workshop',
    label: 'workshop',
    field: 'workshop',
    align: 'left',
  },
  {
    name: 'email',
    label: 'email',
    align: 'left',
    field: 'email',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  // {
  //   name: "date_of_birth",
  //   label: "Date_Of_Birth",
  //   field: "date_of_birth",
  // align: "left",
  //   sortable: true,
  //   sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  // },
  {
    name: 'phone_number',
    label: 'phone_number',
    field: 'phone_number',
    align: 'left',
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: 'Action',
    align: 'right',
    label: 'Action',
    field: 'Action',
    sortable: false,
  },
]
const rows = []
export default {
  components: {
    add_employee,
    add_form,
  },
  setup () {
    return {
      prompt: ref(false),
      title: "add employee",

    }
  },
  data() {
    return {
      prompt: false,
      showDialog: false,
      selectedRows: [],
      listItems: [],
      pagination: {},
      filter: '',
      visible: false,
      showSimulatedReturnData: false,
      loading: false,
      selected: [],
      columns,
      rows,
      emplooyeeLength: '',
      blue: ref(false),
      AddEmployee: false,
      employees: [],
      item: {
        id: '',
        first_name: '',
        Date_Birth: '',
        department: '',
        shift: '',
        join_date: '',
        phone: '',
        Rol: '',
      },
    }
  },

  mounted() {
    // if (localStorage.getItem("data") !== null) {
    //   let users = JSON.parse(localStorage.getItem("data"));
    //   this.rows = users;
    //   // const newlist = users
    //   console.log(users);
    // }
    this.getUser()
    // this.getImg()
  },
  computed: {
    filteredData() {
      let users = localStorage.getItem('data')
      if (this.item.id == users.data.id) {
        let users = JSON.parse(localStorage.getItem('data'))
        this.rows = users
      }
      return this.data.filter((items) => {
        for (var item in items) {
          if (String(items[item]).indexOf(this.searchQuery) !== -1) {
            return true
          }
        }
        return false
      })
    },
  },
  methods: {
    multiDelete() {
      if (this.selectedRows.length > 0) {
        this.showDialog = true
      }
    },
    async getUser() {
      const token = localStorage.getItem('access')

      await axios
        .get(`${API_URL}/employees/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {

          // let emplooyeeLength = response.data
          console.log('response111', response.data.results)
          console.log('getimage_path', response.data['image_path'])
          this.rows = response.data.results
          console.log('get employees', this.rows.length)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    showTextLoading() {
      this.visible = true
      this.showSimulatedReturnData = false
      setTimeout(() => {
        this.visible = false
        this.showSimulatedReturnData = true
      }, 3000)
    },
    addemployee() {},
    deleteAll() {
      axios
        .delete(`${API_URL}/employees`)
        .then((response) => {
          console.log(response.data.name)
          alert('All record  deleted successfully..')
          this.getUser()
        })
        .catch((error) => {
          console.error({ error: error })
        })
      // console.log(this.employees);
      // let a = JSON.parse(localStorage.getItem("data"));
      // this.rows = a;
    },
    del(id) {
      this.$q
        .dialog({
          title: 'Confirm',
          message: 'Do you want to delete {}?',
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          axios
            .delete(`${API_URL}/employees/` + id)
            .then((response) => {
              console.log("delete successfully....")
              this.getUser()
            })
            .catch((error) => {
              this.$q.notify({
                type: 'negative',
                message: `Something went wrong when trying to verify`,
              })
            })

          // console.log('>>>> OK')
        })
        .onOk(() => {
          // console.log('>>>> second OK catcher')
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        })
    },
    edit(id) {
      this.$router.push('/add_employee');

      axios.get(`${API_URL}/employees/` + id)
      .then((response) => {
      // Assuming 'item' is a data property in the '/add_employee' component
      this.$store.commit('updateItem', response.data); // You can use a mutation if you're using Vuex
    })
    .catch((error) => {
      console.log(error);
    });
    },
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          this.data.map((rows) =>
            this.columns
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === 'function'
                    ? col.field(rows)
                    : rows[col.field === void 0 ? col.name : col.field],
                  col.format,
                ),
              )
              .join(','),
          ),
        )
        .join('\r\n')

      const status = exportFile('table-export.csv', content, 'text/csv')

      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning',
        })
      }
    },
  },
}
</script>
<style scoped>
.rounded-image {
  border-radius: 50%;
  width: 50px;
  height: 50px;
}
</style>
