import React from 'react'
import useFetch from '../customhooks/UseFetch'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'flowbite-react'
const Products = () => {
  let {name} = useParams()
  let {data:products} = useFetch(`http://127.0.0.1:8000/api/products/${name}/`)
  return (
    <>
      <div className='ml-[80px] mt-[30px]'>
          <Breadcrumb>
            <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
            <BreadcrumbItem><Link>Products</Link></BreadcrumbItem>
          </Breadcrumb>
        </div>
      <div className='grid grid-cols-5 gap-6 mx-10 my-[40px]'>
        {products.map((element)=>{
          return <Link to={`/${element.id}`} key={element.id} >
              <div className='flex flex-col space-y-3 space-x-3 w-[250px] h-[350px] items-center  justify-center rounded-lg ring-1 ring-[#F7F7F7] shadow-md'>
                <div><img src={`http://127.0.0.1:8000/${element.image}`} className='w-[160px] h-[180px]' alt=''/></div>
                <div className='text-[15px] text-center'>{element.name}</div>
                <div className='bg-[#9a9e9c] text-white font-semibold px-2 rounded-md text-[14px]'>{element.ratings}<i className="fa-solid fa-star ml-1 text-[13px]"></i></div>
                <div className="flex flex-row space-x-3">
                  <div className='line-through decoration-1'><i className="fa-solid fa-indian-rupee-sign  mr-1 text-[13px]"></i>{element.original_price}</div>
                  <div><i className="fa-solid fa-indian-rupee-sign  mr-1 text-[13px]"></i>{element.selling_price}</div>
                  <div className='font-semibold'>{element.offer}%off</div>
                </div>
              </div>
          </Link>
        })}
      </div>
    </>
  )
}

export default Products