import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { toast } from "@/hooks/use-toast";
import logo from "@/assets/convenzlogo.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Your backend login API
  // Adjust backend URL or use Vite env (e.g., import.meta.env.VITE_API_BASE)
  const API_URL = "http://localhost:3001/api/admin/login";

  // ----------------------------
  // LOGIN API CALL
  // ----------------------------
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast({
        title: "Login failed",
        description: "Please enter valid credentials",
        variant: "destructive",
      });
    }

    try {
      setLoading(true);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store token
        localStorage.setItem("token", data.token);

        toast({
          title: "Login successful",
          description: "Welcome to the admin panel",
        });

        navigate("/dashboard");
      } else {
        toast({
          title: "Login failed",
          description: data.message || "Invalid email or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast({
        title: "Server Error",
        description: "Unable to reach the server",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // RESET PASSWORD — UI ONLY
  // ----------------------------
  const handleReset = (e) => {
    e.preventDefault();

    if (step === 1) {
      toast({
        title: "Verification code sent",
        description: `A reset code was sent to ${resetEmail}`,
      });
      setStep(2);
    } else if (step === 2) {
      if (verificationCode === "123456" && newPassword.length >= 6) {
        toast({
          title: "Password reset successful",
          description: "You can now log in",
        });
        setShowReset(false);
        setStep(1);
        setResetEmail("");
        setVerificationCode("");
        setNewPassword("");
      } else {
        toast({
          title: "Invalid details",
          description: "Check your code and password",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #DDEEF3 35%, #1C4452 35%)",
      }}
    >
      {/* Decorative curved top shape */}
      <div
        className="absolute top-0 left-0 w-full h-1/3 rounded-b-[80px]"
        style={{ backgroundColor: "#DDEEF3" }}
      ></div>

      <Card className="w-full max-w-md bg-white/95 backdrop-blur-md shadow-2xl border border-[#CDE4EB] z-10">
        <CardHeader className="space-y-4 text-center">
          {/* Logo */}
          <div className="flex justify-center">
            <img
              src={logo}
              alt="App Logo"
              className="w-20 h-20 rounded-full shadow-md object-contain border-4"
              style={{ borderColor: "#00A389" }}
            />
          </div>

          <CardTitle
            className="text-3xl font-extrabold tracking-wide"
            style={{ color: "#1C4452" }}
          >
            Admin Login
          </CardTitle>

          <CardDescription className="text-gray-600">
            Enter your admin credentials to access the panel
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!showReset ? (
            <>
              {/* LOGIN FORM */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[#1E505C]">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-gray-300 focus:border-[#00A389] focus:ring-[#00A389]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[#1E505C]">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-gray-300 focus:border-[#00A389] focus:ring-[#00A389]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white transition-all duration-200 hover:opacity-90"
                  style={{
                    backgroundColor: loading ? "#00A389aa" : "#00A389",
                  }}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </form>

              <p
                className="text-center mt-4 text-sm text-[#00A389] cursor-pointer hover:underline"
                onClick={() => setShowReset(true)}
              >
                Forgot Password?
              </p>
            </>
          ) : (
            // RESET PASSWORD UI
            <form onSubmit={handleReset} className="space-y-4">
              {step === 1 ? (
                <>
                  <Label htmlFor="resetEmail" className="text-[#1E505C]">
                    Enter your email
                  </Label>
                  <Input
                    id="resetEmail"
                    type="email"
                    placeholder="admin@gmail.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="border-gray-300 focus:border-[#00A389] focus:ring-[#00A389]"
                  />
                  <Button
                    type="submit"
                    className="w-full text-white"
                    style={{ backgroundColor: "#00A389" }}
                  >
                    Send Code
                  </Button>
                </>
              ) : (
                <>
                  <Label htmlFor="code" className="text-[#1E505C]">
                    Verification Code
                  </Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="Enter code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="border-gray-300 focus:border-[#00A389] focus:ring-[#00A389]"
                  />

                  <Label htmlFor="newPassword" className="text-[#1E505C]">
                    New Password
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border-gray-300 focus:border-[#00A389] focus:ring-[#00A389]"
                  />

                  <Button
                    type="submit"
                    className="w-full text-white"
                    style={{ backgroundColor: "#00A389" }}
                  >
                    Reset Password
                  </Button>
                </>
              )}

              <p
                className="text-center text-sm text-gray-600 cursor-pointer hover:underline"
                onClick={() => {
                  setShowReset(false);
                  setStep(1);
                }}
              >
                Back to Login
              </p>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
