import React, { useState } from 'react'

const Button = (props) => {
  console.log('Button: ', props)
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticsLine = ({ text, value}) => {
  console.log('StatisticsLine: |', 'text:', text, '| value: ', value)
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  console.log('Statistics: ', props)
  if (props.total() === 0) {
      return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
        <StatisticsLine text="good " value ={props.good} />
        <StatisticsLine text="neutral " value ={props.neutral} />
        <StatisticsLine text="bad " value ={props.bad} />
        <StatisticsLine text="all " value ={props.total()} />
        <StatisticsLine text="average " value ={props.mean()} />
        <StatisticsLine text="positive " value ={props.positive() + ' %'} />
          
        </tbody>
      </table>
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
