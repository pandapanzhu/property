import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPropertyServe, defaultValue } from 'app/shared/model/property-serve.model';

export const ACTION_TYPES = {
  FETCH_PROPERTYSERVE_LIST: 'propertyServe/FETCH_PROPERTYSERVE_LIST',
  FETCH_PROPERTYSERVE: 'propertyServe/FETCH_PROPERTYSERVE',
  CREATE_PROPERTYSERVE: 'propertyServe/CREATE_PROPERTYSERVE',
  UPDATE_PROPERTYSERVE: 'propertyServe/UPDATE_PROPERTYSERVE',
  DELETE_PROPERTYSERVE: 'propertyServe/DELETE_PROPERTYSERVE',
  RESET: 'propertyServe/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPropertyServe>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PropertyServeState = Readonly<typeof initialState>;

// Reducer

export default (state: PropertyServeState = initialState, action): PropertyServeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROPERTYSERVE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROPERTYSERVE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROPERTYSERVE):
    case REQUEST(ACTION_TYPES.UPDATE_PROPERTYSERVE):
    case REQUEST(ACTION_TYPES.DELETE_PROPERTYSERVE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROPERTYSERVE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROPERTYSERVE):
    case FAILURE(ACTION_TYPES.CREATE_PROPERTYSERVE):
    case FAILURE(ACTION_TYPES.UPDATE_PROPERTYSERVE):
    case FAILURE(ACTION_TYPES.DELETE_PROPERTYSERVE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROPERTYSERVE_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROPERTYSERVE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROPERTYSERVE):
    case SUCCESS(ACTION_TYPES.UPDATE_PROPERTYSERVE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROPERTYSERVE):
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

const apiUrl = 'api/property-serves';

// Actions

export const getEntities: ICrudGetAllAction<IPropertyServe> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PROPERTYSERVE_LIST,
    payload: axios.get<IPropertyServe>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IPropertyServe> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROPERTYSERVE,
    payload: axios.get<IPropertyServe>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPropertyServe> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROPERTYSERVE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPropertyServe> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROPERTYSERVE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPropertyServe> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROPERTYSERVE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
