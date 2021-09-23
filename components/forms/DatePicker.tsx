import React from "react";
import { Datepicker, Icon, useTheme } from "@ui-kitten/components";
import { useField, useFormikContext } from "formik";

interface CalendarProps {
  name: string;
  label: string;
}

export const Calendar = ({ name, label }: CalendarProps) => {
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [field, meta] = useField(name);
  const theme = useTheme();

  const CalendarIcon = (props: any) => (
    <Icon
      name="calendar-outlined"
      size={24}
      color={theme["color-primary-default"]}
    />
  );

  const handleSelect = (nextDate: any) => {
    setFieldValue(name, nextDate);
    setFieldTouched(name, true);
  };

  return (
    <Datepicker
      date={new Date(field.value)}
      onSelect={handleSelect}
      label={label}
      placeholder="Pick Date"
      accessoryRight={CalendarIcon}
    />
  );
};
