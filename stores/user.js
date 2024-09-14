import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useApi } from "~/utils/api"; // Importa a API que usa useFetch

export const useUserStore = defineStore("user", () => {
  const token = ref(null);
  const user = ref(null);
  const router = useRouter();
  const api = useApi();

  // Define o token no estado
  const setToken = (newToken) => {
    token.value = newToken;
  };

  // Limpa o token e os dados do usuário
  const clearToken = () => {
    token.value = null;
    user.value = null;
  };

  // Ação para fazer login
  const login = async (username, password = "") => {
    try {
      await api.login(username, password);
      router.push(`/todas_ordens/${user.value.id_usuario}/`);
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };

  const verifyToken = async (token) => {
    return await api.verifyToken(token);
  };

  // Busca o usuário logado
  const fetchUser = async () => {
    try {
      await api.fetchUser();
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw error;
    }
  };

  // Ação para fazer logout e redirecionar o usuário para a página de login
  const logoutAndRedirect = () => {
    clearToken();
    router.push("/login");
  };

  return {
    token,
    user,
    setToken,
    clearToken,
    login,
    fetchUser,
    verifyToken,
    logoutAndRedirect,
  };
});
