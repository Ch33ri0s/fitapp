<template>
    <div class="flex justify-center items-center h-screen">
        <!-- Login -->
        <Transition name="slide-up" mode="out-in">
            <div v-if="loginActive" class="w-full max-w-xs rounded">
                <h2 class="text-center text-3xl font-bold text-neutral-100 mb-6">Login</h2>
                <form @submit.prevent="signIn" class="space-y-4">
                    <input type="email" placeholder="Email" v-model="signInEmail" required
                        class="w-full px-3 py-3 bg-neutral-900 text-neutral-300 border border-neutral-600 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <input type="password" placeholder="Password" v-model="signInPassword" required
                        class="w-full px-3 py-3 bg-neutral-900 text-neutral-300 border border-neutral-600 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <p class="text-red-500 text-sm">{{ signInErrMsg }}</p>
                    <!-- <button type="submit"
                        class="w-full hover:bg-lime-300 bg-lime-400 text-slate-950 font-bold py-2 px-4 rounded">
                        Login
                    </button> -->
                    <div class="flex justify-center mt-4 w-full">
                        <button type="submit"
                            class="w-full hover:bg-lime-300 bg-lime-400 text-slate-950 font-bold py-2 px-4 rounded">
                            <span v-if="!isLoading">Login</span>
                            <span v-else class="flex justify-center">Logging In... <svg class="rotating" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M12 22c5.421 0 10-4.579 10-10h-2c0 4.337-3.663 8-8 8s-8-3.663-8-8c0-4.336 3.663-8 8-8V2C6.579 2 2 6.58 2 12c0 5.421 4.579 10 10 10z"></path></svg></span>

                        </button>
                    </div>
                </form>
                <button @click="loginActive = false"
                    class="w-full hover:bg-lime-300 bg-transparent text-lime-400 hover:text-slate-950 font-bold py-2 px-4 border border-lime-400 rounded mt-4">
                    Sign Up
                </button>
            </div>
            <!-- Sign Up -->
            <div v-else-if="!loginActive" class="flex justify-center items-center">
                <div class="w-full max-w-xs p-4 rounded">
                    <h2 class="text-center text-3xl font-bold text-neutral-100 mb-6">Sign Up</h2>
                    <form @submit.prevent="signUp" class="space-y-4">
                        <input type="email" placeholder="Email" v-model="signUpEmail" required
                            class="w-full px-3 py-3 bg-neutral-900 text-neutral-300 border border-neutral-600 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <input type="password" placeholder="Password" v-model="signUpPassword" required
                            class="w-full px-3 py-3 bg-neutral-900 text-neutral-300 border border-neutral-600 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <p class="text-white">{{ signUpErrMsg }}</p>
                        <button type="submit"
                            class="w-full hover:bg-lime-300 bg-lime-400 text-slate-950 font-bold py-2 px-4 rounded">
                            Sign Up
                        </button>
                    </form>
                    <button @click="loginActive = true"
                        class="w-full hover:bg-lime-300 bg-transparent text-lime-400 hover:text-slate-950 font-bold py-2 px-4 border border-lime-400 rounded mt-4">
                        Back To Login
                    </button>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AuthError } from '@supabase/supabase-js';

// General
const loginActive = ref<boolean>(true);
const supabase = useSupabaseClient();
const router = useRouter();
const user = useSupabaseUser();
const isLoading = ref(false)

// Sign In
const signInEmail = ref<string>('');
const signInPassword = ref<string>('');
const signInErrMsg = ref<string>('');

// Sign Up 
const signUpEmail = ref<string>('');
const signUpPassword = ref<string>('');
const signUpErrMsg = ref<string>('');

const signIn = async () => {
    try {
        isLoading.value = true;
        const { error } = await supabase.auth.signInWithPassword({
            email: signInEmail.value,
            password: signInPassword.value,
        });
        if (error) throw error;
        navigateTo('/');
        alert('Success! You are logged in.');
    } catch (error) {
        const authError = error as AuthError;
        signInErrMsg.value = authError.message;
        // alert(authError.message);
    } finally {
        isLoading.value = false
    }
}

const signUp = async () => {
    try {
        const { error } = await supabase.auth.signUp({
            email: signUpEmail.value,
            password: signUpPassword.value,
        });
        if (error) throw error;
        alert('Success! You are now signed up.');
    } catch (error) {
        const authError = error as AuthError;
        alert(authError.message); // Using 'message' property for error display
    }
}

</script>


<style>
.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.35s ease-out;
}

.slide-up-enter-from {
    opacity: 0;
    transform: translateX(300px);
}

.slide-up-leave-to {
    opacity: 0;
    transform: translateX(-300px);
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