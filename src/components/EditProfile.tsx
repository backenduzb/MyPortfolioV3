"use client";

import { useEffect, useState } from "react";
import useAuth from "@/auth/Auth";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";

interface FormDataType {
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    confirmPassword: string;
    telegram_social: string;
    instagram_social: string;
    uzbdevs_social: string;
}

const socialPlatforms = [
    {
        name: "telegram_social",
        label: "Telegram",
        prefix: "t.me/",
        fullUrl: (v: string) => `https://t.me/${v}`,
    },
    {
        name: "instagram_social",
        label: "Instagram",
        prefix: "instagram.com/",
        fullUrl: (v: string) => `https://instagram.com/${v}`,
    },
    {
        name: "uzbdevs_social",
        label: "UzbDevs",
        prefix: "uzbdevs.com/user/",
        fullUrl: (v: string) => `https://uzbekdevs.uz/@${v}`,
    },
];

export default function Edit({ onClose }: { onClose: () => void }) {
    const [showPassword, setShowPassword] = useState(false);
    const { user, fetchUser } = useAuth();
    const t = useTranslations("EditProfile");
    const [formData, setFormData] = useState<FormDataType>({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        confirmPassword: "",
        telegram_social: "",
        instagram_social: "",
        uzbdevs_social: "",
    });

    const [profileImg, setProfileImg] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProfileImg(e.target.files[0]);
        }
    };

    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                username: user.username || "",
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                telegram_social: user.telegram_social?.replace("https://t.me/", "") || "",
                instagram_social: user.instagram_social?.replace("https://instagram.com/", "") || "",
                uzbdevs_social: user.uzbdevs_social?.replace("https://uzbekdevs.uz/@", "") || "",
            }));
        }
    }, [user]);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password && formData.password !== formData.confirmPassword) {
            toast.error(t("password_error"));
            return;
        }

        try {
            setLoading(true);
            const form = new FormData();
            form.append("first_name", formData.first_name);
            form.append("last_name", formData.last_name);
            form.append("username", formData.username);

            socialPlatforms.forEach((s) => {
                if (formData[s.name as keyof FormDataType]) {
                    form.append(s.name, s.fullUrl(formData[s.name as keyof FormDataType]));
                }
            });

            if (formData.password) {
                form.append("password", formData.password);
                form.append("password2", formData.confirmPassword);
            }
            if (profileImg) form.append("profile_img", profileImg);

            await axios.put("http://localhost:8000/api/accounts/edit/", form, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success(t("succes_updated"));
            fetchUser();
            onClose();
        } catch (error) {
            console.error(error);
            toast.error(t("error_upload"));
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => { setVisible(false); setTimeout(() => onClose(), 300); };

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed bg-black/60 w-full min-h-screen flex items-center justify-center z-50">
            <div
                className={`relative w-full max-w-4xl min-h-[500px] mt-20 border border-zinc-700 backdrop-blur-md p-8 flex flex-col transition-all duration-500 ease-out ${visible ? "translate-y-0 opacity-100" : "-translate-y-60 opacity-0"
                    }`}
            >
                <div className="group absolute top-5 right-5">
                    <button onClick={handleClose} className="hover:text-gray-400 hover:cursor-pointer transition text-2xl">
                        ✕
                    </button>
                </div>
                <div className="absolute top-0 left-0 w-[40px] h-[0.9px] bg-gradient-to-r from-white to-transparent after:content-[''] after:absolute after:top-0 after:left-0 after:w-[0.9px] after:h-[40px] after:bg-gradient-to-b after:from-white after:to-transparent"></div> <div className="absolute bottom-[18px] right-[-20px] w-[40px] h-[0.9px] rotate-[270deg] bg-gradient-to-r from-white to-transparent after:content-[''] after:absolute after:bottom-0 after:right-full after:w-[0.9px] after:h-[40px] after:bg-gradient-to-b after:from-white after:to-transparent after:rotate-180"></div> <div className="absolute bottom-0 left-0 w-[40px] h-[0.9px] bg-gradient-to-r from-white to-transparent after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[0.9px] after:h-[40px] after:bg-gradient-to-b after:from-white after:to-transparent after:rotate-180"></div> <div className="absolute top-0 right-0 w-[40px] h-[0.9px] rotate-180 bg-gradient-to-r from-white to-transparent after:content-[''] after:absolute after:bottom-0 after:right-full after:w-[0.9px] after:h-[40px] after:bg-gradient-to-b after:from-white after:to-transparent after:rotate-180"></div> <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[2.5px] bg-gray-300 rounded-b-[5px]"></div> <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60px] h-[2.5px] bg-gray-300 rounded-t-[5px]"></div>

                <h1 className="text-3xl font-bold text-white mb-6 text-center">
                    {t("edit_profile")}
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8 w-full">

                    <div className="flex flex-col items-center gap-4">
                        <div className="relative w-60 h-60 rounded-full border-2 border-gray-500 overflow-hidden shadow-lg">
                            <img
                                src={
                                    profileImg
                                        ? URL.createObjectURL(profileImg)
                                        : user?.telegram_profile_pic_ulr || "https://via.placeholder.com/150"
                                }
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                            <label className="group absolute top-0 left-0 w-full h-full flex justify-center items-end cursor-pointer hover:bg-black/50">
                                <p className="mb-5 opacity-0 group-hover:opacity-100 text-white">
                                    {t("upload")}
                                </p>
                                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                            </label>
                        </div>
                    </div>

                    <div className="flex-1 max-h-[400px] overflow-y-auto space-y-6 pr-2">

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InputField label={t("first_name")} name="first_name" value={formData.first_name} onChange={handleChange} />
                            <InputField label={t("last_name")} name="last_name" value={formData.last_name} onChange={handleChange} />
                        </div>
                        <hr />
                        <InputField label={t("username")} name="username" value={formData.username} readOnly />
                        <hr />
                        {socialPlatforms.map((s) => (
                            <div key={s.name} className="flex flex-col">
                                <label className="mb-1 text-sm font-medium text-gray-300">{s.label}</label>
                                <div className="flex">
                                    <span className="px-3 py-3 bg-zinc-800 border border-r-0 border-zinc-700 rounded-l-xl text-gray-400">
                                        {s.prefix}
                                    </span>
                                    <input
                                        type="text"
                                        name={s.name}
                                        value={formData[s.name as keyof FormDataType]}
                                        onChange={handleChange}
                                        placeholder={t("username")}
                                        className="flex-1 px-4 py-3 h-12 bg-zinc-900 focus:ring-[1px] focus:ring-gray-300 focus:ring-opacity-50 transition-all border border-zinc-700 border-l-0 rounded-r-xl focus:outline-none"
                                    />
                                </div>
                            </div>
                        ))}
                        <hr />
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-200">{t("change_password")}</h3>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="flex items-center gap-2 text-gray-400 hover:text-white transition"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    <span className="text-xs">{showPassword ? t("hide") : t("show")}</span>
                                </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InputField label={t("password")} name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange} />
                                <InputField label={t("password_confirm")} name="confirmPassword" type={showPassword ? "text" : "password"} value={formData.confirmPassword} onChange={handleChange} />
                            </div>

                            <br />
                        </div>
                        <div className="w-full h-20 flex items-center justify-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className="text-white p-2 w-1/2 border-[0.5px] rounded bg-gradient-to-r select-none from-gray-400 via-gray-500 to-gray-400 hover:from-gray-500 hover:via-gray-400 hover:to-gray-400 hover:cursor-pointer transition duration-500 "
                            >
                                {loading ? t("saving") : t("save")}
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
}

function InputField({
    label,
    name,
    value,
    onChange,
    readOnly = false,
    type = "text",
}: {
    label: string;
    name: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    type?: string;
}) {
    return (
        <div className="flex flex-col">
            <label className="mb-1 ml-1 text-sm font-medium text-gray-300">{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                readOnly={readOnly}
                placeholder={label}
                className="px-4 py-3 ml-1 h-12 bg-zinc-900 border border-zinc-700 rounded-xl focus:outline-none focus:ring-[1px] focus:ring-gray-300 focus:ring-opacity-50 transition-all"
            />
        </div>
    );
}

