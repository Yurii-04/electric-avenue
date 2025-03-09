import { createApi } from '@reduxjs/toolkit/query/react';
import { LoginFormValues, RegisterFormValues } from '~/types';
import { userApi } from '~/redux/api/userApi';
import { AccessToken } from '~/redux/api/types';
import { axiosBaseQuery } from '~/plugins/axiosBaseQuery';
import { logout } from '~/redux/features/userSlice';
import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { RootState } from '~/redux/store';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => {
    const handleAuthSuccess = async (
      data: AccessToken,
      dispatch: ThunkDispatch<RootState, unknown, UnknownAction>
    ) => {
      localStorage.setItem('accessToken', data.accessToken);
      await dispatch(userApi.endpoints.getMe.initiate(null)).unwrap()
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
          try {
            const { data } = await queryFulfilled;
            await handleAuthSuccess(data, dispatch);
          } catch (error) {
            console.error('Registration error:', error);
          }
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
          try {
            const { data } = await queryFulfilled;
            await handleAuthSuccess(data, dispatch);
          } catch (error) {
            console.error('Login error:', error);
          }
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
            dispatch(userApi.util.resetApiState());
          } catch (error) {
            console.error('Logout error:', error);
          }
        },
      })
    };
  },
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
} = authApi;