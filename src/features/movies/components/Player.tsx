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
            artRef.current = new Artplayer({
                ...option,
                container: wrapperRef.current,
            });
        }

        return () => {
            if (artRef.current) {
                artRef.current.destroy(false);
                artRef.current = null;
            }
        };
    }, [option]);

    useEffect(() => {
        if (artRef.current) {
            Object.assign(artRef.current.option, option);
        }
    }, [option]);

    return <div ref={wrapperRef} style={style} className={className} />;
};

export default Player;
