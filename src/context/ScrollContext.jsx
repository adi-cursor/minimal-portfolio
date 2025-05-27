import { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
    const lenisRef = useRef();

    useEffect(() => {
        lenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        lenisRef.current.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenisRef.current.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            lenisRef.current.destroy();
            gsap.ticker.remove(lenisRef.current.raf);
        };
    }, []);

    const scrollTo = (target) => {
        if (lenisRef.current) {
            lenisRef.current.scrollTo(target);
        }
    };

    return (
        <ScrollContext.Provider value={{ scrollTo, lenis: lenisRef.current }}>
            {children}
        </ScrollContext.Provider>
    );
};

export const useScroll = () => {
    const context = useContext(ScrollContext);
    if (!context) {
        throw new Error('useScroll must be used within a ScrollProvider');
    }
    return context;
}; 