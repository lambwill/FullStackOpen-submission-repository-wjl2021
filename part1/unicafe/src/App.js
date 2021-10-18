import React, { useState } from 'react'

const Button = (props) => {
  console.log('Button: ', props)
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {
  console.log('Statistics: ', props)
  return (
    <div>
      <h1>statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.total()}</p>
      <p>average {props.mean()}</p>
      <p>positive {props.positive()} %</p>
    </div>
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
      <Statistics good={good} 
                  neutral={neutral} 
                  bad={bad} 
                  total={total}
                  mean={mean}
                  positive={positive}
                  />
    </div>
  )
}

export default App;
