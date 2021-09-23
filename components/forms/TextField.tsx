import { Input } from "@ui-kitten/components";
import { useField, useFormikContext } from "formik";
import React from "react";

interface TextFieldProps {
  name: string;
  label: string;
  secure?: boolean;
}

export const TextField = ({
  name,
  label,
  secure = false,
  ...props
}: TextFieldProps) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched, handleBlur } = useFormikContext();

  const handleType = React.useCallback(
    (text) => {
      setFieldValue(name, text);
    },
    [name]
  );

  const handleFocus = () => setFieldTouched(name);

  return (
    <Input
      status={Boolean(meta.error && meta.touched) ? "danger" : "basic"}
      value={String(field.value)}
      label={label}
      caption={Boolean(meta.error && meta.touched) ? String(meta.error) : ""}
      secureTextEntry={secure}
      onBlur={handleBlur(name)}
      onFocus={handleFocus}
      onChangeText={handleType}
      {...props}
    />
  );
};
