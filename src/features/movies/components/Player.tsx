import React, { useEffect, useRef } from 'react';
import Artplayer from 'artplayer';
import type { Option } from 'artplayer';

interface PlayerProps {
    option: Option;
    style?: React.CSSProperties;
    className?: string;
}

const Player: React.FC<PlayerProps> = ({ option, style, className }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const artRef = useRef<Artplayer | null>(null);

    useEffect(() => {
        if (wrapperRef.current) {
            // Add CSS to override ArtPlayer's inline styles
            const styleId = 'artplayer-override-styles';
            let styleElement = document.getElementById(styleId) as HTMLStyleElement;

            if (!styleElement) {
                styleElement = document.createElement('style');
                styleElement.id = styleId;
                styleElement.textContent = `
                    .artplayer, .artplayer *, .artplayer-container {
                        width: 100% !important;
                        height: 100% !important;
                    }
                    .artplayer {
                        --art-theme: #3b82f6 !important;
                    }
                    .artplayer .artplayer-video {
                        width: 100% !important;
                        height: 100% !important;
                        object-fit: contain;
                    }
                    .artplayer-container {
                        width: 100% !important;
                        height: 100% !important;
                    }
                `;
                document.head.appendChild(styleElement);
            }

            artRef.current = new Artplayer({
                ...option,
                container: wrapperRef.current,
            });

            // // Set up a MutationObserver to watch for style changes and override them
            // const observer = new MutationObserver((mutations) => {
            //     mutations.forEach((mutation) => {
            //         if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            //             const target = mutation.target as HTMLElement;
            //             if (target.classList.contains('artplayer') ||
            //                 target.classList.contains('artplayer-container') ||
            //                 target.classList.contains('artplayer-video')) {
            //                 // Override the width and height if they're changed
            //                 if (target.style.width && !target.style.width.includes('100%')) {
            //                     target.style.width = '100%';
            //                 }
            //                 if (target.style.height && !target.style.height.includes('100%')) {
            //                     target.style.height = '100%';
            //                 }
            //             }
            //         }
            //     });
            // });

            // Start observing the wrapper for style changes
            // observer.observe(wrapperRef.current, {
            //     attributes: true,
            //     subtree: true,
            //     attributeFilter: ['style']
            // });

            // Clean up the observer when component unmounts
            return () => {
                // observer.disconnect();
                if (artRef.current) {
                    artRef.current.destroy(false);
                    artRef.current = null;
                }
            };
        }

        return () => {
            if (artRef.current) {
                artRef.current.destroy(false);
                artRef.current = null;
            }
        };
    }, [option]);

    return <div ref={wrapperRef} style={style} className={className} />;
};

export default Player;
