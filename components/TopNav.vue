<template>
    <nav class="flex justify-between items-center bg-neutral-950 text-white p-4">
        <!-- Profile Image -->
        <div class="flex items-center">
            <img src="https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png"
                alt="Profile" class="h-10 w-10 rounded-full">
        </div>

        <!-- Title -->
        <div>
            <h1 class="text-xl font-bold"> {{ currentRouteName }}</h1>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center space-x-4">
            <button class="bg-lime-400 hover:bg-lime-300 text-gray-950 font-bold text-sm py-2 px-4 rounded-3xl">
                Generate
            </button>
        </div>
    </nav>
</template>

<script setup>

</script>