import { handleActions, combineActions } from 'redux-actions';
import { isArray } from './helpers';
import { PREFIX, statuses } from './actions';

const applyState = (s, { payload }) => ({ ...s, ...payload });
const emptyObject = {};
const emptyArray = {};

export const createReducer = (
  actions,
  reducer = emptyObject,
  initialState = emptyObject
) => handleActions({
  ...(actions && {
    [combineActions(
      ...(isArray(actions) ? actions : Object.keys(actions).map(k => actions[k]))
    )]: applyState
  }),
  ...reducer
}, initialState);

export const shelf = (state = {}, { type, meta, payload }) => {
  if (!type.includes(PREFIX)) return state;
  return {
    ...state,
    [meta.name]: {
      ...meta,
      payload
    }
  }
}
