import { useForm } from "@mantine/form";
import {
  TextInput,
  Stack,
  Autocomplete,
  Checkbox,
  Group,
  Textarea,
  JsonInput,
  Button,
} from "@mantine/core";

const NewWebhookForm = () => {
  const form = useForm({
    initialValues: {
      description: "",
      provider: "",
      events: "",
      headers: "Content-Type: application/json",
      body: "",
    },
  });

  return (
    <Stack maw={600} mx="auto">
      <TextInput
        {...form.getInputProps("description")}
        label="Description"
        placeholder="Description"
      />
      <Autocomplete
        {...form.getInputProps("provider")}
        label="Provider"
        placeholder="Provider"
        data={[
          { label: "Provider 1", value: "provider1" },
          { label: "Provider 2", value: "provider2" },
        ]}
      />

      <Group>
        <Checkbox
          {...form.getInputProps("events")}
          label="New provider verification"
          value="new_verification"
        />
        <Checkbox
          {...form.getInputProps("events")}
          label="New spec published"
          value="new_spec"
        />
        <Checkbox
          {...form.getInputProps("events")}
          label="New comparison published"
          value="new_comparison"
        />
      </Group>

      <Textarea
        {...form.getInputProps("headers")}
        label="Headers"
        placeholder="Name: Value"
      />

      <JsonInput
        {...form.getInputProps("body")}
        label="Body"
        placeholder="Body"
        validationError="Invalid JSON"
        formatOnBlur
        autosize
        minRows={4}
      />
      {/* <TextInput
        {...form.getInputProps("text")}
        label="Touched/dirty demo"
        placeholder="Touched/dirty demo"
      />

      <Text size="sm" mt="sm">
        Touched:{" "}
        <Text span color={form.isTouched("text") ? "blue" : "red"}>
          {form.isTouched("text") ? "touched" : "not touched"}
        </Text>
      </Text>

      <Text size="sm">
        Dirty:{" "}
        <Text span color={form.isDirty("text") ? "blue" : "red"}>
          {form.isDirty("text") ? "dirty" : "not dirty"}
        </Text>
      </Text> */}
      <Group position="center" mt="md">
        <Button type="submit">Create</Button>
      </Group>
    </Stack>
  );
};

export default NewWebhookForm;
