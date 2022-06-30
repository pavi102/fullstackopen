const Header = props => {
  return <h2>{props.coursename}</h2>;
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
    <Part key={item.id} name={item.name} exercises={item.exercises} />
  ));
};

const Total = props => {
  return (
    <p>
      <strong>
        total of {props.parts.reduce((acc, curr) => acc + curr.exercises, 0)}{" "}
        exercises
      </strong>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header coursename={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};
export default Course;
