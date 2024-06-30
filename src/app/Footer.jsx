import React from 'react'

const Footer = () => {
  return (
    <>
        <div className=''>
        <div class='flex flex-row justify-around w-full bg-[#172337] h-[200px] p-4 text-white items-center'>
                <div class=' flex flex-col space-y-4 w-[300px]'>
                    <div className='underline decoration-1'><i class="fa-solid fa-cart-shopping mr-2"></i>Lucishop</div>
                    <div>
                        Buy your favourite through lucishop with affortable price and get more discounts as well as gifts
                    </div>
                </div>
                <div>
                    <div class='underline decoration-1'>Links</div>
                    <div><a href="">Home</a></div>
                    <div><a href="">About</a></div>
                    <div><a href="">Products</a></div>
                    <div><a href="">Trendings</a></div>
                </div>
                <div class='flex flex-col justify-around items-center'>
                    <div className='underline decoration-1'>Social Media</div>
                    <div class="flex flex-row space-x-2 text-[20px]">
                        <div><i class="fa-brands fa-facebook"></i></div>
                        <div><i class="fa-brands fa-instagram"></i></div>
                        <div><i class="fa-brands fa-whatsapp"></i></div>
                        <div><i class="fa-brands fa-linkedin"></i></div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Footer