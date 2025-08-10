import React, { useState } from 'react'
import Testimonials from './Testimonials'
import { Link, useNavigate } from "react-router-dom";
import Pricing from './Pricing';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion, AnimatePresence } from "framer-motion";
import Team from './Team';
import Footer from './Footer';


const Hero = () => {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate()
    const isLoggedIn = Boolean(localStorage.getItem('token'));
    console.log(isLoggedIn);

    const handleSignupClick = () => {
        if (isLoggedIn) {
            navigate('/dashboard/home');
        }

        navigate('/auth/sign-in');
    };
    const menuVariants = {
        hidden: { opacity: 0, height: 0 },
        visible: { opacity: 1, height: 'auto' },
        exit: { opacity: 0, height: 0 },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1 },
        }),
    };

    const navItems = ['Features', 'Testimonials', 'Pricing', 'Team', 'Contact Us'];

    return (
        <>
            <div class="bg-gray-50">
                <header className="py-4 md:py-6">
                    <div className="container px-4 mx-auto sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between">
                            <div className="flex-shrink-0">
                                <a href="/" className="flex rounded outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2">
                                    <img className="w-36 h-18" src="./image.png" alt="Logo" />
                                </a>
                            </div>

                            <div className="flex lg:hidden">
                                <button
                                    type="button"
                                    className="text-gray-900"
                                    onClick={() => setExpanded(!expanded)}
                                    aria-expanded={expanded}
                                >
                                    {expanded ? (
                                        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    ) : (
                                        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            <motion.div
                                className="hidden lg:flex lg:ml-16 lg:items-center lg:justify-center lg:space-x-10 xl:space-x-16"
                                initial="hidden"
                                animate="visible"
                                variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
                            >
                                {navItems.map((item, i) => (
                                    <motion.a
                                        key={item}
                                        href="#"
                                        className="text-base font-medium text-gray-900 transition-all duration-200 rounded focus:outline-none font-pj hover:text-black-50 focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                                        variants={itemVariants}
                                        custom={i}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.95 }}

                                    >
                                        {item}
                                    </motion.a>
                                ))}
                            </motion.div>

                            <motion.div
                                className="hidden lg:flex lg:items-center lg:justify-end lg:ml-auto"
                                initial="hidden"
                                animate="visible"
                                variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
                            >
                                <div className="w-full flex justify-end space-x-4">
                                    {isLoggedIn ? (
                                        <motion.button
                                            onClick={handleSignupClick}
                                            className="inline-flex items-center justify-center px-6 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                            role="button"
                                            variants={itemVariants}
                                            custom={0.4}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            whileFocus={{ scale: 1.05 }}
                                        >
                                            Dashboard
                                        </motion.button>
                                    ) : (<motion.button
                                        onClick={handleSignupClick}
                                        className="inline-flex items-center justify-center px-6 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                        role="button"
                                        variants={itemVariants}
                                        custom={0.4}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        whileFocus={{ scale: 1.05 }}
                                    >
                                        Sign In
                                    </motion.button>)}
                                    <motion.button
                                        onClick={()=>{navigate("/contact")}}
                                        className="inline-flex items-center justify-center px-6 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                        role="button"
                                        variants={itemVariants}
                                        custom={0.4}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        whileFocus={{ scale: 1.05 }}
                                    >
                                        Contact Us
                                    </motion.button>
                                </div>


                            </motion.div>

                        </div>

                        <AnimatePresence>
                            {expanded && (
                                <motion.nav
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={menuVariants}
                                    className="lg:hidden"
                                >
                                    <div className="px-1 py-8">
                                        <div className="grid gap-y-7">
                                            {[
                                                ...navItems,
                                                'Customer Login',
                                                <span key="signup">
                                                    <a
                                                        href="#"
                                                        className="inline-flex items-center justify-center px-6 py-3 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                                        role="button"
                                                    >
                                                        Sign up
                                                    </a>
                                                </span>
                                            ].map((item, i) => (
                                                typeof item === 'string' ? (
                                                    <motion.a
                                                        key={item}
                                                        href="#"
                                                        className="flex items-center p-3 -m-3 text-base font-medium text-gray-900 transition-all duration-200 rounded-xl hover:bg-gray-50 focus:outline-none font-pj focus:ring-1 focus:ring-gray-900 focus:ring-offset-2"
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                    >
                                                        {item}
                                                    </motion.a>
                                                ) : item
                                            ))}
                                        </div>
                                    </div>
                                </motion.nav>
                            )}
                        </AnimatePresence>
                    </div>
                </header>

                <section class="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
                    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div class="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <motion.p
                                    className="text-base font-semibold tracking-wider text-blue-600 uppercase"
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                >
                                    A Platform to Elevate Your Trading Strategy
                                </motion.p>

                                <motion.h1
                                    className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-8xl"
                                    initial={{ opacity: 0, y: -50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.6 }}
                                >
                                    <span className="text-red-600">Connect Us</span> <br></br>& learn from the experts
                                </motion.h1>

                                <motion.p
                                    className="mt-4 text-base text-black lg:mt-8 sm:text-xl"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.6 }}
                                >
                                    Grow your career fast with right mentor.
                                </motion.p>

                                <motion.button
                                    href="#"
                                    role="button"
                                    className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-white bg-gradient-to-r from-black via-gray-800 to-black hover:from-red-400 hover:text-black
rounded-full lg:mt-16 transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.8, duration: 0.4 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Become Our Premimum Member
                                </motion.button>


                                <motion.p
                                    className="mt-5 text-gray-600"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.0, duration: 0.6 }}
                                >
                                    Already joined us?{" "}
                                    <a href="#" className="text-black transition-all duration-200 hover:underline">
                                        Log in
                                    </a>
                                </motion.p>
                            </motion.div>

                            <div className='rounded-lg pb-20'>
                                <DotLottieReact
                                    src="https://lottie.host/f910882e-0d47-4516-9c98-ec95eca3f75c/7JP9xMYNR3.lottie"
                                    loop
                                    autoplay
                                    style={{ width: '100%', height: '400px' }}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Testimonials />
            <Pricing />
            <Team/>
            <Footer/>
        </>
    )
}

export default Hero