import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Typography } from "../../../../common";
import { citySchema, nameSchema } from "../../../../utils/constants/validation";
import { useUpdateDocumentMutation } from "../../../../utils/firebase";
import { useGetAuthStateQuery } from "../../../../entities/auth/api/authApi";

export type SettingChangeModalContentType = {
	type: keyof Pick<User, "city" | "displayName" | "phoneNumber">;
	value: string;
};

interface SettingChangeModalContentProps extends Pick<ModalProps, "onClose"> {
	setting: SettingChangeModalContentType;
}

const validateSchema = {
	city: citySchema,
	displayName: nameSchema,
	phoneNumber: nameSchema,
};

export const SettingChangeModalContent: React.FC<SettingChangeModalContentProps> = ({
	setting,
	onClose,
}) => {
	const { data: user } = useGetAuthStateQuery();
	const updateDocumentMutation = useUpdateDocumentMutation({
		options: {
			onSuccess: () => {
				onClose();
			},
		},
	});

	const { register, handleSubmit, formState } = useForm({
		defaultValues: { [setting.type]: setting.value },
		mode: "onBlur",
	});

	const { isSubmitting, errors } = formState;
	const loading = isSubmitting || updateDocumentMutation.isPending;

	return (
		<form
			className="mb-2 flex flex-col gap-4"
			onSubmit={handleSubmit(async (values) => {
				if (!user?.uid) {
					console.error("User is not authorized");
					return;
				}
				updateDocumentMutation.mutate({
					collection: "users",
					data: { [setting.type]: values[setting.type] },
					id: user.uid,
				});
			})}
		>
			<Typography variant="sub-title">Change your data</Typography>
			<Input
				{...register(setting.type, validateSchema[setting.type])}
				disabled={loading}
				error={errors[setting.type]?.message}
			/>
			<Button variant="outlined" type="submit" loading={loading}>
				CHANGE
			</Button>

			<Button onClick={onClose} disabled={loading}>
				CANCEL
			</Button>
		</form>
	);
};
