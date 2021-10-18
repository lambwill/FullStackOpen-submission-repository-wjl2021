import React, { useState } from 'react'

const Button = (props) => {
  console.log(props)
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = () => (
     good + neutral + bad
  )

  const mean = () => (
    good - bad / total()
  )

  const positive = () => (
    good / total() * 100
  )

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text='Good' />
      <Button handleClick={() => setNeutral(neutral+1)} text='Neutral' />
      <Button handleClick={() => setBad(bad+1)} text='Bad' />
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total()}</p>
      <p>average {mean()}</p>
      <p>positive {positive()} %</p>
    </div>
  )
}

export default App;
