export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = useSupabaseUser();

    console.log("Middleware check - User: ", user.value);

    if (!user.value) {
        // User is not logged in, redirect to login page
        return navigateTo('/login');
    }

    // User is logged in, continue with the navigation
})
