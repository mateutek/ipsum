<template>
  <div>
    <Hearts/>
    <div>
      <router-view v-slot="{ Component }">
        <v-slide-x-transition leave-absolute mode="out-in" origin="center">
          <component :is="Component" />
        </v-slide-x-transition>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Hearts from '@/components/hearts.vue';
</script>
