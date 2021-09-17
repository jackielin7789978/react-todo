import { COLORS } from "./constants/style";
import { useState, useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";
import {
  Page,
  Card,
  InputArea,
  Title,
  InputForm,
  Input,
  Submit,
  TodoArea,
  TodoItem,
  Taskname,
  Remove,
} from "./components/styledApp";

function Todo({ todo, handleRemove, handleCheckboxChange }) {
  return (
    <TodoItem $isDone={todo.isDone}>
      <div>
        <Checkbox
          onChange={() => {
            handleCheckboxChange(todo.id);
          }}
          sx={{
            color: COLORS.light_func,
            "&.Mui-checked": {
              color: `${COLORS.light_func}`,
            },
          }}
        />
        <Taskname $isDone={todo.isDone}>{todo.taskname}</Taskname>
      </div>
      <Remove
        onClick={() => {
          handleRemove(todo.id);
        }}
      />
    </TodoItem>
  );
}

Todo.propTypes = {
  todo: PropTypes.object,
  hadleRemove: PropTypes.func,
};

const addTodoToLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

let id = 1;
export default function App() {
  const [inputVal, setInputVal] = useState("");
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    addTodoToLocalStorage(todos);
  }, [todos]);

  useLayoutEffect(() => {
    let data = localStorage.getItem("todos") || "";
    if (data) {
      setTodos(JSON.parse(data));
    }
  }, []);

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (inputVal === "") {
      alert("Please enter a task!");
      return;
    }
    setTodos([
      {
        id,
        taskname: inputVal,
        isDone: false,
      },
      ...todos,
    ]);
    setInputVal("");
    id++;
  };
  const handleRemove = (id) => {
    const data = todos.filter((todo) => {
      return id !== todo.id;
    });
    setTodos(data);
  };
  const handleCheckboxChange = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          isDone: !todo.isDone,
        };
      })
    );
  };

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
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              handleRemove={handleRemove}
              handleCheckboxChange={handleCheckboxChange}
              todo={todo}
            />
          ))}
        </TodoArea>
      </Card>
    </Page>
  );
}
