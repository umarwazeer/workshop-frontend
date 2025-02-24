<template>
  <div class="">
    <q-card flat square>
      <q-card-section class="q-px-none row">
        <div class="col-xs-12">
          <div class="text-h5 flex wrap justify-between q-px-lg">
            <div class="text-h7">Add Employee</div>
          <q-btn class="q-mb-md" flat icon="close" v-close-popup />

          </div>
          <q-separator
            color="success-10"
            class="px-2 m-2"
            style="height: 2px"
          />

          <div class=" q-pa-md wrap">
            <div class="col-md-6 q-px-xs wrap q-gutter-md">
              <q-input
                outlinedKJKKJKLAljjk
                class="col"
                dense
                outlined
                square
                label="User Name"
                clearable
                v-model="item.name"
              />
              <q-input
                type="text"
                outlined
                dense
                square
                clickable
                label="Email"
                v-model="item.email"
                clearable
                class="q-mb-md"
              />
            </div>

            <div class="col-md-6 q-px-xs wrap q-py-xs q-gutter-md">
            <q-dialog v-model="prompt" >
              <q-card class="" style="width: 350px">
                <div class="q-pa-md">
                  <div class="text-h6 q-mb-md">Add New Role</div>
              <q-input
                type="text"
                outlined
                dense
                rouded
                square
                clickable
                label="Employee Role"
                v-model="item.role"
                clearable
              />
              <q-btn label="save" v-close-popup class="float-right q-mt-lg text-white bg-primary q-my-md q-mt-md flex q-px-lg" dense/>
              <q-btn label="Close" v-close-popup class="float-right q-mt-lg q-mr-md q-my-md q-mt-md flex q-px-lg" dense/>
                </div>

              </q-card>
              </q-dialog>

              <q-select
                class="col-"
                label="Role"
                :options="options"
                transition-show="flip-up"
                transition-hide="flip-down"
                emit-value
                clearable
                map-options
                option-value="dep_id"
                option-label="name"
                v-model="item.role"
                dense
                outlined
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-italic text-grey">
                      {No options slot please add Department}s
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:append>
                  <q-btn
                    round
                    dense
                    flat
                    color="primary"
                    icon="add"
                    @click="prompt = true"
                    @click.stop
                  />
                </template>
                <templates
                  v-slot:option="{
                    itemProps,
                    itemEvents,
                    opt,
                    selected,
                    toggleOption,
                  }"
                >
                  <q-item v-bind="itemProps" v-on="itemEvents">
                    <q-item-section>
                      <q-item-label v-html="opt.name"></q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-btn
                        icon="delete"
                        round
                        color="red"
                        dense
                        @click.stop="delDepartment(opt.id)"
                        flat
                      />
                    </q-item-section>
                  </q-item>
                  <q-separator
                    class="q-mx-xs"
                    color="grey"
                  />
                </templates>
              </q-select>

                <q-select

                  class="col grow-1"
                  outlined
                  dense
                  square
                  behavior="menu"
                  label="Gender"
                  options-dense
                  :options="['Male', 'Female', 'Other' ]"
                  v-model="item.gender"
                />
                <q-input
                  class="col "
                  outlined
                  dense
                  square
                  label="Phone"
                  v-model="item.phone"
                  clearable
                />


            </div>

            <div class="q-pt-md">
                <q-btn
                  class="col text-capitalize"
                  unelevated
                  label="Create Employee"
                  icon=""
                  style="width: 360px"
                  color="primary"
                  @click="createEmployee"
                  v-close-popup
                />

              </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";
import { Notify } from "quasar";
import { ref } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiImagePlus } from "@mdi/js";
import ImageUploader from "../imageUploader.vue";
import add_form from "../categories/addCategary.vue";

const token = localStorage.getItem("access_token");
const API_URL = 'http://localhost:2024'

const columns = [];
const rows = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: "3%",
    iron: "8%",
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: "7%",
    iron: "16%",
  },
];
const employeeData = {
  item: {
        // dep: ref(null),
        tabs: "create",
        name: "",
        id: null,
        fathername: "",
        salary: "",
        workexperience: "",
        role: "",
        gender: "",
        dep_id: null,
        phone: "",
        date_of_join: "",
        date_of_birth: "",
        email: "",
        qualification: "",
      },
}
export default {
  employeeData,
  components: { SvgIcon, ImageUploader, add_form},

  data() {
    return {
      prompt: false,
      employees: [],
      itemProps: "",
      toggleOption: false,
      options: [],
      item: {
        name: "usman40",
        id: null,
        role: "manager",
        gender: "male",
        id: null,
        phone: "34532363",
        email: "usman590@gmail.com",
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    const id = to.params.id;

    if (id) {
      axios.get(`${API_URL}/employees/${id}`)
        .then((response) => {
          next((vm) => {
            vm.item = response.data;
          });
        })
        .catch((error) => {
          console.log(error);
          next();
        });
    } else {
      next();
    }
  },
  mounted() {
    this.get_department();
  },
  created(){
  },
  methods: {
    showDialog() {
      this.prompt = true;
    },
    openFileInput(event) {
      this.$refs.fileInput.click();
      event.preventDefault();

      const formData = new FormData();
      formData.append("image", this.selectedImage);

    },
    captureImage(event) {
      console.log(this.capturedImage);
      const file = event.target.files[0];
      const reader = new FileReader();
      console.log(reader);

      reader.onload = () => {
        this.capturedImage = reader.result;
        // console.log(this.capturedImage)
      };

      if (file) {
        reader.readAsDataURL(file);
        console.log(file);
      }
    },

    get_department() {
      axios.get("http://127.0.0.1:2024/department").then((res) => {
        this.options = res.data;
        console.log("department", res);
      });
    },

    delDepartment(id) {
      axios
        .delete("http://127.0.0.1:2024/department/" + id)
        .then((response) => {
          console.log(response.data.name);
          this.get_department();
          this.$q.notify({
            type: "positive",
            message: `This is a "positive" type notification.`,
          });
        })
        .catch((error) => {
          console.error({ error: error });
        });
      console.log("delete department.." + id);
    },

    createEmployee () {
        (this.item.id = Math.floor(Math.random() * 1000000 + 1));
        if (this.item.dep_id)
        {
          this.item.dep_id = this.item.dep_id.id;
        }
        console.log("this,iem", this.item)
        console.log("access_token", token)
        axios.post("http://127.0.0.1:2024/employees", this.item, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log("employeesData", this.item);
            this.$q.notify({
              type: "positive",
              message: "your data successfully added",
            });
            this.$router.push("/Empl-list");
            console.log(this.item);
          })
          .catch((error) => {
            console.log("error",error);
            console.log(error.data);
          });
        },

    updateEmployee(id) {
      // If employee has an ID, it's an existing employee, so update it
      axios.put("http://127.0.0.1:2024/employees/" + id, this.item, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          // Update the employee in the table
          this.item.name = response.data.name
          console.log(this.item)
        })
        .catch(error => {
          console.error(error);
        });
      }
    },

};
</script>
<style>
</style>
