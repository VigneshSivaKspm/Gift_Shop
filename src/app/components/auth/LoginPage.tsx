import React, { useState } from "react";
import { Mail, Lock, User as UserIcon, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { useApp } from "../../context/AppContext";
import {
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
} from "../../services/auth-service";

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const { setUser } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      let user;
      if (isLogin) {
        user = await signInWithEmail(formData.email, formData.password);
      } else {
        if (!formData.name) {
          setError("Please enter your name");
          setIsLoading(false);
          return;
        }
        user = await signUpWithEmail(
          formData.email,
          formData.password,
          formData.name,
          "customer",
        );
      }

      setUser(user);
      setFormData({ name: "", email: "", password: "" });
      onNavigate("home");
    } catch (err: any) {
      setError(err.message || "Authentication failed. Please try again.");
      console.error("Auth error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setIsLoading(true);

    try {
      const user = await signInWithGoogle("customer");
      setUser(user);
      onNavigate("home");
    } catch (err: any) {
      setError(err.message || "Google login failed. Please try again.");
      console.error("Google login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-slate-600">
            {isLogin ? "Login to your account" : "Sign up to get started"}
          </p>
        </div>

        <Card>
          <CardContent className="py-8">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <Input
                    label="Full Name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="John Doe"
                    disabled={isLoading}
                    required
                  />
                </div>
              )}

              <div>
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="john@example.com"
                  disabled={isLoading}
                  required
                />
              </div>

              <div>
                <Input
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  disabled={isLoading}
                  required
                />
              </div>

              {isLogin && (
                <div className="text-right">
                  <button
                    type="button"
                    disabled={isLoading}
                    className="text-sm text-blue-600 hover:underline disabled:opacity-50"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    {isLogin ? "Logging in..." : "Creating account..."}
                  </span>
                ) : isLogin ? (
                  "Login"
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E5E7EB]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-600">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                size="lg"
                className="w-full mt-6"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Login with Google
              </Button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                  setFormData({ name: "", email: "", password: "" });
                }}
                disabled={isLoading}
                className="text-sm text-slate-600 disabled:opacity-50"
              >
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <span className="text-blue-600 font-medium hover:underline">
                  {isLogin ? "Sign Up" : "Login"}
                </span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
