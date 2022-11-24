import React from 'react'
import { motion } from 'framer-motion'


export default function Modal({open, action, animate, children, title}) {
    return (
        <div className={`absolute w-full h-screen bg-gray-900/40 z-10 ${ open ? "flex": "hidden"} justify-center items-center`}>
            <motion.div  initial={animate.initial}
    animate={animate.animate}
    transition={animate.transition}  className='bg-white p-6 rounded-[16px] shadow-xl  lg:max-w-md w-5/6'>
            <div className="flex justify-between items-center mb-4">
                <div className="text-xl capitalize">{title}</div>
                <div className="px-2 text-lg rounded border border-gray-900 cursor-pointer" onClick={action}>
                    X
                </div>
            </div>
            {children}
            </motion.div>
        </div>
    )
}