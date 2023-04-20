export type State = {
  current: string,
  previous: string,
  operation: string
}

export type Action =
  | { type: 'add-digit'; payload: { digit: string } }
  | { type: 'choose-operation'; payload: { operation: '/' | '*' | '-' | '+' } }
  | { type: 'clear' }
  | { type: 'evaluate' };
