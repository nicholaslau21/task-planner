<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <span>Task Planner</span>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  beforeCreate() {
    this.$store.dispatch("fetchData");
  },

  data: () => ({
    //
  }),
};
</script>
