import {
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';
import { ContactsServices } from '../services/contacts.service';
import { Contact } from '../models/contact.model';

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

  const deleteMutation = useMutation({
    mutationFn: ContactsServices.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
    }
  });

  return {
    ...contactsQuery,
    addContact: addMutation.mutateAsync,
    updateContact: updateMutation.mutateAsync,
    deleteContact: deleteMutation.mutateAsync
  };
};