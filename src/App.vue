<template>
  <v-app :dark="isDark" id="inspire">
    <v-app-bar
      app
      elevate-on-scroll
      height="58"
    >
      <v-container class="py-0 fill-height">
        <router-link to="/">
          <v-avatar
            class="mr-10"
            color="blue"
            size="32"
          >
            <v-icon color="white">
              mdi-all-inclusive
            </v-icon>
          </v-avatar>

        </router-link>

        <v-btn v-for="link in links"
               :key="link.to" text active-class="primary"
               :to="link.to">
          {{ link.title }}
        </v-btn>

        <v-spacer></v-spacer>
        <v-btn
          icon id="mode-switcher"
          @click="toggleDarkMode"
        >
          <v-icon :color="isDark ? 'primary' : 'primary lighten-4'">
            {{ isDark ? 'mdi-weather-night' : 'mdi-weather-sunny' }}
          </v-icon>
        </v-btn>

        <!--        <v-responsive max-width="260">-->
        <!--          <v-text-field-->
        <!--              dense-->
        <!--              flat-->
        <!--              hide-details-->
        <!--              rounded-->
        <!--              solo-inverted-->
        <!--          ></v-text-field>-->
        <!--        </v-responsive>-->
      </v-container>
    </v-app-bar>

    <v-main :class="isDark ? 'bg-grey-darken-3' : 'bg-grey-lighten-3'">
      <router-view/>
    </v-main>

    <v-footer app height="44">
      <v-col
        class="text-center"
        cols="12"

      >
        <div class="text-center">&copy; Mateusz Woźniak - {{ new Date().getFullYear() }}</div>
      </v-col>
    </v-footer>
  </v-app>
</template>


<!--Convert to typescript-->
<script>
export default {
  name: 'App',
  data: () => ({
    links: [
      {
        to: '/matematyka/',
        title: 'Matematyka'
      },
      {
        to: '/polski',
        title: 'Polski'
      }
    ],
  }),
  computed:{
    isDark() {
      return this.$vuetify.theme.global.name === "dark";
    }
  },
  methods: {
    toggleDarkMode: function() {
      const vueTheme = this.$vuetify.theme.global.name;
      this.$vuetify.theme.global.name = vueTheme === "light" ? 'dark' : 'light';
      localStorage.setItem("darkTheme", this.$vuetify.theme.global.name === "dark" ? "true" : "false");
    }
  },
  mounted() {
    const theme = localStorage.getItem("darkTheme");
    let vueTheme = this.$vuetify.theme.global.name;
    if (theme) {
      vueTheme = theme === "true" ? 'dark' : 'light';
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      vueTheme = "dark";
      localStorage.setItem(
        "darkTheme",
        vueTheme === "dark" ? "true" : "false"
      );
    }
    this.$vuetify.theme.global.name = vueTheme;
  }
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
