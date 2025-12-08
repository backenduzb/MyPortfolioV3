"use client"

import Image from "next/image";
import VictusLaptop from "../../public/img/victus.png"
import UZDevs from "../../public/img/uzdevs.png";
import Robo from "../../public/img/robocontest.png";
import X from "../../public/img/x.png";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Socials() {
    return (
        <div className="fixed items-start justify-start bottom-[9%] left-0">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="w-1/3 h-full flex items-center justify-start">
                <Link href="https://uzbekdevs.uz/@python_dev_junior" target="_blank">
                    <div className="group w-12 h-12 shadow-[0_0_15px_2px] shadow-white rounded-0 rounded-0 flex items-center justify-center backdrop-blur-sm hover:w-44 hover:h-12 transition-all duration-300 hover:bg-gradient-to-r hover:from-white/20 hover:to-white/10 hover:border-r-2">
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
                className="w-1/3 h-full flex items-center justify-start">
                <Link href="https://t.me/python_dev_junior" target="_blank">
                    <div className="group w-12 h-12 shadow-[0_0_15px_2px] shadow-white rounded-0 rounded-0 flex items-center justify-center backdrop-blur-sm hover:w-44 hover:h-12 transition-all duration-300 hover:bg-gradient-to-r hover:from-white/20 hover:to-white/10 hover:border-r-2">
                        <span className="group-hover:ml-[-10px] transition-all duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-telegram" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
                            </svg>
                        </span>
                        <span className="opacity-0 max-w-0 overflow-hidden group-hover:opacity-100 group-hover:max-w-[120px] group-hover:translate-x-2 transition-all duration-300 text-white text-sm font-medium">
                            Telegram
                        </span>
                    </div>
                </Link>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="w-1/3 h-full flex items-center justify-start">
                <Link href="https://x.com/py_dev_junior" target="_blank">
                    <div className="group w-12 h-12 shadow-[0_0_15px_2px] shadow-white rounded-0 rounded-0 flex items-center justify-center backdrop-blur-sm hover:w-44 hover:h-12 transition-all duration-300 hover:bg-gradient-to-r hover:from-white/20 hover:to-white/10 hover:border-r-2">
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
    )
}