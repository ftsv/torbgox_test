// import { build } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/cacheLifecycle';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import ITimezone from '../models/ITimezone';

export const timezoneApi = createApi({
  reducerPath: 'timezoneApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://react-ws-app-chat.herokuapp.com/'}),
  endpoints: (build) => ({
    fetchTimezones: build.query<ITimezone[], any>({
      query: () => ({
        url: '/timezones'
      })
  })
  })
});
