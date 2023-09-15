import Weaver from "main";
import React from "react";

import { TabId } from "types/GeneralTypes";

interface ThreadHeaderProps {
	plugin: Weaver,
	handleTabSwitcher: (tabId: TabId) => void
}

export const ThreadHeader: React.FC<ThreadHeaderProps> = ({ plugin, handleTabSwitcher }) => {
	return(
		<div className="ow-thread-header">
			<div className="ow-title">
				THREAD-VIEW
			</div>
			<div className="ow-actions">
				<button
					onClick={() => {handleTabSwitcher('CHAT')}}
				>
					NEW CHAT
				</button>
			</div>
		</div>
	)
}
