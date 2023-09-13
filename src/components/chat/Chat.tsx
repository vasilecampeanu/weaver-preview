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
    const [showCount, setShowCount] = useState(false);
	
    const borderRadiusControls = useAnimation();
    
	const isHovering = useRef(false);
	const isFocused = useRef(false);

    return (
        <motion.div
            initial={{ width: `calc(100% - 10px - ${leftDivWidth}px)`, borderRadius: '20px' }}
            animate={borderRadiusControls}
            whileHover={{ width: '100%' }}
            onHoverStart={() => {
                isHovering.current = true;
                borderRadiusControls.start({ borderRadius: '10px' });
                heightControls.start({ height: '100px' });
            }}
            onHoverEnd={() => {
                isHovering.current = false;
                if (!isFocused.current) {
                    borderRadiusControls.start({ borderRadius: '20px' });
                    heightControls.start({ height: 'auto' });
                    setShowCount(false);
                }
            }}
            onAnimationComplete={() => {
                if (isHovering.current) {
                    setShowCount(true);
                }
            }}
            transition={{ duration: 0.3 }}
            className="ow-expandable-input"
        >
            <div className="ow-expandable-input-inner-wrapper">
                <div className="ow-textarea-wrapper">
                    <textarea 
                        placeholder="Ask me anything..."
                        onFocus={() => isFocused.current = true}
                        onBlur={() => {
                            isFocused.current = false;
                            if (!isHovering.current) {
                                borderRadiusControls.start({ borderRadius: '20px' });
                                heightControls.start({ height: 'auto' });
                                setShowCount(false);
                            }
                        }}
                    />
                    {showCount && <div className="ow-chracters-count">0/2000</div>}
                </div>
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
