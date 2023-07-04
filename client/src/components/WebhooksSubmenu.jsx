import { Modal, Group, Title, Button } from "@mantine/core";
// import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import NewWebhookForm from "./NewWebhookForm";

const WebhooksSubmenu = () => {
  const [opened, { open, close }] = useDisclosure(false);

  // const navigate = useNavigate();

  return (
    <>
      <Modal
        size="xl"
        opened={opened}
        onClose={close}
        title="New Webhook"
        centered
      >
        <NewWebhookForm />
      </Modal>
      <Title order={3} style={{ marginBottom: "2rem" }}>
        Webhooks
      </Title>
      <Button variant="outline" onClick={open} style={{ marginRight: "2rem" }}>
        New Webhook
      </Button>
    </>
  );
};

export default WebhooksSubmenu;

function Demo() {
  return (
    <>
      <Group position="center">
        <Button>Open centered Modal</Button>
      </Group>
    </>
  );
}
