import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useReducer } from 'react';
import Button from './components/Button';
import { formatNumber } from './functions/formatNumber';
import { reducer } from './functions/reducer';

function App() {

  const queryClient = useQueryClient();
  const [{ current, previous, operation }, dispatch] = useReducer(
    reducer,
    {
      current: '',
      previous: '',
      operation: '',
    }
  );

  // set the memory on the server
  const { mutate, isError: mutationError, isSuccess: mutationSuccess } = useMutation({
    mutationFn: async ({ memory }: { memory: string }) => {
      const res = await fetch('http://localhost:3000/api/memory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ memory })
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    }
  })

  // TODO
  if (mutationError) {
    console.log("mutation error");
  }

  if (mutationSuccess) {
    console.log("mutation data", mutationSuccess);
    queryClient.invalidateQueries(['memory']);
  }

  // get the memory from the server
  const { isLoading: queryLoading, data: queryData, isError: queryError } = useQuery<{ message: string, data: string }>({
    queryKey: ['memory'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3000/api/memory');
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    }
  })

  if (queryLoading) {
    return <div>Loading...</div>
  }
  if (queryError) {
    return <div>Error</div>
  }

  function renderDisplay(num: string) {
    const parsed = parseFloat(num);
    const formatted = isNaN(parsed) ? '0' : formatNumber(parsed);
    return formatted;
  }

  return (
    <main className="bg-sky-200 h-screen w-screen pt-10">
      <div className="
        w-fit h-fit mx-auto grid grid-cols-4 grid-rows-5 
        divide-x divide-y divide-gray-200
        rounded-2xl shadow-lg text-xl
      ">
        <input
          type="text"
          className="w-64 h-16 col-span-4 text-right px-4 rounded-t-2xl bg-gray-800 text-white font-mono"
          value={renderDisplay(current)}
          readOnly
          maxLength={10}
        />

        <Button
          bg="bg-gray-100"
          onClick={() => { alert(queryData.data) }}
        >
          MR
        </Button>
        <Button
          bg="bg-gray-100"
          onClick={() => mutate({ memory: '42' })}
        >
          MW
        </Button>
        <Button
          bg="bg-gray-100"
          onClick={() => mutate({ memory: '' })}
        >
          MC
        </Button>
        <Button
          bg="bg-gray-600 text-white"
          onClick={() => dispatch({ type: 'choose-operation', payload: { operation: '/' } })}
        >
          &divide;
        </Button>

        <Button onClick={() => dispatch({ type: 'add-digit', payload: { digit: '7' } })}>7</Button>
        <Button onClick={() => dispatch({ type: 'add-digit', payload: { digit: '8' } })}>8</Button>
        <Button onClick={() => dispatch({ type: 'add-digit', payload: { digit: '9' } })}>9</Button>
        <Button
          bg="bg-gray-600 text-white"
          onClick={() => dispatch({ type: 'choose-operation', payload: { operation: '*' } })}
        >
          &times;
        </Button>

        <Button onClick={() => dispatch({ type: 'add-digit', payload: { digit: '4' } })}>4</Button>
        <Button onClick={() => dispatch({ type: 'add-digit', payload: { digit: '5' } })}>5</Button>
        <Button onClick={() => dispatch({ type: 'add-digit', payload: { digit: '6' } })}>6</Button>
        <Button
          bg="bg-gray-600 text-white"
          onClick={() => dispatch({ type: 'choose-operation', payload: { operation: '-' } })}
        >
          &ndash;
        </Button>

        <Button onClick={() => dispatch({ type: 'add-digit', payload: { digit: '1' } })}>1</Button>
        <Button onClick={() => dispatch({ type: 'add-digit', payload: { digit: '2' } })}>2</Button>
        <Button onClick={() => dispatch({ type: 'add-digit', payload: { digit: '3' } })}>3</Button>
        <Button
          bg="bg-gray-600 text-white"
          onClick={() => dispatch({ type: 'choose-operation', payload: { operation: '+' } })}
        >
          +
        </Button>

        <Button
          rounded="rounded-bl-2xl"
          onClick={() => dispatch({ type: 'clear' })}
        >
          C
        </Button>
        <Button onClick={() => dispatch({ type: 'add-digit', payload: { digit: '0' } })} >0</Button>
        <Button onClick={() => dispatch({ type: 'add-digit', payload: { digit: '.' } })} >&#x2022;</Button>
        <Button
          rounded="rounded-br-2xl"
          bg="bg-orange-600 text-white"
          onClick={() => dispatch({ type: 'evaluate' })}
        >
          =
        </Button>
      </div>
    </main >
  )
}

export default App
