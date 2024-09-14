import { useUserStore } from "~/stores/user";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.server) return;

  const userStore = useUserStore();
  const token = localStorage.getItem("token");

  if (!(await userStore.verifyToken(token))) {
    return window.location.replace("/login");
  }
});
