import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Weaver from 'main';

interface ChatProps {
	plugin: Weaver;
}

export const Chat: React.FC<ChatProps> = ({ plugin }) => {
    return (
        <div className="ow-chat-wrapper">
            <div className="ow-chat-header"></div>
            <div className="ow-chat-dialogue"></div>
            <div className="ow-chat-input">
                <InputWrapper />
            </div>
        </div>
    );
}

interface ExpandableInputProps {
    leftDivWidth: number;
    heightControls: any;
}

const ExpandableInput: React.FC<ExpandableInputProps> = ({ leftDivWidth, heightControls }) => {
    const borderRadiusControls = useAnimation();

    return (
        <motion.div
            initial={{ width: `calc(100% - 10px - ${leftDivWidth}px)`, borderRadius: '20px' }}
            animate={borderRadiusControls}
            whileHover={{ width: '100%' }}
            onHoverStart={() => {
                borderRadiusControls.start({ borderRadius: '10px' });
                heightControls.start({ height: '100px' });
            }}
            onHoverEnd={() => {
                borderRadiusControls.start({ borderRadius: '20px' });
                heightControls.start({ height: 'auto' });
            }}
            transition={{ duration: 0.3 }}
            className="ow-expandable-input"
        >
            <div className="ow-expandable-input-inner-wrapper">
                <textarea placeholder="Ask me anything..." />
            </div>
        </motion.div>
    );
};

export const InputWrapper: React.FC = () => {
    const [leftDivWidth, setLeftDivWidth] = useState<number | null>(null);
    const leftDivRef = useRef<HTMLDivElement | null>(null);

    const heightControls = useAnimation();

    useEffect(() => {
        if (leftDivRef.current) {
            const timeoutId = setTimeout(() => {
                setLeftDivWidth(leftDivRef.current!.offsetWidth);
            }, 100);
    
            return () => clearTimeout(timeoutId);
        }
    }, [leftDivRef.current]);

    return (
        <motion.div
            initial={{ height: 'auto' }}
            animate={heightControls}
            transition={{ duration: 0.3 }}
            className="ow-input-wrapper"
        >
            <div ref={leftDivRef} className="ow-input-left">Left Content</div>
            {leftDivWidth !== null && <ExpandableInput leftDivWidth={leftDivWidth} heightControls={heightControls} />} {/* Pass the height controls as a prop */}
        </motion.div>
    );
};
