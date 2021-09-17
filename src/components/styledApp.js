import styled from "styled-components";
import { COLORS } from "../constants/style";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export const Page = styled.div`
  width: 100%;
  height: 100vh;
  background: ${COLORS.light_page};
  border: 1px solid transparent;
  font-family: "Maven Pro", sans-serif;
`;
export const Card = styled.div`
  width: 600px;
  min-height: 300px;
  margin: 140px auto;
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
  margin-top: 10px;
`;
export const Title = styled.div`
  padding: 20px 0px;
  font-size: 40px;
  font-weight: 600;
  text-align: center;
  color: ${COLORS.light_text_primary};
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
export const Submit = styled.input`
  box-sizing: border-box;
  padding: 6px 18px;
  font-size: 20px;
  font-family: "Maven Pro", sans-serif;
  border: none;
  color: ${COLORS.light_text_white};
  background: ${COLORS.light_func};
  cursor: pointer;
  transition: all 0.2s;
  :hover {
    background: ${COLORS.light_func_hover};
  }
`;
export const TodoArea = styled.div`
  width: 60%;
  margin: 20px auto;
`;
export const TodoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  margin: 10px 0px;
  div {
    display: flex;
    align-items: center;
  }
  ${(props) =>
    props.$isDone &&
    `
    background: rgba(170, 170, 170, 0.1);
  `}
`;
export const Taskname = styled.div`
  font-size: 22px;
  color: ${COLORS.light_text_primary};
  ${(props) =>
    props.$isDone &&
    `
    text-decoration: line-through;
    color: ${COLORS.light_shadow}
  `}
`;
export const Remove = styled(DeleteOutlineIcon)`
  cursor: pointer;
  padding: 6px;
`;
