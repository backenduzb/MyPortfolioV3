"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Nextjs_logo from "../../../public/img/nextjs.png";
import React_logo from "../../../public/img/react.png";
import Django_logo from "../../../public/img/django.png";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import Arch from "../../../public/img/arch.png";
import { ArrowUpWideNarrowIcon } from "lucide-react";
import Link from "next/link";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

const App = () => {
  const t = useTranslations("HomePage");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const segments = pathname.split("/");
  const currentLocale = segments[1] || "en";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => setLoading(false), 1000);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, searchParams]);

  if (loading) {
    return (
      <AnimatePresence>
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50"
        >
          <div className="fixed inset-0 flex">
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: isExiting ? "-100%" : "0%" }}
              transition={{
                duration: 1,
                ease: "easeInOut",
                delay: isExiting ? 0 : 1
              }}
              className="w-1/2 h-full bg-black/9 border-r"
            />

            <div className="fixed inset-0 flex items-center justify-center z-[100]">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isExiting ? 0 : 1,
                  scale: isExiting ? 1.2 : 1
                }}
                transition={{
                  duration: 0.5,
                  delay: isExiting ? 0 : 0.5
                }}
                className="relative h-18 w-18"
              >
                <div className="absolute inset-0 border z-100"></div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 border z-100"
                ></motion.div>
              </motion.div>
            </div>

            <motion.div
              initial={{ x: 0 }}
              animate={{ x: isExiting ? "100%" : "0%" }}
              transition={{
                duration: 1,
                ease: "easeInOut",
                delay: isExiting ? 0 : 1
              }}
              className="w-1/2 h-full bg-black/90 border-l"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
  return (
    <>
      <div id="home" className="w-full min-h-screen flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="animate-load text-6xl font-extrabold mb-16 bg-gradient-to-r mt-20 select-none from-gray-400 via-gray-200 to-gray-400 bg-clip-text text-transparent"
        >
          {t("text")}
        </motion.h1>

        <motion.h4
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-lg max-w-2xl leading-relaxed font-medium bg-gradient-to-r select-none from-gray-400 via-gray-200 to-gray-400 bg-clip-text text-transparent mb-25"
        >
          {t.rich("message", {
            name: (chunks) => <span className="text-white">{chunks}</span>,
            skills: (chunks) => <span className="text-white">{chunks}</span>,
          })}
        </motion.h4>

        <div className="w-full h-10 text-white flex items-center justify-center gap-10">
          <Link href={`/${currentLocale}/projects`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white p-2 w-44 border-[0.5px] rounded border-gray-400 hover:bg-gray-500 transition duration-500 hover:cursor-pointer"
            >
              {t("button")}
            </motion.button>
          </Link>
          <Link href={`/${currentLocale}/about`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white p-2 w-44 border-[0.5px] rounded bg-gradient-to-r select-none from-gray-400 via-gray-500 to-gray-400 hover:cursor-pointer transition duration-500"
            >
              {t("button2")}
            </motion.button></Link>
        </div>
      </div>
      <div className="h-screen">
        <motion.div id="about"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }} className="mt-60 w-full flex flex-col justify-center items-center text-center px-4 overflow-hidden">
          <div className="relative w-60 h-20  bg-zinc-900 rounded-[10px] border-4 border-zinc-800 flex items-center justify-center  mt-26">
            <p className="font-extrabold text-2xl bg-gradient-to-r select-none from-gray-400 via-gray-200 to-gray-400 bg-clip-text text-transparent">
              I Work With
            </p>

            <span className="absolute left-[-15px] top-1/4 w-3 h-[7px] border-l-[0.7px] border-bg-gray-30 bg-gradient-to-r select-none from-gray-400 via-gray-200 to-gray-400 z-[35]"></span>
            <span className="absolute left-[-15px] top-2/3 w-3 h-[7px] border-l-[0.7px] border-bg-gray-30 bg-gradient-to-r select-none from-gray-400 via-gray-200 to-gray-400 z-[35]"></span>

            <span className="absolute right-[-15px] top-1/4 w-3 h-[7px] border-r-[0.7px] border-bg-gray-30 bg-gradient-to-l select-none from-gray-400 via-gray-200 to-gray-400 z-[35]"></span>
            <span className="absolute right-[-15px] top-2/3 w-3 h-[7px] border-r-[0.7px] border-bg-gray-30 bg-gradient-to-l select-none from-gray-400 via-gray-200 to-gray-400 z-[35]"></span>

            <span className="absolute bottom-[-16px] left-1/4 w-2 h-3 border-b-[0.7px] border-bg-gray-30 bg-gradient-to-b select-none from-gray-400 via-gray-200 to-gray-400 z-[35]"></span>
            <span className="absolute bottom-[-16px] left-2/4 w-2 h-3 border-b-[0.7px] border-bg-gray-30 bg-gradient-to-b select-none from-gray-400 via-gray-200 to-gray-400 z-[35]"></span>
            <span className="absolute bottom-[-16px] left-3/4 w-2 h-3 border-b-[0.7px] border-bg-gray-30 bg-gradient-to-b select-none from-gray-400 via-gray-200 to-gray-400 z-[35]"></span>

            <span className="absolute top-[-16px] left-1/4 w-2 h-3 border-t-[0.7px] border-bg-gray-30 bg-gradient-to-b select-none from-gray-400 via-gray-200 to-gray-400 z-[35]"></span>
            <span className="absolute top-[-16px] left-2/4 w-2 h-3 border-t-[0.7px] border-bg-gray-30 bg-gradient-to-b select-none from-gray-400 via-gray-200 to-gray-400 z-[35]"></span>
            <span className="absolute top-[-16px] left-3/4 w-2 h-3 border-t-[0.7px] border-bg-gray-30 bg-gradient-to-b select-none from-gray-400 via-gray-200 to-gray-400 z-[35]"></span>

            <span className="load-border-rounded absolute top-[-57px] left-[-836px] w-[900px] h-10 border-r-2 border-t-2 rounded-tr-xl border-zinc-700"></span>
            <span className="load-border-rounded2 absolute top-[-102px] left-[115.6] h-2 w-2 border-2 rounded-full border-zinc-700"></span>
            <span className="load-border-rounded absolute top-[-96px] left-[119px] w-0 h-20 border-l-2 border-zinc-700 "></span>
            <span className="load-border-rounded2 absolute top-[-56px] left-[178px] w-[860px] h-10 border-l-2 border-t-2 rounded-tl-xl border-zinc-700"></span>
            <span className="load-border-animation2 absolute top-[52px] left-[250px] w-[860px] border-l-2 border-t-2 rounded-tl-xl border-zinc-700 z-[30]"></span>
            <span className="load-border-animation absolute top-[20px] left-[-865px] w-[860px] h-0 border-r-2 border-t-2 rounded-tr-xl border-zinc-700"></span>
            <span className="absolute w-[300px] top-[20px] left-[240px] h-80 border-r-2 border-t-2 rounded-tr-xl border-zinc-700"></span>
            <span className="absolute w-0 top-[73px] left-[62px] h-60 border-r-2 border-t-2 rounded-tr-xl border-zinc-700"></span>
            <span className="absolute w-0 top-[73px] left-[120px] h-60 border-r-2 border-t-2 rounded-tr-xl border-zinc-700"></span>
            <span className="absolute w-0 top-[73px] left-[178px] h-60 border-r-2 border-t-2 rounded-tr-xl border-zinc-700"></span>
            <span className="absolute w-80 top-[50px] left-[-322px] h-60 border-l-2 border-t-2 rounded-tl-xl border-zinc-700"></span>
          </div>
          <div className="w-[90%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 h-auto gap-20 mt-30">
            <motion.div initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }} className="z-100 relative h-[300px] w-[450px] backdrop-blur-sm rounded flex items-center justify-center shadow-zinc-500
            border border-transparent animated-border transition-all duration-700 ease-out transform [background:linear-gradient(45deg,#000000,theme(colors.black)_50%,#000000)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.black)_80%,_theme(colors.black)_86%,_theme(colors.white)_90%,_theme(colors.black)_94%,_theme(colors.black))_border-box] max-w-md">
              <div className="absolute top-0 left-0 w-[40px] h-[0.9px] bg-gradient-to-r from-white to-transparent after:content-[''] after:absolute after:top-0 after:left-0 after:w-[0.9px] after:h-[40px] after:bg-gradient-to-b after:from-white after:to-transparent"></div>
              <div className="absolute bottom-[20px] right-[-20px] w-[40px] h-[1px] rotate-[270deg] bg-gradient-to-r from-white to-transparent after:content-[''] after:absolute after:bottom-0 after:right-full after:w-[1px] after:h-[40px] after:bg-gradient-to-b after:from-white after:to-transparent after:rotate-180"></div>
              <div className="absolute bottom-0 left-0 w-[40px] h-[0.9px] bg-gradient-to-r from-white to-transparent after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[0.9px] after:h-[40px] after:bg-gradient-to-b after:from-white after:to-transparent after:rotate-180"></div>
              <div className="absolute top-0 right-0 w-[40px] h-[0.9px] rotate-180 bg-gradient-to-r from-white to-transparent after:content-[''] after:absolute after:bottom-0 after:right-full after:w-[0.9px] after:h-[40px] after:bg-gradient-to-b after:from-white after:to-transparent after:rotate-180"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[2.5px] bg-gray-300 rounded-b-[5px]"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60px] h-[2.5px] bg-gray-300 rounded-t-[5px]"></div>
              <Link href="https://react.dev/" target="_blank" className="w-full h-full flex items-center justify-center">
                <div className="w-[96.8%] h-[95%] bg-gradient-to-b from-zinc-800/30 to-zinc-900 backdrop-blur-sm rounded hover:from-zinc-800 hover:cursor-pointer hover:to-zinc-950 transition duration-500" >
                  <div className="p-5">
                    <Image src={React_logo} width={50} height={50} alt="asc" />
                  </div>
                  <div className="flex items-center justify-left w-full gap-3">
                    <h1 className="text-left ml-5 mt-5 mb-3 text-3xl">React</h1>
                    <ArrowUpWideNarrowIcon className="mt-2" />
                  </div>
                  <div className="w-[95%]">
                    <p className="text-left ml-5">{t('react')}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 130 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }} className="z-100 relative h-[300px] w-[450px] backdrop-blur-sm rounded flex items-center justify-center shadow-zinc-500
            border border-transparent animated-border transition-all duration-700 ease-out transform [background:linear-gradient(45deg,#000000,theme(colors.black)_50%,#000000)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.black)_80%,_theme(colors.black)_86%,_theme(colors.white)_90%,_theme(colors.black)_94%,_theme(colors.black))_border-box] max-w-md">
              <div className="absolute top-0 left-0 w-[40px] h-[0.9px] bg-gradient-to-r from-white to-transparent after:content-[''] after:absolute after:top-0 after:left-0 after:w-[0.9px] after:h-[40px] after:bg-gradient-to-b after:from-white after:to-transparent"></div>
              <div className="absolute bottom-[20px] right-[-20px] w-[40px] h-[1px] rotate-[270deg] bg-gradient-to-r from-white to-transparent after:content-[''] after:absolute after:bottom-0 after:right-full after:w-[1px] after:h-[40px] after:bg-gradient-to-b after:from-white after:to-transparent after:rotate-180"></div>
              <div className="absolute bottom-0 left-0 w-[40px] h-[0.9px] bg-gradient-to-r from-white to-transparent after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[0.9px] after:h-[40px] after:bg-gradient-to-b after:from-white after:to-transparent after:rotate-180"></div>
              <div className="absolute top-0 right-0 w-[40px] h-[0.9px] rotate-180 bg-gradient-to-r from-white to-transparent after:content-[''] after:absolute after:bottom-0 after:right-full after:w-[0.9px] after:h-[40px] after:bg-gradient-to-b after:from-white after:to-transparent after:rotate-180"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[2.5px] bg-gray-300 rounded-b-[5px]"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60px] h-[2.5px] bg-gray-300 rounded-t-[5px]"></div>

              <Link href="https://www.djangoproject.com/" target="_blank" className="w-full h-full flex items-center justify-center">
                <div className="w-[96.8%] h-[95%] bg-gradient-to-b from-zinc-800/30 to-zinc-900 backdrop-blur-sm rounded hover:from-zinc-800 hover:cursor-pointer hover:to-zinc-950 transition duration-500" >
                  <div className="p-5 w-full h-20 mb-5">
                    <Image src={Django_logo} width={60} height={60} alt="asc" />
                  </div>
                  <div className="flex items-center justify-left w-full gap-3">
                    <h1 className="text-left ml-5 mt-2 mb-3 text-3xl">Django</h1>
                    <ArrowUpWideNarrowIcon className="mt-2" />
                  </div>
                  <div className="w-[95%]">
                    <p className="text-left ml-5">{t('python')}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 160 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }} className="z-100 relative h-[300px] w-[450px] backdrop-blur-sm rounded flex items-center justify-center shadow-zinc-500
            border border-transparent animated-border transition-all duration-700 ease-out transform [background:linear-gradient(45deg,#000000,theme(colors.black)_50%,#000000)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.black)_80%,_theme(colors.black)_86%,_theme(colors.white)_90%,_theme(colors.black)_94%,_theme(colors.black))_border-box] max-w-md">
              <div className="absolute top-0 left-0 w-[40px] h-[0.9px] bg-gradient-to-r from-white to-transparent after:content-[''] after:absolute after:top-0 after:left-0 after:w-[0.9px] after:h-[40px] after:bg-gradient-to-b after:from-white after:to-transparent"></div>
              <div className="absolute bottom-[20px] right-[-20px] w-[40px] h-[1px] rotate-[270deg] bg-gradient-to-r from-white to-transparent after:content-[''] after:absolute after:bottom-0 after:right-full after:w-[1px] after:h-[40px] after:bg-gradient-to-b after:from-white after:to-transparent after:rotate-180"></div>
              <div className="absolute bottom-0 left-0 w-[40px] h-[0.9px] bg-gradient-to-r from-white to-transparent after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-[0.9px] after:h-[40px] after:bg-gradient-to-b after:from-white after:to-transparent after:rotate-180"></div>
              <div className="absolute top-0 right-0 w-[40px] h-[0.9px] rotate-180 bg-gradient-to-r from-white to-transparent after:content-[''] after:absolute after:bottom-0 after:right-full after:w-[0.9px] after:h-[40px] after:bg-gradient-to-b after:from-white after:to-transparent after:rotate-180"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[2.5px] bg-gray-300 rounded-b-[5px]"></div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60px] h-[2.5px] bg-gray-300 rounded-t-[5px]"></div>

              <Link href="https://nextjs.org/" target="_blank" className="w-full h-full flex items-center justify-center">
                <div className="w-[96.8%] h-[95%] bg-gradient-to-b from-zinc-800/30 to-zinc-900 backdrop-blur-sm rounded hover:from-zinc-800 hover:cursor-pointer hover:to-zinc-950 transition duration-500" >
                  <div className="w-full h-20 mb-10">
                    <Image src={Nextjs_logo} width={150} className="-mt-5" height={60} alt="asc" />
                  </div>
                  <div className="flex items-center justify-left w-full gap-3">
                    <h1 className="text-left ml-5 mt-2 mb-3 text-3xl">Next.js</h1>
                    <ArrowUpWideNarrowIcon className="mt-2" />
                  </div>
                  <div className="w-[95%]">
                    <p className="text-left ml-5">{t('next')}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>
        <div className="h-65 z-10 mt-7 flex items-center justify-center w-full">
          <div className="w-[70%] h-full flex items-center">
            <Image
              src={Arch}
              alt="Arch"
              height={160}
              width={160}
              className="drop-shadow-[0_0_5px] drop-shadow-white"
            />
            <div className="ml-5 w-full gap-1 h-40 flex-wrap flex items-center justify-center">
              <h1 className="mr-50 h-7 font-extrabold text-2xl bg-gradient-to-r select-none from-gray-400 via-gray-200 to-gray-400 bg-clip-text text-transparent">{t('about')}</h1>
              <p className="text-sm">
                {t('inf_text')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default App;
