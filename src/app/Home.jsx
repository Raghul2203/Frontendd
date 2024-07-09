import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../customhooks/UseFetch'
import { Carousel } from 'flowbite-react'
import phone from '../images/toppng.com-apple-iphone-15-pro-max-natural-titanium-png-3200x3200.png'
import tv from '../images/samsungtv.png'
import laptop from '../images/l3.jpg'
import airdopes from '../images/b1.jpg'
import watch from '../images/w1.jpg'
import shirt from '../images/s4.jpg'
// import laptop from '../images/laptop.png'
// import carousel from '../images/carousel.png'
const Home = () => {
  let { data } = useFetch("http://13.48.43.42:8000/api/category/")
  let { data: tproducts } = useFetch("http://13.48.43.42:8000/api/allproduct/")
  return (
    <>
      <div className="flex flex-col space-y-10 my-10 -mb-[200px] mt-[100px] ">
        <div className="flex flex-row justify-around mx-[100px] ">
          {data.map((element) => {
            return <Link to={`category/${element.name}/`} key={element.id} >
              <div className='flex flex-col  items-center'>
                <div><img src={`http://13.48.43.42:8000/${element.image}`} className='w-[100px] h-[100px] hover:scale-105 hover:transition-all' alt=''></img></div>
                <div><p className='font-semibold'>{element.name}</p></div>
              </div>
            </Link>
          })}
        </div>
        <div>   
          <div className="h-[400px] sm:h-100 mb-[20px] overflow-hidden">
            <Carousel className='shadow-md'>
              <img src={phone} alt="..." className='w-[400px] h-[300px] ' />
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
              return <Link to={`/category/${element.category}/${element.id}`} key={element.id}>
                <div className="flex flex-col justify-between items-center w-[250px] h-[250px] shadow-lg ring-1 ring-gray-500 rounded-md hover:scale-105 hover:transition-all">
                  <div><img src={`http://13.48.43.42:8000/${element.image}`} className='w-[150px] h-[150px] mt-[20px]' alt="" /></div>
                  <div className='text-center text-[12px] w-full h-full rounded-b-md font-semibold font-sans text-balance bg-black text-white align-middle py-[10px] px-[5px] text-wrap overflow-hidden'>{element.name}</div>
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