"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from "next/navigation";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations("Header");

    const [activeSection, setActiveSection] = useState("home");
    const segments = pathname.split("/");
    const currentLocale = segments[1] || "en";

    const links = [
        { href: "home", label: t("home") },
        { href: "about", label: t("info_me") },
        // { href: "projects", label: t("projects") },
    ];

    const changeLanguage = (locale: string) => {
        const newSegments = [...segments];
        newSegments[1] = locale;
        router.push(newSegments.join("/") || `/${locale}`);
        setIsOpen(false);
    };

    const [scrolled, setScrolled] = useState(false);

    const onScroll = useCallback(() => {
        if (window.scrollY > 0) setScrolled(true);
        else setScrolled(false);
        links.forEach(link => {
            const el = document.getElementById(link.href);
            if (!el) return;
            
            const rect = el.getBoundingClientRect();
            const top = rect.top + window.scrollY;
            const bottom = top + rect.height;
            const viewportMiddle = window.scrollY + window.innerHeight / 2;
            
            if (viewportMiddle >= top && viewportMiddle <= bottom) {
                setActiveSection(link.href);
            }
        });
    }, [links]); 

    useEffect(() => {
        const handleScroll = () => {
            requestAnimationFrame(onScroll);
        };

        window.addEventListener("scroll", handleScroll);
        
        onScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [onScroll]); 

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const headerHeight = 64;
            const targetPosition = el.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        }
        setActiveSection(id);
        setIsOpen(false);
    };

    return (
        <header className={`w-full h-0 bg-black/10 fixed top-0 z-50 transition-all duration-300 ${scrolled ? "h-16 backdrop-blur-sm border-b" : "h-0"}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center gap-1">
                        <h1 className="text-xl font-bold text-white text-shadow-[0px_0px_10px] text-shadow-white">
                            <a href="https://www.google.com/search?q=uzbekistan" target="_blank" rel="noopener noreferrer">UZBEKDEV</a>
                        </h1>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="hidden md:flex items-center gap-5">
                            {links.map((link) => (
                                <span
                                    key={link.href}
                                    onClick={() => scrollToSection(link.href)}
                                    className={`text-[14px] relative cursor-pointer transition-all duration-300
                                    before:content-[''] before:absolute before:-bottom-1 before:left-1/2
                                    before:h-0.5 before:bg-gradient-to-r before:from-white before:to-white
                                    before:transition-all before:duration-500 before:transform before:-translate-x-1/2
                                    ${activeSection === link.href
                                            ? "text-white before:w-full"
                                            : "text-white/70 hover:text-white before:w-0 hover:before:w-full"
                                        }`}
                                >
                                    {link.label}
                                </span>
                            ))}
                        </div>
                        
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-white p-2"
                            >
                                ☰
                            </button>
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
                    </div>
                </div>
                
                {isOpen && (
                    <div className="md:hidden bg-black/90 backdrop-blur-sm border-t border-gray-800 py-4">
                        <div className="flex flex-col items-center gap-4">
                            {links.map((link) => (
                                <span
                                    key={link.href}
                                    onClick={() => scrollToSection(link.href)}
                                    className={`text-lg cursor-pointer transition-all duration-300
                                    ${activeSection === link.href
                                            ? "text-white font-bold"
                                            : "text-white/70 hover:text-white"
                                        }`}
                                >
                                    {link.label}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}