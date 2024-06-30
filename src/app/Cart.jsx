import React, { useEffect, useState } from 'react'
import useFetch from '../customhooks/UseFetch'
import { jwtDecode } from 'jwt-decode'
import { REFRESH_TOKEN } from '../auth/components/Constants'
import axios from 'axios'
import { Alert, Breadcrumb, BreadcrumbItem } from 'flowbite-react'
import { Link } from 'react-router-dom'

const Cart = () => {
  const [products, setProducts] = useState([]);
  let [message, setmessage] = useState()
  const [tprice, settprice] = useState()
  const jwt = jwtDecode(localStorage.getItem(REFRESH_TOKEN));
  const { data: cartItems } = useFetch(`http://127.0.0.1:8000/api/cart/${jwt['user_id']}/`);
  console.log(cartItems)
  useEffect(() => {
    const fetchProducts = async () => {
      if (cartItems) {
        try {
          const promisedata = cartItems.map(item => axios.get(`http://127.0.0.1:8000/api/product/${item.product}/`))
          const responses = await Promise.all(promisedata)
          const productdata = responses.map(response => response.data)
          setProducts(productdata)
        }
        catch (error) {
          console.log(error)
        }
      }
    }
    fetchProducts();
  }, [cartItems]);
  let removecart = async (product_id) => {
    let obj = {
      'user': jwt['user_id'],
      'product_id': product_id
    }
    let response = await fetch('http://127.0.0.1:8000/api/removecart/', {
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
  console.log(products)
  return (
    <>
      <div className='ml-[80px] align-text-top'>
        <Breadcrumb>
          <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
          <BreadcrumbItem><Link>Cart</Link></BreadcrumbItem>
        </Breadcrumb>
      </div>
      {message && <Alert color="success" onDismiss={() => setmessage(null)}><span className="font-medium">{message}</span></Alert>}
      <div className="flex flex-row ">
        <div className='flex flex-col mx-[100px]'>
          {products.length > 0 ? (
            products.map(product => (
              <div key={product.id} className=' flex flex-row h-[300px] ring-1 ring-gray-50 items-center space-x-4'>
                <div><img src={`http://127.0.0.1:8000/${product.image}`} alt="" className='w-[200px] ' /></div>
                <div className='flex flex-col space-y-4'>
                  <div className='font-semibold text-[16px] w-[250px]'>{product.name}</div>
                  <div className='bg-[#9a9e9c] text-white font-semibold px-2 rounded-md text-[14px] w-[55px]'>{product.ratings}<i className="fa-solid fa-star ml-1 text-[13px]"></i></div>
                  <div className='flex flex-row space-x-4 items-center'>
                    <div className='line-through decoration-1'><i className="fa-solid fa-indian-rupee-sign mr-1 text-[13.5px]"></i>{product.original_price}</div>
                    <div className='font-semibold'><i className="fa-solid fa-indian-rupee-sign mr-1 text-[13.5px]"></i>{product.selling_price}</div>
                    <div className='text-[green] text-[14px] font-semibold'>{product.offer} %off</div>
                  </div>
                  <div className='flex flex-row space-x-3 '>
                    <div>Total Quantity : {cartItems.map((element) => { if (element.product == product.id) { return element.quantity } })}</div>
                    <div>Total Price : {cartItems.map((element) => { if (element.product == product.id) { return element.quantity * product.selling_price } })}</div>
                  </div>
                  <div><button onClick={() => removecart(product.id)}><i className='fa-solid fa-trash'></i></button></div>
                </div>
              </div>
            ))
          ) : (
            <div className='flex justify-center'>
              Add Product to Show
            </div>
          )}
        </div>
        <div>
            {tprice}
        </div>
      </div>
    </>
  );
}

export default Cart