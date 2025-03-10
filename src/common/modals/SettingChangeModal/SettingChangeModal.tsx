import React, { useState } from "react";
import { Modal } from "../Modal";
import { Button } from "../../buttons/Button/Button";

interface SettingChangeModalProps {
	setting: { type: string; value: string } | null;
	onChange: (newValue: string) => void;
	onClose: () => void;
	isShowing: boolean;
}

export const SettingChangeModal: React.FC<SettingChangeModalProps> = ({
	setting,
	onChange,
	onClose,
	isShowing,
}) => {
	const [newValue, setNewValue] = useState(setting?.value || "");

	const handleSave = () => {
		if (newValue.trim()) {
			onChange(newValue.trim());
			onClose();
		}
	};

	if (!setting) return null;

	return (
		<Modal isShowing={isShowing} onClose={onClose}>
			<div className="mt-[10px] flex flex-col gap-[10px]">
				<h2>Change {setting.type}</h2>
				<input
					type="text"
					value={newValue}
					onChange={(e) => setNewValue(e.target.value)}
					placeholder={`Enter new ${setting.type}`}
					className="input"
				/>
			</div>
			<div className="my-[10px] flex items-center justify-end gap-[10px]">
				<Button onClick={handleSave}>Save</Button>
				<Button onClick={onClose}>Cancel</Button>
			</div>
		</Modal>
	);
};
