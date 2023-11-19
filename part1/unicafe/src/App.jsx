import { useState } from 'react'

const Button = (props) => {
  return (
  <button onClick={props.fbHandler}>{props.btnName}</button>
)}

const Statistics = (props) => {
  if(props.total === 0)
  {
    return(<p>No feedback given</p>)
  }
  else{
    return(
      <div>
      <p>Good:  {props.good}</p>
      <p>Neutral:  {props.neutral}</p>
      <p>Bad:  {props.bad}</p>
      <p>All:  {props.total}</p>
      <p>Average {(props.good * 1 + props.neutral * 0 + props.bad * -1) / props.total}</p>
      <p>Positive {props.good /props.total * 100} </p>
      </div>
    )
  }
}

const App = () => {
  
const goodHandler = () => {
  setGood(good + 1)
  setTotal(total + 1)
}

const neutralHandler = () => {
  setNeutral(neutral + 1)
  setTotal(total + 1)
}

const badHandler = () => {
  setBad(bad + 1)
  setTotal(total + 1)
}


  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  return (
    <>
      <div>
      <h1>Give feedback</h1>
      <Button btnName={"Good 😊"} fbHandler={goodHandler} />
      <Button btnName={"Neutral 😐"} fbHandler={neutralHandler} />
      <Button btnName={"Bad 😞"} fbHandler={badHandler} />
      </div>
      <div>
        <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} total={total}/> 
      </div>
    </>
  )
}

export default App