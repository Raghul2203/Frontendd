import axios from 'axios'
import React, { useEffect, useState } from 'react'

const useFetch = (url)=>{
    let [data, setdata] = useState([])
    useEffect(()=>{
        axios.get(url).then(response => setdata(response.data)).catch(error => console.log(error))
    }, [url])
    return {data}
}

export default useFetch