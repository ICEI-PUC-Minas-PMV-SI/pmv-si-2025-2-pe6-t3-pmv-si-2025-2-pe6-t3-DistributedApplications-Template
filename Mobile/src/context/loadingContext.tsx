
import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import {
  LoadingAction,
  LoadingContextType,
  LoadingState,
  UseLoadingReturn
} from '../types/loading';

const initialState: LoadingState = {
  isLoading: false,
  message: ''
};

// Context
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// Reducer
const loadingReducer = (state: LoadingState, action: LoadingAction): LoadingState => {
  switch (action.type) {
    case 'LOADING_START':
      return {
        isLoading: true,
        message: action.payload?.message || 'Carregando...'
      };
    case 'LOADING_STOP':
      return {
        isLoading: false,
        message: ''
      };
    default:
      return state;
  }
};

interface LoadingProviderProps {
  children: ReactNode;
}

// Provider
export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(loadingReducer, initialState);

  return (
    <LoadingContext.Provider value={{ state, dispatch }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Custom Hook
export const useLoading = (): UseLoadingReturn => {
  const context = useContext(LoadingContext);
  
  if (!context) {
    throw new Error('useLoading deve ser usado dentro de um LoadingProvider');
  }

  const { state, dispatch } = context;

  const startLoading = (message: string = 'Carregando...'): void => {
    dispatch({ 
      type: 'LOADING_START', 
      payload: { message } 
    });
  };

  const stopLoading = (): void => {
    dispatch({ type: 'LOADING_STOP' });
  };

  const withLoading = async <T,>(
    asyncFunction: () => Promise<T>,
    message: string = 'Carregando...'
  ): Promise<T> => {
    startLoading(message);
    try {
      const result = await asyncFunction();
      return result;
    } finally {
      stopLoading();
    }
  };

  return {
    isLoading: state.isLoading,
    message: state.message,
    startLoading,
    stopLoading,
    withLoading
  };
};