import { forwardRef } from 'react';

const RotationWrapper = forwardRef(({ children }, ref) => {
    return (
        <div ref={ref} className="min-h-screen bg-black">
            {children}
        </div>
    );
});

export default RotationWrapper; 