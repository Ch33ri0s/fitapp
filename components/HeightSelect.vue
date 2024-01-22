<template>
    <select placeholder="Height"
        class="w-full px-3 py-3 bg-neutral-900 text-neutral-300 border border-neutral-600 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        id="heightSelect" v-model="selectedHeight">
        <option v-for="height in heights" :key="height" :value="height">{{ height }}</option>
    </select>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';

const heights = ref<string[]>([]);
const selectedHeight = ref("5'0\"");

for (let feet = 2; feet <= 8; feet++) {
    for (let inches = 0; inches < 12; inches++) {
        heights.value.push(`${feet}'${inches}"`);
    }
}
</script>