<template>
    <div class="flex justify-center items-center h-screen">
        <!-- Login -->
        <div class="w-full max-w-xs rounded">
            <h2 class="text-center text-3xl font-bold text-neutral-100 mb-6">Welcome!</h2>
            <form class="space-y-4">
                <input type="text" placeholder="Name" required
                    class="w-full px-3 py-3 bg-neutral-900 text-neutral-300 border border-neutral-600 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <div class="flex space-x-4">
                    <AgeSelect/>
                    <select placeholder="Gender" required
                        class="w-full px-3 py-3 bg-neutral-900 text-neutral-300 border border-neutral-600 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="genderMale">Male</option>
                        <option value="genderFemale">Female</option>
                        <option value="genderNonBinary">Non-Binary</option>
                    </select>
                </div>
                <div class="flex space-x-4">
                    <WeightSelect/>
                    <HeightSelect/>
                </div>
                <div class="flex justify-center mt-4 w-full">
                    <button type="submit"
                        class="w-full hover:bg-lime-300 bg-lime-400 text-slate-950 font-bold py-2 px-4 rounded">
                        <span>Get Started</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: ["auth"]
});
</script>