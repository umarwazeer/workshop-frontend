<template>
  <div class="q-pa-md q-gutter-sm" style="width: 800px;" >

      <q-card class="" >
        <q-card-section class="row flex justify-between items-center q-pb-none">
          <div class="text-h5">Your company name</div>
          <div>
          <div class="text-h5">Invoice Builder</div>
            <q-input type="date" v-model="date" outlined dense/>
          </div>
        </q-card-section>

        <q-card-section class="row flex justify-between" >
          <div >
          <div class="text-h7">bill To</div>
          <div class="text-h7">your client</div>
          <div class="text-h7">11 beaas</div>
          <div class="text-h7">United Kingkdom</div>
        </div>
        <div class="text-right">
          <div class="text-h7">bill To</div>
          <div class="text-h7">your client</div>
          <div class="text-h7">11 beaas</div>
          <div class="text-h7">United Kingkdom</div>
        </div>
        </q-card-section>

        <q-card-section>
          <div class="">
            <q-table
              flat bordered
              dense
              :rows="rows"
              :columns="columns"
              row-key="name"
            />
          </div>

        </q-card-section>

        <!-- <q-card-section>
              <q-table
              style="width: 400px;"
                class="my-sticky-header-column-table"
                flat bordered
                :data="data"
                :columnss="columnss"
                row-key="name"
              />
        </q-card-section> -->

        <q-card-actions align="left" class="q-ml-md">
          <q-btn flat label="print Invoice" class="q-pa-md text-h7 text-capitalize round text-white bg-primary" dense color="primary" v-close-popup />

        </q-card-actions>


        <q-card-actions align="left" class="q-ml-md">
          <!-- <div>Powored By umarkhan/a4umarkhan@gmail.com</div> -->

        </q-card-actions>
      </q-card>

  </div>
</template>
<script>
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

const rows = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
  }
]

const columnss = [
  {
    name: 'name',
    required: true,
    label: 'Dessert (100g serving)',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
 { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

const data = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
  },
]
export default {
  setup () {
    return {
      date:"",
      columns,
      rows,
      columnss,
      data
    }
  }
}
</script>

<style lang="sass">
.my-sticky-header-column-table

  height: 210px

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  max-width: 600px

  td:first-child
    /* bg color is important for td; just specify one */
    background-color: #00b4ff

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #00b4ff

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0

  /* prevent scrolling behind sticky top row on focus */
  tbody
    /* height of all previous header rows */
    scroll-margin-top: 48px
</style>
