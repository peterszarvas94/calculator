import { Action, State } from "../types/reducer";

function addDigit(digit: string, state: State): State {
  if (state.current === '0' && digit === '0') {
    return state;
  }

  if ((state.current === '0' || state.current === '') && digit === '.') {
    return { ...state, current: '0.' };
  }

  if (state.current === '0') {
    return { ...state, current: digit };
  }

  if (state.current.includes('.') && digit === '.') {
    return state;
  }

  return { ...state, current: state.current + digit };
}

export function reducer(state: State, action: Action): State {
  if (action.type === 'add-digit') {
    return addDigit(action.payload.digit, state);
  }

  if (action.type === 'choose-operation') {
    return { ...state, operation: action.payload.operation };
  }

  if (action.type === 'clear') {
    return { ...state, current: '', previous: '', operation: '' };
  }

  if (action.type === 'evaluate') {
    // Implement your logic here
    return state;
  }

  return state;
}
