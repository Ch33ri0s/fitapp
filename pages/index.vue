<template>
    <div id="index bg-neutral-950">
        <nav class="flex justify-center items-center bg-neutral-950 text-white p-8">
            <!-- Title -->
            <div>
                <h1 class="pl-3 text-3xl font-bold capitalize"> {{ currentRouteName }}</h1>
            </div>
        </nav>
        <div class="index-container container mx-auto p-4">
            <div class="flex flex-wrap -mx-2">
                <div class="w-full md:w-1/2 lg:w-1/3 p-2">
                    <select v-model="selectedMuscleGroup"
                        class="w-full px-3 py-3 bg-neutral-900 text-neutral-300 border border-neutral-600 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="biceps">Biceps</option>
                        <option value="triceps">Triceps</option>
                        <option value="legs">Legs</option>
                        <option value="chest">Chest</option>
                        <option value="back">Back</option>
                        <!-- ... other options ... -->
                    </select>
                </div>
                <div class="w-full md:w-1/2 lg:w-1/3 p-2">
                    <select id="difficulty" v-model="selectedDifficulty"
                        class="w-full px-3 py-3 border bg-neutral-900 text-neutral-300 border-neutral-600 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="easy">Easy</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
            </div>
            <div class="flex justify-center mt-4 w-full">
                <button @click="generateWorkout"
                    class="w-full text-center hover:bg-lime-300 bg-lime-400 text-neutral-950 font-bold py-2 px-4 rounded-full full relative">
                    <span v-if="!isLoading">Generate Workout</span>
                    <span v-else class="flex justify-center">Generating... <svg class="rotating ml-2"
                            xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512">
                            <path
                                d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
                        </svg></span>
    
                </button>
            </div>

            <div class="mt-6 space-y-4 pb-24" v-for="(workout, wIndex) in workouts" :key="wIndex">
                <div class="flex justify-between items-center bg-neutral-800 p-3 rounded-lg shadow">
                    <h3 class="text-lg font-semibold text-lime-400 truncate">Workout for {{ workout.muscleGroup }}</h3>
                    <button @click="removeWorkout(wIndex)"
                        class="bg-red-500 hover:bg-red-400 text-white font-bold py-1 px-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none"
                            stroke="currentColor" stroke-width="2">
                            <line x1="4" y1="4" x2="20" y2="20" /> <!-- Diagonal Line 1 -->
                            <line x1="20" y1="4" x2="4" y2="20" /> <!-- Diagonal Line 2 -->
                        </svg>

                    </button>
                </div>
                <div v-for="(exercise, eIndex) in workout.exercises" :key="exercise.title"
                    class="bg-neutral-900 border border-neutral-800 shadow rounded-3xl p-4">
                    <div class="font-bold text-lime-400 truncate">{{ eIndex + 1 }}. {{ exercise.title }}</div>
                    <div class="font-semibold text-neutral-300 text-sm mt-1">Sets: {{ exercise.sets }}</div>
                    <div class="font-semibold text-neutral-300 text-sm mt-1">Reps: {{ exercise.reps }}</div>
                    <p class="text-neutral-400 text-sm mt-1">{{ exercise.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

definePageMeta({
    middleware: ["auth"]
});

interface Exercise {
    title: string;
    sets: string;
    reps: string;
    description: string;
}

interface Workout {
    muscleGroup: string;
    exercises: Exercise[];
}

const route = useRoute();
const currentRouteName = computed(() => {
    if (route.name === 'index') {
        return 'Workouts'
    } else {
        return route.name;
    }
});


const isLoading = ref(false);

const selectedMuscleGroup = ref<string>('biceps');
const selectedDifficulty = ref<string>('easy'); // Default to 'easy'
const workouts = ref<Workout[]>([]);

const generateWorkout = async () => {
    isLoading.value = true;
    try {
        const response = await fetch(`/api/workout?muscleGroup=${selectedMuscleGroup.value}&difficulty=${selectedDifficulty.value}`);
        const text = await response.text();
        console.log("API Response:", text); // Log the response

        const exercises: Exercise[] = parseExercises(text);
        const difficultyLabel = selectedDifficulty.value.charAt(0).toUpperCase() + selectedDifficulty.value.slice(1); // Capitalize the first letter

        workouts.value.unshift({
            muscleGroup: `${selectedMuscleGroup.value} (${difficultyLabel})`, // Append difficulty to the title
            exercises
        });

    } catch (error) {
        console.error('Error fetching workout:', error);
    }
    isLoading.value = false;
};

const removeWorkout = (index: number) => {
    workouts.value.splice(index, 1);
};

function parseExercises(text: string): Exercise[] {

    const exerciseBlocks = text.split('Exercise').slice(1); // Split by 'Exercise' and skip the first empty element

    return exerciseBlocks.map(block => {
        // Adjusting the regular expression to match the API response format
        const match = block.match(/^\s*\d+\s+-\s+([^:]+):\s+Sets\s+-\s+(\d+),\s+Reps\s+-\s+([\d-]+),\s+Description\s+-\s+(.+)/);

        if (match) {
            return {
                title: match[1].trim(),
                sets: match[2].trim(),
                reps: match[3].trim(),
                description: match[4].trim()
            };
        }

        return { title: '', sets: '', reps: '', description: '' };
    }).filter(exercise => exercise.title);
}

</script>

<style lang="css">

select{-webkit-appearance: none;}
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

/* .exercise-enter-active,
.exercise-leave-active {
    transition: opacity 0.5s, transform 0.5s;
}

.exercise-enter-from,
.exercise-leave-to {
    opacity: 0;
    transform: translateY(10px); */
/* } */
</style>