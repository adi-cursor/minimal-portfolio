import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

const SecretsContext = createContext();

export const SecretsProvider = ({ children }) => {
    const [foundSecrets, setFoundSecrets] = useState({
        persona: false,
        konami: false,
        footer: false
    });

    // Check if device is desktop
    const isDesktop = window.innerWidth >= 1024;
    const totalSecrets = isDesktop ? 3 : 2;

    const triggerConfetti = () => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);
    };

    const unlockSecret = (secretType) => {
        if (!isDesktop && secretType === 'konami') return;

        if (!foundSecrets[secretType]) {
            setFoundSecrets(prev => ({
                ...prev,
                [secretType]: true
            }));
            
            const foundCount = Object.entries(foundSecrets)
                .filter(([key, value]) => isDesktop || (key !== 'konami'))
                .filter(([_, value]) => value)
                .length + 1;

            const messages = {
                persona: "Yohohohoho, you have a good observation haki!",
                konami: isDesktop ? "Bankai!, Sakasama No Seikai" : "",
                footer: "Is this a hint ??, Boa Hancock!"
            };

            if (messages[secretType]) {
                toast(`${messages[secretType]} (${foundCount} of ${totalSecrets} secrets found)`, {
                    duration: 4000,
                });
            }

            if (foundCount === totalSecrets) {
                setTimeout(() => {
                    toast("The One piece is reallll, you found it", {
                        duration: 6000,
                    });
                    triggerConfetti();
                }, 1000);
            }
        }
    };

    return (
        <SecretsContext.Provider value={{ foundSecrets, unlockSecret }}>
            {children}
        </SecretsContext.Provider>
    );
};

export const useSecrets = () => {
    const context = useContext(SecretsContext);
    if (!context) {
        throw new Error('useSecrets must be used within a SecretsProvider');
    }
    return context;
}; 