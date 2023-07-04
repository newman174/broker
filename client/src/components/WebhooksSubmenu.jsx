import { Modal, Group, Title, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NewWebhookForm from "./NewWebhookForm";

const WebhooksSubmenu = ({ integrations }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        size="xl"
        opened={opened}
        onClose={close}
        title="New Webhook"
        centered
      >
        <NewWebhookForm integrations={integrations} />
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
