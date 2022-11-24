import React from "react"
import moment from "moment"

export default function Cards({transactions}){
 
    return(
        <div className="flex flex-wrap pt-5 -m-2 md:hidden" id="Classes">
      {transactions?.map((data: any, i: any) => (
        <div
          className="w-full p-2 lg:w-1/3 sm:w-1/2 searchBody"
          key={i}
        >
          <>
            <div className="flex items-center h-full p-4 transform bg-white border border-gray-200 rounded-lg shadow cursor-pointer hover:scale-105 hover:bg-indigo-700 hover:text-white duration-500 transition-all gap-3 justify-between">
                <div className="flex items-center gap-3">
                  {
                    data.type==="deposit" &&
            <div className="bg-green-100 text-green-800 rounded-full text-sm flex items-center w-center font-extrabold justify-center py-4 px-3">DPST</div>
                  }
                  {
                    data.type==="transfer" &&
            <div className="bg-blue-100 text-blue-800 rounded-full text-sm flex items-center w-center font-extrabold justify-center py-4 px-3">TRSF</div>
                  }
                  {
                    data.type==="transfer_to_me" &&
            <div className="bg-green-100 text-green-800 rounded-full text-sm flex items-center w-center font-extrabold justify-center py-4 px-3">TRSF</div>
                  }
                  {
                    data.type==="withdrawal" &&
            <div className="bg-red-100 text-red-800 rounded-full text-sm flex items-center w-center font-extrabold justify-center py-4 px-3">WTDL</div>
                  }
              <div className="">
                <h2 className="font-bold title-font">{data.account}</h2>
                  <p className="py-1 text-sm font-medium">
                    {data.full_name}
                  </p>
                  <p className="py-1 text-xs font-medium">
                    {data.bank}
                  </p>
                  <p className="py-1 text-xs font-medium">
                    {moment(data.created).format("LL")}
                  </p>
              </div>
                </div>
                {
                  data.type==="withdrawal" &&
              <div className="text-red-600 text-xl">
                 - {data.amount}
              </div>
                }
                {
                  data.type==="transfer" &&
              <div className="text-red-600 text-xl">
                 - {data.amount}
              </div>
                }
                {
                  data.type==="deposit" &&
              <div className="text-green-600 text-xl">
                 + {data.amount}
              </div>
                }
                {
                  data.type==="transfer_to_me" &&
              <div className="text-green-600 text-xl">
                
                + {data.amount}
              </div>
                }
            </div>
          </>
        </div>
      ))}
    </div>
    )
}