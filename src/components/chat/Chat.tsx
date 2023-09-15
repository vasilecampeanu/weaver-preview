import React from 'react';
import Weaver from 'main';
import { ChatInput } from './ChatInput';
import { TabId } from 'types/GeneralTypes';

interface ChatProps {
	plugin: Weaver,
	handleTabSwitcher: (tabId: TabId) => void
}

export const Chat: React.FC<ChatProps> = ({ plugin, handleTabSwitcher }) => {
	return (
		<div className="ow-chat-wrapper">
			<div className="ow-chat-header"></div>
			<div className="ow-chat-dialogue"></div>
			<ChatInput plugin={plugin} />
		</div>
	);
}
