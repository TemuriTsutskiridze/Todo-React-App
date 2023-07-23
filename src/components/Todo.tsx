import { styled } from "styled-components";

import { CheckBox } from "./Input";
import { CustomCheckBox } from "./Input";

import DeleteIcon from "../assets/delete.svg";

export default function Todo() {
  return (
    <TodoContainer>
      <InfoContainer>
        <Task>Dinner</Task>
        <Time>Today at 8:00 PM</Time>
      </InfoContainer>
      <Buttons>
        <div>
          <CheckBox type="checkbox"></CheckBox>
          <CustomCheckBox></CustomCheckBox>
        </div>
        <img src={DeleteIcon} alt="delete icon" style={{ cursor: "pointer" }} />
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
