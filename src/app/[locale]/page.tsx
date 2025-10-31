"use client";

import React from "react";
import { useEffect, useState } from "react";
import useAuth from "@/auth/Auth";
import { useTranslations } from "next-intl";
import Nextjs_logo from "../../../public/img/nextjs.png";
import React_logo from "../../../public/img/react.png";
import Django_logo from "../../../public/img/django.png";
import { motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ArrowUpWideNarrowIcon } from "lucide-react";
import Link from "next/link";
import { useAlert } from "@/context/Alert";

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

  const { showAlert } = useAlert();
  const { user, isAuthenticated } = useAuth();
  const t = useTranslations("HomePage");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true)
  const segments = pathname.split("/");
  const currentLocale = segments[1] || "en";

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, searchParams]);
  if (loading) {
    return (
      <>
        <div className="fixed inset-0 flex">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
            className="w-1/2 h-full bg-black/90 border-r"
          />

          <div className="fixed inset-0 flex items-center justify-center z-[100]">
            <div className="relative h-18 w-18">
              <div className="absolute inset-0 border z-100"></div>
              <div className="absolute inset-0 border animate-spin z-100"></div>
            </div>
          </div>


          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            transition={{ duration: 1, ease: "easeInOut", delay: 1 }}
            className="w-1/2 h-full bg-black/90 border-l"
          />
        </div>

      </>
    );
  }
  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center justify-center text-center px-4">
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

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }} className="h-auto w-full flex flex-col justify-center items-center text-center px-4 mb-20 overflow-hidden">
        <div className="relative w-60 h-20 bg-zinc-900 rounded-[10px] border-4 border-zinc-800 flex items-center justify-center  mt-26">
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

          <span className="load-border-rounded absolute top-[-57px] left-[-786px] w-[848px] h-10 border-r-2 border-t-2 rounded-tr-xl border-zinc-700"></span>
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
          <motion.div initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }} className="h-[300px] w-[450px] border-2 border-zinc-700 backdrop-blur-sm rounded flex items-center justify-center shadow-[0px_0px_10px_0px] shadow-zinc-500">
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
          <motion.div initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }} className="h-[300px] w-[450px] border-2 border-zinc-700 backdrop-blur-sm rounded flex items-center justify-center shadow-[0px_0px_10px_0px] shadow-zinc-500">
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
          <motion.div initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }} className=" h-[300px] w-[450px] border-2 border-zinc-700 backdrop-blur-sm rounded flex items-center justify-center shadow-[0px_0px_10px_0px] shadow-zinc-500">
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
    </>
  );
};
export default App;
