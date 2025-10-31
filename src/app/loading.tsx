"use client"
import { motion } from "framer-motion";

export default function Loading() {
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
      </div></>
  );
}
