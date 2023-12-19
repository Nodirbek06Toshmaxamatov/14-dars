import React, { useEffect, useState } from 'react'
import { doGet } from './service'

const OnePost = ({match}) => {

    const [post, setPost] = useState('')
    const [user, setUser] = useState('')

    async function GetOnePost(id){
        const OnePost = await doGet('/posts/'+id)
        setPost (OnePost.data)
        const postUser = await doGet('/users/'+OnePost.data.userId)
        setUser (postUser.data)

    }
    useEffect(() =>{
        GetOnePost(match.params.id)
    } , [])
  return (
    <div className="row">
        <div className="col-3">
            <div className="card">
                <div className="card-header">
                    {user.name}
                </div>
                <div className="card-body">
                    {user.phone}
                </div>
            </div>
        </div>
        <div className="col-9">
            <div className="card">
                <div className="card-header">
                {post.id}. {post.title}
                </div>
                <div className="card-body">
                    {post.body}
                </div>
            </div>
        </div>
    </div>
  )
}

export default OnePost