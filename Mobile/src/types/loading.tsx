export interface LoadingState {
  isLoading: boolean;
  message: string;
}

export type LoadingAction =
  | { type: 'LOADING_START'; payload?: { message?: string } }
  | { type: 'LOADING_STOP' };

export interface LoadingContextType {
  state: LoadingState;
  dispatch: React.Dispatch<LoadingAction>;
}

export interface UseLoadingReturn {
  isLoading: boolean;
  message: string;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
  withLoading: <T>(
    asyncFunction: () => Promise<T>,
    message?: string
  ) => Promise<T>;
}