import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ContactsServices } from '@/features/contacts/services/contacts.service';
import { Contact } from '@/features/contacts/models/contact.model';

export const useContacts = () => {
  const queryClient = useQueryClient();

  const contactsQuery = useQuery({
    queryKey: ['contacts'],
    queryFn: ContactsServices.getAll
  });

  const addMutation = useMutation({
    mutationFn: ContactsServices.add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    }
  });

  const updateMutation = useMutation({
    mutationFn: ContactsServices.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    }
  });

  return {
    ...contactsQuery,
    addContact: addMutation.mutateAsync,
    updateContact: updateMutation.mutateAsync
  };
};