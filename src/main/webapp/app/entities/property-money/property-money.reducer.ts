import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPropertyMoney, defaultValue } from 'app/shared/model/property-money.model';

export const ACTION_TYPES = {
  FETCH_PROPERTYMONEY_LIST: 'propertyMoney/FETCH_PROPERTYMONEY_LIST',
  FETCH_PROPERTYMONEY: 'propertyMoney/FETCH_PROPERTYMONEY',
  CREATE_PROPERTYMONEY: 'propertyMoney/CREATE_PROPERTYMONEY',
  UPDATE_PROPERTYMONEY: 'propertyMoney/UPDATE_PROPERTYMONEY',
  DELETE_PROPERTYMONEY: 'propertyMoney/DELETE_PROPERTYMONEY',
  RESET: 'propertyMoney/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPropertyMoney>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PropertyMoneyState = Readonly<typeof initialState>;

// Reducer

export default (state: PropertyMoneyState = initialState, action): PropertyMoneyState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROPERTYMONEY_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROPERTYMONEY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROPERTYMONEY):
    case REQUEST(ACTION_TYPES.UPDATE_PROPERTYMONEY):
    case REQUEST(ACTION_TYPES.DELETE_PROPERTYMONEY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROPERTYMONEY_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROPERTYMONEY):
    case FAILURE(ACTION_TYPES.CREATE_PROPERTYMONEY):
    case FAILURE(ACTION_TYPES.UPDATE_PROPERTYMONEY):
    case FAILURE(ACTION_TYPES.DELETE_PROPERTYMONEY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROPERTYMONEY_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROPERTYMONEY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROPERTYMONEY):
    case SUCCESS(ACTION_TYPES.UPDATE_PROPERTYMONEY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROPERTYMONEY):
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

const apiUrl = 'api/property-monies';

// Actions

export const getEntities: ICrudGetAllAction<IPropertyMoney> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PROPERTYMONEY_LIST,
    payload: axios.get<IPropertyMoney>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IPropertyMoney> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROPERTYMONEY,
    payload: axios.get<IPropertyMoney>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPropertyMoney> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROPERTYMONEY,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPropertyMoney> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROPERTYMONEY,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPropertyMoney> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROPERTYMONEY,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
