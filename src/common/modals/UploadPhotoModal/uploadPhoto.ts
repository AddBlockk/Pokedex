import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Функция для загрузки фотографии
export const uploadPhoto = async (file: File, userId: string) => {
	// Составляем безопасное имя файла
	const fileName = `${userId}-${Date.now()}-${file.name.replace(/\s+/g, "_")}`; // Заменяем пробелы на подчеркивания

	const storage = getStorage();
	const storageRef = ref(storage, `avatars/${fileName}`);

	// Создаем задачу для загрузки
	const uploadTask = uploadBytesResumable(storageRef, file);

	// Ожидаем завершения загрузки
	return new Promise<string>((resolve, reject) => {
		uploadTask.on(
			"state_changed",
			null,
			(error) => {
				console.error("Ошибка при загрузке фото:", error);
				reject(error);
			},
			() => {
				// После успешной загрузки получаем URL
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					resolve(downloadURL); // Возвращаем URL изображения
				});
			},
		);
	});
};
