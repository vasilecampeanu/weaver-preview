import React, { useEffect, useState } from "react"
import Weaver from 'main';
import { InputWrapper } from './InputWrapper';
import { InputActionBar } from "./InputActionBar";
import { eventEmitter } from "utils/EventEmitter";
import { TextSelectedData } from "interfaces/TextSelectedData";

interface ChatInputProps {
	plugin: Weaver
}

export const ChatInput: React.FC<ChatInputProps> = ({ plugin }) => {
	const [textSelectedData, setTextSelectedData] = useState<TextSelectedData>();

	useEffect(() => {
		const handleTextSelected = (data: TextSelectedData) => {
			setTextSelectedData(data);
		};

		eventEmitter.on("textSelected", handleTextSelected);

		return () => {
			eventEmitter.off("textSelected", handleTextSelected);
		};
	}, []);

	return (
		<div className="ow-chat-input">
			<InputActionBar plugin={plugin} textSelectedData={textSelectedData} />
			<InputWrapper plugin={plugin} />
		</div>
	);
}
