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
					<div className="ow-textarea-inner-wrapper">
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
						<div className="ow-user-actions">
							<button
								className="ow-add-note-as-context-btn"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-plus"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="12" x2="12" y1="18" y2="12"/><line x1="9" x2="15" y1="15" y2="15"/></svg>
							</button>
							<button
								className="ow-submit"
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
							</button>
						</div>
					</div>
                    {showCount && (
						<div className="ow-chracters-count">
							<div className="ow-count">
								0/2000
							</div>
							<div className="ow-pin-input-btn">
								<button
									className="ow-pin-input-btn"
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pin"><line x1="12" x2="12" y1="17" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/></svg>
								</button>
							</div>
						</div>
					)}
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
            {leftDivWidth !== null && <ExpandableInput leftDivWidth={leftDivWidth} heightControls={heightControls} />}
        </motion.div>
    );
};
