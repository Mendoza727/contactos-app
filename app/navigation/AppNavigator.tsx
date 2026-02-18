import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ContactListScreen } from '@/features/contacts/screens/ContactListScreen';
import { ContactFormScreen } from '@/features/contacts/screens/ContactFormScreen';

export type RootStackParamList = {
  ContactList: undefined;
  ContactForm: { id?: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='ContactList'
                component={ContactListScreen}
                options={{ title: 'Contactos' }}
            />
            <Stack.Screen 
                name='ContactForm'
                component={ContactFormScreen}
                options={{ title: 'Añadir / Editar Contacto' }}
            />
        </Stack.Navigator>
    );
};