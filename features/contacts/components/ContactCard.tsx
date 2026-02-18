import React, { memo } from 'react';
import { View } from 'react-native';
import {
  Card,
  Text,
  Avatar,
  IconButton
} from 'react-native-paper';
import { Swipeable } from 'react-native-gesture-handler';
import { Contact } from '../models/contact.model';

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

const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  return `hsl(${hash % 360}, 70%, 50%)`;
};

const ContactCardComponent = ({
  contact,
  onPress,
  onEdit,
  onDelete
}: Props) => {

  const renderRightActions = () => (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: 80
      }}
    >
      <IconButton
        icon="delete"
        iconColor="white"
        containerColor="#d32f2f"
        size={28}
        onPress={onDelete}
      />
    </View>
  );

  return (
    <Swipeable renderRightActions={onDelete ? renderRightActions : undefined}>
      <Card style={{ marginHorizontal: 12, marginVertical: 6 }} onPress={onPress}>
        <Card.Content>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>

            <Avatar.Text
              size={64}
              label={getInitials(contact.name)}
              labelStyle={{ fontSize: 22, fontWeight: 'bold' }}
              style={{
                backgroundColor: stringToColor(contact.name),
                marginRight: 16
              }}
            />

            <View style={{ flex: 1 }}>
              <Text variant="titleMedium">{contact.name}</Text>
              <Text>{contact.email}</Text>
              <Text>
                {contact.phones.map(p => p.number).join(' • ')}
              </Text>
            </View>

            {onEdit && (
              <IconButton icon="pencil" onPress={onEdit} />
            )}

          </View>
        </Card.Content>
      </Card>
    </Swipeable>
  );
};

export const ContactCard = memo(ContactCardComponent);