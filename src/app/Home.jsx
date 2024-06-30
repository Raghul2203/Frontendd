import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../customhooks/UseFetch'
import { Carousel } from 'flowbite-react'
import phone from '../images/toppng.com-apple-iphone-15-pro-max-natural-titanium-png-3200x3200.png'
import tv from '../images/samsungtv.png'
import laptop from '../images/l3.jpg'
import airdopes from '../images/b1.jpg'
import watch from '../images/w1.jpg'
import shirt from '../images/s4.jpg'
const Home = () => {
  let { data } = useFetch("http://127.0.0.1:8000/api/category/")
  let { data: tproducts } = useFetch("http://127.0.0.1:8000/api/allproduct/")
  return (
    <>
      <div className="flex flex-col space-y-10 my-10 -mb-[200px]">
        <div className="flex flex-row justify-around mx-[100px] ">
          {data.map((element) => {
            return <Link to={`category/products/${element.name}/`} key={element.id} onClick={()=>localStorage.setItem('product_name', element.name)}>
              <div className='flex flex-col  items-center'>
                <div><img src={`http://127.0.0.1:8000/${element.image}`} className='w-[100px] h-[100px] hover:scale-105' alt=''></img></div>
                <div><p className='font-semibold'>{element.name}</p></div>
              </div>
            </Link>
          })}
        </div>
        <div>
          <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel className='shadow-md'>
              <img src={phone} alt="..." className='w-[400px] h-[400px]' />
              <img src={tv} alt="..." className='w-[600px] h-[400px]' />
              <img src={laptop} alt="..." className='w-[400px] h-[400px]' />
              <img src={airdopes} alt="..." className='w-[400px] h-[400px]' />
              <img src={watch} alt="..." className='w-[400px] h-[350px]' />
              <img src={shirt} alt="..." className='w-[400px] h-[400px]' />

            </Carousel>
          </div>

        </div>

        <div className='grid grid-rows-5 grid-cols-5 gap-[10px] mx-[50px] '>
          {
            tproducts.map((element) => {
              return <Link to={`/${element.id}`} key={element.id}>
                <div className="flex flex-col space-y-4 items-center w-[250px] h-[300px] shadow-sm">
                  <div><img src={`http://127.0.0.1:8000/${element.image}`} className='w-[150px] h-[150px]' alt="" /></div>
                  <div className='text-center'>{element.name}</div>
                </div>
              </Link>
            })
          }
        </div>
      </div>
    </>
  )
}

export default Home