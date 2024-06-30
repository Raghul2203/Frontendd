import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import useFetch from '../customhooks/UseFetch'
import { Alert, Breadcrumb, BreadcrumbItem } from 'flowbite-react'
import { jwtDecode } from 'jwt-decode'
import { REFRESH_TOKEN } from '../auth/components/Constants'
const Product = () => {
  let {id} = useParams()
  let {data:product} = useFetch(`http://127.0.0.1:8000/api/product/${id}/`)
  const [isliked, setisliked] = useState()
  let [number, setnumber] = useState(1)
  let [message, setmessage] = useState()
  let incre = ()=>{
      setnumber(n => n+1)
  }
  let decre = ()=>{
      setnumber(n => n-1)
  }
  let addtocart = (product_id)=>{
    if(localStorage.getItem('user')){
      let jwt = jwtDecode(localStorage.getItem(REFRESH_TOKEN))
      let obj = {
        'user': jwt['user_id'],
        'product_id':product_id,
        'qty':number
      }
      fetch('http://127.0.0.1:8000/api/addtocart/',
        {
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(obj)
        }
      ).then(response => response.json()).then(data => setmessage(data['status'])).catch(error => console.log(error))
    }
    else{
      setmessage('Login to continue')
    }
  }
  let addtowishlist = (product_id)=>{
    if(localStorage.getItem('user')){
      let jwt = jwtDecode(localStorage.getItem(REFRESH_TOKEN))
      let obj = {
        'user': jwt['user_id'],
        'product_id':product_id
      }
      fetch('http://127.0.0.1:8000/api/addtowish/',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(obj)
      }).then(response => response.json()).then(data => {setisliked(data['isliked']);setmessage(data['status'])}).catch(error => console.log(error))
    }
    else{
      setmessage('Login to Continue')
    }
  }
  useEffect(()=>{
    if(localStorage.getItem('user')){
      let jwt = jwtDecode(localStorage.getItem(REFRESH_TOKEN))
      let obj = {
          'user': jwt['user_id'],
          'product_id': id
      }
      fetch('http://127.0.0.1:8000/api/isliked/', {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(obj)
      }).then(response => response.json()).then(data => setisliked(data['status'])).catch(error => console.log(error))
    }
  })
  return (
    <>
      <div className='ml-[80px] -mt-[90px]'>
          <Breadcrumb>
            <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
            <BreadcrumbItem><Link to={`/category/products/${localStorage.getItem('product_name')}`}>Products</Link></BreadcrumbItem>
            <BreadcrumbItem><Link>{product.name}</Link></BreadcrumbItem>
          </Breadcrumb>
        </div>
      {message && <Alert color="success" onDismiss={() => setmessage(null)}><span className="font-medium">{message}</span></Alert>}
      <div className='flex flex-row space-x-7 items-center mx-10'>
        <div> <img src={`http://127.0.0.1:8000/${product.image}`} alt="" className='w-[300px] h-[300p]' /></div>
        <div className='flex flex-col space-y-3 '>
          <div>{product.name}</div>
         <div className="flex flex-row space-x-4 items-center"> 
          <div className='bg-[#9a9e9c] text-white font-semibold px-2 rounded-md text-[14px] w-[55px]'>{product.ratings}<i className="fa-solid fa-star ml-1 text-[13px]"></i></div>
          <div><button onClick={()=>{addtowishlist(product.id)}}>{isliked ? <i className="fa-solid fa-heart text-[20px]"></i> : <i className="fa-regular fa-heart text-[20px]"></i>}</button></div>
         </div>
          <div className="flex flex-row space-x-3 items-center">
              <div className='line-through decoration-1'><i className="fa-solid fa-indian-rupee-sign  mr-1 text-[13px]"></i>{product.original_price}</div>
              <div className='font-semibold text-[20px]'><i className="fa-solid fa-indian-rupee-sign  mr-1 text-[16px]"></i>{product.selling_price}</div>
              <div className='font-semibold text-[green]'>{product.offer} %off</div>
          </div>
          <div className='w-[500px]'>{product.description}</div>
          <div className="flex flex-row space-x-3 items-center">
            <div className='flex flex-row space-x-1 '>
            <div><button className='rounded-lg ring-1 ring-[#80808094] w-[30px] shadow-lg font-semibold bg-black text-white' onClick={()=>decre()}>-</button></div>
            <div><input type='text' className='w-[40px] h-[25px] ring-1 ring-[grey] text-center' value={number} onChange={(e)=>setnumber(e.target.value)}/></div>
            <div><button className='rounded-lg ring-1 ring-[#80808094] w-[30px] shadow-lg font-semibold bg-black text-white' onClick={()=>incre()}>+</button></div>
            </div>
            <button className='font-semibold bg-slate-500 rounded-lg px-2 text-white text-[20px]' onClick={()=>addtocart(product.id)}>Add to <i className="fa-solid fa-cart-plus ml-1 "></i></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Product