import { useEffect, useState } from 'react'

const useFetch = (url)=>{
    let [data, setdata] = useState([])
    useEffect(()=>{
        let fetchdata = async ()=>{
            try{
            let response = await fetch(url)
            let data = await response.json()
            setdata(await data)
            }
            catch(error){
                console.log(error)
            }
        }
        fetchdata()
    }, [url])
    return {data}
}

export default useFetch