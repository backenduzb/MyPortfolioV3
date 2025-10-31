"use client"

import Image from "next/image";
import VictusLaptop from "../../../../public/img/victus.png"
import UZDevs from "../../../../public/img/uzdevs.png";
import Robo from "../../../../public/img/robocontest.png";
import X from "../../../../public/img/x.png";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Info() {

    const t = useTranslations("AboutPage");

    return (
        <div className="w-full min-h-svh flex flex-col items-center justify-center text-center px-4">
            <div className="w-full min-h-screen gap-5 flex items-center grid-cols-2">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="w-1/2 flex items-center justify-center min-h-screen">
                    <div className="mt-5">
                        <div className="h-full w-full overflow-hidden ">
                            <Image
                                src={VictusLaptop}
                                width={600}
                                height={600}
                                alt="hp Victus"
                                className="rotate-image drop-shadow-xl drop-shadow-amber-50"
                            />
                        </div>
                    </div>
                </motion.div>
                <div

                    className="relative w-1/2 min-h-screen flex flex-col items-start justify-center px-6 text-center">

                    <h1 className="mt-20 text-4xl font-extrabold  text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 drop-shadow-lg ">
                        {t('title')}
                    </h1>

                    <p className="text-left text-gray-200 mt-6 leading-relaxed text-lg drop-shadow-md animate-fadeIn opacity-90">
                        {t('text')}
                        <br /><br />
                        {t('text2')}
                    </p>

                    <div className="w-full flex items-center justify-start gap-8 mt-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            className="w-1/3 h-full flex items-center justify-center">
                            <Link href="https://uzbekdevs.uz/@python_dev_junior" target="_blank">
                                <div className="group w-12 h-12 shadow-[0_0_15px_2px] shadow-white rounded-full flex items-center justify-center backdrop-blur-sm hover:w-44 hover:h-12 transition-all duration-300 hover:bg-gradient-to-r hover:from-white/20 hover:to-white/10">
                                    <span className="group-hover:ml-[-10px] transition-all duration-300">
                                        <Image src={UZDevs} width={32} height={32} alt="uz devs" />
                                    </span>
                                    <span className="opacity-0 max-w-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-[120px] group-hover:translate-x-2 transition-all duration-300 text-white text-sm font-medium">
                                        Uzbekdevs
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                            className="w-1/3 h-full flex items-center justify-center">
                            <Link href="https://robocontest.uz/profile/qobiljonsharipovvictus" target="_blank">
                                <div className="group w-12 h-12 shadow-[0_0_15px_2px] shadow-white rounded-full flex items-center justify-center backdrop-blur-sm hover:w-44 hover:h-12 transition-all duration-300 hover:bg-gradient-to-r hover:from-white/20 hover:to-white/10">
                                    <span className="group-hover:ml-[-10px] transition-all duration-300">
                                        <Image src={Robo} width={30} height={30} alt="Robocontest" />
                                    </span>
                                    <span className="opacity-0 max-w-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-[120px] group-hover:translate-x-2 transition-all duration-300 text-white text-sm font-medium">
                                        Robocontest
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            className="w-1/3 h-full flex items-center justify-center">
                            <Link href="https://x.com/py_dev_junior" target="_blank">
                                <div className="group w-12 h-12 shadow-[0_0_15px_2px] shadow-white rounded-full flex items-center justify-center backdrop-blur-sm hover:w-44 hover:h-12 transition-all duration-300 hover:bg-gradient-to-r hover:from-white/20 hover:to-white/10">
                                    <span className="group-hover:ml-[-10px] transition-all duration-300">
                                        <Image src={X} width={30} height={30} alt="X xom" />
                                    </span>
                                    <span className="opacity-0 max-w-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-[120px] group-hover:translate-x-2 transition-all duration-300 text-white text-sm font-medium">
                                        X.com
                                    </span>
                                </div>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className="min-h-screen w-full border-1 border-white"></div>
        </div>
    );
}