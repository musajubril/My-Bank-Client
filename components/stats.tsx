import React from "react"
import { TbCurrencyNaira } from 'react-icons/tb'

export default function Stats({data}){
  const account_number = [(""+data?.account)?.slice(0,3), (""+data?.account)?.slice(3,7), (""+data?.account)?.slice(7, 10)]
    return(
        <div className=" grid gap-4 grid-cols-1 md:grid-cols-2">
        <div className="h-[140px] bg-indigo-700 font-semibold text-lg text-white rounded-[16px]  pl-6 flex-col gap-2 flex">
          <div className="flex justify-between items-center">
            <div className="py-6 flex-col gap-2">
              <div>{data?.full_name}</div>
              <div className='grid gap-4 grid-cols-3 text-2xl'>
              {
                  data?.account && account_number?.map((acc, i)=>(
                    <div key={i}>{acc}</div>
                  ))
                }
              </div>
              <div className='text-lg flex items-center gap-1'>
                <TbCurrencyNaira className="w-5 h-5" />
                <div>{data?.amount_in_account}</div>
              </div>
            </div>
            <div className="">
              <img className="object-cover h-[140px] rounded-tr-[16px] rounded-br-[16px] hover:scale-105 transition-all duration-500" src="/3d.png" />
            </div>
          </div>
        </div>
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
          {
            [
              {img: '/3d2.png', title: "Amount Deposited", value: data?.amount_deposited},
              {img: '/3d3.png', title: "Amount Removed", value: Number(data?.amount_withdrawn) + Number(data?.amount_transferred)},
            ].map((card, i)=>(
        <div className="h-[140px] bg-indigo-700 font-semibold text-lg text-white rounded-[16px]  pl-6 flex-col gap-2 flex">
          <div className="flex justify-between items-center">
            <div className="py-6 flex-col gap-2">
              <div>{card.title}</div>
              <div className='text-2xl flex items-center gap-1'>
                <TbCurrencyNaira className="w-5 h-5" />
                <div>{card.value}</div>
              </div>
            </div>
            <div className="">
              <img className="object-cover h-[140px] rounded-tr-[16px] rounded-br-[16px] hover:scale-105 transition-all duration-500 md:hidden lg:block block" src={card.img} />
            </div>
          </div>
        </div>
            ))
          }
        </div>
        </div>
    )
}