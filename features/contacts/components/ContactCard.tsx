import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import {
  Card,
  Text,
  IconButton,
  Avatar,
  Button
} from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Contact } from '../models/contact.model';
import { ContactDetailsModal } from './ContactDetailsModal';

interface Props {
  contact: Contact;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
};

export const ContactCard = ({
  contact,
  onEdit,
  onDelete
}: Props) => {

  const swipeRef = useRef<Swipeable>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const renderRightActions = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {onEdit && (
        <IconButton
          icon="pencil"
          iconColor="white"
          containerColor="#1976D2"
          size={28}
          onPress={() => {
            swipeRef.current?.close();
            onEdit();
          }}
        />
      )}
      {onDelete && (
        <IconButton
          icon="delete"
          iconColor="white"
          containerColor="#D32F2F"
          size={28}
          onPress={() => {
            swipeRef.current?.close();
            onDelete();
          }}
        />
      )}
    </View>
  );

  return (
    <>
      <Swipeable
        ref={swipeRef}
        renderRightActions={renderRightActions}
      >
        <Card style={{ margin: 10 }}>
          <Card.Content>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              
              <Avatar.Text
                size={56}
                label={getInitials(contact.name)}
                style={{ marginRight: 15 }}
              />

              <Text variant="titleMedium">
                {contact.name}
              </Text>
            </View>

            <Button
              mode="text"
              style={{ marginTop: 10 }}
              onPress={() => setModalVisible(true)}
            >
              View Contact
            </Button>

          </Card.Content>
        </Card>
      </Swipeable>

      <ContactDetailsModal
        visible={modalVisible}
        contact={contact}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};