"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import useAuth from "@/auth/Auth";
import { useAlert } from "@/context/Alert";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

export default function LoginRegisterPage() {
    const { showAlert } = useAlert();
    const [activeTab, setActiveTab] = useState<"login" | "register">("login");
    const [rememberMe, setRememberMe] = useState(false);
    const { login } = useAuth();
    const [loginData, setLoginData] = useState({ username: "", password: "" });
    const [visible, setVisible] = useState(false);
    const [registerData, setRegisterData] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
    });

    const t = useTranslations("LoginPage");
    const router = useRouter();

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRegisterData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { username, password } = loginData;
            if (!username || !password) {
                toast.info("Please write full information");
                return;
            }

            const response = await axios.post(
                "http://localhost:8000/api/accounts/login/",
                loginData,
                { withCredentials: true }
            );

            router.push("/");
            const token = response.data?.access_token || response.data?.token;
            if (token) console.log(token);
            else console.log("token topilmadi");

            login();
            toast.success("Succesfuly logged in.")
        } catch (error: any) {
            console.error("Login xatosi:", error);

            if (error.response?.status === 401) {
                const detail =
                    error.response?.data?.detail ||
                    error.response?.data?.message ||
                    "Invalid username or password";
                toast.info(detail);
            } else {
                toast.error("Server bilan bog‘lanishda xatolik");
            }
        }

    };


    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { first_name, last_name, username, password } = registerData;
            if (!first_name || !last_name || !username || !password) {

                toast.info("Please write full information");
                return;
            }

            const payload = {
                ...registerData,
                password2: registerData.password,
            };

            localStorage.setItem("activeNavItem", "/");
            const response = await axios.post(
                "http://localhost:8000/api/accounts/register/",
                payload,
                { withCredentials: true }
            );

            console.log("Ro‘yxatdan o‘tish muvaffaqiyatli:", response.data);
            router.push("/auth");
        } catch (error: any) {
            console.error("Ro‘yxatdan o‘tish xatosi:", error);
            if (error.response?.data) {
                console.log("Backend xatolik javobi:", error.response.data);
            }
            alert("Ro‘yxatdan o‘tish muvaffaqiyatsiz. Ma'lumotlarni tekshiring.");
        }
    };


    useEffect(() => {
        const timeout = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="flex justify-center items-center h-screen px-4 overflow-hidden relative">
            <div
                className={`animated-border transition-all duration-700 ease-out transform mt-10 rounded-lg 
        bg-opacity-40 border border-transparent [background:linear-gradient(45deg,#172033,theme(colors.black)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.gray.500)_86%,_theme(colors.white)_90%,_theme(colors.gray.500)_94%,_theme(colors.slate.600/.48))_border-box] w-full max-w-md p-8 
        backdrop-blur-md relative ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
            >
                <div className="flex justify-center items-center mb-6 h-10">
                    <h1 className="text-2xl font-bold text-white">{t('logorsig')}</h1>
                </div>

                <div className="flex justify-between mb-6 border-b border-white">
                    <button
                        onClick={() => setActiveTab("login")}
                        className={`py-2 px-1 font-medium ${activeTab === "login"
                            ? "text-white border-b-2 border-white hover:cursor-pointer"
                            : "text-white/70 hover:text-white hover:cursor-pointer"
                            }`}
                    >
                        {t("login")}
                    </button>
                    <button
                        onClick={() => setActiveTab("register")}
                        className={`py-2 px-1 font-medium ${activeTab === "register"
                            ? "text-white border-b-2 border-white hover:cursor-pointer"
                            : "text-white/70 hover:text-white hover:cursor-pointer "
                            }`}
                    >
                        {t("signup")}
                    </button>
                </div>

                {activeTab === "login" && (
                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm text-white font-medium">
                                {t("username")}
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={loginData.username}
                                onChange={handleLoginChange}
                                placeholder={t("username")}
                                className="w-full mt-1 px-4 py-2 border border-white/50 rounded-lg 
                bg-black bg-opacity-40 text-white placeholder-white/50
                focus:outline-none focus:ring-[0.5px] focus:ring-white"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-white font-medium">
                                {t("password")}
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                placeholder={t("password")}
                                className="w-full mt-1 px-4 py-2 border border-white/50 rounded-lg 
                bg-black bg-opacity-40 text-white placeholder-white/50
                focus:outline-none focus:ring-[0.5px] focus:ring-white"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                            <label htmlFor="remember" className="text-sm text-white">
                                {t("remember")}
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-white hover:bg-white/80 text-black font-semibold rounded-lg transition duration-300"
                        >
                            {t("login")}
                        </button>
                    </form>
                )}

                {activeTab === "register" && (
                    <form onSubmit={handleRegisterSubmit} className="space-y-4">
                        <div className="flex gap-2">
                            <div className="flex flex-col w-1/2">
                                <label className="text-sm text-white font-medium">
                                    {t("first_name")}
                                </label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={registerData.first_name}
                                    onChange={handleRegisterChange}
                                    placeholder={t("first_name")}
                                    className="w-full mt-1 px-4 py-2 border border-white/50 rounded-lg 
                  bg-black bg-opacity-40 text-white placeholder-white/50"
                                />
                            </div>
                            <div className="flex flex-col w-1/2">
                                <label className="text-sm text-white font-medium">
                                    {t("last_name")}
                                </label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={registerData.last_name}
                                    onChange={handleRegisterChange}
                                    placeholder={t("last_name")}
                                    className="w-full mt-1 px-4 py-2 border border-white/50 rounded-lg 
                  bg-black bg-opacity-40 text-white placeholder-white/50"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm text-white font-medium">
                                {t("username")}
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={registerData.username}
                                onChange={handleRegisterChange}
                                placeholder={t("username")}
                                className="w-full mt-1 px-4 py-2 border border-white/50 rounded-lg 
                bg-black bg-opacity-40 text-white placeholder-white/50"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm text-white font-medium">
                                {t("password")}
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={registerData.password}
                                onChange={handleRegisterChange}
                                placeholder={t("password")}
                                className="w-full mt-1 px-4 py-2 border border-white/50 rounded-lg 
                bg-black bg-opacity-40 text-white placeholder-white/50"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-white hover:bg-white/80 text-black font-semibold rounded-lg transition duration-300"
                        >
                            {t("signup")}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
