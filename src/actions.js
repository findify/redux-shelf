import { createAction } from 'redux-actions';
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
    if (!result.then) return result;
    dispatch(start());
    return result
      .then((res) => {
        dispatch(success(res, ...params));
        dispatch(action(res, ...params));
        return res;
      })
      .catch((error) => dispatch(error(error, ...params)))
    }

  apiAction.toString = () => _name;
  return apiAction;
};

export const success = getType(statuses[1]);
export const error = getType(statuses[2]);
