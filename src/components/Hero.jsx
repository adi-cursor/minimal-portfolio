import { introLinesByPersona } from '../constants'
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useSecrets } from '../context/SecretsContext'
import KonamiCode from './KonamiCode'

gsap.registerPlugin(ScrollTrigger, SplitText);

const personas = [
    { id: 'default', label: 'Default' },
    { id: 'hr', label: 'HR' },
    { id: 'creative', label: 'Creative' },
    { id: 'interviewer', label: 'Interviewer' },
    { id: 'professional', label: 'Professional' },
    { id: 'client', label: 'Client' },
    { id: 'secret', label: '' }
];

const Hero = ({ wrapperRef }) => {
    const [activePersona, setActivePersona] = useState('default');
    const { unlockSecret } = useSecrets();
    const refs = useRef([]);
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const helloRef = useRef(null);
    const splitInstance = useRef(null);
    const isDesktop = window.innerWidth >= 1024;
    const timeline = useRef(null);

    const handlePersonaChange = (personaId) => {
        if (timeline.current) {
            timeline.current.kill();
        }
        
        setActivePersona(personaId);
        if (personaId === 'secret') {
            unlockSecret('persona');
        }
    };

    const addRef = (el) => {
        if (el && !refs.current.includes(el)) {
            refs.current.push(el);
        }
    };

    const animateElements = () => {
        if (timeline.current) {
            timeline.current.kill();
        }

        refs.current = [];

        if (splitInstance.current) {
            splitInstance.current.revert();
        }

        if (helloRef.current) {
            addRef(helloRef.current);
        }

        if (textRef.current) {
            textRef.current.textContent = introLinesByPersona[activePersona];
        }

        const width = window.innerWidth;
        const splitType = width < 768 ? 'lines,words' : 'lines';
        splitInstance.current = new SplitText(textRef.current, {
            type: splitType,
            linesClass: "split-line"
        });

        if (containerRef.current) {
            const elements = containerRef.current.querySelectorAll('.split-line');
            elements.forEach(el => addRef(el));
        }

        // Create a new timeline for the animations
        timeline.current = gsap.timeline({
            defaults: {
                ease: 'power2.inOut',
                duration: 0.5
            }
        });

        // Set initial states
        gsap.set(refs.current, {
            opacity: 0,
            filter: isDesktop ? "blur(5px)" : "none",
            y: isDesktop ? "30px" : "0px",
        });

        // Animate each element with the timeline
        refs.current.forEach((el, index) => {
            timeline.current.to(el, {
                opacity: 1,
                filter: "none",
                y: "0px",
                duration: 0.5,
                delay: index * 0.1
            }, index * 0.1);
        });

        // Add scroll-based reveal/hide only for desktop
        if (isDesktop) {
            timeline.current.pause();
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top center',
                end: 'bottom top',
                onEnter: () => timeline.current.play(),
                onLeave: () => timeline.current.reverse(),
                onEnterBack: () => timeline.current.play(),
                onLeaveBack: () => timeline.current.reverse()
            });
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (timeline.current) {
                timeline.current.kill();
            }
            animateElements();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (splitInstance.current) {
                splitInstance.current.revert();
            }
            if (timeline.current) {
                timeline.current.kill();
            }
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    useEffect(() => {
        if (textRef.current) {
            animateElements();
        }
    }, [activePersona]);

    return (
        <div className='h-screen w-full flex flex-col items-center justify-center relative'>
            <KonamiCode wrapperRef={wrapperRef} />
            <div className='flex flex-col px-5 md:px-32' ref={containerRef}>
                <h1
                    ref={helloRef}
                    className='text-xl md:text-3xl text-white font-workSans h-full'
                >
                    {activePersona === 'secret' ? 'Yo,' : 'Hello,'}
                </h1>
                <div className='h-full w-full flex flex-col py-3'>
                    <div 
                        ref={textRef}
                        className='w-full text-white font-space font-thin text-3xl md:text-4xl lg:text-6xl'
                    >
                        {introLinesByPersona[activePersona]}
                    </div>
                </div>
            </div>
            
            <div className='absolute bottom-10 w-[90%] max-w-3xl mx-auto px-2'>
                <div className='flex flex-wrap justify-center gap-1 md:gap-2 bg-black/20 backdrop-blur-sm p-1.5 md:p-2 rounded-full overflow-x-auto scrollbar-hide'>
                    {personas.map((persona) => (
                        <button
                            key={persona.id}
                            onClick={() => handlePersonaChange(persona.id)}
                            className={`px-2 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm whitespace-nowrap transition-all duration-300 ${
                                activePersona === persona.id
                                    ? 'bg-white text-black font-medium'
                                    : 'text-white hover:bg-white/10'
                            }`}
                        >
                            {persona.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Hero; 