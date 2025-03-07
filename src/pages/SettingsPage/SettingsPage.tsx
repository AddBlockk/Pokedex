// import React from "react";
// import { IconButton, Spinner } from "../../common/index";
// import { PenIcon } from "../../common/icons";
// // import type { SettingModalItem } from "../../common/modals";
// import { useAuthState } from "../../utils/firebase";

// import { Setting } from "./Setting/Setting";
// import { UploadPhotoModal } from "../../common/modals/UploadPhotoModal/UploadPhotoModal";
// import { SettingChangeModal } from "../../common/modals/SettingChangeModal/SettingChangeModal";

// export const SettingsPage = () => {
// 	const [isShowUploadPhotoModal, setIsShowUploadPhotoModal] = React.useState(false);
// 	const [selectedSetting, setSelectedSetting] = React.useState<any | null>(null);

// 	const authState = useAuthState();

// 	if (!authState.data) return <Spinner />;
// 	const user = authState.data;

// 	const photoURL = user.photoURL!;

// 	return (
// 		<div className="mt-2 flex flex-col items-center justify-center gap-5 text-slate-800 dark:text-white">
// 			<div className="relative flex items-center justify-center">
// 				<img
// 					className="h-56 w-56 rounded-xl object-contain md:h-72 md:w-72"
// 					aria-hidden
// 					src={photoURL}
// 					alt="photoURL"
// 				/>
// 				<div className="absolute bottom-0 m-auto">
// 					<IconButton
// 						icon={<PenIcon />}
// 						onClick={() => setIsShowUploadPhotoModal(!isShowUploadPhotoModal)}
// 					/>
// 				</div>
// 			</div>
// 			<div className="card">
// 				<ul className="flex flex-col gap-5">
// 					<li>
// 						<Setting label="User id" value={user.uid} />
// 					</li>
// 					{user.email && (
// 						<li>
// 							<Setting label="Email" value={user.email} />
// 						</li>
// 					)}
// 					{user.displayName && (
// 						<li>
// 							<Setting
// 								label="Your name"
// 								value={user.displayName}
// 								onClick={() => setSelectedSetting({ type: "displayName", value: user.displayName })}
// 							/>
// 						</li>
// 					)}
// 					<li>
// 						<Setting
// 							label="City"
// 							value={user.city ?? "no data"}
// 							onClick={() => setSelectedSetting({ type: "city", value: user.city ?? "" })}
// 						/>
// 					</li>
// 				</ul>
// 			</div>
// 			<UploadPhotoModal
// 				uid={user.uid}
// 				isShowing={isShowUploadPhotoModal}
// 				onClose={() => setIsShowUploadPhotoModal(false)}
// 			/>
// 			<SettingChangeModal setting={selectedSetting} onClose={() => setSelectedSetting(null)} />
// 		</div>
// 	);
// };
