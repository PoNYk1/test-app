<template>
  <v-card>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="this.$store.getters.visibleArr"
      :search="this.$store.state.search"
      search-by="name"
      :item-class="rowClass"
      show-select
      item-key="name"
      
      class="elevation-1"
    >
      <template #item.byHours="{ item }">
          <v-checkbox
            :ripple ='false'
            v-model="item.byHours"
            @change="$store.commit ('setHours', item)"
            :disabled="item.dismiss"
          ></v-checkbox>
      </template>

      <template #item.salaryAndFraction="{ item }">
        <span v-if="item.dismiss">{{item.salaryAndFraction}}</span>
        <v-edit-dialog 
          v-else
          large
          save-text="Сохранить"
          cancel-text="Отмена"
          persistent
          @save='save("salaryAndFraction", item, val, val2)'
          @cancel="cancel">
          {{item.salaryAndFraction}}
          <template #input >
            <v-text-field
              v-model="val"
              single-line
              counter
              type='number'
              :rules='[rul]'
              messages="ставка. руб"
            ></v-text-field>
            <v-text-field
              v-model="val2"
              single-line
              counter
              type='number'
              :rules='[rul]'
              messages="ставка. %"
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template #item.base="{ item }">
        <div v-if="item.dismiss">{{item.base}}</div>
        <v-edit-dialog 
          v-else
          large
          persistent
          save-text="Сохранить"
          cancel-text="Отмена"
          @save='save("base", item, val)'
          @cancel="cancel">
          {{ item.base }}
          <template v-slot:input>
            <v-text-field
              title="item.base"
              v-model="val"
              single-line
              counter
              type='number'
              :rules='[rul]'
              messages="база. руб"
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template #item.advance="{ item }">
        <div v-if="item.dismiss">{{item.advance}}</div>
        <v-edit-dialog 
          v-else 
          large
          persistent
          save-text="Сохранить"
          cancel-text="Отмена"
          @save='save("advance", item, val)'
          @cancel="cancel">
          {{ item.advance }}
          <template v-slot:input>
            <v-text-field
              v-model="val"
              single-line
              counter
              type='number'
              :rules='[rul]'
              messages="аванс. руб"
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>

      <template v-slot:item.data-table-select="{ item, isSelected, select }">
        <v-simple-checkbox
          :ripple ='false'
          :value ='isSelected'
          @input='select($event)'
          v-if='!item.dismiss'>
        </v-simple-checkbox>
      </template>

      <template v-slot:header.data-table-select="{ on, props }">
        <v-simple-checkbox
          :ripple ='false'
          v-bind="props"
          v-on="on"
          v-model="sel">
        </v-simple-checkbox>
      </template>
    </v-data-table>
  </v-card> 
</template>

<script>
  export default {
    data () {
      return {
        selected: [],
        sel:false,
        headers: [
          {
            text: 'Сотрудник',
            align: 'start',
            value: 'name',
          },
          { text: 'Компания', value: 'companyName', filterable: false},
          { text: 'Должность', value: 'positionName', filterable: false },
          { text: 'Дата приема', value: 'hireDate', filterable: false },
          { text: 'Дата увольнения', value: 'fireDate', filterable: false },
          { text: 'Ставка', value: 'salaryAndFraction', filterable: false},
          { text: 'База', value: 'base', filterable: false},
          { text: 'Аванс', value: 'advance', filterable: false},
          { text: 'Почасовая', value: 'byHours', filterable: false},
        ],
        val:'',
        val2: ''
      }
    },
    methods: {
      rowClass: (item) => ({
        fired: item.dismiss 
      }),
      rul (val) {
        return val == '' ? false : true
      },
      save (string, item, val, val2) {
        if (val != '' && val2 != '') {
          this.$store.commit('udateValume',{
          props: string, 
          item: item, 
          val: val, 
          val2: val2, 
          })
        }
        this.val = ''
        this.val2 = ''
      },
      cancel () {
        this.selected = []
      }
    },
    watch: {
      selected: function (val) {
        this.$store.commit ('selectedPeople', {people: val})
      },
      selectedNull (val) {
        if (val == true) {
          this.selected = []
          this.$store.commit ('selectedNullBack')
        }
      },
      sel: function (val) {
        setTimeout (()=>{
          if (val) {
          const newArr = this.selected.filter (el => !el.dismiss)
          this.selected = newArr
          console.log (newArr)
        }
        })
      }
    },
    computed: {
      selectedNull () {
        return this.$store.state.selectedNull
      }
    },
    created () {
      this.$store.commit ('showDismissed', {people: true})
    }
  }
</script>

<style>
  .fired {
    background-color: rgb(255, 117, 117);
  }
  .fired:hover {
    background: rgb(255, 117, 117) !important;
  }
  
</style>