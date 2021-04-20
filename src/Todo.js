import React, { useState } from 'react'
import { List, ListItemText, ListItem, Button, Modal } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import './Todo.css'
import db from './firebase'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({

    paper: {
        position: "relative",
        left: 400,
        // position: "center",
        width: 600,
        backgroundColor: theme.palette.background.paper,
        // border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

    button: {
        width: 150,
        // border: '2px solid #000',
        margin: "10px",
    },
}));

function Todo(props) {

    // console.log(props.todo_text);
    const classes = useStyles();

    const [open, setOpen] = useState(false)
    const [input, setInput] = useState();

    const deleteTodo = () => {
        db.collection('todos').doc(props.todo_text.id).delete()
    }

    const updateTodo = () => {
        // update the todo with the new input
        db.collection("todos").doc(props.todo_text.id).set(
            {
                todo: input,
            },
            { merge: true }
        );
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Modal open={open} onClose={(e) => setOpen(false)}>
                <div className={classes.paper}>
                    <h3>Update the Task</h3>
                    <input
                        placeholder={props.todo_text.todo}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="default"
                        onClick={updateTodo}
                        className={classes.button}
                    >
                        update✔
                     </Button>
                </div>
            </Modal>

            <List className='todo_list'>
                <ListItem>
                    <ListItemText primary='todo' secondary={props.todo_text.todo} />

                </ListItem>
                <Button onClick={() => setOpen(true)}>edit</Button>
                <DeleteForeverIcon onClick={deleteTodo} />
            </List>

        </React.Fragment>

    )
}

export default Todo
