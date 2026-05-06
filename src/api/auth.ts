import { apiClient } from "./client";
import { z } from "zod";

export const AuthSchema = z.object({
    email: z.email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type AuthDto = z.infer<typeof AuthSchema>;

export interface AuthResponse {
    accessToken: string;
    user: {
        id: string;
        email: string;
    };
}

export const loginRequest = async (data: AuthDto): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>("/auth/login", data);
    return response.data;
};
