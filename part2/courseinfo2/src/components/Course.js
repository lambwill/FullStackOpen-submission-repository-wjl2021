import React from 'react';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const reducer = (previousValue, part) => previousValue + part.exercises
  const sum = course.parts.reduce(reducer, 0)
  return(
    <p>Number of exercises {sum}</p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      {course.parts.map(part => 
        <Part part={part} key={part.id}/>)}
      <Total course={course} />
    </div>
  )
}


export default Course

