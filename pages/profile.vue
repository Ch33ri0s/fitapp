<template>
    <div class="flex flex-col items-center p-4">
        <img class="w-24 h-24 rounded-full"
            src="https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png"
            alt="Profile Picture">
        <h1 class="text-xl font-bold text-gray-100 mt-2">Username</h1>
        <p class="text-sm text-gray-600">Bio or additional info</p>
        <!-- More profile details here -->
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
