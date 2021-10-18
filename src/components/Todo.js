import styled from 'styled-components'
import PropTypes from 'prop-types'
import EditForm from './EditForm'

const TodoItem = styled.li`
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
    border-bottom: 1.5px solid ${({ theme }) => theme.shadow};
  }
  ${({ isDone }) =>
    isDone &&
    `      
      background: ${({ theme }) => theme.checked};
    `}
  ${({ isDone, filter }) =>
    isDone &&
    filter === 'ACTIVE' &&
    `
      display: none;
    `}
  ${({ isDone, filter }) =>
    !isDone &&
    filter === 'COMPLETED' &&
    `
      display: none;
    `}
`
const Taskname = styled.div`
  flex: 1;
  font-size: 20px;
  font-family: 'Maven Pro', sans-serif;
  color: ${({ theme }) => theme.text_primary};
  text-decoration: ${(props) => (props.isDone ? 'line-through' : 'none')};
`
const Edit = styled.span`
  cursor: pointer;
  margin-right: 16px;
  transition: all 0.1s;
  color: ${({ theme }) => theme.text_grey};
  &:hover {
    color: ${({ theme }) => theme.text_primary};
    transform: translate(1px, 1px);
  }
`
const Remove = styled.span`
  cursor: pointer;
  transition: all 0.1s;
  color: ${({ theme }) => theme.text_grey};
  &:hover {
    color: ${({ theme }) => theme.text_primary};
    transform: translate(1px, 1px);
  }
`

export default function Todo({ todo, todos, setTodos, filter }) {
  const handleStartEdit = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id !== id) return todo
        // 不能編輯已完成的 todo
        if (todo.isDone) return todo
        return {
          ...todo,
          isBeingEdited: true
        }
      })
    )
  }
  // const handleCheckboxChange = (id) => {
  //   // 打勾時自動排序，已完成的排後面
  //   setTodos(
  //     todos
  //       .map((todo) => {
  //         if (todo.id !== id) return todo
  //         return {
  //           ...todo,
  //           isDone: !todo.isDone
  //         }
  //       })
  //       .sort((a, b) => {
  //         return a.isDone - b.isDone
  //       })
  //   )
  // }
  const handleRemove = (id) => {
    const data = todos.filter((todo) => {
      return id !== todo.id
    })
    setTodos(data)
  }
  return (
    <TodoItem isDone={todo.isDone} filter={filter}>
      {!todo.isBeingEdited && (
        <Taskname isDone={todo.isDone}>{todo.taskname}</Taskname>
      )}
      {todo.isBeingEdited && (
        <EditForm todo={todo} todos={todos} setTodos={setTodos} />
      )}
      {!todo.isBeingEdited && (
        <Edit
          onClick={() => {
            handleStartEdit(todo.id)
          }}
        />
      )}
      <Remove
        onClick={() => {
          handleRemove(todo.id)
        }}
      />
    </TodoItem>
  )
}

Todo.propTypes = {
  todo: PropTypes.object,
  hadleRemove: PropTypes.func,
  handleCheckboxChange: PropTypes.func,
  filter: PropTypes.string
}
