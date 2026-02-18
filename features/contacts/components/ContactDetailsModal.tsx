import React from 'react';
import { View } from 'react-native';
import { Portal, Modal, Text, Button, Divider } from 'react-native-paper';
import { Contact } from '../models/contact.model';

interface Props {
  visible: boolean;
  contact: Contact | null;
  onClose: () => void;
}

export const ContactDetailsModal = ({
  visible,
  contact,
  onClose
}: Props) => {
  if (!contact) return null;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={{
          backgroundColor: 'white',
          margin: 20,
          padding: 20,
          borderRadius: 12
        }}
      >
        <Text variant="headlineSmall">{contact.name}</Text>

        <Divider style={{ marginVertical: 10 }} />

        <Text variant="titleMedium">Email</Text>
        <Text>{contact.email}</Text>

        <Divider style={{ marginVertical: 10 }} />

        <Text variant="titleMedium">Phones</Text>
        {contact.phones.map((p, index) => (
          <Text key={`${p.id}-${index}`}>
            • {p.number} {p.label ? `(${p.label})` : ''}
          </Text>
        ))}

        <Divider style={{ marginVertical: 10 }} />

        <Text variant="bodySmall">
          Created: {new Date(contact.createdAt).toLocaleString()}
        </Text>
        <Text variant="bodySmall">
          Updated: {new Date(contact.updatedAt).toLocaleString()}
        </Text>

        <Button
          mode="contained"
          style={{ marginTop: 20 }}
          onPress={onClose}
        >
          Close
        </Button>
      </Modal>
    </Portal>
  );
};