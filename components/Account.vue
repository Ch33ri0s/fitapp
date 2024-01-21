<template>
  <form class="form-widget" @submit.prevent="updateProfile">
    <div>
      <label for="email">Email</label>
      <input id="email" type="text" :value="user.email" disabled />
    </div>
    <div>
      <label for="username">Username</label>
      <input id="username" type="text" v-model="username" />
    </div>
    <div>
      <label for="website">Website</label>
      <input id="website" type="url" v-model="website" />
    </div>

    <div>
      <input
        type="submit"
        class="button primary block"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
      />
    </div>

    <div>
      <button class="button block" @click="signOut" :disabled="loading">Sign Out</button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSupabaseClient, useSupabaseUser } from '@nuxtjs/supabase'; // Replace with your actual import path
import type { AuthError } from '@supabase/supabase-js';
import type { PostgrestError } from '@supabase/postgrest-js';

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const loading = ref<boolean>(true);
const username = ref<string>('');
const website = ref<string>('');
const avatar_path = ref<string>('');

onMounted(async () => {
    loading.value = true;

    try {
        const { data, error } = await supabase
            .from('profiles')
            .select(`username, website, avatar_url`)
            .eq('id', user.value?.id)
            .single();

        if (error) throw error;

        if (data) {
            username.value = data.username;
            website.value = data.website;
            avatar_path.value = data.avatar_url;
        }
    } catch (error) {
        const postgrestError = error as PostgrestError;
        console.error(postgrestError.message);
    } finally {
        loading.value = false;
    }
});

async function updateProfile() {
    try {
        loading.value = true;

        const updates = {
            id: user.value?.id,
            username: username.value,
            website: website.value,
            avatar_url: avatar_path.value,
            updated_at: new Date(),
        };

        const { error } = await supabase.from('profiles').upsert(updates, {
            returning: 'minimal',
        });

        if (error) throw error;
    } catch (error) {
        const authError = error as AuthError;
        alert(authError.message);
    } finally {
        loading.value = false;
    }
}

async function signOut() {
    try {
        loading.value = true;
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        user.value = null;
    } catch (error) {
        const authError = error as AuthError;
        alert(authError.message);
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <!-- ... your template code ... -->
</template>
