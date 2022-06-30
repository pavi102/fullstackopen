const Header = props => {
  return <h1>{props.coursename}</h1>;
};

const Part = props => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Content = props => {
  return props.parts.map(item => (
    <Part key={item.name} name={item.name} exercises={item.exercises} />
  ));
};

const Total = props => {
  return (
    <p>
      Number of exercises{" "}
      {props.parts.reduce((acc, curr) => acc + curr.exercises, 0)}
    </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header coursename={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
