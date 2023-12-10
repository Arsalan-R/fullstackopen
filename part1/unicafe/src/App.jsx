import { useState } from 'react'

const Button = (props) => {
  return (
  <button onClick={props.fbHandler}>{props.btnName}</button>
)}

const StatisticLine = (props) =>{
  return(
  <tr>
    <td>{props.text}:</td>
    <td>{props.value}</td>
  </tr>

  )
}

const Statistics = (props) => {
  if(props.total === 0)
  {
    return(<p>No feedback given</p>)
  }
  else{
    return(
      <table>
        <tbody>
        <StatisticLine text="Good" value={props.good} />
        <StatisticLine text="Neutral" value={props.neutral} />
        <StatisticLine text="Bad" value={props.bad} />
        <StatisticLine text="All" value={props.total} />
        <StatisticLine text="Average" value={(props.good * 1 + props.bad * -1) / props.total} />
        <StatisticLine text="Positive" value={props.good /props.total * 100} />
        </tbody>
      </table>
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