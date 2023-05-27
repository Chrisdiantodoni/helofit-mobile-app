import React, {createContext, useReducer, useState} from 'react';

const initialState = {
  type_create_room: '',
};

export const Context = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'type_create_room':
      return {
        ...state,
        type_create_room: action.payload,
      };
  }
};

const ContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, {...initialState});

  return (
    <Context.Provider value={{...state, dispatch}}>{children}</Context.Provider>
  );
};

export default ContextProvider;
