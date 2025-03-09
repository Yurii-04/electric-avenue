import { createApi } from '@reduxjs/toolkit/query/react';
import { User } from '~/redux/api/types';
import { setUser } from '~/redux/features/userSlice';
import { axiosBaseQuery } from '~/plugins/axiosBaseQuery';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getMe: builder.query<User, null>({
      query() {
        return {
          url: '/users/me',
          method: 'GET',
        };
      },
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) {
          dispatch(setUser(null));
        }
      },
      providesTags: ['User'],
    }),
  }),
});

export const { useGetMeQuery } = userApi;