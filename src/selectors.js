import { createSelector } from 'reselect';
import { statuses } from './actions';
import { path, identity } from './helpers';

const [ start, success, error ] = statuses;

const getStatus = name => s => s.shelf[name] && s.shelf[name].status;

export const isFetching = action => {
  const name = action.toString();
  return createSelector(
    getStatus(name),
    status => status === start
  );
};

export const hasError = action => {
  const name = action.toString();
  return createSelector(
    getStatus(name),
    status => status && status === error
  );
};

export const getList = reducerName => createSelector(
  s => s[reducerName].entities,
  list => list
);

export const getItem = reducerName => {
  const [name, field] = reducerName.split('.');
  return createSelector(
    s => s[name][field || 'entity'],
    item => item
  )
};

export const get = (...deep) => createSelector(path(deep), identity);

export const routeParams = createSelector(
  s => s.match && s.match.params,
  params => params
);
