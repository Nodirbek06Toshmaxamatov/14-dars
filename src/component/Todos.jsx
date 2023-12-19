import { useState, useEffect } from 'react'
import { doGet } from './service'
import Todo from './Todo'

const Todos = () => {
    const [data, setData] = useState([])
    const [Todos, setTodos] = useState([])
    const [Users, setUsers] = useState([])
    const [page, setPage] = useState(1)
    const [check, setCheck] = useState(false)
    const [CurrentUser,setCurrentUser] = useState('')
    const [IsFiltering,setIsFiltering] = useState(false)

   var filter = (UserID) => {
        return data.filter(item => item.userId == parseInt(UserID) || UserID == ''
        ).filter((item,index) => index >= (page - 1) * 10 && index < page * 10 )
    }

    async function getTodos() {
        var res = await doGet('/todos')
        setData(res.data)
        setTodos(res.data.filter ((item,index) => index >= 0 && index < 10))
    }

    async function getUsers() {
        await doGet('/users').then((res) => setUsers(res.data))
    }

    useEffect(() => {
        getTodos()
        getUsers()
    }, [])

    useEffect(() => {
        var res = filter (CurrentUser,check,page )
        setTodos(res)
    }, [])


    var OncHangeUSerSelect = (e) => {
        var UserID = e.target.value
        var res = filter(UserID)
        setTodos(res)
        setCurrentUser(UserID)
    }
    var OnPrev=()=>{
        setPage(prev=>prev-1)
        if(page <=1){
            setPage(1)
        }
    }
    var OnNext=()=>{
        setPage(prev=>prev+1)
    }
    var hendleChange=(event)=>{
        var checked = event.target.checked
        var arr = data.filter((item,index) => item.completed === checked)
        setTodos(arr)
        setCheck(checked)
    }
    var reset=()=>{
        setTodos(data)
        setCurrentUser('')
        setCheck(false)
        setPage(1)
        setIsFiltering(false)
    }
    return (
        <>
            <div className="row my-2">
                <div className="col-12">
                    <h1 className='text-center'>Todos</h1>
                </div>
            </div>
            <div className="row my-3">
                <div className="col-1">
                    <button className='btn btn-danger' onClick={reset}>reset</button>
                </div>
                <div className="col-3">
                    <select className='form-control' value={CurrentUser} onChange={OncHangeUSerSelect}>
                        <option value={""}>All </option>
                        {
                            Users.map(item=> 
                            <option key={item.id} value={item.id} id={item.id}>{item.name}</option>)
                        }
                    </select>
                </div>
            <div className="col-3">
               <div className="d-flex">
               <h4 className='mx-4'>Completed:</h4>
                <input type="checkbox" checked={check} style={{transform:"scale(2)"}} onChange={hendleChange} />
               </div>
            </div>
            </div>
            <div className="row">
                {
                    Todos.map((item, index) => <Todo key={index} item={item} /> )
                }
            </div>
            <div className="d-flex align-items-center my-4">
                <button className='btn btn-dark' onClick={OnPrev}>prev</button>
                <h1 className='mx-3'>{page}</h1>
                <button className='btn btn-dark' onClick={OnNext}>next</button>
            </div>
        </>
    )
}

export default Todos