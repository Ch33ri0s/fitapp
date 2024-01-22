<template>
    <select class="w-full px-3 py-3 bg-neutral-900 text-neutral-300 border border-neutral-600 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" id="ageSelect" v-model="selectedAge">
        <option v-for="age in ages" :key="age" :value="age">{{ age }}</option>
    </select>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';

const ages = ref<string[]>([]);
const selectedAge = ref('3'); // Default age set to 3

for (let age = 3; age <= 100; age++) {
    ages.value.push(age.toString());
}
</script>