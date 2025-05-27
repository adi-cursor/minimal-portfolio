import { useSecrets } from '../context/SecretsContext';

const Footer = () => {
    const { unlockSecret } = useSecrets();

    return (
        <footer className="w-full py-4 text-center text-white/60 text-sm">
            <div className="container mx-auto px-4">
                <p>© 2024 Aditya Joshi. All rights reserved.</p>
                <p className="mt-1">
                    Made with 
                    <span 
                        className="mx-1 cursor-pointer hover:text-white transition-colors"
                        onClick={() => unlockSecret('footer')}
                        title="Click me if you dare..."
                    >
                        ❤️
                    </span>
                    by Aditya
                </p>
                {/* Hidden secret message that appears when all secrets are found */}
                <p className="mt-2 text-xs opacity-0 hover:opacity-100 transition-opacity duration-300">
                    You found me! 🎉
                </p>
            </div>
        </footer>
    );
};

export default Footer; 