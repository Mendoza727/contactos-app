import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Snackbar, Text } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    RouteProp,
    useRoute,
    useNavigation,
    useFocusEffect
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import {
    contactSchema,
    ContactFormValues
} from '../validations/contact.schema';
import { useContacts } from '../hooks/useContacts';
import { RootStackParamList } from '../../../app/navigation/AppNavigator';
import { PhoneFieldArray } from '../components/PhoneFieldArray';
import { generateId } from '@/shared/utils/uuid';

type RouteProps = RouteProp<RootStackParamList, 'ContactForm'>;
type NavigationProps = StackNavigationProp<
    RootStackParamList,
    'ContactForm'
>;

export const ContactFormScreen = () => {
    const route = useRoute<RouteProps>();
    const navigation = useNavigation<NavigationProps>();

    const { data, addContact, updateContact } = useContacts();

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isSubmittingRef = useRef(false);

    const contactId = route.params?.id;

    const existingContact = data?.find(
        (c) => c.id === contactId
    );

    const emailRef = useRef<any>(null);

    const {
        control,
        handleSubmit,
        reset,
        formState
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            phones: [
                {
                    id: generateId(),
                    number: '',
                    label: 'mobile'
                }
            ]
        }
    });

    /**
     * Load existing contact if editing
     */
    useEffect(() => {
        if (existingContact) {
            reset({
                name: existingContact.name,
                email: existingContact.email,
                phones: existingContact.phones
            });
        }
    }, [existingContact, reset]);

    /**
     * Prevent leaving if form is dirty
     */
    useFocusEffect(
        useCallback(() => {
            const onBeforeRemove = (e: any) => {

                // 👇 salida permitida
                if (!formState.isDirty || isSubmittingRef.current) return;

                e.preventDefault();

                Alert.alert(
                    'Unsaved changes',
                    'You have unsaved changes. Do you really want to leave?',
                    [
                        { text: 'Stay', style: 'cancel' },
                        {
                            text: 'Leave',
                            style: 'destructive',
                            onPress: () => navigation.dispatch(e.data.action)
                        }
                    ]
                );
            };

            const unsubscribe = navigation.addListener(
                'beforeRemove',
                onBeforeRemove
            );

            return unsubscribe;
        }, [navigation, formState.isDirty])
    );

    /**
     * Submit logic
     */
    const onSubmit = async (values: ContactFormValues) => {
        if (isSubmitting) return;

        setIsSubmitting(true);
        isSubmittingRef.current = true; // 👈 marcamos salida segura

        const now = new Date().toISOString();

        try {
            if (existingContact) {
                await updateContact({
                    ...existingContact,
                    ...values,
                    updatedAt: now
                });
            } else {
                await addContact({
                    id: generateId(),
                    ...values,
                    createdAt: now,
                    updatedAt: now
                });
            }

            reset(values);

            navigation.goBack();

        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>

            {/* NAME FIELD */}
            <View>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <>
                            <TextInput
                                mode="outlined"
                                label="Name"
                                value={value}
                                onChangeText={onChange}
                                returnKeyType="next"
                                onSubmitEditing={() => emailRef.current?.focus()}
                                error={!!formState.errors.name}
                            />
                            {formState.errors.name && (
                                <Text style={{ color: '#d32f2f', marginTop: 4 }}>
                                    {formState.errors.name.message}
                                </Text>
                            )}
                        </>
                    )}
                />
            </View>

            {/* EMAIL FIELD */}
            <View style={{ marginTop: 15 }}>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <>
                            <TextInput
                                ref={emailRef}
                                mode="outlined"
                                label="Email"
                                value={value}
                                onChangeText={onChange}
                                keyboardType="email-address"
                                error={!!formState.errors.email}
                            />
                            {formState.errors.email && (
                                <Text style={{ color: '#d32f2f', marginTop: 4 }}>
                                    {formState.errors.email.message}
                                </Text>
                            )}
                        </>
                    )}
                />
            </View>

            {/* PHONES */}
            <View style={{ marginTop: 20 }}>
                <PhoneFieldArray
                    control={control}
                    errors={formState.errors}
                />
            </View>

            {/* SAVE BUTTON */}
            <View>
                <Button
                    mode="contained"
                    loading={isSubmitting}
                    disabled={!formState.isValid || isSubmitting}
                    style={{ marginTop: 30 }}
                    onPress={handleSubmit(onSubmit)}
                >
                    {existingContact ? 'Update Contact' : 'Create Contact'}
                </Button>

                <Button
                    mode="text"
                    style={{ marginTop: 10 }}
                    onPress={() => navigation.goBack()}
                >
                    Cancel
                </Button>
            </View>

            {/* SUCCESS SNACKBAR */}
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
            >
                Contact saved successfully
            </Snackbar>

        </ScrollView>
    );
};