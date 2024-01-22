<template>
    <div class="flex flex-col items-center p-4">
        <img class="w-24 h-24 rounded-full"
            src="https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png"
            alt="Profile Picture">
        <h1 class="text-2xl font-bold text-gray-200 mt-2">[user name]</h1>
        <p class="text-sm text-neutral-300">Bio or additional info</p>
        <div class="w-full max-w-xs rounded-lg shadow-md p-4 mt-4">
            <div class="flex justify-between items-center pb-2 pt-2">
                <p class="text-neutral-400">Name:</p>
                <p class="font-semibold text-neutral-200">[user name]</p>
            </div>
            <div class="flex justify-between items-center pb-2 pt-2">
                <p class="text-neutral-400">Email:</p>
                <p class="font-semibold text-neutral-200">[user email]</p>
            </div>
            <div class="flex justify-between items-center pb-2 pt-2">
                <p class="text-neutral-400">Age:</p>
                <p class="font-semibold text-neutral-200">[user age]</p>
            </div>
            <div class="flex justify-between items-center pb-2 pt-2">
                <p class="text-neutral-400">Gender:</p>
                <p class="font-semibold text-neutral-200">[user gender]</p>
            </div>
            <div class="flex justify-between items-center pb-2 pt-2">
                <p class="text-neutral-400">Weight:</p>
                <p class="font-semibold text-neutral-200">[user weight]</p>
            </div>
            <div class="flex justify-between items-center pb-2 pt-2">
                <p class="text-neutral-400">Height:</p>
                <p class="font-semibold text-neutral-200">[user height]</p>
            </div>
        </div>
        <button @click="logout"
            class="w-full hover:bg-lime-300 bg-lime-400 text-slate-950 font-bold py-2 px-4 rounded mt-4">
            Logout
        </button>
    </div>
</template>

<script setup lang="ts">
import { AuthError } from '@supabase/supabase-js';

definePageMeta({
    middleware: ["auth"]
});

const supabase = useSupabaseClient();
const router = useRouter();
const user = useSupabaseUser();

const logout = async () => {
    try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        navigateTo('/login');
    } catch (error) {
        const authError = error as AuthError;
        alert(authError.message); // Using 'message' property for error display
    }
}
</script>

<style>
/* Additional CSS if needed */
</style>
