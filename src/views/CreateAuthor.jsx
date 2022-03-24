import React, { useState } from 'react'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'

const CreateAuthor = () => {
    const [name, setName] = useState("")
    const [errors, setErrors] = useState([])
    const history = useHistory()

    const handleSubmit =(e)=>{
        e.preventDefault()
        axios.post(`http://localhost:8000/api/authors`, {name})
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
        <p>Add a New Author:</p>
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

export default CreateAuthor