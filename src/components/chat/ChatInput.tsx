import React from "react"
import Weaver from 'main';
import { InputWrapper } from './InputWrapper';
import { InputActionBar } from "./InputActionBar";

interface ChatInputProps {
	plugin: Weaver
}

export const ChatInput: React.FC<ChatInputProps> = ({ plugin }) => {
	return (
		<div className="ow-chat-input">
			<InputActionBar plugin={plugin}/>
			<InputWrapper plugin={plugin} />
		</div>
	)
}
