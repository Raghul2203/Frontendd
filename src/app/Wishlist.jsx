import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { REFRESH_TOKEN } from '../auth/components/Constants'
import useFetch from '../customhooks/UseFetch'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Alert, Breadcrumb, BreadcrumbItem } from 'flowbite-react'
const Wishlist = () => {
  const [products, setProducts] = useState([])
  let [isloading, setisloading] = useState(true)
  const jwt = jwtDecode(localStorage.getItem(REFRESH_TOKEN))
  let [message, setmessage] = useState()
  const { data: wishitem } = useFetch(`http://13.48.43.42:8000/api/wishlist/${jwt['user_id']}/`)
  useEffect(() => {
    let fetchproducts = async () => {
      if (wishitem) {
        try {
          let promisedata = wishitem.map(item => axios.get(`http://13.48.43.42:8000/api/product/${item.product}/`))
          let responses = await Promise.all(promisedata)
          let data = responses.map(response => response.data)
          setProducts(data)
          setisloading(false)
        }
        catch (error) {
          console.log(error)
        }
      }
    }
    fetchproducts()
  }, [wishitem])
  let deletewish = async (product_id) => {
    let obj = {
      'username': jwt['user_id'],
      'product_id': product_id
    }
    let response = await fetch("http://13.48.43.42:8000/api/removewish/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    let data = await response.json()
    setmessage(await data['status'])
    window.location.reload()
  }
  return (
    <>
      <div className={ products.length > 0 ? 'ml-[80px] mt-[80px]' : 'fixed ml-[80px] -mt-[150px]'}>
        <Breadcrumb >
          <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
          <BreadcrumbItem><Link>Wishlist</Link></BreadcrumbItem>
        </Breadcrumb>
      </div>
      {message && <Alert color="success" onDismiss={() => setmessage(null)}><span className="font-medium">{message}</span></Alert>}


      <div className='flex flex-col mx-[100px]'>
      {products.length > 0 ? (
        products.map(product => (
          <div key={product.id} className=' flex flex-row h-[300px] ring-1 ring-gray-50 items-center space-x-5'>
            <div><img src={`http://13.48.43.42:8000/${product.image}`} alt="" className='w-[200px] ' /></div>
            <div className='flex flex-col space-y-4'>
            <Link to={`/category/${product.category}/${product.id}`}>
            <div className='font-semibold text-[16px] w-[250px]'>{product.name}</div></Link>
            <div className='bg-[#9a9e9c] text-white font-semibold px-2 rounded-md text-[14px] w-[55px]'>{product.ratings}<i className="fa-solid fa-star ml-1 text-[13px]"></i></div>
              <div className='flex flex-row space-x-4 items-center'>
                  <div className='line-through decoration-1'><i className="fa-solid fa-indian-rupee-sign mr-1 text-[13.5px]"></i>{parseInt(product.original_price).toLocaleString()}</div>
                  <div className='font-semibold'><i className="fa-solid fa-indian-rupee-sign mr-1 text-[13.5px]"></i>{parseInt(product.selling_price).toLocaleString()}</div>
                  <div className='text-[green] text-[14px] font-semibold'>{product.offer}%off</div>
                </div>
              <div><button onClick={() => deletewish(product.id)}><i className='fa-solid fa-trash'></i></button></div>
            </div>
          </div>
          
        ))
      ) : (
        <div className='flex justify-center'>
        <Alert color='info'>Add Products to Display</Alert>
      </div>
      )}
    </div>
    </>
  )
}

export default Wishlist