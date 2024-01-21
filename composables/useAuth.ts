// composables/useAuth.ts
import { ref } from 'vue';
import type { User } from '@supabase/supabase-js'; // Type-only import
import { useRouter } from 'vue-router';

export default function useAuth(): { user: Ref<User | null> } {

    const user = ref<User | null>(null);
    const supabase = useSupabaseClient();
    const router = useRouter();

    supabase.auth.onAuthStateChange((event, session) => {
        user.value = session?.user || null;
        if (event === 'SIGNED_IN') {
            router.push('/'); // Replace with your authenticated route
        }
    });

    return { user };
}
