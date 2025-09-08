"use client";

import React from "react";
import { useEffect } from "react";
import useAuth from "@/auth/Auth";
import { useTranslations } from "next-intl";
import RobotHand from "../../../public/img/image.png";
import Idea from "../../../public/img/idea.png";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";

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
  const { user, isAuthenticated } = useAuth();
  const t = useTranslations("HomePage");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, searchParams]);

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

        {isAuthenticated && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-2xl font-semibold mb-8"
          >
            {user?.username}
          </motion.p>
        )}

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
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white p-2 w-44 border-[0.5px] rounded border-gray-400 hover:bg-gray-500 transition duration-500 hover:cursor-pointer"
          >
            {t("button")}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-white p-2 w-44 border-[0.5px] rounded bg-gradient-to-r select-none from-gray-400 via-gray-500 to-gray-400 hover:cursor-pointer transition duration-500"
          >
            {t("button2")}
          </motion.button>
        </div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center animate-load text-3xl font-bold mb-16 bg-gradient-to-r mt-20 select-none from-gray-400 via-gray-200 to-gray-400 bg-clip-text text-transparent"
      >
        {t("text2")}{" "}
        <span className="text-[18px] font-medium">{t("text3")}</span>
      </motion.h2>

      {/* Kartalar */}
      <div className="h-auto w-full flex items-center justify-center text-center px-4 mb-20">
        <div className="w-[80%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 h-auto gap-8">
          {[t("cp_code"), t("rt_code"), t("project")].map((title, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              variants={cardVariants}
              viewport={{ once: true, amount: 0.2 }}
              className="min-w-1/3 h-[400px] border rounded backdrop-blur-[3px] hover:cursor-pointer hover:bg-gray-700/40 transition duration-500 hover:-translate-y-2 hover:border-white hover:shadow-[0_0px_30px_0] border-gray-400 bg-gradient-to-r from-black/70 via-black/60 to-black/50 shadow-[0_0px_20px_0] shadow-white/40 gap-4 p-4"
            >
              <div className="h-10 w-full flex items-center justify-left gap-4 mt-2">
                <div className="rounded-[40%_60%_65%_25%_/_40%_35%_65%_60%] border-2 border-gray-400 h-15 w-15 flex items-center justify-center top-0">
                  {i === 0 ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      fill="currentColor"
                      className="text-gray-300"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5 0a.5.5 0 0 1 .5.5V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2h1V.5a.5.5 0 0 1 1 0V2A2.5 2.5 0 0 1 14 4.5h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14v1h1.5a.5.5 0 0 1 0 1H14a2.5 2.5 0 0 1-2.5 2.5v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14h-1v1.5a.5.5 0 0 1-1 0V14A2.5 2.5 0 0 1 2 11.5H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2v-1H.5a.5.5 0 0 1 0-1H2A2.5 2.5 0 0 1 4.5 2V.5A.5.5 0 0 1 5 0m-.5 3A1.5 1.5 0 0 0 3 4.5v7A1.5 1.5 0 0 0 4.5 13h7a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 11.5 3zM5 6.5A1.5 1.5 0 0 1 6.5 5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5zM6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z" />
                    </svg>
                  ) : i === 1 ? (
                    <Image
                      src={RobotHand}
                      alt="Robot hand"
                      width={40}
                      height={40}
                      className="rounded-lg"
                    />
                  ) : (
                    <Image
                      src={Idea}
                      alt="Idea"
                      width={40}
                      height={40}
                      className="rounded-lg"
                    />
                  )}
                </div>
                <p className="animate-load font-bold text-xl">{title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;
