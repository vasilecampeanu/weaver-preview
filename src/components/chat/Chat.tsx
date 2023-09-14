import React from 'react';
import Weaver from 'main';
import { ChatInput } from './ChatInput';

interface ChatProps {
	plugin: Weaver;
}

export const Chat: React.FC<ChatProps> = ({ plugin }) => {
	return (
		<div className="ow-chat-wrapper">
			<div className="ow-chat-header"></div>
			<div className="ow-chat-dialogue"></div>
			<ChatInput plugin={plugin} />
		</div>
	);
}
