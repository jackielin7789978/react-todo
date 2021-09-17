import { useEffect, useState } from "react";
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
  FilterBTNContainer,
  FilterBTN,
} from "./components/styledApp";
import { COLORS } from "./constants/style";

function Todo({ todo, handleRemove, handleCheckboxChange }) {
  return (
    <TodoItem $isDone={todo.isDone}>
      {todo.isDone && (
        <Checkbox
          defaultChecked
          sx={{
            "&.Mui-checked": {
              color: COLORS.light_func,
            },
          }}
          onChange={() => {
            handleCheckboxChange(todo.id);
          }}
        />
      )}
      {todo.isDone || (
        <Checkbox
          sx={{
            "&.Mui-checked": {
              color: COLORS.light_func,
            },
          }}
          onChange={() => {
            handleCheckboxChange(todo.id);
          }}
        />
      )}
      <Taskname $isDone={todo.isDone}>{todo.taskname}</Taskname>
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

let id = 3;
export default function App() {
  const [filter, setFilter] = useState("all");
  const [inputVal, setInputVal] = useState("");
  const [todos, setTodos] = useState([
    {
      id: 1,
      taskname: "吃早餐",
      isDone: true,
    },
    {
      id: 2,
      taskname: "吃午餐",
      isDone: false,
    },
  ]);
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
              placeholder="Add a task here..."
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
              }}
            />
            <Submit type="submit" variant="contained">
              ADD
            </Submit>
          </InputForm>
        </InputArea>
        <TodoArea id="sortable">
          {todos.map((todo) => (
            <Todo
              className="ui-state-default"
              key={todo.id}
              handleRemove={handleRemove}
              handleCheckboxChange={handleCheckboxChange}
              todo={todo}
            />
          ))}
        </TodoArea>
        <FilterBTNContainer>
          <FilterBTN
            onClick={() => {
              setFilter("all");
            }}
          >
            all
          </FilterBTN>
          <FilterBTN
            onClick={() => {
              setFilter("active");
            }}
          >
            active
          </FilterBTN>
          <FilterBTN
            onClick={() => {
              setFilter("completed");
            }}
          >
            completed
          </FilterBTN>
        </FilterBTNContainer>
      </Card>
    </Page>
  );
}
