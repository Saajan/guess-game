import React, { useState, useEffect } from 'react';
import { InputNumber } from 'antd';
import './App.css';

function App() {
  const [guess, setGuess] = useState<number | null>(null);
  const randomArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => .5 - Math.random());

  return (
    <div className="App">
      <InputNumber min={1} max={9} onChange={(newNumber: number) => setGuess(newNumber)} />
      {guess ?
        <Matrix randomArray={randomArray} guess={guess} setGuess={setGuess} />
        :
        <div>Please enter a number</div>
      }
    </div>
  );
}

interface MatrixProps {
  randomArray: number[];
  guess: number | null;
  setGuess: (newGuess: number | null) => void;
}

const Matrix = ({ randomArray, guess, setGuess }: MatrixProps) => {
  const [flipped, setFlipped] = useState<number[] | []>([]);
  const onFlipHandle = (item: number) => {
    setFlipped([...flipped, item]);
  };

  useEffect(() => {
    setTimeout(() => {
      if (flipped.includes(guess as never)) {
        alert('You win!');
        setGuess(null);
        setFlipped([]);
      }

      if (flipped.length === 3 && !flipped.includes(guess as never)) {
        alert('You lose!');
        setGuess(null);
        setFlipped([]);
      }
    }, 100)
  }, [flipped]);

  return (
    <div className="cardContainer">
      {randomArray.map((item: number, index: number) => {
        if (flipped.includes(item as never)) {
          return <div className="card" key={index}>{item}</div>
        } else {
          return <div className="card" key={index} onClick={() => onFlipHandle(item)}></div>
        }
      })}
    </div>
  );
}


export default App;
