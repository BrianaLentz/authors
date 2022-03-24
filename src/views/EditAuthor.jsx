import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useHistory, useParams, Link} from 'react-router-dom'

const EditAuthor = () => {
    const {id} = useParams()
    const [name,setName] = useState("")
    const [errors, setErrors] = useState([])
    const history = useHistory()

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/authors/${id}`)
            .then(res=>{
                const author = res.data
                setName(author.name)
            })
            .catch(err=> console.log(err))
    },[])

    const handleSubmit =(e)=> {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/authors/${id}`,{name})
            .then(res=>{
                history.push("/")
            })
            .catch(err=>{
                const errResponse = err.response.data.errors
                const errArr = []
                for(const key of Object.keys(errResponse)){
                    errArr.push(errResponse[key]["message"])
                }
                setErrors(errArr)
            })
    }
    return (
    <div>
        <Link to="/">Home</Link>
        <p>Edit this author:</p>
        <form className="form-control" onSubmit={handleSubmit}>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
            <div>
                <label>Name: </label>
                <input type="text" name="name" value={name} onChange={e=>setName(e.target.value)}
                />
            </div>
            <Link to="/">Cancel</Link>
            <button>Submit</button>
        </form>
    </div>
    )
}

export default EditAuthor