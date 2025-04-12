import { createApi } from '@reduxjs/toolkit/query/react';
import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { LoginFormValues, RegisterFormValues } from '~/types';
import { userApi } from '~/redux/api/userApi';
import { AccessToken, error } from '~/redux/api/types';
import { axiosBaseQuery } from '~/plugins/axiosBaseQuery';
import { logout } from '~/redux/features/userSlice';
import { RootState } from '~/redux/store';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => {
    const handleAuthSuccess = async (
      data: AccessToken,
      dispatch: ThunkDispatch<RootState, unknown, UnknownAction>,
    ) => {
      localStorage.setItem('accessToken', data.accessToken);
      await dispatch(userApi.endpoints.getMe.initiate(null)).unwrap();
      dispatch(userApi.util.invalidateTags(['User']));
    };

    return {
      registerUser: builder.mutation<AccessToken, RegisterFormValues>({
        query(data) {
          return {
            url: '/auth/sign-up',
            method: 'POST',
            data,
          };
        },
        async onQueryStarted(_args, { dispatch, queryFulfilled }) {
          const { data } = await queryFulfilled;
          await handleAuthSuccess(data, dispatch);
        },
      }),
      loginUser: builder.mutation<AccessToken, LoginFormValues>({
        query(data) {
          return {
            url: '/auth/sign-in',
            method: 'POST',
            data,
          };
        },
        async onQueryStarted(_args, { dispatch, queryFulfilled }) {
          const { data } = await queryFulfilled;
          await handleAuthSuccess(data, dispatch);
        },
      }),
      logoutUser: builder.mutation<void, void>({
        query() {
          return {
            url: '/auth/logout',
            method: 'POST',
          };
        },
        async onQueryStarted(_args, { dispatch, queryFulfilled }) {
          try {
            await queryFulfilled;
            localStorage.removeItem('accessToken');
            dispatch(logout());
          } catch (error) {
            const err = error as error
            console.error('Logout error:', err.error?.data?.message);
          }
        },
      }),
    };
  },
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
} = authApi;