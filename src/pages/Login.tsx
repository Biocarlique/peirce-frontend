import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAuthStore } from "@/store/authStore";
import { AuthSchema, loginRequest } from "@/api/auth";
import type { AuthDto } from "@/api/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export const Login = () => {
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthDto>({
        resolver: zodResolver(AuthSchema),
    });

    const loginMutation = useMutation({
        mutationFn: loginRequest,
        onSuccess: (data) => {
            setAuth(data.user, data.accessToken);
            toast.success("Successfully logged in!");
            navigate("/");
        },
        onError: (error) => {
            const message = error.message || "Failed to login";
            toast.error(message);
        },
    });

    const onSubmit = (values: AuthDto) => {
        loginMutation.mutate(values);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">
                        Welcome back
                    </CardTitle>
                    <CardDescription>
                        Enter your email and password to login
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500 font-medium">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter at least 6 characters"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500 font-medium">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full hover:cursor-pointer"
                            disabled={loginMutation.isPending}
                        >
                            {loginMutation.isPending
                                ? "Logging in..."
                                : "Log in"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};
