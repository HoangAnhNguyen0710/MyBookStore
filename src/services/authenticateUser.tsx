import { AuthApi, Configuration, LoginDto, LoginResponseDto } from "@/api";
import apiClient from "@/config/httpClient";

export async function authenticateUser(credentials: LoginDto) {
  const authApi = new AuthApi(
    new Configuration({ baseOptions: {} }),
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    apiClient
  );
  // Tạo RequestContext từ API đã generate
  return (await authApi.authControllerLogin(credentials)).data as unknown as LoginResponseDto;
}

export function logout () {
  // Xóa token khỏi cookie (nếu có)
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

  // Xóa token khỏi localStorage hoặc sessionStorage (nếu có)
  localStorage.removeItem("accessToken");
  sessionStorage.removeItem("accessToken");

  // Reload trang để cập nhật trạng thái đăng nhập
  window.location.reload();
};
