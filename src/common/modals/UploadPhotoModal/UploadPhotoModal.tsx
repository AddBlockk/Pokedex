// import React from "react";
// import { Button } from "../../../common";
// import { Modal } from "../Modal";
// import { uploadPhoto } from "../../../utils/supabase/uploadPhoto"; // Подключаем нашу функцию загрузки
// import { uploadUserPhoto } from "../../../features/photo/photoSlice"; // Импортируем экшен
// import { useUpdateDocumentMutation } from "../../../utils/firebase/hooks/index";
// import { useDispatch } from "react-redux";

// interface UploadPhotoModalProps extends Omit<ModalProps, "children" | "loading"> {
//     uid: User["uid"];
// }

// export const UploadPhotoModal: React.FC<UploadPhotoModalProps> = ({ onClose, uid, ...props }) => {
//     const dispatch = useDispatch();
//     const [loading, setLoading] = React.useState(false);
//     const fileInputRef = React.useRef<HTMLInputElement>(null);
//     const updateDocumentMutation = useUpdateDocumentMutation();

//     const handleUpload = async (file: File) => {
//         setLoading(true);
//         try {
//             // Загружаем фото через Redux
//             const photoURL = await dispatch(uploadUserPhoto({ file, userId: uid })).unwrap();

//             // Обновляем URL фото в Firebase
//             await updateDocumentMutation.mutateAsync({
//                 collection: "users",
//                 data: { photoURL },
//                 id: uid,
//             });

//             console.log("Фото успешно загружено и обновлено в Firebase");
//         } catch (error) {
//             console.error("Ошибка при загрузке фото:", error);
//         } finally {
//             setLoading(false);
//             onClose();
//         }
//     };

//     const onFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (!event.target.files || event.target.files.length === 0) {
//             console.error("Файл не выбран");
//             return;
//         }

//         const file = event.target.files[0];
//         if (!file.type.startsWith("image/")) {
//             console.error("Выбранный файл не является изображением");
//             return;
//         }

//         await handleUpload(file);
//     };

//     return (
//         <Modal {...props} onClose={onClose}>
//             <label htmlFor="upload-button">
//                 <input
//                     type="file"
//                     id="upload-button"
//                     style={{ display: "none" }}
//                     ref={fileInputRef}
//                     onChange={onFileInputChange}
//                     accept="image/*"
//                 />
//                 <Button variant="text" onClick={() => !loading && fileInputRef.current?.click()}>
//                     {!loading ? "Upload your photo" : "Uploading..."}
//                 </Button>
//             </label>
//             <Button onClick={onClose} loading={loading}>
//                 CANCEL
//             </Button>
//         </Modal>
//     );
// };