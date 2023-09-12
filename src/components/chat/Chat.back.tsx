import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Weaver from 'main';

interface ChatProps {
	plugin: Weaver;
}

export const Chat: React.FC<ChatProps> = ({ plugin }) => {
	const [leftDivWidth, setLeftDivWidth] = useState<number | null>(null);
	const leftDivRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (leftDivRef.current) {
			setLeftDivWidth(leftDivRef.current.offsetWidth);
		}
	}, [leftDivRef.current]);

	return (
		<div style={chatWrapper}>
			<div className="chat-header">
				asd
			</div>
			<div className="chat-dialogue">
				asdas
			</div>
			<div className='chat-input'>
				<div className="test">
					asds
				</div>
				<motion.div
					initial={{ height: 'auto' }}
					whileHover={{ height: '100px' }}
					transition={{ duration: 0.3 }}
					style={containerStyle}
				>
					<div ref={leftDivRef} style={leftDivStyle}>Left Content</div>
					{leftDivWidth !== null && <MotionDiv leftDivWidth={leftDivWidth} />}
				</motion.div>
			</div>
		</div>
	);
}

interface MotionDivProps {
	leftDivWidth: number;
}

const MotionDiv: React.FC<MotionDivProps> = ({ leftDivWidth }) => {
	return (
		<motion.div
			initial={{ width: `calc(100% - 10px - ${leftDivWidth}px)` }}
			whileHover={{ width: '100%' }}
			transition={{ duration: 0.3 }}
			style={rightDivStyle}
		>
			Right Content
		</motion.div>
	);
};

const chatWrapper = {
	display: 'grid',
	gridTemplateRows: 'auto 1fr auto',
	height: '100%',
}

const containerStyle = {
	display: 'grid',
	gridTemplateColumns: 'auto 1fr',
	width: '100%',
	overflow: 'hidden',
	position: 'relative' as 'relative',
	gap: `10px`,
};

const leftDivStyle = {
	display: 'flex',
	alignItems: 'end',
	justifyContent: 'end',
	justifySelf: 'end',
};

const rightDivStyle = {
	...leftDivStyle,
	background: 'lightcoral',
	position: 'absolute' as 'absolute',
	right: 0,
	top: 0,
	bottom: 0,
	zIndex: 1,
	boxSizing: 'border-box' as 'border-box',
};
