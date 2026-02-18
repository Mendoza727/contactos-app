import React from 'react';
import { View, Text } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import {
    useFieldArray,
    Control,
    Controller,
    FieldErrors
} from 'react-hook-form';
import { ContactFormValues } from '../validations/contact.schema';
import { generateId } from '@/shared/utils/uuid';

interface Props {
    control: Control<ContactFormValues>;
    errors?: FieldErrors<ContactFormValues>;
}

export const PhoneFieldArray = ({ control, errors }: Props) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'phones'
    });

    return (
        <View>
            {fields.map((field, index) => {
                const phoneError = errors?.phones?.[index]?.number?.message;

                return (
                    <View key={field.id} style={{ marginBottom: 15 }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <Controller
                                control={control}
                                name={`phones.${index}.number`}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        style={{ flex: 1 }}
                                        mode="outlined"
                                        label="Phone"
                                        value={value}
                                        onChangeText={onChange}
                                        keyboardType="numeric"
                                        error={!!phoneError}
                                    />
                                )}
                            />

                            <IconButton
                                icon="delete"
                                onPress={() => remove(index)}
                            />
                        </View>

                        {phoneError && (
                            <Text style={{ color: 'red', marginTop: 4 }}>
                                {phoneError}
                            </Text>
                        )}
                    </View>
                );
            })}

            <IconButton
                icon="plus"
                onPress={() =>
                    append({
                        id: generateId(),
                        number: '',
                        label: 'mobile'
                    })
                }
            />

            {errors?.phones?.message && (
                <Text style={{ color: 'red', marginTop: 4 }}>
                    {errors.phones.message}
                </Text>
            )}
        </View>
    );
};