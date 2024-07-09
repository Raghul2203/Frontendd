import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from './Constants'
import { AuthContext } from '../../createcontext'
import api from './api'
import { Alert} from 'flowbite-react'
const Form = ({route, method}) => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [loading, setloading] = useState(false)
    const [message, setmessage] = useState()
    const navigate = useNavigate()
    const name = method === "login" ? "Login" : "Register"
    const handlesubmit = async (e) =>{
        setloading(true)
        e.preventDefault()
        try{
            if(username === null || password === null){
                setmessage('Enter the Credentials Correctly!')
            }
            else{
            const res = await api.post(route, {username, password})
            if(method === "login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                setIsAuthenticated(true)
                navigate("/")
            }
            else if(method === "register"){
                navigate("/login/")
            }
            }
        }
        catch(error){
            console.log(error)
            if(method==='login'){
                setmessage('Incorrect Credentials or User not exits')
            }
            else{
                setmessage('User already exist!')
            }
        } finally{
            setloading(false)
        }
    }
  return (
    <>
    {message && <div className='flex justify-center mb-4'><Alert color="failure" onDismiss={() => setmessage(null)} className='w-[400px]'><span className="font-medium text-center">{message}</span></Alert></div>}
    <div className="flex justify-center">
        <div className='flex justify-center rounded-lg shadow-lg w-[400px] h-[250px] bg-gray-400'>
        <form onSubmit={handlesubmit} className=''>
        <div className="flex flex-col space-y-4 items-center my-4">
        <div><h1 className='font-semibold text-[20px] text-white'>{name}</h1></div>
        <div>
        <input 
            className='ring-1 ring-[#80808021] px-2 outline-none rounded-md h-[30px]'
            type='text'
            value={username}
            onChange={(e)=>{setusername(e.target.value.toLowerCase())}}
            placeholder='username'
        />
        </div>
        <div>
        <input
            className='ring-1 ring-[#80808021] px-2 outline-none rounded-md h-[30px]'
            type='password'
            value={password}
            onChange={(e)=>{setpassword(e.target.value)}}
            placeholder='*****'
        />
        </div>
        <div>
        <button className=' font-semibold px-2 bg-gray-500 text-white rounded-md hover:bg-white hover:text-black'>{name}</button>
        </div>
        <div>
            {name=='Login' ? 
            <p className='underline-none text-white' >Don't have account? <span className='font-semibold'><Link to="/register/" className=' text-gray-600 hover:text-black'>Register</Link></span></p>: <p className='text-gray-500'>Already have account? <span className='font-semibold '><Link to="/login/">Login</Link></span></p>}
        </div>
        </div>
    </form>
    </div>
    </div>
    </>
  )
}

export default Form