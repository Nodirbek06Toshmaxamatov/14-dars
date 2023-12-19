import React from 'react'

const Todo = ({ item }) => {
    return (
        <div className='d-flex'>
            <input id={'checkbox' + item.id} type="checkbox" className='check' checked={item.completed} />
            <h4>{item.id} </h4>.  
            <label htmlFor={'checkbox' + item.id}>
                <h4> {" "}  {item.title}</h4>
            </label>
        </div>
    )
}

export default Todo