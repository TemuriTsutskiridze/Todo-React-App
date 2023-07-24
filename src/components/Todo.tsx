import { styled } from "styled-components";

import { CheckBox } from "./Input";
import { CustomCheckBox } from "./Input";
import { ITodo } from "../types";

import DeleteIcon from "../assets/delete.svg";
import { isToday, isYesterday } from "date-fns";

interface TodoProps {
  todo: ITodo;
  setTodos: (value: ITodo[]) => void;
  todos: ITodo[];
}

export default function Todo(props: TodoProps) {
  console.log(typeof props.todo.date);
  return (
    <TodoContainer>
      <InfoContainer>
        <Task>{props.todo.todo}</Task>
        <Time>
          {isToday(new Date(props.todo.date))
            ? "Today"
            : isYesterday(new Date(props.todo.date))
            ? "Yesterday"
            : new Date(props.todo.date).getDate() +
              " " +
              new Date(props.todo.date).toLocaleString("en-US", {
                month: "short",
              })}{" "}
          at{" "}
          {`${new Date(props.todo.date).getHours() ?? "00"}:${
            new Date(props.todo.date).getMinutes() ?? "00"
          }${
            new Date(props.todo.date).getHours() !== undefined &&
            new Date(props.todo.date).getHours() >= 12
              ? "PM"
              : "AM"
          }`}
        </Time>
      </InfoContainer>
      <Buttons>
        <div>
          <CheckBox
            type="checkbox"
            checked={props.todo.completed}
            onChange={() => {
              const updatedTodos = props.todos.map((todo) =>
                todo.id === props.todo.id
                  ? { ...todo, completed: !todo.completed }
                  : todo
              );
              localStorage.setItem("todos", JSON.stringify(updatedTodos));
              props.setTodos(updatedTodos);
            }}
          ></CheckBox>
          <CustomCheckBox></CustomCheckBox>
        </div>
        <img
          src={DeleteIcon}
          alt="delete icon"
          style={{ cursor: "pointer" }}
          onClick={() => {
            const updatedTodos = props.todos.filter(
              (todo) => todo.id !== props.todo.id
            );
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            props.setTodos(updatedTodos);
          }}
        />
      </Buttons>
    </TodoContainer>
  );
}

const TodoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-family: "Inter", sans-serif;
  line-height: normal;
`;

const Task = styled.p`
  font-size: 1.8rem;
  color: #0d0d0d;
  font-weight: 500;
`;

const Time = styled.p`
  font-size: 1.4rem;
  font-weight: 400;
  color: #888;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 1.4rem;
`;
