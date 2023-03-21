import '../App.css';
import React, { useState } from 'react';


function BowlingScoreCalculator() {
  const [result, setResult] = useState();

  return (
    <div id="colourGenerator" className="App">            
    <div className='project-title'>
      <h1>Bowling Score Calculator</h1>
    </div>
      <form onSubmit={handleSubmit}>
        <label>
          Bowling Score Sheet: (e.g. 10,1,0,9,3,2)
          <input name="scoreInput"/>
        </label>
        <button type="submit">Calculate</button>
        <button type="reset">Clear</button>
      </form>
        
      Result : {result}
    </div>
  );


  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    const result = calculateScore(formJson.scoreInput);

    setResult(result);

  }

  function calculateScore(rollsList) {
    let rolls = rollsList.split(',');

    console.log(rolls);

    let score = 0;
    // loop in frames of 2
    for (let i=0; i<rolls.length; i+=2) {
      console.log(score);

      let roll1 = parseInt(rolls[i]);
      let roll2 = parseInt(rolls[i+1]);

      
      // not strike or spare
      if (roll1 + roll2 < 10) {
        score = score + roll1 + roll2;
        continue;
      }

      if (i+2 < rolls.length) {
        let roll3 = parseInt(rolls[i+2])

        // is strike
        if (roll1 === 10) {
          score = score + 10 + roll2 + roll3;
          //frame was only 1 length
          i -= 1;
          continue;
        }

        // is spare
        if (roll1 + roll2 === 10) {
          score = score + 10 + roll3
          continue;
        }
      }

    }

    return score;
  }

}



export default BowlingScoreCalculator;