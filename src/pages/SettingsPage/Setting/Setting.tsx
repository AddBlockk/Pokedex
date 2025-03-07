import React from "react";

import { Typography } from "../../../common";
import { IconButton } from "../../../common/buttons/IconButton/IconButton";
import { ArrowRigthIcon } from "../../../common/icons";

interface SettingProps {
	label: string;
	value: string;
	onClick?: () => void;
}

export const Setting: React.FC<SettingProps> = ({ label, value, onClick }) => (
	<div className="flex justify-between">
		<div>
			<Typography variant="sub-body">{label}</Typography>
			<Typography variant="title-body">{value}</Typography>
		</div>
		{onClick && <IconButton variant="icon" icon={<ArrowRigthIcon />} onClick={onClick} />}
	</div>
);
