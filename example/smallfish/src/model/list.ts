import { getList } from '@/service/list';

export default {
  namespace: 'list',
  state: {
    data: [],
  },
  effects: {
    *getList({ payload }, { call, put }) {
      try {
        const data = yield call(getList, { ...payload });
        yield put({
          type: 'setState',
          payload: { data },
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
