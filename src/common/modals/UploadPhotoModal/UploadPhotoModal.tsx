import React from "react";
import { Button } from "../../../common";
import { Modal } from "../Modal";
import { uploadPhoto } from "./uploadPhoto"; // Используем Firebase для загрузки фото
import { useUpdateDocumentMutation } from "../../../utils/firebase/hooks/index"; // Хук для обновления данных

interface UploadPhotoModalProps extends Omit<ModalProps, "children" | "loading"> {
	uid: string; // Идентификатор пользователя
	onPhotoUploaded: (photoURL: string) => void; // Коллбек для обновления фотографии в родительском компоненте
}

export const UploadPhotoModal: React.FC<UploadPhotoModalProps> = ({
	onClose,
	uid,
	onPhotoUploaded,
	...props
}) => {
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);
	const fileInputRef = React.useRef<HTMLInputElement>(null);
	const updateDocumentMutation = useUpdateDocumentMutation();

	const handleUpload = async (file: File) => {
		setLoading(true);
		setError(null); // Сброс ошибки перед новой загрузкой
		try {
			// Загружаем фото в Firebase Storage
			const photoURL = await uploadPhoto(file, uid);

			// Обновляем URL фото в Firebase Firestore
			await updateDocumentMutation.mutateAsync({
				collection: "users",
				data: { photoURL },
				id: uid,
			});

			// Передаем новый URL в родительский компонент
			onPhotoUploaded(photoURL);
		} catch (err) {
			setError("Ошибка при загрузке фото. Попробуйте снова.");
			console.error("Ошибка при загрузке фото:", err);
		} finally {
			setLoading(false);
			onClose();
		}
	};

	const onFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) {
			setError("Файл не выбран");
			return;
		}

		// Проверяем, что это изображение
		if (!file.type.startsWith("image/")) {
			setError("Выбранный файл не является изображением");
			return;
		}

		// Загружаем фото
		handleUpload(file);
	};

	return (
		<Modal {...props} onClose={onClose}>
			<div className="my-[10px] flex flex-col gap-[10px]">
				<label htmlFor="upload-button">
					<input
						type="file"
						id="upload-button"
						style={{ display: "none" }}
						ref={fileInputRef}
						onChange={onFileInputChange}
						accept="image/*"
					/>
					<Button variant="text" onClick={() => !loading && fileInputRef.current?.click()}>
						{!loading ? "Upload your photo" : "Uploading..."}
					</Button>
				</label>

				{/* Ошибка загрузки */}
				{error && <div className="mt-2 text-red-500">{error}</div>}

				<Button onClick={onClose} loading={loading}>
					CANCEL
				</Button>
			</div>
		</Modal>
	);
};
