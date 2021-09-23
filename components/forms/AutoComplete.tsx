import React from "react";
import { useField, useFormikContext } from "formik";
import { Autocomplete, AutocompleteItem } from "@ui-kitten/components";

export type Item = {
  id: number;
  name: string;
};

const filter = (item: Item, query: string) =>
  item.name.toLowerCase().includes(query.toLowerCase());

interface AutoCompleteProps {
  name: string;
  data: Item[];
}

export const AutoComplete = ({ name, data }: AutoCompleteProps) => {
  const [value, setValue] = React.useState<string>("");
  const [filteredData, setFilteredData] = React.useState(data);
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const onSelect = (index: number) => {
    setValue(data[index].name);

    setFieldValue(name, data[index].id);
  };

  const onChangeText = (query: string) => {
    setValue(query);

    setFilteredData(data.filter((item) => filter(item, query)));
  };

  const renderOption = (item: Item, index: any) => (
    <AutocompleteItem key={item.id} title={item.name} />
  );

  return (
    <Autocomplete
      placeholder="Place your text"
      value={value}
      onSelect={onSelect}
      onChangeText={onChangeText}
    >
      {filteredData.map(renderOption)}
    </Autocomplete>
  );
};
