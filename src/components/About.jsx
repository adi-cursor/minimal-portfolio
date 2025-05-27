import React, { useEffect, useRef } from 'react'
import { experience } from '../constants'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const blurRefs = useRef([]); 
  const fadeRefs = useRef([]);
  const isDesktop = window.innerWidth >= 1024;

  const addBlurRef = (el) => {
    if (el && !blurRefs.current.includes(el)) {
      blurRefs.current.push(el);
    }
  };

  const addFadeRef = (el) => {
    if (el && !fadeRefs.current.includes(el)) {
      fadeRefs.current.push(el);
    }
  };

  useEffect(() => {
    gsap.set(blurRefs.current, {
      opacity: 0,
      filter: "blur(5px)",
      y: "30px"
    });

    blurRefs.current.forEach((el, index) => {
      gsap.to(
        el,
        {
          ease: 'power2.inOut',
          duration: 0.5,
          delay: 0.2 * index,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            toggleActions: "play reverse play reverse",
            // More efficient animation on mobile
            onEnter: () => {
              gsap.to(el, {
                opacity: 1,
                filter: isDesktop ? "blur(0px)" : "none",
                y: "0px",
                duration: 0.5,
              });
            },
            onLeave: () => {
              gsap.to(el, {
                opacity: 0,
                filter: isDesktop ? "blur(5px)" : "none",
                y: "30px",
                duration: 0.5,
              });
            }
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    gsap.set(fadeRefs.current, {
      opacity: 0,
    });

    fadeRefs.current.forEach((el, index) => {
      gsap.to(
        el,
        {
          ease: 'power2.inOut',
          duration: 0.5,
          delay: 0.2 * index,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            toggleActions: "play reverse play reverse",
            onEnter: () => {
              gsap.to(el, {
                opacity: 1,
                duration: 0.5,
              });
            },
            onLeave: () => {
              gsap.to(el, {
                opacity: 0,
                duration: 0.5,
              });
            }
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className='min-h-screen w-full flex flex-col md:flex-row justify-between md:px-32'>
      <div className='h-full w-full md:w-2/4 flex flex-col gap-8 justify-center px-5 py-20'>
        <div ref={addFadeRef} className='w-full bg-white bg-opacity-[0.01] rounded-xl px-5 py-5 z-10 backdrop-blur-sm'>
          <span ref={addBlurRef} className='block text-xl md:text-2xl lg:text-4xl text-white font-space font-extralight'>
            As a final-year undergraduate pursuing a BTech degree in Computer Science and Engineering,
            I`m actively on the lookout for full-time gigs and freelance projects.
          </span>
        </div>
        <div ref={addFadeRef} className='bg-white bg-opacity-[0.01] rounded-xl px-5 py-5 z-10 backdrop-blur-sm'>
          <span ref={addBlurRef} className='block text-xl md:text-2xl lg:text-4xl text-white font-space font-extralight'>
            When I`m not working, you`ll catch me watching anime, reading random stuff,
            or messing with some fun side projects.
          </span>
        </div>
      </div>
      <div className='h-full w-full md:w-2/6 flex flex-col gap-10 items-center'>
        <div ref={addFadeRef} className='mt-10 bg-white bg-opacity-[0.01] rounded-xl px-5 py-5 z-10 backdrop-blur-sm'>
          <div className="py-2 text-2xl font-semibold text-zinc-700 md:text-[1.5vw] flex flex-col gap-5">
            Experience
            {experience.map((exp, i) => (
              <div key={i} ref={addFadeRef} className='bg-black bg-opacity-[0.01] rounded-xl px-5 py-5 z-10 backdrop-blur-sm flex flex-col'>
                <span ref={addBlurRef} className='text-2xl text-white font-popins font-semibold'>{exp.role}</span>
                <span ref={addBlurRef} className='text-lg text-white font-popins font-light'>{exp.company}</span>
                <span ref={addBlurRef} className='text-base text-white opacity-50 font-popins font-extralight'>{exp.duration}</span>
              </div>
            ))}
          </div>
        </div>
        <a href="#_" ref={addBlurRef} className="bg-white bg-opacity-[0.01] h-[70px] w-[250px] relative hidden items-center justify-center px-6 py-3 overflow-hidden font-bold text-white rounded-md shadow-2xl group">
          <span className="absolute left-0 w-1/2 h-full transition duration-300 ease-out opacity-0 bg-gradient-to-r from-yellow-600 via-purple-700 to-blue-400 group-hover:opacity-100 blur-xl"></span>
          <span className="absolute left-1/2 w-1/2 h-full transition duration-300 ease-out opacity-0 bg-gradient-to-r from-blue-400 via-amber-700 to-red-400 group-hover:opacity-100 blur-xl"></span>
          <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-11/12 group-hover:h-11/12 opacity-5 backdrop-blur-lg"></span>
          <button className="relative text-2xl font-space" type="button">Fly Away</button>
        </a>
      </div>
    </div>
  )
}

export default About 