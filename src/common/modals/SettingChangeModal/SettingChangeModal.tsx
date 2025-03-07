// import React from "react";

// import { Modal } from "../Modal";
// import type { SettingChangeModalContentType } from "../SettingChangeModal/SettingChangeModalContent/SettingChangeModalContent";
// import { SettingChangeModalContent } from "../SettingChangeModal/SettingChangeModalContent/SettingChangeModalContent";

// interface SettingChangeModalProps extends Pick<ModalProps, "onClose"> {
// 	setting: SettingChangeModalContent | null;
// }

// export const SettingChangeModal: React.FC<SettingChangeModalProps> = ({
// 	onClose,
// 	setting,
// 	...props
// }) => (
// 	<Modal {...props} isShowing={!!setting?.type} onClose={onClose}>
// 		{setting && <SettingChangeModalContent setting={setting} onClose={onClose} />}
// 	</Modal>
// );
