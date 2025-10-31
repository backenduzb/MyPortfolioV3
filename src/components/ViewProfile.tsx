"use client";

import { useEffect, useState } from "react";
import useAuth from "@/auth/Auth";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import UZDevs from "../../public/img/uzdevs.png";
import Robo from "../../public/img/robocontest.png";
import X from "../../public/img/x.png";

const InstagramIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={className} viewBox="0 0 16 16">
    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
  </svg>
);

const TelegramIcon = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={className} viewBox="0 0 16 16">
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
  </svg>
);

export default function ProfileView({ onClose }: { onClose: () => void }) {
    const { user } = useAuth();
    const [visible, setVisible] = useState(false);
    const t = useTranslations("SeeProfile")
    const handleClose = () => {
        setVisible(false);
        setTimeout(() => onClose(), 300);
    };

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
                    <button
                        onClick={handleClose}
                        className="hover:text-gray-400 hover:cursor-pointer transition text-2xl"
                    >
                        ✕
                    </button>
                </div>

                <div className="absolute top-0 left-0 w-[40px] h-[0.9px] bg-gradient-to-r from-white to-transparent after:content-[''] after:absolute after:top-0 after:left-0 after:w-[0.9px] after:h-[40px] after:bg-gradient-to-b after:from-white after:to-transparent"></div>
                <div className="absolute bottom-[18px] right-[-20px] w-[40px] h-[0.9px] rotate-[270deg] bg-gradient-to-r from-white to-transparent after:content-[''] after:absolute after:bottom-0 after:right-full after:w-[0.9px] after:h-[40px] after:bg-gradient-to-b after:from-white after:to-transparent after:rotate-180"></div>
                <div className="absolute bottom-0 left-0 w-[40px] h-[0.9px] bg-gradient-to-r from-white to-transparent after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[0.9px] after:h-[40px] after:bg-gradient-to-b after:from-white after:to-transparent after:rotate-180"></div>
                <div className="absolute top-0 right-0 w-[40px] h-[0.9px] rotate-180 bg-gradient-to-r from-white to-transparent after:content-[''] after:absolute after:bottom-0 after:right-full after:w-[0.9px] after:h-[40px] after:bg-gradient-to-b after:from-white after:to-transparent after:rotate-180"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[2.5px] bg-gray-300 rounded-b-[5px]"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60px] h-[2.5px] bg-gray-300 rounded-t-[5px]"></div>

                <h1 className="text-3xl font-bold text-white mb-6 text-center">
                    {t("profile")}
                </h1>

                <div className="flex flex-col lg:flex-row gap-8 w-full">
                  
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative w-60 h-60 rounded-full border-2 border-gray-500 overflow-hidden shadow-lg">
                            <img
                                src={
                                    user?.telegram_profile_pic_ulr ||
                                    "https://via.placeholder.com/150"
                                }
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="mt-3 text-lg font-semibold text-white text-center">
                            {user?.first_name} {user?.last_name}
                        </p>
                        <p className="text-gray-400">@{user?.username}</p>
                    </div>

                    <div className="flex-1 max-h-[400px] overflow-y-auto space-y-6 pr-2 text-gray-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <InfoField label={t("first_name")} value={user?.first_name} />
                            <InfoField label={t("last_name")} value={user?.last_name} />
                        </div>
                        <hr />
                        <InfoField label={t("username")} value={user?.username} />
                        <hr />

                        <div className="w-full flex flex-wrap items-center justify-around gap-6 sm:gap-10 mt-10">
                            {user?.uzbdevs_social && (
                                <SocialLink
                                    href={user.uzbdevs_social}
                                    icon={<Image src={UZDevs} width={30} height={30} alt="Uzbekdevs" />}
                                    label="Uzbekdevs"
                                />
                            )}
                            {user?.robocontest_profile && (
                                <SocialLink
                                    href={user.robocontest_profile}
                                    icon={<Image src={Robo} width={30} height={30} alt="Robocontest" />}
                                    label="Robocontest"
                                />
                            )}
                            {user?.x_social && (
                                <SocialLink
                                    href={user.x_social}
                                    icon={<Image src={X} width={30} height={30} alt="X.com" />}
                                    label="X.com"
                                />
                            )}
                            {user?.instagram_social && (
                                <SocialLink
                                    href={user.instagram_social}
                                    icon={<InstagramIcon />}
                                    label="Instagram"
                                />
                            )}
                            {user?.telegram_social && (
                                <SocialLink
                                    href={user.telegram_social}
                                    icon={<TelegramIcon />}
                                    label="Telegram"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoField({
    label,
    value,
    link,
}: {
    label: string;
    value?: string;
    link?: string;
}) {
    if (!value) return null;
    return (
        <div className="flex flex-col">
            <span className="mb-1 text-sm text-gray-400">{label}</span>
            {link ? (
                <a
                    href={link}
                    target="_blank"
                    className="text-lg text-white hover:underline break-words"
                >
                    {value}
                </a>
            ) : (
                <span className="text-lg text-white break-words">{value}</span>
            )}
        </div>
    );
}

function SocialLink({
    href,
    icon,
    label,
}: {
    href: string;
    icon: React.ReactNode;
    label: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center"
        >
            <Link href={href} target="_blank">
                <div className="group w-12 h-12 shadow-[0_0_15px_2px] shadow-white rounded-full flex items-center justify-center backdrop-blur-sm hover:w-44 hover:h-12 transition-all duration-300 hover:bg-gradient-to-r hover:from-white/20 hover:to-white/10">
                    <span className="flex-shrink-0 text-white">
                        {icon}
                    </span>
                    <span className="opacity-0 max-w-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-[120px] group-hover:translate-x-2 transition-all duration-300 text-white text-sm font-medium">
                        {label}
                    </span>
                </div>
            </Link>
        </motion.div>
    );
}