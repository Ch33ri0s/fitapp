<template>
    <nav class="flex justify-center items-center bg-neutral-950 text-white p-4">
        <!-- Profile Image -->
        <!-- <div class="flex items-center">
                <img src="https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png"
                    alt="Profile" class="h-10 w-10 rounded-full">
            </div> -->
        <!-- Title -->
        <div>
            <h1 class="pl-3 text-3xl font-bold capitalize"> {{ currentRouteName }}</h1>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center space-x-4">
            <!-- <button class="bg-lime-400 hover:bg-lime-300 text-gray-950 font-bold text-sm py-2 px-4 rounded-3xl">
                    Generate
                </button> -->
        </div>
    </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

definePageMeta({
    middleware: ["auth"]
});

const route = useRoute();
const currentRouteName = computed(() => {
    if (route.name === 'index') {
        return 'Workouts'
    } else {
        return route.name;
    }
});
</script>