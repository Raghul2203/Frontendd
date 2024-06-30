import { jwtDecode } from "jwt-decode";
import { REFRESH_TOKEN } from "../auth/components/Constants";
import { useState, useEffect } from "react";
let useGetuser = (url)=>{
    let [user, setuser] = useState()
    let jwt = ''
    if(REFRESH_TOKEN=='REFRESH_TOKEN'){
      jwt = jwtDecode(localStorage.getItem(REFRESH_TOKEN))
    }
    useEffect(()=>{
      let obj = {
        'user_id':jwt['user_id']
      }
       let fetching = async ()=>{
        let response = await fetch(url, {
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(obj)
        })
        let data = await response.json()
        setuser(data['user'])
       }
       fetching()
    }, [url])
    return {user}
} 

export default useGetuser
