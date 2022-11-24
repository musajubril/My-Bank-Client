import React from "react";
import {
  AiOutlineDownload,
  AiOutlineUnorderedList,
  AiOutlineUpload,
  AiOutlineSend,
  AiOutlineMenu,
} from "react-icons/ai";
import { FaCogs, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link"

export default function Layout({ children }) {
  const router = useRouter();
  const navigations = [
    { icon: FaCogs, name: "Dashboard", url: "/dashboard" },
    { icon: AiOutlineDownload, name: "Deposit", url: "/deposit" },
    { icon: AiOutlineUpload, name: "Withdrawal", url: "/withdrawal" },
    { icon: AiOutlineSend, name: "Transfer", url: "/transfer" },
    { icon: AiOutlineUnorderedList, name: "History", url: "/history" },
  ];
  const [displayNav, setDisplayNav] = React.useState(false);
  const [animate, setAnimate] = React.useState({
    transition: { duration: 0 },
    initial: { y: 100 },
    animate: { y: 100 },
  });
  const handleOpenNav = () => {
    setDisplayNav(true);
    setAnimate({
      transition: { duration: 1 },
      initial: { y: 100 },
      animate: { y: 0 },
    });
  };
  const handleCloseNav = () => {
    setAnimate({
      transition: { duration: 1 },
      initial: { y: 0 },
      animate: { y: 100 },
    });
    // setTimeout(()=>{

      setDisplayNav(false);
    // },1200)
  };
  const page = navigations.filter((route) => router.asPath === route.url)[0];
  const variants = {
    hidden: { opacity: 0, x: -200, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
}
  return (
    <div className="min-h-screen w-full flex bg-white lg:divide-x-2 lg:divide-gray-300">
      <div
        className={"hidden w-[212px] bg-white h-screen static lg:flex pt-7 px-4 flex-col"}
      >
        <div className="pb-7 text-[18.46px] font-extrabold pl-3">My Bank</div>
        <div className="flex flex-col gap-2">
          {navigations.map((nav, i) => (
            <Link
            href={nav.url}
              key={i}
              className={`flex px-3 py-2 hover:bg-indigo-700 hover:text-white items-center cursor-pointer rounded-[8px] ${
                router.asPath === nav.url ? "bg-indigo-700 text-white" : null
              }`}
            >
              <nav.icon className="mr-3 h-6 w-6" />
              <div className="">{nav.name}</div>
            </Link>
          ))}
        </div>
      </div>
      {/* <motion.div
        initial={animate.initial}
        animate={animate.animate}
        transition={animate.transition}
        className={`${
          displayNav ? "flex" : "hidden"
        } fixed bottom-0 w-full lg:hidden justify-between z-20`}
      >
        <div className="w-full h-full bg-white pt-7 px-4 flex flex-col">
          <div className="pb-7 text-[18.46px] font-extrabold pl-3">My Bank</div>
          <div className="flex flex-col gap-2">
            {navigations.map((nav, i) => (
              <Link
              href={nav.url}
                key={i}
                className={`flex px-3 py-2 hover:bg-indigo-700 hover:text-white items-center cursor-pointer rounded-[8px] ${
                  router.asPath === nav.url ? "bg-indigo-700 text-white" : null
                }`}
              >
                <nav.icon className="mr-3 h-6 w-6" />
                <div className="">{nav.name}</div>
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-5 mr-4 bg-white rounded p-2 h-8 w-8 flex items-center justify-center" onClick={handleCloseNav}>
                <FaTimes className="w-6 h-6" />
        </div>
      </motion.div> */}
      <motion.div
        initial={animate.initial}
        animate={animate.animate}
        transition={animate.transition} className="lg-hidden fixed bottom-0 bg-white shadow z-20 px-4 py-2 w-full flex items-center justify-between">
        {
          [navigations[4], navigations[2], navigations[0],navigations[1],navigations[3]].map((nav, i)=>(
        <Link href={nav.url} className={`flex items-center flex-col justify-center transform ${router.asPath === nav.url ? "scale-110" : "null"}`}>
          <div className={`p-2 rounded-full ${router.asPath === nav.url ? "border-2 border-white ring-2 ring-indigo-700 bg-indigo-700 text-white" : null}`}>
        <nav.icon className="h-6 w-6" />
          </div>
          <div className={`text-xs ${router.asPath === nav.url ? "font-extrabold text-sm text-indigo-700" : null}`}>{nav.name}</div>
        </Link>
          ))
        }

      </motion.div>
      <motion.div initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ type: 'linear' }} className="w-full lg:ml-auto">
        <div className="lg:px-7 px-4 py-[22px] flex justify-between items-center border-b-2 border-gray-200">
          {
            displayNav && 
          <FaTimes
            className="block lg:hidden w-5 h-5 cursor-pointer"
            onClick={handleCloseNav}
          />
          }
          {
            !displayNav && 
          <AiOutlineMenu
            className="block lg:hidden w-5 h-5 cursor-pointer"
            onClick={handleOpenNav}
          />
          }
          <div className="text-[18.46px] font-extrabold block lg:hidden">
            My Bank
          </div>
          <div className="flex items-center gap-4">
            <page.icon className="w-5 h-5" />
            <div className="text-black">{page.name}</div>
          </div>
        </div>
        <div className="lg:px-20 px-4 mt-7">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
