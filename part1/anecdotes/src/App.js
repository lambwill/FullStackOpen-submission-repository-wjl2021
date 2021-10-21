import React, { useState } from 'react'

function getRandomInt(min, max) {
  // from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function indexOfMax(arr) {
  // from https://stackoverflow.com/questions/11301438/return-index-of-greatest-value-in-an-array/11301464
  if (arr.length === 0) {
      return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
          maxIndex = i;
          max = arr[i];
      }
  }

  return maxIndex;
}

const Button = ({ text, clickHandler}) => (
  <button onClick={clickHandler}>{text}</button>
)

const Anecdote = (props) => (
  <div>
    <p>{props.anecdotes[props.selected]}</p>
    <p>has {props.points[props.selected]} votes</p>
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const [selected, setSelected] = useState(0)
  const initialPoints = new Array(anecdotes.length).fill(0)
  const [points, setPoints] = useState(initialPoints)

  const nextAnecdote = () => {
    const randomInt = getRandomInt(0,anecdotes.length - 1)
    setSelected(randomInt)
  }

  const vote = () => {
    const pointsCopy = [...points]
    pointsCopy[selected] += 1
    setPoints(pointsCopy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} points={points} selected={selected}/>
      <Button text="vote" clickHandler={vote} />
      <Button text="next anecdote" clickHandler={nextAnecdote} />
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdotes={anecdotes} points={points} selected={indexOfMax(points)}/>
      
    </div>
  )

}

export default App;
