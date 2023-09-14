import React, { useEffect, useState } from "react"
import Weaver from 'main';
import { InputWrapper } from './InputWrapper';
import { InputActionBar } from "./InputActionBar";
import { eventEmitter } from "utils/EventEmitter";

interface ChatInputProps {
	plugin: Weaver
}

export const ChatInput: React.FC<ChatInputProps> = ({ plugin }) => {
	const [selectedText, setSelectedText] = useState("");
	
	useEffect(() => {
		const handleTextSelected = (text: string) => {
			setSelectedText(text);
		};

		eventEmitter.on("textSelected", handleTextSelected);

		return () => { 
			eventEmitter.off("textSelected", handleTextSelected); 
		};
	}, []);

	return (
		<div className="ow-chat-input">
			<InputActionBar plugin={plugin} selectedText={selectedText}/>
			<InputWrapper plugin={plugin} />
		</div>
	)
}
