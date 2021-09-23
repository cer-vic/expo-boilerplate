import React from "react";
import { useField, useFormikContext } from "formik";
import { View } from "react-native";
import { Toggle, Text } from "@ui-kitten/components";

interface SwitchProps {
  name: string;
  label: string;
}

export const Switch = ({ name, label }: SwitchProps) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const handleChange = React.useCallback(
    (isChecked: boolean) => {
      setFieldValue(name, isChecked);
      setFieldTouched(name, true);
    },
    [name]
  );

  return (
    <View>
      <Toggle checked={field.value} onChange={handleChange}>
        {label}
      </Toggle>
      {meta.touched && meta.error && (
        <Text status="danger">{String(meta.error)}</Text>
      )}
    </View>
  );
};
