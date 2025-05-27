import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { SiReact, SiNodedotjs, SiMermaid, SiVercel, SiVite, SiSqlalchemy, SiPython, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiGithub, SiMongodb, SiStreamlit, SiCloudinary, SiGreensock } from 'react-icons/si';
import { FaDatabase, FaCode, FaLock } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const techIconMap = {
  react: SiReact,
  node: SiNodedotjs,
  nodejs: SiNodedotjs,
  python: SiPython,
  js: SiJavascript,
  javascript: SiJavascript,
  ts: SiTypescript,
  typescript: SiTypescript,
  html: SiHtml5,
  css: SiCss3,
  github: SiGithub,
  database: FaDatabase,
  mongodb: SiMongodb,
  streamlit: SiStreamlit,
  cloudinary: SiCloudinary,
  cryptography: FaLock,
  sqlalchemy: SiSqlalchemy,
  gsap: SiGreensock,
  mermaidjs: SiMermaid,
  vite: SiVite,
  vercel: SiVercel,
};

const ProjectCard = ({props, isLoaded}) => {
  const cardRef = useRef(null);
  const textRefs = useRef([]);
  const imageRef = useRef(null);
  const techStackRefs = useRef([]);
  const isDesktop = window.innerWidth >= 1024;

  const addTextRef = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  const addTechStackRef = (el) => {
    if (el && !techStackRefs.current.includes(el)) {
      techStackRefs.current.push(el);
    }
  };

  useGSAP(() => {
    if (!isLoaded) return;

    // Initial states
    gsap.set(textRefs.current, {
      opacity: 0,
      y: isDesktop ? 30 : 0,
      filter: isDesktop ? "blur(5px)" : "none"
    });

    gsap.set(imageRef.current, {
      scale: 0.9,
      opacity: 0
    });

    if (techStackRefs.current.length > 0) {
      gsap.set(techStackRefs.current, {
        opacity: 0,
        y: isDesktop ? 20 : 0,
        filter: isDesktop ? "blur(5px)" : "none"
      });

      // Tech stack animations
      techStackRefs.current.forEach((el, index) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          filter: "none",
          duration: 0.6,
          ease: "power2.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        });
      });
    }

    // Text animations
    textRefs.current.forEach((el, index) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        filter: "none",
        duration: 0.8,
        ease: "power2.out",
        delay: index * 0.2,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      });
    });

    // Image animation
    gsap.to(imageRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "power1.in",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom-=100",
        toggleActions: "play none none reverse"
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, { scope: cardRef, dependencies: [isLoaded] });

  if (!isLoaded) {
    return (
      <div ref={cardRef} className="bg-zinc-950 bg-opacity-20 px-2 md:px-10 md:py-5 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4 mb-5 pb-2 animate-pulse">
        <div className="md:col-span-2 flex flex-col gap-2">
          <div className="h-8 bg-white bg-opacity-10 rounded w-3/4"></div>
          <div className="h-6 bg-white bg-opacity-10 rounded w-1/2"></div>
          <div className="h-48 bg-white bg-opacity-10 rounded-lg"></div>
        </div>
        <div className="md:col-span-1 flex flex-col gap-4">
          <div className="bg-black bg-opacity-10 rounded-lg p-4">
            <div className="h-6 bg-white bg-opacity-10 rounded w-1/3 mb-2"></div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-6 bg-white bg-opacity-10 rounded w-16"></div>
              ))}
            </div>
          </div>
          <div className="bg-black bg-opacity-10 rounded-lg p-4">
            <div className="h-6 bg-white bg-opacity-10 rounded w-1/3 mb-2"></div>
            <div className="h-20 bg-white bg-opacity-10 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={cardRef} className="bg-zinc-950 bg-opacity-20 px-2 md:px-10 md:py-5 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4 mb-5 pb-2"> 
      <div className="md:col-span-2 flex flex-col gap-2">
        <h1 ref={addTextRef} className="text-3xl md:text-5xl text-white font-workSans font-light">{props.name}</h1>
        <h2 ref={addTextRef} className="text-sm md:text-2xl text-zinc-700 font-space font-light">{props.type} ~ {props.event} ~ {props.year}</h2>
        <div className="h-full w-full object-cover overflow-hidden rounded-lg aspect-video">
          <a href={props.link} target="_blank" rel="noopener noreferrer">
            <img 
              ref={imageRef}
              src={props.img} 
              alt={props.name} 
              className="w-full h-full rounded-lg object-cover cursor-pointer hover:scale-105 duration-700"
            />            
          </a>
        </div>
      </div>

      <div className="md:col-span-1 flex flex-col gap-4">
        <div className="bg-black bg-opacity-10 rounded-lg p-4">
          <h3 ref={addTextRef} className="text-4xl text-white font-space mb-2">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {props.techStack && props.techStack.length > 0 ? (
              props.techStack.map((tech, index) => {
                const Icon = techIconMap[tech.toLowerCase()] || FaCode;
                return (
                  <span 
                    key={index}
                    ref={addTechStackRef}
                    className="flex items-center gap-1 px-2 py-1 text-sm bg-white bg-opacity-10 text-white rounded-md font-space"
                  >
                    <Icon size={16} className="inline-block" />
                    {tech}
                  </span>
                );
              })
            ) : (
              <span className="text-white text-xs font-space opacity-60">No tech stack provided</span>
            )}
          </div>
        </div>

        <div className="bg-black bg-opacity-10 rounded-lg p-4">
          <h3 ref={addTextRef} className="text-4xl text-white font-workSans mb-2">Description</h3>
          <p ref={addTextRef} className="text-white text-opacity-65 text-base font-workSans leading-relaxed">
            {props.desc}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard 