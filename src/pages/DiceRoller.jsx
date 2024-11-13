// Made by Benjamin
import { useState, useEffect } from 'react';
import '../styles/DiceRoller.css';

// Main component for the Dice Roller
const DiceRoller = () => {
  // State variables to manage selected dice, roll results, total score, and other settings
  const [selectedDice, setSelectedDice] = useState([]); // Stores types of dice added
  const [rollResults, setRollResults] = useState([]); // Stores the results of each dice roll
  const [total, setTotal] = useState(0); // Sum of all dice rolls and increments
  const [incrementValue, setIncrementValue] = useState(0); // Value to be added to each roll
  const [applyPerDice, setApplyPerDice] = useState(false); // Whether to apply increment per dice or once
  const [removeAnimatingIndex, setRemoveAnimatingIndex] = useState(null); // Controls animation when removing dice

  // Array of dice types with properties (label, sides, color)
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

  // Function to roll a single die, returns a random number from 1 to the number of sides
  const rollDice = (sides) => Math.floor(Math.random() * sides) + 1;

  // Adds a selected die type to the list and rolls it immediately
  const addDice = (sides) => {
    setSelectedDice((prev) => [...prev, sides]); // Add the die to the selected list
    setRollResults((prev) => [...prev, { sides, value: rollDice(sides) }]); // Roll the die and add the result
  };

  // Removes a die and its result by index with an animation
  const removeDiceAtIndex = (index) => {
    if (selectedDice.length) {
      setRemoveAnimatingIndex(index); // Trigger animation for removal
      setTimeout(() => {
        // Remove the die from selected dice and roll results after animation
        setSelectedDice((prev) => {
          const newSelectedDice = [...prev];
          newSelectedDice.splice(index, 1); // Remove the specific die by index
          return newSelectedDice;
        });
        setRollResults((prev) => {
          const newRollResults = [...prev];
          newRollResults.splice(index, 1); // Remove the corresponding roll result
          return newRollResults;
        });
        setRemoveAnimatingIndex(null); // Reset animation state
      }, 300); // 300ms animation delay
    }
  };

  // Removes the last die in the list
  const removeLastDice = () => {
    if (selectedDice.length) {
      const lastIndex = selectedDice.length - 1; // Get index of last die
      removeDiceAtIndex(lastIndex); // Remove the last die
    }
  };

  // Clears all dice, rolls, and totals
  const resetDice = () => {
    setRemoveAnimatingIndex('all'); // Trigger 'all' removal animation
    setTimeout(() => {
      // Reset all states after animation
      setSelectedDice([]);
      setRollResults([]);
      setTotal(0);
      setIncrementValue(0);
      setRemoveAnimatingIndex(null); // Reset animation state
    }, 300);
  };

  // Calculates the total whenever increment value, mode, or roll results change
  useEffect(() => {
    const incrementAmount = applyPerDice ? incrementValue * rollResults.length : incrementValue; // Calculate total increment
    const diceTotal = rollResults.reduce((acc, roll) => acc + roll.value, 0); // Sum up all roll results
    setTotal(diceTotal + incrementAmount); // Update the total score
  }, [incrementValue, applyPerDice, rollResults]); // Dependencies for re-running calculation

  return (
    <div className="dice-roller">
      {/* Display area for roll results and total */}
      <div className="roll-display">
        <div className="roll-results">
          {rollResults.map((roll, index) => (
            <div
              key={index}
              className={`roll-result animate ${removeAnimatingIndex === index || removeAnimatingIndex === 'all' ? 'exit' : 'enter'}`}
              style={{ backgroundColor: diceTypes.find(die => die.sides === roll.sides)?.color || '#ddd' }}
              onClick={() => removeDiceAtIndex(index)} // Allow individual dice removal on click
            >
              {roll.value}
            </div>
          ))}
        </div>
        <div className="total">Total<span>:</span> <span>{total}</span></div>
      </div>

      {/* Buttons to add different types of dice */}
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

      {/* Increment control for adjusting the additional value */}
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

        {/* Toggle between applying increment once or per dice */}
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

      {/* Buttons to roll all dice, remove last dice, and clear all */}
      <div className="control-buttons">
        <button className="roll-button" onClick={() => setRollResults(selectedDice.map(sides => ({ sides, value: rollDice(sides) })))}>Roll</button>
        <button className="remove-button" onClick={removeLastDice}>Remove Last</button>
        <button className="reset-button" onClick={resetDice}>Clear</button>
      </div>
    </div>
  );
};

export default DiceRoller;
