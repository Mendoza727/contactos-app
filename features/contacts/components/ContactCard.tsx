import React from 'react';
import { Card, Text, IconButton, Avatar } from 'react-native-paper';
import { View } from 'react-native';
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

export const ContactCard = ({
  contact,
  onPress,
  onEdit,
  onDelete
}: Props) => {
  return (
    <Card style={{ margin: 10 }} onPress={onPress}>
      <Card.Content>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          
          <Avatar.Text
            size={48}
            label={getInitials(contact.name)}
            style={{ marginRight: 15 }}
          />

          <View style={{ flex: 1 }}>
            <Text variant="titleMedium">{contact.name}</Text>
            <Text>{contact.email}</Text>
            <Text>
              {contact.phones.map(p => p.number).join(' • ')}
            </Text>
          </View>

        </View>
      </Card.Content>

      {(onEdit || onDelete) && (
        <Card.Actions>
          {onEdit && (
            <IconButton icon="pencil" onPress={onEdit} />
          )}
          {onDelete && (
            <IconButton icon="delete" onPress={onDelete} />
          )}
        </Card.Actions>
      )}
    </Card>
  );
};