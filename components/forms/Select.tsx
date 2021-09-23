import React from "react";
import { IndexPath, Select, SelectItem } from "@ui-kitten/components";
import { useField, useFormikContext } from "formik";

export type SelectItemProps = {
  id: number;
  name: string;
};

interface SelectProps {
  data: SelectItemProps[];
  name: string;
  label: string;
}

export const DropdownSelect = ({ data, name, label }: SelectProps) => {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [displayValue, setDisplayValue] = React.useState(" ");
  const { setFieldValue, setFieldTouched } = useFormikContext();
  const [field, meta] = useField(name);

  React.useEffect(() => {
    if (field.value && data.length > 0) {
      const index = data.map((i) => i.id).indexOf(field.value);
      setDisplayValue(data[index].name);
    }
  }, [field.value, data]);
  // IndexPath | IndexPath[]
  const handleSelect = (index: any) => {
    setSelectedIndex(index);
    setFieldTouched(name, true);
    setFieldValue(name, data[index.row].id);
  };

  return (
    <Select
      selectedIndex={selectedIndex}
      onSelect={handleSelect}
      style={{ width: "100%" }}
      value={displayValue}
      label={label}
      caption={Boolean(meta.error && meta.touched) ? String(meta.error) : ""}
      status={Boolean(meta.error && meta.touched) ? "danger" : "basic"}
    >
      {data.map((item) => (
        <SelectItem title={item.name} key={item.id} />
      ))}
    </Select>
  );
};
