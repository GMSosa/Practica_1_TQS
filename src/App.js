import { useEffect, useState } from 'react';
import Cards from './components/Cards'

function App() {
  const [score, setScore] = useState(0);
  const [winner, setWinner] = useState(false);

  function Won()
  {
    if(score === 6)
    {
      setWinner(true);
    }
  }

  useEffect(() => {
    Won();
  })

  return (
    <div className="App">
      <Cards score={score} />
    </div>
  );
}

export default App;