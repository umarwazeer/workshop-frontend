<template>
  <div class="row  q-pa-sm">
    <div class="col-3  col-6-md">
      <addCategary :item="this.item" :isEditing="isEditing"  @addCategary="addCategary"  />
    </div>
    <div class="col q-pa-sm">
      <!-- <div>{{ `Department ${this.rows.length}`  }}</div> -->
      <q-table
        dense
        :title="`Total Categary ${this.rows.length}`"
        class="col-auto"
        :rows="rows"
        :filter="filter"
        :columns="columns"
        row-key="name"
        selection="multiple"
        v-model:selected.sync="selectedRows"
        v-model:selected="selected"
      >
        <template v-slot:top-right>
          <q-btn label="Delete" dense v-if="this.selectedRows.length > 1" class="q-mx-md q-pa-sm q-px-md border-round-5 text-capitalize" @click="multiDelete" >
          <q-icon name="delete" size="1.5rem" class="q-pl-sm" color="red" /></q-btn>
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


      </q-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import addCategary from "./addCategary.vue";
import { exportFile, useQuasar } from "quasar";
import apiMaker from './apiClass'

export default {
  name: "list_dep",
  props:["rows", "columns"],
  components: {
    addCategary
  },

  data() {
    return {
      item: {
        // id:"",
        name:"",
        description:""
      },
      filter: "",
      isEditing: false,
      selected: [],
      selectedRows:[],
      columns: [
        {
          name: "id",
          align: "left",
          label: "Categary_Id",
          field: "id",
          sortable: true,
        },
        { name: "name", align: "left", label: "Categary_Name", field: "name" },
        { name: "description", align: "left", label: "description", field: "description" },
        {
    name: 'Action',
    align: 'right',
    label: 'Action',
    field: 'Action',
    sortable: false,
  },

      ],
      rows: [],
      departmentLength: [],
    };
  },
  mounted() {
    this.get_department();
  },
  methods: {
    addCategary() {
      if (this.isEditing) {
        this.updateDepartment();
      } else {
        this.createDepartment();
      }
    },

    createDepartment() {
      console.log("Submit", this.item)
      console.log("this item", this.item)
      // this.item.id = Math.floor(Math.random() * 1000000 + 1);
      apiMaker.createDepartment(this.item).then((response) => {
        if (response.status == 201) {
          // this.item.name = "";
          this.get_department();
          this.onClear()
          this.$q.notify({
            type: "positive",
            position: "top",
            message: "Your data successfully added",
          });
        }
        this.get_department()
      }).catch((error) => {
        alert(error);
        console.log(error.data);
      });
    },

    async updateDepartment() {
  console.log("Updating Department:", this.item);

  if (!this.item.id) {
    console.error("Error: Department ID is missing!");
    this.$q.notify({
      type: "negative",
      position: "top",
      message: "Department ID is missing!",
    });
    return;
  }

  try {
    const response = await apiMaker.UpdateDepartment(this.item.id, {
      name: this.item.name,
      description: this.item.description,
    });

    if (response.status === 200) {
      this.isEditing = false;
      this.item = { id: null, name: "", description: "" }; // Clear the form
      this.get_department(); // Refresh department list

      this.$q.notify({
        type: "positive",
        position: "top",
        message: "Your data was successfully updated!",
      });
    } else {
      console.error("Unexpected response status:", response.status);
    }
  } catch (error) {
    console.error("Error during updateDepartment API call:", error);
    if (error.response && error.response.data) {
      console.error("API error response data:", error.response.data);
    }
    this.$q.notify({
      type: "negative",
      position: "top",
      message: "Something went wrong while updating the department",
    });
  }
      },

    get_department() {
      apiMaker.getDepartment().then((response) => {
        this.rows = response.data.results
        this.departmentLength.push(response.data.length)
        // const depLength = response.data.length
        console.log("index", response.data)
        console.log("length", this.departmentLength)
      } )
    },

    del(id) {
      console.log("item", this.item)
      this.$q
        .dialog({
          title: "Confirm",
          message: "Do you want to delete {}?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
            apiMaker.DeleteDepartment(id).then((response) => {
             console.log("res", response)
             this.$q.notify({
                type: "positive",
                position:"top",
                message: `department is succesfully deleted`,
              });
              this.get_department();
            })
            .catch((error) => {
              this.$q.notify({
                type: "negative",
                position:"top",
                message: `Something went wrong when trying to verify`,
              });
            });

          // console.log('>>>> OK')
        });
    },

    edit(id) {
    apiMaker.getDepartment()
      .then((res) => {
        console.log("Department",)

        const departmentToEdit = res.data.results.find(dep => dep.id === id);

        if (departmentToEdit) {
        this.item.id = departmentToEdit.id;
        this.item.name = departmentToEdit.name;
        this.item.description = departmentToEdit.description;

        this.isEditing = true;
      } else {
        console.error("Department not found for editing.");
        this.$q.notify({
          type: "negative",
          position: "top",
          message: "Department not found for editing.",
        });
      }
    })
    .catch((error) => {
      console.error("Error while fetching department for editing:", error);
      this.$q.notify({
        type: "negative",
        position: "top",
        message: "Error while fetching department for editing.",
      });
    });
    },

    onClear() {
      this.item.name = ''
      this.item.workshop = ''
      this.item.description = ''
    },
  },
  }
</script>
