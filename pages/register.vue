<template>
    <div class="flex justify-center items-center">
        <div class="w-full max-w-xs p-4 rounded">
            <h2 class="text-center text-3xl font-bold text-neutral-100 mb-6">Sign Up</h2>
            <form @submit.prevent="" class="space-y-4">
                <input type="email" placeholder="Email" required
                    class="w-full px-3 py-3 bg-neutral-900 text-neutral-300 border border-neutral-600 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <input type="password" placeholder="password" required
                    class="w-full px-3 py-3 bg-neutral-900 text-neutral-300 border border-neutral-600 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <input type="confirmPassword" placeholder="confirmPassword" required
                    class="w-full px-3 py-3 bg-neutral-900 text-neutral-300 border border-neutral-600 rounded-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <button type="submit"
                    class="w-full hover:bg-lime-300 bg-lime-400 text-slate-950 font-bold py-2 px-4 rounded">
                    Sign Up
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">

const client = useSupabaseClient();
const email = ref<string>('');
const password = ref<string>('');
const errorMsg = ref<string>('');
const successMsg = ref<string>('');

async function signUp() {
    try {
        const { data, error } = await client.auth.signUp({
            email: email.value,
            password: password.value
        });
        if (error) throw error;
        successMsg.value = "Check your email to confirm your account.";
    } catch (error: any) {
        errorMsg.value = error.message;
    }
}
</script>



<style></style>