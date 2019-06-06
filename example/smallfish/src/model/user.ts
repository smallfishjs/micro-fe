import { getUser } from '@/service/global';

export default {
  namespace: 'user',
  state: {
    currentUser: [],
  },
  effects: {
    *getUser(_, { call, put }) {
      try {
        const data = yield call(getUser);
        yield put({
          type: 'setState',
          payload: { currentUser: data },
        });
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
