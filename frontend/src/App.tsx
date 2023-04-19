import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function App() {

  const queryClient = useQueryClient();

  // set the memory on the server
  const { mutate, isError: mutationError, isSuccess: mutationSuccess } = useMutation({
    mutationFn: async ({ memory }: { memory: number }) => {
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
  const { isLoading: queryLoading, data: _queryData, isError: queryError } = useQuery({
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

  // submit form
  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form)
    const value = data.get('memory');
    if (!value) {
      return;
    }
    const memory = parseInt(value.toString());
    if (!memory) {
      return;
    }
    mutate({ memory });
    form.reset();
  }

  return (
    <div className="text-red-400">
      <form onSubmit={(e) => submitForm(e)}>
        <input type="number" name="memory" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default App
