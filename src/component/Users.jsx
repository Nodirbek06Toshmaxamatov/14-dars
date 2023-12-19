import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { doGet } from './service'

const Users = () => {


    const [Users, setUsers] = useState([])

    async function getUSers() {
      await doGet('/users').then((res) => setUsers(res.data))
  }

    useEffect(() => {
      getUSers()
    }, [])
    return (
        <>
            <h1 className='text-center'>Users</h1>
            <table className='table table-dark '>
                <thead>
                    <tr>
                        <th>N0</th>
                        <th>Name</th>
                        <th>USerName</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th>WebSite</th>
                        <th>Company</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Users.map((item,index)=> 
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.address.street}</td>
                            <td>{item.phone}</td>
                            <td>{item.website}</td>
                            <td>{item.company.name}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </>
    )
}
export default Users