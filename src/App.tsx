import { styled } from "styled-components";
import { useState, useEffect } from "react";

import HelmetHeader from "./components/HelmetHeader";
import GlobalStyles from "./Globals/Globals";
import Input from "./components/Input";
import Todo from "./components/Todo";
import { ITodo } from "./types";

function App() {
  const [time, setTime] = useState<Date | null>(null);
  const [todos, setTodos] = useState<ITodo[]>(
    JSON.parse(localStorage.getItem("todos") ?? "[]")
  );
  const [filter, setFilter] = useState<string>("All");

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  const getTime = () => {
    const dateObj = new Date();
    setTime(dateObj);
  };

  useEffect(() => {
    getTime();
    const interval = setInterval(getTime, 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const FilteredTodos =
    filter === "All"
      ? todos
      : filter === "Active"
      ? todos.filter((todo) => todo.completed === false)
      : filter === "Completed"
      ? todos.filter((todo) => todo.completed === true)
      : null;

  return (
    <>
      <HelmetHeader />
      <GlobalStyles />

      <Main>
        <Title>Todo</Title>

        <TodoContainer>
          <TimeContainer>
            <p style={{ fontSize: "1.8rem" }}>
              {daysOfWeek[time?.getDay() ?? "0"]} {time?.getDate()}
            </p>
            <p>
              {`${time?.getHours() ?? "00"}:${time?.getMinutes() ?? "00"}${
                time?.getHours() !== undefined && time?.getHours() >= 12
                  ? "PM"
                  : "AM"
              }`}
            </p>
          </TimeContainer>

          <TasksContainer>
            <Input setTodos={setTodos} todos={todos} />
            {FilteredTodos?.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                setTodos={setTodos}
                todos={todos}
              />
            ))}
          </TasksContainer>
          <FilterContainer>
            <p onClick={() => setFilter("Active")}>Active</p>
            <p onClick={() => setFilter("Completed")}>Completed</p>
            <p onClick={() => setFilter("All")}>All</p>
          </FilterContainer>
        </TodoContainer>
      </Main>
    </>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 5rem;
  align-items: center;
  justify-content: center;
  padding: 3rem 0;
  min-height: 100vh;
  background: #eee;

  @media only screen and (min-width: 60em) {
    flex-direction: row;
    padding: 7rem 0;
    gap: 10rem;
  }
`;

const Title = styled.h1`
  font-size: 9.6rem;
  line-height: normal;
  color: #007fdb;
  font-family: "Inter", sans-serif;
`;

const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 43rem;
  border-radius: 10px;
  overflow: hidden;
`;

const TimeContainer = styled.div`
  width: 100%;
  padding: 11.4rem 2.8rem 1.3rem 21rem;
  font-family: "Russo One", sans-serif;
  font-weight: 400;
  background-image: url("/flowers.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  font-size: 4.8rem;
  line-height: normal;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TasksContainer = styled.div`
  width: 100%;
  padding: 2.3rem 2.8rem 7.8rem;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 3.6rem;
  font-family: "Inter", sans-serif;
  font-weight: 400;
  line-height: normal;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  font-family: "Inter", sans-serif;
  font-size: 2rem;
  line-height: normal;
  font-weight: 400;
  color: gray;
  margin-top: 2rem;

  & p {
    cursor: pointer;
  }
`;

export default App;
