<template>
    <div id="index bg-neutral-950">
        <nav class="flex justify-center items-center bg-neutral-950 text-white p-8">
            <!-- Title -->
            <div>
                <h1 class="text-3xl font-bold capitalize"> {{ currentRouteName }}</h1>
            </div>
        </nav>
        <div class="index-container container mx-auto p-4">
            <div class="flex flex-wrap -mx-2">
                <div class="w-full md:w-1/2 lg:w-1/3 p-2">
                    <select v-model="selectedGoal"
                        class="w-full px-3 py-3 bg-neutral-900 text-neutral-300 border border-neutral-600 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="loseWeight">I want to lose weight</option>
                        <option value="getStronger">I want to get stronger</option>
                        <option value="recoverFaster">I want to recover faster</option>
                    </select>
                </div>
            </div>
            <div class="flex justify-center mt-4 w-full">
                <button @click="generateSupplements"
                    class="w-full text-center hover:bg-lime-300 bg-lime-400 text-neutral-950 font-bold py-2 px-4 rounded-full full relative">
                    <span v-if="!isLoading">Generate Supplements</span>
                    <span v-else class="flex justify-center">Generating... <svg class="rotating ml-2"
                            xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512">
                            <path
                                d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
                        </svg></span>
                </button>
            </div>
            <div class="mt-6 space-y-4 pb-24" v-if="supplements.length">
                <div class="flex justify-between items-center bg-neutral-800 p-3 rounded-lg shadow">
                    <h3 class="text-lg font-semibold text-lime-400 truncate">Recommendations</h3>
                    <button @click="removeAllSupplements()"
                        class="bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none"
                            stroke="currentColor" stroke-width="2">
                            <line x1="4" y1="4" x2="20" y2="20" /> <!-- Diagonal Line 1 -->
                            <line x1="20" y1="4" x2="4" y2="20" /> <!-- Diagonal Line 2 -->
                        </svg>

                    </button>
                </div>
                <div class="bg-neutral-900 border border-neutral-800 shadow rounded-3xl p-4" v-for="(supplement, sIndex) in supplements" :key="sIndex">
                    <div class="font-bold text-lime-400 truncate">{{ supplement.name }}</div>
                    <div class="font-semibold text-neutral-300 text-sm mt-1">Recommended Dosage: {{ supplement.dosage }}</div>
                    <p class="text-neutral-400 text-sm mt-1">{{ supplement.description }}</p>
                    <!-- <div class="bg-neutral-800 p-3 rounded-lg shadow">
                        <div class="font-bold text-lime-400 truncate">{{ supplement.name }}</div>
                        <div class="bg-neutral-900 border border-neutral-800 shadow rounded-3xl p-4">
                            <div class="font-semibold text-neutral-300 text-sm">Dosage: {{ supplement.dosage }}</div>
                            <p class="text-neutral-400 text-sm mt-1">{{ supplement.description }}</p>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

definePageMeta({
    middleware: ["auth"]
});

interface Supplement {
    name: string;
    dosage: string;
    description: string;
}

const currentRouteName = ref('Supplements'); // Updated to 'Supplements'

const isLoading = ref(false);
const selectedGoal = ref<string>('loseWeight'); // Default to 'loseWeight'
const supplements = ref<Supplement[]>([]);

const selectedGoalText = computed(() => {
    switch (selectedGoal.value) {
        case 'loseWeight': return 'I want to lose weight';
        case 'getStronger': return 'I want to get stronger';
        case 'recoverFaster': return 'I want to recover faster';
        default: return 'Select Your Goal';
    }
});

const generateSupplements = async () => {
    isLoading.value = true;
    try {
        // Replace the URL with your API endpoint for generating supplements
        const response = await fetch(`/api/supplements?goal=${selectedGoal.value}`);
        const text = await response.text();
        console.log("API Response:", text); // Log the response

        const supplementsList: Supplement[] = parseSupplements(text);

        // You can modify this part as per how you want to use the data
        supplements.value = supplementsList;

    } catch (error) {
        console.error('Error fetching supplements:', error);
    }
    isLoading.value = false;
};

const removeAllSupplements = () => {
    supplements.value = [];
};

function parseSupplements(responseText: string): Supplement[] {
    // Split the response into blocks for each supplement
    const supplementBlocks = responseText.split(/\n(?=\d+\.)/);

    return supplementBlocks.map(block => {
        // Extract the supplement's name
        const nameMatch = block.match(/^\d+\.\s*(.+)$/m);
        // Extract the dosage
        const dosageMatch = block.match(/Dosage:\s*(.+)$/m);
        // Extract the description
        const descriptionMatch = block.match(/Description:\s*(.+)$/m);

        if (nameMatch && dosageMatch && descriptionMatch) {
            return {
                name: nameMatch[1].trim(),
                dosage: dosageMatch[1].trim(),
                description: descriptionMatch[1].trim()
            };
        }

        return { name: '', dosage: '', description: '' };
    }).filter(supplement => supplement.name);
}
</script>

<style lang="css">
select {
    -webkit-appearance: none;
}

.rotate-180 {
    transition: transform 0.3s;
    transform: rotate(180deg);
}

@-webkit-keyframes rotating

/* Safari and Chrome */
    {
    from {
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    to {
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes rotating {
    from {
        -ms-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    to {
        -ms-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

.rotating {
    -webkit-animation: rotating 2s linear infinite;
    -moz-animation: rotating 2s linear infinite;
    -ms-animation: rotating 2s linear infinite;
    -o-animation: rotating 2s linear infinite;
    animation: rotating 2s linear infinite;
}
</style>