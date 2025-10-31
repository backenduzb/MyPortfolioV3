"use client";

import Link from "next/link";
import { MoveDown } from "lucide-react";
import { useState, useTransition, useEffect } from "react";
import useAuth from "@/auth/Auth";
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from "next/navigation";
import ProfilePicture from "../../public/img/profile_image.jpg";
import Image from "next/image";
import { div } from "framer-motion/client";
import EditProfile from "@/components/EditProfile";
import ProfileView from "./ViewProfile";
import { toast } from "react-toastify";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations("Header");
    const segments = pathname.split("/");
    const currentLocale = segments[1] || "en";
    const { isAuthenticated, user, logout, fetchUser } = useAuth();
    const [userTable, setuserTable] = useState(false);
    const [seeProfile, setSeeProfile] = useState(false);
    const [seeProfile2, setSeeProfile2] = useState(false);

    const links = [
        { href: `/${currentLocale}`, label: t("home") },
        { href: `/${currentLocale}/about`, label: t("info_me") },
        { href: `/${currentLocale}/projects`, label: t("projects") },
    ];

    const changeLanguage = (locale: string) => {
        const newSegments = [...segments];
        newSegments[1] = locale;
        router.push(newSegments.join("/") || `/${locale}`);
        setIsOpen(false);
    };

    const handleLogout = () => {
        logout();
        setuserTable(!userTable);
    }


    const [scrolled, setScrolled] = useState(false);
    console.log(user?.telegram_profile_pic_ulr)
    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);


    const openProfileEdit = async () => {
        setSeeProfile(true);
        setuserTable(false);

        const id = toast.loading(t("loading_profile"));

        try {
            await fetchUser();

            if (user) {
                toast.update(id, {
                    render: t("loaded_profile"),
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                    closeOnClick: true,
                });
            } else {
                toast.update(id, {
                    render: t("not_loaded_profile"),
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
            }
        } catch (err) {
            toast.update(id, {
                render: t("not_loaded_profile"),
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };
    const openProfileSee = async () => {
        setSeeProfile2(true);
        setuserTable(false);

        const id = toast.loading(t("loading_profile"));

        try {
            await fetchUser();

            if (user) {
                toast.update(id, {
                    render: t("loaded_profile"),
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                    closeOnClick: true,
                });
            } else {
                toast.update(id, {
                    render: t("not_loaded_profile"),
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
            }
        } catch (err) {
            toast.update(id, {
                render: t("not_loaded_profile"),
                type: "error",
                isLoading: false,
                autoClose: 3000,
            });
        }
    };
    return (
        <>
            {seeProfile && (<EditProfile onClose={() => setSeeProfile(false)} />)}
            {seeProfile2 && (<ProfileView onClose={() => setSeeProfile2(false)} />)}
            <header className={`w-full h-0  bg-black/10  fixed top-0 z-50 transition-all duration-300 ${scrolled ? "h-16 backdrop-blur-sm border-b" : "h-0"}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex-shrink-0 flex items-center gap-1">
                            <h1 className="text-xl font-bold text-white text-shadow-[0px_0px_10px] text-shadow-white"><a href="https://www.google.com/search?q=uzbekistan" target="_blank">UZBEKDEV</a></h1>
                        </div>

                        <div className="flex items-center gap-5">
                            <div className="flex items-center gap-5">
                                {links.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`text-[14px] relative cursor-pointer transition-all duration-300
                                                before:content-[''] before:absolute before:-bottom-1 before:left-1/2 
                                                before:h-0.5 before:bg-gradient-to-r before:from-white before:to-white 
                                                before:transition-all before:duration-500 before:transform before:-translate-x-1/2
                                                ${pathname === link.href ||
                                                pathname.endsWith(link.href + "/")
                                                ? "text-white before:w-full"
                                                : "text-white/70 hover:text-white before:w-0 hover:before:w-full"
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                            <div className="border-l w-15 border-white h-1/2 flex items-center justify-center">
                                <div className="ml-5 w-full h-[28px] rounded-sm flex items-center justify-center hover:cursor-pointer transition duration-300" onClick={() => setIsOpen(!isOpen)}>
                                    <span className={`${pathname.includes("/uz") && "fi fi-uz shadow-blue-400"} ${pathname.includes("/ja") && "fi fi-jp shadow-white"} ${pathname.includes("/ru") && "fi fi-ru shadow-blue-700"} ${pathname.includes("/en") && "fi fi-us shadow-red-300"} transition duration-300 hover:shadow-[0px_0px_2px_3px]  text-[20px] shadow-[0px_0px_2px_2px] `}></span>
                                </div>
                                {isOpen && (
                                    <div className="fixed w-12 bg-black/40 backdrop-blur-3xl shadow-[0px_0px_2px_1px] shadow-white top-13 ml-6 h-auto flex flex-col items-center gap-2 p-2 rounded">
                                        <span className="fi fi-uz text-[22px] hover:scale-110 hover:shadow-[0px_0px_3px_2px] shadow-blue-400 hover:cursor-pointer transition duration-300 " onClick={() => changeLanguage('uz')}></span>
                                        <span className="fi fi-jp text-[22px] hover:scale-110 hover:shadow-[0px_0px_3px_2px] shadow-white hover:cursor-pointer transition duration-300" onClick={() => changeLanguage('ja')} ></span>
                                        <span className="fi fi-us text-[22px] hover:scale-110 hover:shadow-[0px_0px_3px_2px] shadow-red-300 hover:cursor-pointer transition duration-300" onClick={() => changeLanguage('en')} ></span>
                                        <span className="fi fi-ru text-[22px] hover:scale-110 hover:shadow-[0px_0px_3px_2px] shadow-blue-700 hover:cursor-pointer transition duration-300" onClick={() => changeLanguage('ru')} ></span>
                                    </div>
                                )}
                            </div>

                            {isAuthenticated ? (

                                <div className="border-l w-35 gap-3 border-white h-1/2 flex items-center justify-center">
                                    <p className="text-[14px]">{user?.username.toUpperCase()}</p>
                                    <div className="rounded-full overflow-hidden h-8 w-8 flex items-center justify-center shadow-[0px_0px_5px_2px] shadow-white hover:cursor-pointer">
                                        <img
                                            src={`${user?.telegram_profile_pic_ulr || ProfilePicture}`}
                                            height={34}
                                            width={34}
                                            alt="Profile"
                                            onClick={() => setuserTable(!userTable)}
                                        />
                                    </div>
                                    {userTable && (
                                        <div className="h-32 w-40 rounded fixed mt-50 border border-transparent animated-border p-3
                                        [background:linear-gradient(45deg,black,theme(colors.black)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.zinc.800)_80%,_theme(colors.gray.500)_86%,_theme(colors.white)_90%,_theme(colors.gray.500)_94%,_theme(colors.zinc.600/.48))_border-box]">
                                            <div onClick={openProfileEdit} className="flex items-center mb-2 justify-left gap-2 hover:cursor-pointer hover:scale-105 transition duration-200 group shadow-white hover:shadow-[0px_0px_5px_2px] rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="ml-1" viewBox="0 0 16 16">
                                                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                                                </svg>
                                                <p className="mt-1">{t("edit")}</p>
                                            </div>

                                            <div onClick={openProfileSee} className="flex items-center mb-2 justify-left gap-2 hover:cursor-pointer hover:scale-105 transition duration-200 group shadow-white hover:shadow-[0px_0px_5px_2px] rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="ml-1" viewBox="0 0 16 16">
                                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                                </svg>
                                                <p>{t("profile")}</p>
                                            </div>

                                            <hr />
                                            <div onClick={handleLogout} className="mt-2 flex items-center mb-2 justify-left gap-2 hover:cursor-pointer hover:scale-105 transition duration-200 group shadow-red-500 hover:text-red-500 hover:shadow-[0px_0px_5px_2px] rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="ml-1" viewBox="0 0 16 16">
                                                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m0 5.996V14H3s-1 0-1-1 1-4 6-4q.845.002 1.544.107a4.5 4.5 0 0 0-.803.918A11 11 0 0 0 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664zM9 13a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1" />
                                                </svg>
                                                <p>{t("exit")}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>



                            ) : (
                                <div className="border-l w-20 gap-2 border-white h-1/2 flex items-center justify-center">
                                    <Link
                                        href={`/${currentLocale}/login`}
                                        className={`text-[14px] relative cursor-pointer transition-all duration-300
                                            before:content-[''] before:absolute before:-bottom-1 before:left-1/2 
                                            before:h-0.5 before:bg-gradient-to-r before:from-white before:to-white 
                                            before:transition-all before:duration-500 before:transform before:-translate-x-1/2
                                            ${pathname.includes("/login")
                                                ? "text-white before:w-full"
                                                : "text-white/70 hover:text-white before:w-0 hover:before:w-full"
                                            }`}
                                    >
                                        {t("enter")}
                                    </Link>
                                </div>
                            )
                            }
                        </div>
                    </div>
                </div>
            </header>
        </>

    );
}
