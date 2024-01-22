<template>
    <select
        class="w-full px-3 py-3 bg-neutral-900 text-neutral-300 border border-neutral-600 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        id="weightSelect" v-model="selectedWeight">
        <option v-for="weight in weights" :key="weight" :value="weight">{{ weight }} lbs</option>
    </select>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';

const weights = ref<string[]>([]);
const selectedWeight = ref('150');

for (let weight = 50; weight <= 700; weight++) {
    weights.value.push(weight.toString());
}
</script>
  