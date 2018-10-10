import { createAction } from 'redux-actions';
import { SubmissionError } from 'redux-form';
import nanoid from 'nanoid';
import { isArray, identity } from './helpers';

export const PREFIX = '@@shelf';
export const statuses = ['START', 'SUCCESS', 'ERROR'];

const getType = status => name => `${PREFIX}/${status} -> ${name.toString()}`

const createApiAction = (name, status) => createAction(
  getType(status)(name),
  identity,
  (_, request) => ({
    name,
    status,
    request,
    time: new Date().getTime()
  })
);

const defaultMapper = data => isArray(data) ? ({ entities: data }) : ({ entity: data });
const metaMapper = (_, request) => request;

export const create = (actionName, callback, responseMapper = defaultMapper) => {
  const _name = `[${nanoid(3)}]${actionName}`;
  const action = createAction(_name, responseMapper, metaMapper);
  const [start, success, error] = statuses.map(status => createApiAction(_name, status));
  const apiAction = (...params) => dispatch => {
    const result = callback(...params);
    if (!result.then) return mayBePromise;
    dispatch(start());
    return result
      .then(({ data }) => {
        dispatch(success(data, ...params));
        dispatch(action(data, ...params));
        return data;
      })
      .catch((error) => dispatch(error(error, ...params)))
    }

  apiAction.toString = () => _name;
  return apiAction;
};

export const success = getType(statuses[1]);
export const error = getType(statuses[2]);
