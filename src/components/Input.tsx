import { styled } from "styled-components";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ITodo } from "../types";

type TIpuntProps = {
  setTodos: (value: ITodo[]) => void;
  todos: ITodo[];
};

export default function Input(props: TIpuntProps) {
  const [checked, setChecked] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const addTodo = () => {
    if (input !== "") {
      const updatedTodos = [
        { id: uuidv4(), todo: input, completed: checked, date: new Date() },
        ...props.todos,
      ];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      props.setTodos(updatedTodos);

      setInput("");
    }
  };
  return (
    <InputContainer>
      <NoteContainer>
        <div>
          <CheckBox
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
          ></CheckBox>
          <CustomCheckBox></CustomCheckBox>
        </div>
        <TodoInput
          placeholder="Note"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></TodoInput>
      </NoteContainer>
      <Add onClick={addTodo}></Add>
    </InputContainer>
  );
}

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NoteContainer = styled.div`
  width: 27.5rem;
  padding: 1.2rem 1.4rem;
  background: #ebeff2;
  display: flex;
  align-items: center;
  gap: 1rem;
  border-radius: 5px;
`;

export const CheckBox = styled.input`
  width: 2.4rem;
  height: 2.4rem;
  appearance: none;
  position: absolute;
  cursor: pointer;

  &:checked {
    & + div {
      background-image: url("/check.png");
      background-position: center;
      background-size: cover;
      border: none;
      background-repeat: no-repeat;
    }
  }
`;

export const CustomCheckBox = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  border: 2px solid #20eeb0;
`;

const TodoInput = styled.input`
  font-family: "Inter", sans-serif;
  font-size: 1.6rem;
  line-height: normal;
  font-weight: 400;
  border: none;
  background: transparent;
  outline: none;
`;

const Add = styled.div`
  width: 8.8rem;
  height: 4.9rem;
  background: #20eeb0;
  background-image: url("/add.svg");
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 5px;
  cursor: pointer;
`;
