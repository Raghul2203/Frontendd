import React, { useEffect, useState } from 'react'
import useFetch from '../customhooks/UseFetch'
import { jwtDecode } from 'jwt-decode'
import { REFRESH_TOKEN } from '../auth/components/Constants'
import axios from 'axios'
import { Alert, Breadcrumb, BreadcrumbItem } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
  const [products, setProducts] = useState([]);
  let [message, setmessage] = useState()
  let [isloading, setisloading] = useState(false)
  let navigate = useNavigate()
  const jwt = jwtDecode(localStorage.getItem(REFRESH_TOKEN));
 
  const { data: cartItems } = useFetch(`http://13.48.43.42:8000/api/cart/${jwt['user_id']}/`);
  useEffect(() => {
    const fetchProducts = async () => {
      if (cartItems) {
        try {
          const promisedata = cartItems.map(item => axios.get(`http://13.48.43.42:8000/api/product/${item.product}/`))
          const responses = await Promise.all(promisedata)
          const productdata = responses.map(response => response.data)
          setProducts(productdata)
          setisloading(true)
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
    let response = await fetch('http://13.48.43.42:8000/api/removecart/', {
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

  const [tprice, settprice] = useState([])
  const [toprice, settoprice] = useState()
  const [tdiscount, settdiscount] = useState()
  useEffect(() => {
    if (cartItems && products) {
      const totalPrice = cartItems.reduce((total, cartItem) => {
        const product = products.find(product => product.id === cartItem.product);
        if (product) {
          return total + cartItem.quantity * product.selling_price;
        }
        return total;
      }, 0);
      const totalDiscount = cartItems.reduce((total, cartItem) => {
        const product = products.find(product => product.id === cartItem.product);
        if (product) {
          return total + product.offer;
        } 
        return total;
      }, 0);
      const toriginalprice = cartItems.reduce((total, cartItem) => {
        const product = products.find(product => product.id === cartItem.product);
        if (product) {
          return total + product.original_price;
        }
        return total;
      }, 0);
      settprice(totalPrice);
      settoprice(toriginalprice)
      settdiscount(totalDiscount)
    }
  }, [cartItems, products]);

  return (
    <>
      <div className={ products.length > 0 ? 'ml-[80px] mt-[80px]' : 'fixed ml-[80px] -mt-[150px]'}>
        <Breadcrumb>
          <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
          <BreadcrumbItem><Link>Cart</Link></BreadcrumbItem>
        </Breadcrumb>
      </div>
      {message && <Alert color="success" onDismiss={() => setmessage(null)} className='fixed'><span className="font-medium">{message}</span></Alert>}
      <div className="flex flex-row justify-around ">
        {isloading && 
        <div className='flex flex-col mx-[100px] p-3'>
        {products.length > 0 ? (
          products.map(product => (
            <div key={product.id} className=' flex flex-row h-[300px] ring-1 ring-gray-50 items-center space-x-4'>
              <div><img src={`http://13.48.43.42:8000/${product.image}`} alt="" className='w-[200px] h-[250px]' /></div>
              <div className='flex flex-col space-y-4'>
              <Link to={`/category/${product.category}/${product.id}`}>
                <div className='font-semibold text-[16px] w-[250px] hover:cursor-pointer hover:underline'>{product.name}</div></Link>
                <div className='bg-[#9a9e9c] text-white font-semibold px-2 rounded-md text-[14px] w-[55px]'>{product.ratings}<i className="fa-solid fa-star ml-1 text-[13px]"></i></div>
                <div className='flex flex-row space-x-4 items-center'>
                  <div className='line-through decoration-1'><i className="fa-solid fa-indian-rupee-sign mr-1 text-[13.5px]"></i>{parseInt(product.original_price).toLocaleString()}</div>
                  <div className='font-semibold'><i className="fa-solid fa-indian-rupee-sign mr-1 text-[13.5px]"></i>{parseInt(product.selling_price).toLocaleString()}</div>
                  <div className='text-[green] text-[14px] font-semibold'>{product.offer} %off</div>
                </div>
                <div className='flex flex-row space-x-3 '>
                  <div>Total Quantity : {cartItems.map((element) => { if (element.product === product.id) { return element.quantity } })}</div>
                  <div>Total Price : <i className="fa-solid fa-indian-rupee-sign mr-1 text-[13.5px]"></i>{cartItems.map((element) => { if (element.product === product.id) { return parseInt(element.quantity * product.selling_price).toLocaleString() } })}</div>
                </div>
                <div><button onClick={() => removecart(product.id)}><i className='fa-solid fa-trash'></i></button></div>
              </div>
            </div>
          ))
        ) : (
          <div className='flex justify-center'>
            <Alert color='info'>Add Products to Display</Alert>
          </div>
        )}
      </div>}
        {products.length > 0 &&
          <div className='bg-[#dedede56]  w-[260px] h-[250px] rounded-md items-center mx-5'>
            <div className="flex flex-col">
              <table cellPadding={10}>
                <tr className='space-x-4'>
                  <th align='center' colSpan={2}>Price Details</th>
                </tr>
                <tr>
                  <th align='left' className='font-normal'>
                    Price ({products.length} items)
                  </th>
                  <td>
                  <i className="fa-solid fa-indian-rupee-sign text-[13.5px]"></i>{toprice.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <th align='left' className='font-normal'>Discount ({100 - tdiscount}%)</th>
                  <td >
                  <span className='text-[green]'>{(toprice - tprice) < 0 && <span>-</span> }<i className="fa-solid fa-indian-rupee-sign text-[13.5px]"></i>{(toprice - tprice)*(-1).toLocaleString()}</span>
                  </td>
                </tr>
                <tr>
                  <th align='left' className='font-normal'>Delivery Charge</th>
                  <td>{tprice > 500 ? <div>
                    <span className='line-through decoration-1'><i className="fa-solid fa-indian-rupee-sign  mr-1 text-[13px]"></i>{(products.length * 60).toLocaleString()}</span> <span className='text-[green]'>Free</span></div> : 
                    <div> {products.length * 50}</div>}</td>
                </tr>
                <tr> 
                  <th align='left' className='text-[20px] font-semibold'>
                    Total Price
                  </th>
                  <th className='text-[20px] font-semibold'>
                  <i className="fa-solid fa-indian-rupee-sign text-[16.6px]"></i>{tprice.toLocaleString()}
                  </th>
                </tr>
              </table>
            </div>
          </div>
        }
      </div>
    </>
  );
}

export default Cart