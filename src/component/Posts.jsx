import { useState, useEffect } from 'react'
import { doGet } from './service'
import {Modal, ModalBody,ModalFooter, ModalHeader, Button} from 'reactstrap'
import { AvField, AvForm } from 'availity-reactstrap-validation'
const Posts = ({ history }) => {


    const [data, setData] = useState([])
    const [Posts, setPosts] = useState([])
    const [Users, setUsers] = useState([])
    const [modalVisible,setModalvisible] =useState(false)

    var OpenModal=()=>{
        setModalvisible(prev=>!prev)
    }
    var SumbitForm=(event,values)=>{
        Posts.unshift(values)
        setPosts(Posts)
        setModalvisible(false)
    }

    async function getPosts() {
        var res = await doGet('/posts')
        setPosts(res.data)
        setData(res.data)
    }

    async function getUsers() {
        await doGet('/users').then((res) => setUsers(res.data))
    }

    useEffect(() => {
        getPosts()
        getUsers()
    }, [])

    var CardStyle = {
        height: "300px"
    }

    var OpenOnePost = (id) => {
        history.push('/posts/' + id)
    }

    var filter = (USerID) => {
        return data.filter(item => item.userId == parseInt(USerID) || USerID == '')
    }

    var OncHangeUSerSelect = (event) => {
        var USerID = event.target.value
        var res = filter(USerID)
        setPosts(res)
    }
    return (
        <>
            <div className="row my-2">
                <div className="col-12">
                    <h1 className='text-center'>Posts</h1>
                </div>
             
            </div>
            <div className="row my-3">
                <div className="col-3">
                    <select  className='form-control' value={modalVisible} onChange={OncHangeUSerSelect}>
                        <option value={""}>All </option>
                        {
                            Users.map((item, index) =>
                                <option key={index} id={item.id} value={item.id} >{item.name}</option>)
                        }
                    </select>
                </div>
            </div>
            <div className="row">
                {
                    Posts.map((item, index) =>
                        <div className="col-3" key={index}>
                            <div className="card cardStyle" style={CardStyle} onClick={() => OpenOnePost(item.id)}>
                                <div className="card-header bg-dark text-light">
                                    {item.id}.{item.title}
                                </div>
                                <div className="card-body">
                                    {item.body}
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            {/*  modal */}

            <Modal isOpen={modalVisible} toggle={OpenModal}>
                <ModalHeader>Add Post</ModalHeader>
                <ModalBody>
                    <AvForm id='from' onValidSumbit={SumbitForm}>
                        <AvField name="title" required label='Title'/>
                        <AvField name="body" required label='Body'/>
                    </AvForm>
                </ModalBody>
                <ModalFooter>
                    <Button from='from' color='success'>Save</Button>
                    <Button color='danger' onClick={OpenModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
            
        </>
    )
}

export default Posts