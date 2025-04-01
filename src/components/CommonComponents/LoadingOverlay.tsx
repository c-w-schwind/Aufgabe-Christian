import './LoadingOverlay.css';
import {createPortal} from "react-dom";
import React, {useEffect, useRef, useState} from "react";


interface LoadingOverlayProps {
    isVisible: boolean;
    message?: string;
}


const LoadingOverlay: React.FC<LoadingOverlayProps> = ({isVisible, message}) => {
    const [visible, setVisible] = useState<boolean>(false);
    const [shouldRender, setShouldRender] = useState<boolean>(false);
    const overlayRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        let timeoutId: number;
        if (isVisible) {
            setShouldRender(true);
            // Use setTimeout to activate overlay smoothly after UI updates, preventing rendering glitches
            setTimeout(() => {
                setVisible(true)
                overlayRef.current?.focus(); // Trap focus on overlay
            }, 100);
        } else {
            setVisible(false);
            timeoutId = window.setTimeout(() => setShouldRender(false), 100); // Matching .loading-overlay CSS fade-out transition time
        }
        return () => clearTimeout(timeoutId);
    }, [isVisible]);


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isVisible) {
                e.stopPropagation();
            }
        };

        if (isVisible) {
            document.addEventListener('keydown', handleKeyDown, true);
        }

        return () => document.removeEventListener('keydown', handleKeyDown, true);
    }, [isVisible]);


    if (!shouldRender) return null;

    return createPortal(
        <div ref={overlayRef} tabIndex={-1} className={`loading-overlay ${visible ? 'visible' : ''}`}>
            <div className="loading-content">
                <div className="spinner"></div>
                {message && <div className="loading-message">{message}</div>}
            </div>
        </div>,
        document.body
    );
};

export default LoadingOverlay;