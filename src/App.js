import { useState, useEffect } from "react";
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
  FilterInfo,
} from "./components/styledApp";
import { COLORS } from "./constants/style";

function Todo({ todo, handleRemove, handleCheckboxChange, filter }) {
  return (
    <TodoItem isDone={todo.isDone} filter={filter}>
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
  handleCheckboxChange: PropTypes.func,
  filter: PropTypes.string,
};

let id = 3;
export default function App() {
  const [filter, setFilter] = useState("ALL");
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
  useEffect(() => {
    console.log(todos);
  });
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
              filter={filter}
            />
          ))}
        </TodoArea>
        <FilterBTNContainer todos={todos}>
          <FilterInfo>filter: {filter}</FilterInfo>
          <FilterBTN
            onClick={() => {
              setFilter("ALL");
              setTodos(todos);
            }}
          >
            all
          </FilterBTN>
          <FilterBTN
            onClick={() => {
              setFilter("ACTIVE");
              setTodos(todos);
            }}
          >
            active
          </FilterBTN>
          <FilterBTN
            onClick={() => {
              setFilter("COMPLETED");
              setTodos(todos);
            }}
          >
            completed
          </FilterBTN>
        </FilterBTNContainer>
      </Card>
    </Page>
  );
}
