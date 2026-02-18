import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { ContactsServices } from "@/features/contacts/services/contacts.service";
import { Contact } from "@/features/contacts/models/contact.model";

const PAGE_SIZE = 5;

export const useContacts = () => {
  const queryClient = useQueryClient();

  const contactsQuery = useInfiniteQuery({
    queryKey: ["contacts"],
    queryFn: async ({ pageParam = 0 }) => {
      const allContacts = await ContactsServices.getAll();
      const start = pageParam * PAGE_SIZE;
      const end = start + PAGE_SIZE;

      return {
        data: allContacts.slice(start, end),
        nextPage: end < allContacts.length ? pageParam + 1 : undefined,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const addMutation = useMutation({
    mutationFn: ContactsServices.add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ContactsServices.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ContactsServices.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });

  return {
    ...contactsQuery,
    addContact: addMutation.mutateAsync,
    updateContact: updateMutation.mutateAsync,
    deleteContact: deleteMutation.mutateAsync
  };
};
