import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Team = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

const avatars = [
  { src: "https://api.dicebear.com/9.x/adventurer/svg?seed=Arena", name: "Arena Master" },
  { src: "https://api.dicebear.com/9.x/adventurer/svg?seed=Hawk", name: "Hawk Vision" },
  { src: "https://api.dicebear.com/9.x/adventurer/svg?seed=Phoenix", name: "Phoenix Rise" },
];


  const team = [
    {
      name: 'Ibrahim Tamimi',
      role: 'Telegram Group Admin',
      image: 'https://avatar.iran.liara.run/public/8',
    },
    {
      name: 'Asif Saif Ali',
      role: 'Developing and Managing Website',
      image: 'https://avatar.iran.liara.run/public/2',
    },
    {
      name: 'Arena Team',
      role: 'Telegram Group Admin',
      image: 'https://avatar.iran.liara.run/public/3',
    },
    {
      name: 'The Arena',
      role: 'Telegram Community Manager',
      image: 'https://avatar.iran.liara.run/public/4',
    },
  ];

  return (
    <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center" data-aos="fade-up">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
            Our Team Members & Developer
          </h2>
        </div>

        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto mt-12 text-center sm:grid-cols-2 md:mt-20 gap-x-8 md:grid-cols-4 gap-y-12 lg:gap-x-16 xl:gap-x-20">
          {team.map((member, index) => (
            <div key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <img
                className="object-cover w-32 h-32 mx-auto rounded-full lg:w-44 lg:h-44 grayscale filter"
                src={member.image}
                alt={member.name}
              />
              <p className="mt-5 text-lg font-bold text-gray-900 sm:text-xl sm:mt-8 font-pj">{member.name}</p>
              <p className="mt-2 text-base text-gray-600 font-pj">{member.role}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16" data-aos="fade-up" data-aos-delay="500">
          <svg className="w-auto h-4 mx-auto text-gray-300" viewBox="0 0 172 16" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            {[...Array(24)].map((_, i) => (
              <line
                key={i}
                y1="-0.5"
                x2="18.0278"
                y2="-0.5"
                transform={`matrix(-0.5547 0.83205 0.83205 0.5547 ${7 * i + 11} 1)`}
              />
            ))}
          </svg>
        </div>

        <div className="max-w-3xl mx-auto mt-12 space-y-8 sm:space-y-0 sm:flex sm:items-center sm:justify-center sm:mt-16 sm:gap-x-16">
          {avatars.map((avatar, index) => (
  <div
    key={avatar.name}
    data-aos="zoom-in"
    data-aos-delay={600 + index * 100}
    className="flex flex-col items-center"
  >
    <img
      className="w-16 h-16 rounded-full border-2 border-gray-300 shadow-md
                 animate-pulse hover:scale-110 hover:shadow-lg transition-all duration-300"
      src={avatar.src}
      alt={avatar.name}
    />
    <p className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
      {avatar.name}
    </p>
  </div>
))}
        </div>
      </div>
    </section>
  );
};

export default Team;
