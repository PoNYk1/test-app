<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>Занимаемые должности</h2>
      </v-col>
      <v-col>
        <v-text-field 
          placeholder="Поиск" 
          v-model="search"
          append-icon="mdi-magnify"></v-text-field>      
        <input type="checkbox" checked v-model="showDismissed"/> Показывать уволенных
        <v-row>

          <v-col>
            <v-btn 
              block
              elevation="2" 
              color="primary"> 
              Принять на должность </v-btn>
          </v-col>

          <v-col>
            <v-btn 
              block
              :disabled='disabledButton'
              elevation="2" 
              color="red"
              @click="dismiss"> 
              Снять с {{labelButton}}</v-btn>
          </v-col>
          
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      showDismissed: true,
      disabledButton: true,
      labelButton: 'должности',
    }
  },
  watch: {
    search: function () {
      this.$store.commit ('onSearch', {search: this.search})
    },
    showDismissed: function (val) {
      this.$store.commit ('showDismissed', {state: val})
    },
    selected (val) {
      val.length > 1 ?
        this.labelButton = 'должностей':
        this.labelButton = 'должности'
      
      val.length != 0 ?
        this.disabledButton = false:
        this.disabledButton = true
    }
  },
  computed: {
    selected () {
      return this.$store.state.selectedPeopleArr
    }
  },
  methods: {
    dismiss () {
      this.$store.commit ('dismiss')
    }
  }
}
</script>

<style scoped>
  h2 {
    margin-top: 15px;
  }
</style>