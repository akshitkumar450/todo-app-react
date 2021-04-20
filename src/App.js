import React, { useState, useEffect } from 'react'
import './App.css';
import Todo from './Todo'
import { Button, Input, FormControl, InputLabel } from '@material-ui/core'
import db from './firebase'
import firebase from 'firebase'

function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  // console.log(todos);

  useEffect(() => {
    // for fetching data only

    // snapshot.docs is an array of objects
    // doc is an object
    // console.log(todos);
    // which means our,, todos state is an array of objects
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      setTodos(snapshot.docs.map((doc) => {
        return ({
          id: doc.id,
          todo: doc.data().todo
        })
      }))
    })
  }, [])

  const addTodo = (e) => {
    e.preventDefault()
    // for putting  data
    // it will make a new collection if there is no collection
    db.collection('todos').add({
      todo: todo,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    // setTodos([...todos, todo])
    setTodo('')
  }

  return (
    <div className="App">
      <h1> todo app</h1>
      <form onSubmit={addTodo}>

        <FormControl>
          <InputLabel>✔✔✔ write a todo</InputLabel>
          <Input value={todo} onChange={(e) => setTodo(e.target.value)} />
        </FormControl>

        <Button variant="contained" color="primary" disabled={!todo}>
          Add todo
        </Button>
      </form>

      <ul>
        {/*todos is an array of objects */}
        {/*todo is an object*/}

        {todos.map((todo, idx) => {
          return (
            <div key={idx}>
              <Todo todo_text={todo} />
            </div>
          )
        })}
      </ul>
    </div >
  );
}

// import React, { Component } from 'react'
// class App extends Component {


//   state = {
//     todo: '',
//     todos: ['nina', 'elle']
//   }

//   onInputChange = (e) => {
//     console.log(e.target.value);
//     this.setState({ todo: e.target.value })
//   }
//   onFormSubmit = (e) => {
//     e.preventDefault()
//     this.setState({ todos: [...this.state.todos, this.state.todo] })
//   }
//   render() {
//     return (
//       <div>
//         <h1> todo app</h1>
//         <form onSubmit={this.onFormSubmit}>
//           <input value={this.state.todo} onChange={this.onInputChange} />
//         </form>


//         <h1>{this.state.todos.length}</h1>
//         <ul>
//           {
//             this.state.todos.map((todo, idx) => {
//               return (
//                 <div key={idx} >
//                   <li>{todo}</li>
//                 </div>
//               )
//             })
//           }
//         </ul>

//       </div>

//     )
//   }
// }

export default App

