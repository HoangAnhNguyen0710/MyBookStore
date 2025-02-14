import { AuthApi, Configuration, SignUpFirstStepDto } from "@/api";
import apiClient from "@/config/httpClient";

export async function SignUpFirstStep(credentials: SignUpFirstStepDto) {
  const authApi = new AuthApi(
    new Configuration({ baseOptions: {} }),
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    apiClient
  );
  // Tạo RequestContext từ API đã generate
  return (await authApi.authControllerSignUpFirstStep(credentials)).data;
}
