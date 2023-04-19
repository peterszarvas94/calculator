import { useQuery } from '@tanstack/react-query';

function App() {

  const { status, data, error } = useQuery(['test'], async () => {
    const res = await fetch('http://localhost:3000/');
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    return res.json();
  });

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'error') {
    console.log(error);
    return <div>Error</div>
  }

  console.log(data);

  return (
    <div className="text-red-400">
      yeas
    </div>
  )
}

export default App
