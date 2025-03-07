// // utils/uploadPhoto.ts
// import { supabase } from "./supabaseClient";

// // Функция для загрузки фотографии
// export const uploadPhoto = async (file: File, userId: string) => {
//     const fileName = `${userId}-${Date.now()}-${file.name}`;

//     // Загружаем файл в Supabase
//     const { data, error } = await supabase.storage
//         .from("avatars")
//         .upload(fileName, file, { cacheControl: "3600", upsert: true }); // Используем upsert: true

//     if (error) {
//         console.error("Ошибка при загрузке фото:", error.message);
//         throw new Error(error.message);
//     }

//     // Получаем публичный URL
//     const { data: publicUrlData } = supabase.storage
//         .from("avatars")
//         .getPublicUrl(fileName);

//     return publicUrlData.publicUrl;
// };