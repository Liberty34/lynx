export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();
  if (!user.value && to.path !== "/") {
    return navigateTo("/auth");
  } else if (user.value && to.path === "/auth") {
    return navigateTo("/dashboard");
  } else if (user.value && to.path === "/") {
    return navigateTo("/dashboard");
  }
});
