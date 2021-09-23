import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "@ui-kitten/components";
import * as yup from "yup";
import { Formik } from "formik";

import { RootTabScreenProps } from "../types";
import {
  AutoComplete,
  Calendar,
  DropdownSelect,
  Switch,
  TextField,
} from "../components/forms";

const validationSchema = yup.object().shape({
  userName: yup.string().required("Required"),
  // password: yup.string().required("Required"),
});

export default function UiKittenFormikForm({
  navigation,
}: RootTabScreenProps<"KittenForm">) {
  const [formData, setFormData] = React.useState("");
  const initialValues = {
    userName: "",
    password: "",
    isSubscribed: false,
    country: "",
    country2: 2,
    dob: undefined,
  };

  const handleFormSubmit = (values: any) => {
    setFormData(JSON.stringify(values));
  };

  return (
    <View style={styles.container}>
      <Text>{formData}</Text>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, dirty }) => (
          <>
            <TextField label="User Name" name="userName" />
            <TextField label="Password" name="password" secure />
            <Switch label="Subscribe" name="isSubscribed" />
            <AutoComplete
              name="country"
              data={[
                { id: 1, name: "Moldova" },
                { id: 2, name: "Romania" },
              ]}
            />
            {/* <Calendar label="DOB" name="dob" /> */}
            <DropdownSelect
              label="Country"
              name="country2"
              data={[
                { id: 1, name: "Moldova" },
                { id: 2, name: "Ucraina" },
              ]}
            />
            <Button onPress={() => handleSubmit()} disabled={!dirty}>
              Submit
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
