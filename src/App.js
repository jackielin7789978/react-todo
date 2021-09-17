import styled from "styled-components";
import { COLORS } from "./constants/style";
import { useState, useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";

const Page = styled.div`
  width: 100%;
  height: 100vh;
  background: ${COLORS.light_page};
  border: 1px solid transparent;
  font-family: "Maven Pro", sans-serif;
`;
const Card = styled.div`
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
const InputArea = styled.div`
  width: 100%;
  border: 1px solid transparent;
`;
const Title = styled.div`
  padding: 20px 0px;
  font-size: 40px;
  font-weight: 600;
  text-align: center;
  color: ${COLORS.light_text_primary};
`;
const InputForm = styled.form`
  display: flex;
  justify-content: center;
`;
const Input = styled.input`
  box-sizing: border-box;
  padding: 6px;
  font-size: 20px;
  font-family: "Maven Pro", sans-serif;
  color: ${COLORS.light_text_primary_highlight};
  border: none;
  border-bottom: 1px solid ${COLORS.light_shadow};
  margin-right: 18px;
  &:focus {
    outline: none;
  }
`;
const Submit = styled.input`
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
const TodoArea = styled.div`
  width: 60%;
  margin: 20px auto;
`;
const TodoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  div {
    display: flex;
    align-items: center;
  }
`;
const Checkbox = styled.div`
  width: 20px;
  color: ${COLORS.light_func};
`;
const Remove = styled.div`
  color: ${COLORS.light_shadow};
`;
const Taskname = styled.div`
  font-size: 22px;
  color: ${COLORS.light_text_primary};
`;

function Todo({ todo }) {
  return (
    <TodoItem>
      <div>
        <Checkbox>O</Checkbox>
        <Taskname>{todo.taskname}</Taskname>
      </div>
      <Remove>X</Remove>
    </TodoItem>
  );
}

const addTodoToLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

let id = 1;
export default function App() {
  const [inputVal, setInputVal] = useState("");
  const [todos, setTodos] = useState([]);
  const handleInputSubmit = (e) => {
    e.preventDefault();
    setTodos([
      {
        id,
        taskname: inputVal,
      },
      ...todos,
    ]);
    setInputVal("");
    id++;
  };
  useEffect(() => {
    addTodoToLocalStorage(todos);
  }, [todos]);

  useLayoutEffect(() => {
    let data = localStorage.getItem("todos") || "";
    if (data) {
      setTodos(JSON.parse(data));
    }
  }, []);

  return (
    <Page>
      <Card>
        <InputArea>
          <Title>TODO</Title>
          <InputForm onSubmit={handleInputSubmit}>
            <Input
              type="text"
              autoFocus={true}
              placeholder="Type something here..."
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
              }}
            />
            <Submit type="submit" value="ADD" />
          </InputForm>
        </InputArea>
        <TodoArea>
          <TodoItem>
            <div>
              <Checkbox>O</Checkbox>
              <Taskname>Grocery Shopping</Taskname>
            </div>
            <Remove>X</Remove>
          </TodoItem>
          {todos.map((todo) => (
            <Todo todo={todo} />
          ))}
        </TodoArea>
      </Card>
    </Page>
  );
}
