import styled from "styled-components";
import { COLORS } from "../constants/style";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Button from "@mui/material/Button";

export const Page = styled.div`
  width: 100%;
  height: 100vh;
  background: ${COLORS.light_page};
  border: 1px solid transparent;
  font-family: "Roboto", sans-serif;
`;
export const Card = styled.div`
  width: 600px;
  min-height: 220px;
  margin: 10% auto;
  background: ${COLORS.light_card};
  box-shadow: 2px 6px 8px 2px ${COLORS.light_shadow};
  border-radius: 2px;
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
`;
export const InputArea = styled.div`
  width: 100%;
  border: 1px solid transparent;
  margin-top: 20px;
`;
export const Title = styled.div`
  padding: 20px 0px;
  font-size: 40px;
  font-weight: 600;
  text-align: center;
  color: ${COLORS.light_text_title};
`;
export const InputForm = styled.form`
  display: flex;
  justify-content: center;
`;
export const Input = styled.input`
  box-sizing: border-box;
  padding: 6px;
  font-size: 20px;
  font-family: "Maven Pro", sans-serif;
  color: ${COLORS.light_text_primary_highlight};
  border: none;
  margin-right: 18px;
  border-bottom: 1.5px solid transparent;
  border-radius: 0px;
  transition: linear 0.2s;
  &:focus {
    outline: none;
    border-bottom: 1.5px solid ${COLORS.light_shadow};
  }
`;
export const Submit = styled.button`
  cursor: pointer;
  border: none;
  color: ${COLORS.light_text_white};
  font-family: "Roboto", sans-serif;
  padding: 8px 20px;
  background: ${COLORS.light_func};
  font-size: 18px;
  &:hover {
    background: ${COLORS.light_func_hover};
  }
`;
export const TodoArea = styled.ul`
  width: 70%;
  margin: 20px auto;
  position: relative;
  right: 30px;
`;
export const TodoItem = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px 10px 10px;
  border-bottom: 1.5px solid transparent;
  transition: all 0.1s;
  &:hover {
    transform: translate(1px, 1px);
    cursor: pointer;
    border-bottom: 1.5px solid ${COLORS.light_shadow};
  }
  ${({ isDone }) =>
    isDone &&
    `      
      background: ${COLORS.light_checked};
    `}
  ${({ isDone, filter }) =>
    isDone &&
    filter === "ACTIVE" &&
    `
      display: none;
    `}
  ${({ isDone, filter }) =>
    !isDone &&
    filter === "COMPLETED" &&
    `
      display: none;
    `}
`;
export const Taskname = styled.div`
  flex: 1;
  font-size: 20px;
  font-family: "Maven Pro", sans-serif;
  color: ${COLORS.light_text_primary};
  text-decoration: ${(props) => (props.isDone ? "line-through" : "none")};
`;
export const Form = styled.form`
  display: flex;
  justify-content: space-between;
  flex: 1;
  padding: 0;
`;
export const FormInput = styled.input`
  font-size: 20px;
  font-family: "Maven Pro", sans-serif;
  color: ${COLORS.light_text_primary_edit};
  padding: 0;
  border: none;
  border-radius: 0px;
  transition: all 0.2s;
  &:focus {
    outline: none;
  }
`;
export const Edit = styled(EditOutlinedIcon)`
  cursor: pointer;
  padding: 8px;
  transition: all 0.1s;
  &:hover {
    color: ${COLORS.light_text_primary};
    transform: translate(1px, 1px);
  }
`;
export const Done = styled(DoneOutlinedIcon)`
  cursor: pointer;
  padding: 8px;
  transition: all 0.1s;
  &:hover {
    color: ${COLORS.light_text_primary};
    transform: translate(1px, 1px);
  }
`;
export const Remove = styled(DeleteOutlineIcon)`
  cursor: pointer;
  padding: 8px;
  transition: all 0.1s;
  &:hover {
    color: ${COLORS.light_text_primary};
    transform: translate(1px, 1px);
  }
`;
export const FilterBTNContainer = styled.div`
  display: ${({ todos }) => (todos.length ? "flex" : "none")};
  align-items: center;
  margin: 10px auto;
  font-size: 14px;
`;
export const FilterBTN = styled(Button)`
  margin: 0 4px;
  padding: 8px 16px;
  border-radius: 2px;
  color: ${COLORS.light_func};
  border: none;
  &:hover {
    background: ${COLORS.light_func_transparent};
  }
`;
export const FilterInfo = styled.div`
  padding: 8px 16px;
  color: ${COLORS.ligth_text_grey};
`;
