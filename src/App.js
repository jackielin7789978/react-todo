import { useState } from "react";
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
  Form,
  FormInput,
  Edit,
  Done,
  Remove,
  FilterBTNContainer,
  FilterBTN,
  FilterInfo,
} from "./components/styledApp";
import { COLORS } from "./constants/style";

function EditForm({ todo, todos, setTodos }) {
  const [newInputVal, setNewInputVal] = useState(todo.taskname);
  const handleEdit = (id, input) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        return {
          ...todo,
          taskname: input,
          isBeingEdited: false,
        };
      })
    );
  };
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleEdit(todo.id, newInputVal);
      }}
    >
      <FormInput
        autoFocus
        value={newInputVal}
        onChange={(e) => {
          setNewInputVal(e.target.value);
        }}
      />
      <Done
        onClick={() => {
          handleEdit(todo.id, newInputVal);
        }}
      />
    </Form>
  );
}

function Todo({ todo, todos, setTodos, filter }) {
  const handleStartEdit = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo;
        // 不能編輯已完成的 todo
        if (todo.isDone) return todo;
        return {
          ...todo,
          isBeingEdited: true,
        };
      })
    );
  };
  const handleCheckboxChange = (id) => {
    // 打勾時加上排序功能，已完成的排後面
    setTodos(
      todos
        .map((todo) => {
          if (todo.id !== id) return todo;
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        })
        .sort((a, b) => {
          return a.isDone - b.isDone;
        })
    );
  };
  const handleRemove = (id) => {
    const data = todos.filter((todo) => {
      return id !== todo.id;
    });
    setTodos(data);
  };
  return (
    <TodoItem isDone={todo.isDone} filter={filter}>
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
      {!todo.isBeingEdited && (
        <Taskname isDone={todo.isDone}>{todo.taskname}</Taskname>
      )}
      {todo.isBeingEdited && (
        <EditForm todo={todo} todos={todos} setTodos={setTodos} />
      )}
      {!todo.isBeingEdited && (
        <Edit
          onClick={() => {
            handleStartEdit(todo.id);
          }}
        />
      )}
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
      isDone: false,
      isBeingEdited: false,
    },
    {
      id: 2,
      taskname: "吃午餐",
      isDone: false,
      isBeingEdited: false,
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
  const handleClearCompleted = () => {
    const data = todos.filter((todo) => {
      return todo.isDone === false;
    });
    setTodos(data);
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
        <TodoArea>
          {todos.map((todo) => (
            <Todo
              className="ui-state-default"
              key={todo.id}
              todo={todo}
              todos={todos}
              setTodos={setTodos}
              filter={filter}
            />
          ))}
        </TodoArea>
        <FilterBTNContainer todos={todos}>
          <FilterInfo>{filter}</FilterInfo>
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
          <FilterBTN onClick={handleClearCompleted}>clear completed</FilterBTN>
        </FilterBTNContainer>
      </Card>
    </Page>
  );
}
