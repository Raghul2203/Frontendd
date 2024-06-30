
import { Link } from 'react-router-dom'
import { REFRESH_TOKEN } from '../auth/components/Constants'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../createcontext'
import { jwtDecode } from 'jwt-decode'
const Header = () => {
  // let jwt = jwtDecode(localStorage.getItem(REFRESH_TOKEN))
  // console.log(jwt)
  const {isAuthenticated, setisAuthenticated} = useContext(AuthContext)
  console.log(isAuthenticated)
  useEffect(()=>{
    let fetchdata = async ()=>{
        if(isAuthenticated){
          let jwt = jwtDecode(localStorage.getItem(REFRESH_TOKEN))
            try{
              let response = await fetch('http://127.0.0.1:8000/auth/getuser/', 
                {method:'POST',
                  headers:{
                    'Content-Type':'application/json'
                  },
                  body:JSON.stringify({'user_id':jwt['user_id']})
                 })
                console.log(response)
              let data = await response.json()
              console.log(data)
              console.log(data['user'])
              let user = data['user'].charAt(0).toUpperCase() + data['user'].slice(1)
              localStorage.setItem('user', user)
              localStorage.setItem('isauth', true)
              window.location.reload()
            }
            catch(error){
              console.log(error)
            }
        }
    }
    fetchdata()
  })
  
  return (
    <>
       <div>
       <div className="flex flex-row bg-black text-white font-semibold py-4 h-[60px]">
        <div className='w-1/2'>
            <div className='flex flex-row justify-around'>
              <div> Lucishop 🛒</div>
              <div><input type="text" className='h-[30px] rounded-md' /></div>
            </div>
        </div>
       <div className='w-1/2 flex flex-row justify-end space-x-[40px] mx-5 items-center'>
          <div><Link to="/">Home</Link></div>
          {localStorage.getItem('isauth') ? 
                <div>
                  
                    <button id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className="text-white text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">{localStorage.getItem('user')} <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                    </button>

                    <div id="dropdownHover" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                          <li>
                              <Link to="cart/" className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600'> Cart</Link>
                          </li>
                          <li>
                              <Link to="wishlist/" className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600'>Wishlist</Link>
                          </li>
                          <li>
                                <Link to="logout/" className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600'>Logout</Link>
                          </li>
                          <li>
                            
                          </li>
                        </ul>
                    </div>

                </div>
                : <div><Link to="login/">Login</Link>|<Link to="register/">Register</Link></div>}    
       </div>
       </div>
       </div>
    </>
  )
}

export default Header