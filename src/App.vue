<template>
  <v-app>
    <Header/>
    <Grid />
  </v-app>
</template>

<script>
import Grid from './components/grid'
import Header from './components/header'

export default {
  name: "App", 
  components: {
    Grid,Header
  }
};
</script>
