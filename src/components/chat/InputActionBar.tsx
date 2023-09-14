import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SelectedText } from "./SelectedText";
import Weaver from "main";
import { InteractiveQuestions } from "./InteractiveQuestions";
import { TextSelectedData } from "interfaces/TextSelectedData";

interface InputActionBarProps {
	plugin: Weaver;
	textSelectedData: TextSelectedData | undefined;
}

export const InputActionBar: React.FC<InputActionBarProps> = ({ plugin, textSelectedData }) => {
	const variants = {
		hidden: { y: 100, opacity: 0 },
		visible: { y: 0, opacity: 1 },
	};

	return (
		<div className="ow-input-action-bar">
			{textSelectedData?.text !== undefined ?  (
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
					<SelectedText plugin={plugin} textSelectedData={textSelectedData} />
				</motion.div>
			) : (
				<InteractiveQuestions plugin={plugin} />
			)}
		</div>
	);
	
};
