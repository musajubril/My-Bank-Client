import React from "react"

export default function Form({formInputs, children, buttonValue, title, account, person, change, disabled, submit}) {
  const account_number = [(""+account)?.slice(0,3), (""+account)?.slice(3,7), (""+account)?.slice(7, 10)]
    return(
        <form className="grid grid-cols-1 gap-y-6 gap-x-4" onSubmit={submit}>
            <div className="bg-indigo-700 p-6 rounded-[16px] flex flex-col gap-2 justify-start text-white hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <div>{title}: {person}</div>
              <div className='grid gap-4 grid-cols-3 text-2xl'>
                {
                  account && account_number?.map((acc, i)=>(
                    <div key={i}>{acc}</div>
                  ))
                }
              </div>
            </div>
            {
                formInputs?.map((form, i)=>(
                    <div className="">
                <label
                  htmlFor={form.id}
                  className="block text-sm font-medium text-gray-700"
                >
                  {form.label}
                </label>
                <div className="mt-1">
                  <input
                  onChange={change}
                    required
                    value={form.value}
                    type={form.type}
                    name={form.id}
                    id={form.id}
                    autoComplete={form.id}
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    />
                </div>
              </div>
                    ))
                }
                {children}
              <div className="flex justify-end w-full">
                <button type="submit" className="text-white bg-indigo-700 rounded-md p-2" disabled={disabled}>{buttonValue}</button>
              </div>
        </form>
    )
}