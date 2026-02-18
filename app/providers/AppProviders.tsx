import React, { PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const AppProviders = ({ children }: PropsWithChildren) => {
    return (
        <QueryClientProvider client={queryClient}>
            <PaperProvider>
                <NavigationContainer>
                    {children}
                </NavigationContainer>
            </PaperProvider>
        </QueryClientProvider>
    );
}