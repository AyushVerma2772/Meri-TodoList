import React, { useEffect, useState } from 'react';
import Card from './Card';
import { db } from '../firebase-config';
import { addDoc, collection, onSnapshot } from 'firebase/firestore';

const Home = ({ user }) => {

  const colRef = collection(db, `todos2/${user.uid}/todo`);
  const [todos, setTodos] = useState([]);
  const today = new Date();

  const addTodo = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const decs = e.target[1].value;

    try {
      await addDoc(colRef, {
        title: title,
        description: decs,
        time: `${today.getDate()}/${today.getMonth() + 1}  ${today.getHours()}:${today.getMinutes()}`
      })

      e.target[0].value = "";
      e.target[1].value = "";

    } catch (error) {
      console.log(error.message)
    }

  }

  //! Realtime Read of todos
  useEffect(() => {
    const unsub = onSnapshot(colRef, snapshot => {
      setTodos(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    });

    return () => {
      unsub();
    }
  // eslint-disable-next-line
  }, [])


  return (
    <>
      <div className="container-fluid position-relative">
        {/* Todo Add form */}
        <div className='container'>

          <h1 className='col-12'>Meri TodoList</h1>

          <div className="row my-2">
            <div className="col-12">
              <form className='container' onSubmit={e => addTodo(e)}>
                <div className="row">
                  <div className="col-6">
                    <input type="text" className="form-control my-2" id="exampleFormControlInput1" placeholder="Title" />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-8">
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Description'></textarea>
                  </div>
                </div>

                <div className="row">
                  <div className="col my-2">
                    <button className='btn btn-primary align-middle'>Add<i className="bi bi-plus-lg"></i></button>
                  </div>
                </div>

              </form>

            </div>
          </div>

          <h2 className='my-1'>Todo List</h2>
        </div>

        {/* Display Todo */}
        <div className='container p-2'>
          <div className="row justify-content-center">
            {
              todos.map((ele, i) => {
                return (
                  <Card key={i} title={ele.title} desc={ele.description} time={ele.time} id={ele.id} user={user} />

                )
              })
            }

          </div>

        </div>



      </div>
    </>
  )
}

export default Home