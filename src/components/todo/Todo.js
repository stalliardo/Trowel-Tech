import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getTodos } from '../../services/database/todos'
import { useDispatch } from 'react-redux'
import { fetchTodos, saveTodo } from '../../features/todo/todoSlice'

const Todo = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('EFFECT CALLED');
        // getTodos().then((response) => {
        //     response.forEach((todo) => {
        //         console.log('todo = ', todo.data());
                
        //     })
            
        // }).catch((error) => {
        //     console.log('error getting todos = ', error);
            
        // })

        dispatch(fetchTodos())
        
    }, [])

    const [todo, setTodo] = useState("");

    const handleOnChange = (e) => {

        setTodo(e.target.value);        
    }

    const handleOnClick = () => {


        dispatch(saveTodo({value: todo}))

        // addTodo({value: todo}).then((data) => {
        //     console.log('Todo saved');
            
        // }).catch((error) => {
        //     console.log('error adding todo. Error: ', error.message);
            
        // })




        
    }
  return (
    <div>
        Todo
        <div>
            <TextField label="New Todo" onChange={handleOnChange}/>
            <Button variant='contained' onClick={handleOnClick}>Save</Button>
        </div>
    </div>

  )
}

export default Todo