import Weaver from "main";
import React from "react";

interface SelectedTextProps {
	plugin: Weaver
}

export const SelectedText: React.FC<SelectedTextProps> = ({plugin}) => {
	return(
		<div className="ow-selected-text">
			Hello World
		</div>
	)
}
