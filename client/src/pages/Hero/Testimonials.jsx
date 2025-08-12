import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Testimonials = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="text-center" data-aos="fade-up">
                    <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl font-pj">
                        Built for Serious Traders
                    </h2>
                    <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-8 font-pj">
                        Join our premium Telegram trading community and stay ahead with accurate signals, expert guidance, and real-time updates.
                    </p>
                </div>

                <div className="grid grid-cols-1 mt-10 text-center sm:mt-16 sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-3 md:gap-0 xl:mt-24">
                    <div className="md:p-8 lg:p-14" data-aos="fade-up">
                        <svg className="mx-auto" width="44" height="44" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <h3 className="mt-8 text-xl font-bold text-gray-900 font-pj">Accurate Signals</h3>
                        <p className="mt-4 text-base text-gray-600 font-pj">
                            Receive high-probability entry and exit points backed by technical analysis. Reduce risk and boost your trading confidence.
                        </p>
                    </div>

                    <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200" data-aos="fade-up" data-aos-delay="100">
                        <svg className="mx-auto" width="44" height="44" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 className="mt-8 text-xl font-bold text-gray-900 font-pj">Expert Mentorship</h3>
                        <p className="mt-4 text-base text-gray-600 font-pj">
                            Get guidance from seasoned traders who share insights, strategies, and one-on-one support tailored to your growth.
                        </p>
                    </div>

                    <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200" data-aos="fade-up" data-aos-delay="200">
                        <svg className="mx-auto" width="44" height="44" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                        </svg>
                        <h3 className="mt-8 text-xl font-bold text-gray-900 font-pj">Real-Time Alerts</h3>
                        <p className="mt-4 text-base text-gray-600 font-pj">
                            Stay updated with real-time trade alerts directly in Telegram. Never miss a profitable opportunity again.
                        </p>
                    </div>

                    <div className="md:p-8 lg:p-14 md:border-t md:border-gray-200" data-aos="fade-up" data-aos-delay="300">
                        <svg className="mx-auto" width="44" height="44" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a4 4 0 00-8 0v2m8 0a4 4 0 01-8 0m8 0v10a2 2 0 01-2 2h-4a2 2 0 01-2-2V9" />
                        </svg>
                        <h3 className="mt-8 text-xl font-bold text-gray-900 font-pj">Private Community</h3>
                        <p className="mt-4 text-base text-gray-600 font-pj">
                            Join an exclusive group of traders sharing wins, learnings, and setups. Grow together with a focused community.
                        </p>
                    </div>

                    <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t" data-aos="fade-up" data-aos-delay="400">
                        <svg className="mx-auto" width="44" height="44" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <h3 className="mt-8 text-xl font-bold text-gray-900 font-pj">Verified Performance</h3>
                        <p className="mt-4 text-base text-gray-600 font-pj">
                            Transparent trade logs and performance reports so you can verify the reliability and success of our calls.
                        </p>
                    </div>

                    <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t" data-aos="fade-up" data-aos-delay="500">
                        <svg className="mx-auto" width="44" height="44" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                        </svg>
                        <h3 className="mt-8 text-xl font-bold text-gray-900 font-pj">Consistent Results</h3>
                        <p className="mt-4 text-base text-gray-600 font-pj">
                            Designed for regular traders who want consistency, accountability, and smart trade decisions every day.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
