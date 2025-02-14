import { AuthApi, Configuration, UserBasicInfor, VerifyTokenResponseDto } from "@/api";
import apiClient from "@/config/httpClient";

export async function verifyUser(token: string) {
  const authApi = new AuthApi(
    new Configuration({ baseOptions: {} }),
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    apiClient
  );

  try {
    const response = (await authApi.authControllerValidateToken(token)).data as unknown as VerifyTokenResponseDto;
    console.log(response);
    // Kiểm tra sự tồn tại của data và user trước khi truy cập
    if (response?.user) {
      return response.user as UserBasicInfor;
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      console.log("Response status:", error.response.status);
      console.log("Response data:", error.response.data);
    }

    // Nếu error có message (lỗi từ Axios hoặc JS error)
    if (error.message) {
      console.log("Error message:", error.message);
    }
    return null;
  }
}
