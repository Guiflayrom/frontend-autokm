import { useUserStore } from "~/stores/user";
import { useFetch } from "#app";

function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export const useApi = () => {
  const userStore = useUserStore();
  const baseURL = "http://localhost:8000";

  const dfetchWithAuth = async (url, options = {}) => {
    const token = userStore.token;

    // Adiciona o header de autorização se o token estiver presente
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return $fetch(url, {
      baseURL,
      ...options,
    });
  };

  const fetchWithAuth = async (url, options = {}) => {
    const token = userStore.token;

    // Adiciona o header de autorização se o token estiver presente
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return useFetch(url, {
      baseURL,
      ...options,
    });
  };

  // Função para realizar o login
  const login = async (username, password = "") => {
    try {
      const { data, error } = await useFetch(baseURL + "/api/auth/", {
        method: "POST",
        body: {
          username,
          password,
        },
        baseURL,
      });

      if (error.value) throw error.value;

      // Salva o token retornado na store
      const accessToken = data.value.access;
      localStorage.setItem("token", accessToken);
      userStore.setToken(accessToken);

      await fetchUser(accessToken);

      // Redireciona o usuário
      return { success: true };
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  };

  const verifyToken = async (token) => {
    const ok = fetch(baseURL + "/api/auth/verify/", {
      method: "POST",
      body: JSON.stringify({
        token: token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      baseURL,
    }).then((res) => {
      return res.ok;
    });
    return ok;
  };

  // Função para buscar dados do usuário logado
  const fetchUser = async (accessToken) => {
    const user_id = parseJwt(accessToken).user_id;

    try {
      const { data, error } = await fetchWithAuth(`/api/info/${user_id}/`, {
        method: "GET",
      });

      if (error.value) throw error.value;

      userStore.user = data.value;
      localStorage.setItem("dataUser", JSON.stringify(data.value));
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw error;
    }
  };

  // Função para fazer o refresh do token
  const refreshAuthToken = async () => {
    try {
      const refreshToken = userStore.token;

      if (!refreshToken) {
        throw new Error("Refresh token não disponível.");
      }

      const { data, error } = await useFetch(baseURL + "/api/auth/refresh/", {
        method: "POST",
        body: {
          refresh: refreshToken,
        },
        baseURL,
      });

      if (error.value) throw error.value;

      const newAccessToken = data.value.access;
      userStore.setToken(newAccessToken);

      return newAccessToken;
    } catch (error) {
      console.error("Erro ao renovar o token:", error);
      throw error;
    }
  };

  return {
    login,
    fetchUser,
    refreshAuthToken,
    fetchWithAuth,
    verifyToken,
    dfetchWithAuth,
  };
};
