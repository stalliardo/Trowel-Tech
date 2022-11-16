import { Button, Container, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getTodos } from '../../services/database/todos'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos, saveTodo } from '../../features/todo/todoSlice'

const Todo = () => {
    const dispatch = useDispatch();
    

    useEffect(() => {
       

        dispatch(fetchTodos());

        
    }, [])

    const [todo, setTodo] = useState("");
    const { todos, loading } = useSelector((state) => state.todo);

    const handleOnChange = (e) => {

        setTodo(e.target.value);        
    }

    const handleOnClick = () => {


        dispatch(saveTodo({value: todo}))





        
    }
  return (
    <div>
        Todo
        <div>
            <TextField label="New Todo" onChange={handleOnChange}/>
            <Button variant='contained' onClick={handleOnClick}>Save</Button>
        </div>
        <Container maxWidth="xl" sx={{backgroundColor: "red"}}>
            {
                todos.map((todo, index) => {
                   return <Typography key={index}>{todo.value}</Typography>
                    
                })
            }
        </Container>
    </div>

  )
}

export default Todo