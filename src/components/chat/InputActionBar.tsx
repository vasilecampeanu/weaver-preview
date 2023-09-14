import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SelectedText } from "./SelectedText";
import Weaver from "main";

interface InputActionBarProps {
	plugin: Weaver;
	selectedText: string;
}

export const InputActionBar: React.FC<InputActionBarProps> = ({ plugin, selectedText }) => {
	const variants = {
		hidden: { y: 100, opacity: 0 },
		visible: { y: 0, opacity: 1 },
	};
	
	return (
		<div className="ow-input-action-bar">
				{selectedText && (
					<motion.div
						initial="hidden"
						animate="visible"
						variants={variants}
						transition={{ 
							type: "spring", 
							stiffness: 120,
							duration: 0.3
						}}
					>
						<SelectedText plugin={plugin} selectedText={selectedText} />
					</motion.div>
				)}
		</div>
	);
	
};
