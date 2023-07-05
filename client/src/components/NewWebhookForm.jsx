import { isNotEmpty, useForm } from "@mantine/form";
import {
  TextInput,
  Stack,
  Checkbox,
  Group,
  Textarea,
  JsonInput,
  Button,
  Select,
} from "@mantine/core";
import PropTypes from "prop-types";
import Integration from "../models/Integration.js";
import { webhookService } from "../services/apiService.js";

const NewWebhookForm = ({ integrations }) => {
  const form = useForm({
    initialValues: {
      integrationId: undefined,
      events: [],
      // {
      //   specPublish: false,
      //   providerVerification: false,
      //   comparison: false,
      // },
      url: "",
      enabled: true,
      description: "",
      headers: "Content-Type: application/json",
      payload: "",
    },
    validate: {
      integrationId: isNotEmpty("You must select an integration"),
      events: isNotEmpty("You must select at least one event"),
    },
    transformValues: (values) => {
      const result = { ...values };
      result.events = result.events.reduce((acc, event) => {
        acc[event] = true;
        return acc;
      }, {});
      return result;
    },
  });

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (!form.validate()) return;
  //   const webhook = form.values;
  //   const response = await webhookService.postNewWebhook(webhook);
  //   console.table(response);
  // };

  const handleSubmit = form.onSubmit((values) =>
    webhookService.postNewWebhook(values)
  );

  return (
    <Stack maw={600} mx="auto">
      <form
        // onSubmit={form.onSubmit((values) =>
        //   webhookService.postNewWebhook(values)
        // )}
        onSubmit={handleSubmit}
      >
        <TextInput
          {...form.getInputProps("description")}
          label="Description"
          placeholder="Description"
        />

        <TextInput
          {...form.getInputProps("url")}
          label="URL"
          placeholder="http://example.com/api/webhooks"
          required
        />

        <Select
          {...form.getInputProps("integrationId")}
          required
          label="Integration"
          data={integrations.map((integration) => {
            return {
              label: integration.name,
              value: integration.id,
            };
          })}
        />

        <Checkbox.Group
          label="Events"
          required
          {...form.getInputProps("events", { type: "checkbox" })}
          // {...form.getInputProps("events")}
          mt={10}
        >
          {/* <Group position="left" mt="md"> */}
          <Checkbox
            label="New provider verification"
            value="providerVerification"
            mb={"0.5rem"}
          />
          <Checkbox
            label="New spec published"
            mb={"0.5rem"}
            value="specPublish"
            styles={(theme) => ({
              label: {
                cursor: "pointer",
              },
            })}
          />
          <Checkbox
            label="New comparison published"
            // value="events.comparison"
            value="comparison"
            mb={"0.5rem"}
          />
          {/* </Group> */}
        </Checkbox.Group>

        <Textarea
          {...form.getInputProps("headers")}
          label="Headers"
          placeholder="Header-name: Value"
        />

        <JsonInput
          {...form.getInputProps("payload")}
          label="Payload (JSON)"
          placeholder={'{\n  "key": "value"\n}'}
          validationError="Invalid JSON"
          formatOnBlur
          autosize
          minRows={4}
        />

        <Checkbox
          {...form.getInputProps("enabled", { type: "checkbox" })}
          label="Enabled"
        />

        <Group position="center" mt="md">
          <Button type="submit">Create</Button>
        </Group>
      </form>
    </Stack>
  );
};

NewWebhookForm.propTypes = {
  integrations: PropTypes.arrayOf(PropTypes.instanceOf(Integration)).isRequired,
};

export default NewWebhookForm;
