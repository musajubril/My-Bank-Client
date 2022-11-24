import React from 'react'
import Cards from "./Cards"
import moment from "moment"

  
  export default function Table({transactions}) {
    return (
        <>
        <Cards transactions={transactions} />
      <div className="hidden md:flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="sr-only"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Full Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Account Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Bank
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    {/* <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th> */}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transactions?.map((data, i) => (
                    <tr key={i}>
                      <td className="w-full flex justify-center items-center h-full py-4">
                        {
                          data.type==="deposit" &&
                        <div className="bg-green-100 text-green-800 rounded-full text-xs flex items-center w-center font-extrabold justify-center w-10 h-10">DPST</div>
                        }
                        {
                          data.type==="transfer" &&
                        <div className="bg-blue-100 text-blue-800 rounded-full text-xs flex items-center w-center font-extrabold justify-center w-10 h-10">TRSF</div>
                        }
                        {
                          data.type==="transfer_to_me" &&
                        <div className="bg-green-100 text-green-800 rounded-full text-xs flex items-center w-center font-extrabold justify-center w-10 h-10">TRSF</div>
                        }
                        {
                          data.type==="withdrawal" &&
                        <div className="bg-red-100 text-red-800 rounded-full text-xs flex items-center w-center font-extrabold justify-center w-10 h-10">WTDL</div>
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {
                          data.type==="transfer" ? "Out To " : null
                        }
                        {
                          data.type==="transfer_to_me" ? "In From " : null
                        }
                        {data.full_name}
                        </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.account}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.bank}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{moment(data.created).format("LL")}</td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit
                        </a>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </>
    )
  }
  