import React, { useEffect, useState} from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom'

const Dashboard = () => {
    const [authors, setAuthors] = useState()
    const [refresh, setRefresh] = useState(true)

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/authors`)
            .then(res=>setAuthors(res.data))
            .catch(err=>console.log(err))
    },[refresh])

    const handleDelete =(deleteId)=>{
        axios.delete(`http://localhost:8000/api/authors/${deleteId}`)
            .then(res=>{
            setRefresh(!refresh)
            })
            .catch(err=>console.log(err))
    }


    return (
    <div>
        <Link to={`/new`}>Add an Author</Link>
        <p>We have quotes by:</p>
        <table className="table">
            <thead>
                <tr>
                    <th>Author</th>
                    <th colSpan={2}>Actions Available</th>
                </tr>
            </thead>
            <tbody>
                {
                    authors &&
                        authors.map((author, i)=>(
                            <tr key={i}>
                                <td>{author.name}</td>
                                <td><Link to={`/${author._id}/edit`} >Edit </Link></td>
                                <td><button onClick={()=>handleDelete(author._id)}>Delete</button></td>
                            </tr>
                        ))
                }
            </tbody>
        </table>
    </div>
    )
}

export default Dashboard