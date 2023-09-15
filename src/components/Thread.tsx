import Weaver from "main";
import React from "react";

import { TabId } from "types/GeneralTypes";

interface ThreadProps {
	plugin: Weaver,
	handleTabSwitcher: (tabId: TabId) => void
}

export const Thread: React.FC<ThreadProps> = ({plugin}) => {
	return(
		<></>
	)
}
