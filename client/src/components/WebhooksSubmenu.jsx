import { Modal, Title, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NewWebhookForm from "./NewWebhookForm";
import PropTypes from "prop-types";
import Integration from "../models/Integration";

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

WebhooksSubmenu.propTypes = {
  integrations: PropTypes.arrayOf(PropTypes.instanceOf(Integration)).isRequired,
};

export default WebhooksSubmenu;
