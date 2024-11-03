import { useState, useEffect } from 'react';
import '../styles/DiceRoller.css';

const DiceRoller = () => {
  const [selectedDice, setSelectedDice] = useState([]);
  const [rollResults, setRollResults] = useState([]);
  const [total, setTotal] = useState(0);
  const [incrementValue, setIncrementValue] = useState(0);
  const [applyPerDice, setApplyPerDice] = useState(false);
  const [removeAnimatingIndex, setRemoveAnimatingIndex] = useState(null);

  const diceTypes = [
    { label: 'D2', sides: 2, color: '#FFD700' },
    { label: 'D3', sides: 3, color: '#FF4500' },
    { label: 'D4', sides: 4, color: '#FF6347' },
    { label: 'D6', sides: 6, color: '#6495ED' },
    { label: 'D8', sides: 8, color: '#32CD32' },
    { label: 'D10', sides: 10, color: '#BA55D3' },
    { label: 'D12', sides: 12, color: '#FF69B4' },
    { label: 'D20', sides: 20, color: '#FF8C00' },
    { label: 'D100', sides: 100, color: '#1E90FF' }
  ];

  const rollDice = (sides) => Math.floor(Math.random() * sides) + 1;

  const addDice = (sides) => {
    setSelectedDice((prev) => [...prev, sides]);
    setRollResults((prev) => [...prev, { sides, value: rollDice(sides) }]);
  };

  const removeDiceAtIndex = (index) => {
    if (selectedDice.length) {
      setRemoveAnimatingIndex(index);
      setTimeout(() => {
        setSelectedDice((prev) => {
          const newSelectedDice = [...prev];
          newSelectedDice.splice(index, 1); // Remove the specific die
          return newSelectedDice;
        });
        setRollResults((prev) => {
          const newRollResults = [...prev];
          newRollResults.splice(index, 1); // Remove the corresponding result
          return newRollResults;
        });
        setRemoveAnimatingIndex(null);
      }, 300);
    }
  };

  const removeLastDice = () => {
    if (selectedDice.length) {
      // Always remove the last die
      const lastIndex = selectedDice.length - 1;
      removeDiceAtIndex(lastIndex);
    }
  };

  const resetDice = () => {
    setRemoveAnimatingIndex('all');
    setTimeout(() => {
      setSelectedDice([]);
      setRollResults([]);
      setTotal(0);
      setIncrementValue(0);
      setRemoveAnimatingIndex(null);
    }, 300);
  };

  useEffect(() => {
    const incrementAmount = applyPerDice ? incrementValue * rollResults.length : incrementValue;
    const diceTotal = rollResults.reduce((acc, roll) => acc + roll.value, 0);
    setTotal(diceTotal + incrementAmount);
  }, [incrementValue, applyPerDice, rollResults]);

  return (
    <div className="dice-roller">
      <div className="roll-display">
        <div className="roll-results">
          {rollResults.map((roll, index) => (
            <div
              key={index}
              className={`roll-result animate ${removeAnimatingIndex === index || removeAnimatingIndex === 'all' ? 'exit' : 'enter'}`}
              style={{ backgroundColor: diceTypes.find(die => die.sides === roll.sides)?.color || '#ddd' }}
              onClick={() => removeDiceAtIndex(index)} // Add onClick handler here
            >
              {roll.value}
            </div>
          ))}
        </div>
        <div className="total">Total<span>:</span> <span>{total}</span></div>
      </div>

      <div className="dice-buttons">
        {diceTypes.map(({ label, sides, color }) => (
          <button
            key={label}
            className="dice-button"
            style={{ backgroundColor: color }}
            onClick={() => addDice(sides)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className='grouper'>
        <div className="increment-control">
          <button onClick={() => setIncrementValue((prev) => prev + 1)} className="increment-button">+</button>
          <input 
            type="number" 
            value={incrementValue} 
            onChange={(e) => setIncrementValue(Number(e.target.value))}
            className="increment-input" 
          />
          <button onClick={() => setIncrementValue((prev) => prev - 1)} className="increment-button">−</button>
        </div>

        <div className="increment-mode">
          <label>
              <input 
                  type="radio" 
                  name="incrementMode" 
                  value="once" 
                  checked={!applyPerDice} 
                  onChange={() => setApplyPerDice(false)} 
              />
              <span></span> 
              Apply Once
          </label>
          <label>
              <input 
                  type="radio" 
                  name="incrementMode" 
                  value="perDice" 
                  checked={applyPerDice} 
                  onChange={() => setApplyPerDice(true)} 
              />
              <span></span> 
              Apply Per Dice
          </label>
        </div>
      </div>

      <div className="control-buttons">
        <button className="roll-button" onClick={() => setRollResults(selectedDice.map(sides => ({ sides, value: rollDice(sides) })))}>Roll</button>
        <button className="remove-button" onClick={removeLastDice}>Remove Last</button>
        <button className="reset-button" onClick={resetDice}>Clear</button>
      </div>
    </div>
  );
};

export default DiceRoller;
