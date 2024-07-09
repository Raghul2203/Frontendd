import React from 'react'
import useFetch from '../customhooks/UseFetch'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'flowbite-react'
const Products = () => {
  let { name } = useParams()
  let { data: products } = useFetch(`http://13.48.43.42:8000/api/products/${name}/`)
  return (
    <>
      <div className='ml-[80px] mt-[90px]'>
        <Breadcrumb>
          <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
          <BreadcrumbItem><Link>{name}</Link></BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className='grid grid-cols-5 gap-6 mx-[50px] my-[40px]'>
        {products.map((element) => {
          return <Link to={`/category/${name}/${element.id}`} key={element.id} >
            <div className='flex flex-col w-[250px] h-[350px] items-center justify-center rounded-lg ring-1 ring-gray-500 shadow-md hover:scale-105 hover:transition'>
              <div><img src={`http://13.48.43.42:8000/${element.image}`} className='w-[160px] h-[180px] my-[15px] ' alt='' /></div>
              <div className='flex flex-col items-center space-y-4 bg-black h-full w-full text-white py-4 px-3 -mt-[30px] rounded-b-lg overflow-hidden font-[]'>
                <div className='text-[12px] text-center'>{element.name}</div>
                <div className='bg-[#9a9e9c] text-white font-semibold px-2 rounded-md text-[14px] '>{element.ratings}<i className="fa-solid fa-star ml-1 text-[13px]"></i></div>
                <div className="flex flex-row space-x-3">
                  <div className='line-through decoration-1'><i className="fa-solid fa-indian-rupee-sign  mr-1 text-[13px]"></i>{parseInt(element.original_price).toLocaleString()}</div>
                  <div><i className="fa-solid fa-indian-rupee-sign  mr-1 text-[13px]"></i>{parseInt(element.selling_price).toLocaleString()}</div>
                  <div className='font-semibold'>{element.offer}%off</div>
                </div>
              </div>
            </div>
          </Link>
        })}
      </div>
    </>
  )
}

export default Products