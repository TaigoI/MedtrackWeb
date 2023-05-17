import { FC } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { TextFieldProps } from "@mui/material";
import { CssTextField } from "./styles";

type FormInputProps = {
  name: string;
} & TextFieldProps;

export const FormInput: FC<FormInputProps> = ({ name, ...otherProps }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue=""
      render={({ field }) => (
        <CssTextField
          {...field}
          {...otherProps}
          variant="outlined"
          sx={{ mb: "1.5rem", ...(otherProps.sx || {}) }}
          error={!!errors[name]}
          helperText={
            errors[name] ? (errors[name]?.message as unknown as string) : ""
          }
        />
      )}
    />
  );
};
