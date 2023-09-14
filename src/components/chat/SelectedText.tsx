import Weaver from "main";
import React from "react";
import { eventEmitter } from "utils/EventEmitter";

interface SelectedTextProps {
	plugin: Weaver,
	selectedText: string
}

export const SelectedText: React.FC<SelectedTextProps> = ({ plugin, selectedText }) => {
	return (
		<div className="ow-selected-text">
			<div className="ow-title">
				<span>Send to chat?</span>
				<div className="ow-selected-text-info">
					<span className="ow-selected-text-char-count">{selectedText.length}/2000</span>
					<span className="ow-token-count">0</span>
				</div>
			</div>
			<div className="ow-selected-text-content">
				{selectedText}
			</div>
			<div className="ow-user-actions">
				<button
					className="ow-send-to-caht-btn"
					onClick={() => { eventEmitter.emit('textSelected', ""); }}
				>
					Send
				</button>
				<button
					className="ow-ignore-btn"
					onClick={() => { eventEmitter.emit('textSelected', ""); }}
				>
					Ignore
				</button>
			</div>
		</div>
	)
}
