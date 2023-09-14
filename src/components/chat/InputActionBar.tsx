import Weaver from "main";
import React from "react";
import { SelectedText } from "./SelectedText";

interface InputActionBarProps {
	plugin: Weaver
}

export const InputActionBar: React.FC<InputActionBarProps> = ({plugin}) => {
	return(
		<SelectedText plugin={plugin} />
	)
}
