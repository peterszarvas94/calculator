import { Action, State } from "../types/reducer";

function addDigit(digit: string, state: State): State {
  if (state.overwrite) {
    return { ...state, current: digit, overwrite: false };
  }

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

function chooseOperation(operation: string, state: State): State {
  if (state.current === '' && state.previous === '') {
    return state;
  }

  if (state.current === '' && state.previous !== '') {
    return { ...state, operation };
  }

  if (state.current !== '' && state.previous === '') {
    return { ...state, previous: state.current, current: '', operation };
  }

  return {
    ...state,
    previous: calc(state),
    current: '',
    operation,
  }
}

function calc(state: State): string {
  const previous = parseFloat(state.previous);
  const current = parseFloat(state.current);

  if (isNaN(previous) || isNaN(current)) {
    return "";
  }

  let calculation: number | undefined;
  let result: string = "";

  if (state.operation === '+') {
    calculation = previous + current;
  }

  if (state.operation === '-') {
    calculation = previous - current;
  }

  if (state.operation === '*') {
    calculation = previous * current;
  }

  if (state.operation === '/') {
    calculation = previous / current;
  }

  if (!calculation) {
    return "";
  }

  result = calculation.toString();

  return result;
}

function evaluate(state: State): State {
  if (state.operation === '' || state.current === '' || state.previous === '') {
    return state;
  }

  return {
    ...state,
    previous: '',
    current: calc(state),
    operation: '',
    overwrite: true,
  }
}

export function reducer(state: State, action: Action): State {
  if (action.type === 'add-digit') {
    return addDigit(action.payload.digit, state);
  }

  if (action.type === 'choose-operation') {
    return chooseOperation(action.payload.operation, state);
  }

  if (action.type === 'clear') {
    return { ...state, current: '', previous: '', operation: '' };
  }

  if (action.type === 'evaluate') {
    return evaluate(state);
  }

  if (action.type === 'memory-read') {
    return { ...state, current: action.payload.value };
  }

  return state;
}
