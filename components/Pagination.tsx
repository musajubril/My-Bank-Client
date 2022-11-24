import React, { useEffect, useState } from "react";
import usePagination, { DisplayPagination } from "@impedans/usepagination";
import { ApiUrl, FoodParams, AllFoods } from "./Params";
import { Ripple } from 'react-load-animations';
import Food from "./Food";
import axios from "axios";
import { useQuery } from "react-query";
import Table from "./Table"
export default function Pagination({transactions, status, isFetching}) {
  const [data, setData] = useState(transactions);
  const [paginatedList, paginationProps] = usePagination(data, {
    perPage: 7,
    maxButtons: 5,
  });
   const [returnedData, setReturnedData] = React.useState(paginatedList)
  useEffect(() => {
    status==="loading" || isFetching ? setReturnedData(null) : setReturnedData(paginatedList)
  }, [status, isFetching]);
  useEffect(() => {
    setData(transactions)
  }, [transactions]);
  useEffect(() => {
    setReturnedData(paginatedList)
  }, [paginatedList]);
  const { activePage } = paginationProps
  const [prevPage, setPrevPage] = React.useState(1)
  React.useEffect(()=>{
    prevPage!==activePage ? setReturnedData(null) : setReturnedData(paginatedList)
    setPrevPage(activePage)
  },[activePage])
  React.useEffect(()=>{
    setReturnedData(paginatedList)
  },[transactions])
  return (
    <>
      {
        (!isFetching && status==="success") &&
        <>
        <Table transactions={returnedData} />
      <div
        className="
        inline-flex
        p-4
        rounded-xl w-full mt-5
        "
      >
          <ul className="flex items-center -mx-[6px] justify-center w-full">
      <DisplayPagination
        {...paginationProps}
        pageNumFunc={(pageNum) => (
              
              <li className="px-[6px]">
                <button
                  className={`
                            w-9
                            h-9
                            flex
                            items-center
                            justify-center
                            rounded-md
                            border border-indigo-700
                            ${ activePage===pageNum ? "text-white" : "text-[#838995]"} text-base
                            ${activePage===pageNum && "bg-indigo-700"}
                            hover:bg-indigo-700 hover:border-indigo-700 hover:text-white
                            `}
                >
                    {pageNum}
                </button>
              </li>
        )}
        />
        </ul>
        </div>
        </>
      }
      {
        (status==="loading" || isFetching) && <div className="h-[50vh] w-full flex flex-col justify-center items-center">
        <Ripple width={100} height={100} />
      </div>
      }
    </>
  );
}
