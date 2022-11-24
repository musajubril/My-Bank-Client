import React from 'react'
import { AiOutlineCloseSquare } from "react-icons/ai"
import { motion } from 'framer-motion'

export default function SlideOver({open, action, animate, children, title}) {

  return (
    <>
    <motion.div className={`absolute w-full h-screen bg-gray-900/10 z-10 ${ open ? "flex": "hidden"} justify-end`}>
    <motion.div  initial={animate.initial}
    animate={animate.animate}
    transition={animate.transition} className="min-h-screen px-4 sm:px-6 bg-white lg:max-w-md w-5/6 shadow-xl py-6">
            <div className="flex justify-between items-center">
                <div className="text-xl">{title}</div>
                <div>
                <AiOutlineCloseSquare className="w-8 h-8 cursor-pointer" onClick={action} />
                </div>
            </div>
            <div className="space-y-8 divide-y divide-gray-200">
          <div className="pt-8">
                {children}
            </div>
            </div>
        </motion.div>
    </motion.div>
    </>
  )
}
