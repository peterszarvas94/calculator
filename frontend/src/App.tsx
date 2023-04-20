import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

function Button({ children, rounded, bg }: {
  children: React.ReactNode,
  rounded?: string,
  bg?: string
}) {
  return (
    <button onClick={() => { }} className={`
      w-16 h-16 
      ${bg ?? "bg-white"}
      ${rounded ?? ""}
    `}>
      {children}
    </button>
  )
}

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
    <main className="bg-sky-200 h-screen w-screen pt-10">
      <div className="
        w-fit h-fit mx-auto grid grid-cols-4 grid-rows-5 
        divide-x divide-y divide-gray-200
        rounded-2xl shadow-lg text-xl
      ">
        <input type="text" className="
          w-64 h-16 col-span-4 text-right px-4 rounded-t-2xl
          bg-gray-800 text-white font-mono
        "/>
        <Button bg="bg-gray-100">MR</Button>
        <Button bg="bg-gray-100">MW</Button>
        <Button bg="bg-gray-100">MC</Button>
        <Button bg="bg-gray-600 text-white">&divide;</Button>

        <Button>7</Button>
        <Button>8</Button>
        <Button>9</Button>
        <Button bg="bg-gray-600 text-white">&times;</Button>

        <Button>4</Button>
        <Button>5</Button>
        <Button>6</Button>
        <Button bg="bg-gray-600 text-white">&ndash;</Button>

        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
        <Button bg="bg-gray-600 text-white">+</Button>

        <Button rounded="rounded-bl-2xl">C</Button>
        <Button>0</Button>
        <Button>&#x2022;</Button>
        <Button rounded="rounded-br-2xl" bg="bg-orange-600 text-white">=</Button>
      </div>
    </main >
  )
}

export default App
