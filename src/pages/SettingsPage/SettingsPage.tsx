import React, { useState } from "react";
import { useAuthState, useUpdateDocumentMutation } from "../../utils/firebase";
import { SettingChangeModal } from "../../common/modals/SettingChangeModal/SettingChangeModal";
import { UploadPhotoModal } from "../../common/modals/UploadPhotoModal/UploadPhotoModal";
import { Button } from "../../common/buttons/Button/Button";
import { Setting } from "./Setting/Setting";
import { Spinner } from "../../common";

export const SettingsPage = () => {
	const [isShowNameModal, setIsShowNameModal] = useState(false);
	const [isShowCityModal, setIsShowCityModal] = useState(false);
	const [isShowUploadPhotoModal, setIsShowUploadPhotoModal] = useState(false);
	const [selectedSetting, setSelectedSetting] = useState<{ type: string; value: string } | null>(
		null,
	);

	const authState = useAuthState();
	const updateDocumentMutation = useUpdateDocumentMutation();

	if (!authState.data) return <Spinner />;
	const user = authState.data;

	const handleSettingChange = async (newValue: string) => {
		if (selectedSetting?.type === "displayName") {
			await updateDocumentMutation.mutateAsync({
				collection: "users",
				data: { displayName: newValue },
				id: user.uid,
			});
		} else if (selectedSetting?.type === "city") {
			await updateDocumentMutation.mutateAsync({
				collection: "users",
				data: { city: newValue },
				id: user.uid,
			});
		}
	};

	const openNameModal = () => {
		setSelectedSetting({ type: "displayName", value: user.displayName || "" });
		setIsShowNameModal(true);
	};

	const openCityModal = () => {
		setSelectedSetting({ type: "city", value: user.city || "" });
		setIsShowCityModal(true);
	};

	return (
		<div className="mt-2 flex flex-col items-center justify-center gap-5 text-slate-800 dark:text-white">
			{/* Отображаем текущие данные */}
			<div className="relative flex items-center justify-center">
				<img
					className="h-56 w-56 rounded-xl object-cover md:h-72 md:w-72"
					aria-hidden
					src={user.photoURL || ""}
					alt="profile photo"
				/>
				<button
					className="absolute right-2 bottom-2 rounded-full bg-gray-700 p-2 text-white hover:bg-gray-600"
					onClick={() => setIsShowUploadPhotoModal(true)}
				>
					✎
				</button>
			</div>

			<div className="card">
				<ul className="flex flex-col gap-5">
					<li>
						<Setting label="User id" value={user.uid} />
					</li>
					{user.email && (
						<li>
							<Setting label="Email" value={user.email} />
						</li>
					)}
					{user.displayName && (
						<li>
							<Setting label="Your name" value={user.displayName} onClick={openNameModal} />
						</li>
					)}
					<li>
						<Setting label="City" value={user.city ?? "no data"} onClick={openCityModal} />
					</li>
				</ul>
			</div>

			{/* Модальные окна */}
			<SettingChangeModal
				setting={selectedSetting}
				onChange={handleSettingChange}
				onClose={() => setIsShowNameModal(false)}
				isShowing={isShowNameModal}
			/>

			<SettingChangeModal
				setting={selectedSetting}
				onChange={handleSettingChange}
				onClose={() => setIsShowCityModal(false)}
				isShowing={isShowCityModal}
			/>

			<UploadPhotoModal
				// onPhotoUploaded={(photoURL: string) => {}}
				onPhotoUploaded={(newPhotoURL) => {
					// Обновляем фото в локальном состоянии или заново запрашиваем данные
					user.photoURL = newPhotoURL;
				}}
				uid={user.uid}
				isShowing={isShowUploadPhotoModal}
				onClose={() => setIsShowUploadPhotoModal(false)}
			/>
		</div>
	);
};
