import { useEffect, useState } from 'react';
import { useSecrets } from '../context/SecretsContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const KonamiCode = ({ wrapperRef }) => {
    const { unlockSecret } = useSecrets();
    const [isInverted, setIsInverted] = useState(false);

    // Check if device is desktop
    const isDesktop = window.innerWidth >= 1024;

    const toggleRotation = () => {
        if (!isDesktop) return; // Only allow rotation on desktop
        
        setIsInverted(prev => !prev);
        
        if (!wrapperRef.current) return;

        gsap.to(wrapperRef.current, {
            rotation: isInverted ? 0 : 180,
            duration: 1,
            ease: "power2.inOut",
            transformOrigin: "center center",
            onComplete: () => {
                ScrollTrigger.getAll().forEach(trigger => {
                    trigger.refresh();
                });
            }
        });
    };

    useEffect(() => {
        if (!isDesktop) return; // Only add keyboard listeners on desktop

        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiIndex = 0;

        const handleKeyDown = (e) => {
            const key = e.key.toLowerCase();
            const expectedKey = konamiCode[konamiIndex].toLowerCase();

            if (key === expectedKey) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    unlockSecret('konami');
                    toggleRotation();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [unlockSecret, isDesktop]);

    // Add escape key handler for desktop only
    useEffect(() => {
        if (!isDesktop) return;

        const handleToggleShortcut = (e) => {
            if (e.key === 'Escape') {
                toggleRotation();
            }
        };

        window.addEventListener('keydown', handleToggleShortcut);
        return () => window.removeEventListener('keydown', handleToggleShortcut);
    }, [isInverted, isDesktop]);

    return null;
};

export default KonamiCode; 