export type State = {
  current: string,
  previous: string,
  operation: string,
  overwrite: boolean,
}

export type Action =
  | { type: 'add-digit'; payload: { digit: string } }
  | { type: 'choose-operation'; payload: { operation: '/' | '*' | '-' | '+' } }
  | { type: 'clear' }
  | { type: 'evaluate' }
  | { type: 'memory-read'; payload: { value: string } };
