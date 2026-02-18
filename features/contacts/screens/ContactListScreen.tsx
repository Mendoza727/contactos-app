import React, { useMemo, useState } from 'react';
import { View, FlatList } from 'react-native';
import {
    Text,
    ActivityIndicator,
    Card,
    IconButton,
    Searchbar,
    FAB
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useContacts } from '@/features/contacts/hooks/useContacts';
import { Contact } from '../models/contact.model';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/../../app/navigation/AppNavigator';
import { ContactCard } from '@/features/contacts/components/ContactCard';

type NavigationProp = StackNavigationProp<
    RootStackParamList,
    'ContactList'
>;

export const ContactListScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        deleteContact
    } = useContacts();

    const [search, setSearch] = useState('');

    const contacts =
        data?.pages.flatMap(page => page.data) ?? [];

    const filteredContacts = useMemo(() => {
        return contacts.filter(c =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase())
        );
    }, [contacts, search]);

    if (isLoading) {
        return <ActivityIndicator style={{ marginTop: 40 }} />;
    }

    const renderItem = ({ item }: { item: Contact }) => (
        <ContactCard
            contact={item}
            onPress={() =>
                navigation.navigate('ContactForm', { id: item.id })
            }
            onEdit={() =>
                navigation.navigate('ContactForm', { id: item.id })
            }
            onDelete={() => deleteContact(item.id)}
        />
    );

    return (
        <View style={{ flex: 1 }}>
            <Searchbar
                placeholder='Busqueda de contactos...'
                value={search}
                onChangeText={setSearch}
                style={{ margin: 10 }}
            />

            <FlatList
                data={filteredContacts}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                onEndReached={() => {
                    if (hasNextPage) fetchNextPage();
                }}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    isFetchingNextPage ? (
                        <ActivityIndicator style={{ margin: 20 }} />
                    ) : null
                }
            />

            <FAB
                icon="plus"
                style={{
                    position: 'absolute',
                    right: 20,
                    bottom: 20
                }}
                onPress={() =>
                    navigation.navigate({
                        name: 'ContactForm',
                        params: {}
                    })
                }
            />
        </View>
    )
}