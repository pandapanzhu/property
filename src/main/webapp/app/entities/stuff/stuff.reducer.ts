import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IStuff, defaultValue } from 'app/shared/model/stuff.model';

export const ACTION_TYPES = {
  FETCH_STUFF_LIST: 'stuff/FETCH_STUFF_LIST',
  FETCH_STUFF: 'stuff/FETCH_STUFF',
  CREATE_STUFF: 'stuff/CREATE_STUFF',
  UPDATE_STUFF: 'stuff/UPDATE_STUFF',
  DELETE_STUFF: 'stuff/DELETE_STUFF',
  RESET: 'stuff/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IStuff>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type StuffState = Readonly<typeof initialState>;

// Reducer

export default (state: StuffState = initialState, action): StuffState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_STUFF_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STUFF):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_STUFF):
    case REQUEST(ACTION_TYPES.UPDATE_STUFF):
    case REQUEST(ACTION_TYPES.DELETE_STUFF):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_STUFF_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STUFF):
    case FAILURE(ACTION_TYPES.CREATE_STUFF):
    case FAILURE(ACTION_TYPES.UPDATE_STUFF):
    case FAILURE(ACTION_TYPES.DELETE_STUFF):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_STUFF_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_STUFF):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_STUFF):
    case SUCCESS(ACTION_TYPES.UPDATE_STUFF):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_STUFF):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/stuffs';

// Actions

export const getEntities: ICrudGetAllAction<IStuff> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_STUFF_LIST,
    payload: axios.get<IStuff>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IStuff> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STUFF,
    payload: axios.get<IStuff>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IStuff> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STUFF,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IStuff> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STUFF,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IStuff> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STUFF,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
