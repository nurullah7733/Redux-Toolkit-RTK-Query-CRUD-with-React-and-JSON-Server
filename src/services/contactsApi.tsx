import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Contacts } from "../models/contacts.model";

const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Contacts"],
  endpoints: (builder) => ({
    getContacts: builder.query<Contacts[], void>({
      query: () => "/contacts",
      providesTags: ["Contacts"],
    }),
    getContact: builder.query<Contacts, string>({
      query: (id) => `/contacts/${id}`,
      providesTags: ["Contacts"],
    }),
    addContact: builder.mutation<void, Contacts>({
      query: (contact) => ({
        url: "/contacts",
        method: "Post",
        body: contact,
      }),
      invalidatesTags: ["Contacts"],
    }),
    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "Delete",
      }),
      invalidatesTags: ["Contacts"],
    }),
    updateContact: builder.mutation<void, Contacts>({
      query: ({ id, ...rest }) => ({
        url: `/contacts/${id}`,
        method: "Put",
        body: rest,
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});
export default contactsApi;
export const {
  useGetContactsQuery,
  useGetContactQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = contactsApi;
