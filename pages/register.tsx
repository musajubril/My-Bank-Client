import jwtDecode from 'jwt-decode'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useMutation } from 'react-query'
import { useToasts } from 'react-toast-notifications'
import { registration } from '../api/apiCall'
import { REGISTER } from '../api/apiUrl'

export default function register() {
    const { addToast } = useToasts()
    const router = useRouter()
    const [state, setState] =  React.useState({
        full_name: "",
        mobile_number: "",
        pin: "",

    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    
    const formInputs = [
        {label: "Full Name", id: 'full_name', value:state.full_name, type: 'text'},
        {label: "Phone Number", id: 'mobile_number', value:state.mobile_number, type: 'number'},
        {label: "Account Pin", id: 'pin', value:state.pin, type: 'password'},
    ]
    const { mutate } = useMutation(registration, {
        onSuccess(data) {
            console.log(data)
            addToast(data?.message, { appearance: 'info', autoDismiss: true, })
            const my_bank_token =
        typeof window !== "undefined" &&
        jwtDecode(localStorage?.getItem("my_bank_token"));
            if(my_bank_token){
                router.push('/dashboard')
            }
        },
        
      });
      const submitForm = (e: any) => {
        e.preventDefault();
        mutate({
          url: REGISTER,
          data: state,
        });
      };

  return (
    <>
    <div className="grid max-w-6xl max-h-screen grid-cols-1 gap-10 mx-auto sm:grid-cols-2">
    <div className="hidden col-span-1 sm:my-auto sm:mx-auto sm:block" data-aos="fade-in-up" data-aos-duration="800">
      <img src="/wallet.gif" alt="" className="transition-all transform hover:scale-105 hover:-translate-y-3" />
    </div>
  <div className="flex flex-col justify-center min-h-screen col-span-1 px-4 bg-gray-50 sm:py-12 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        className="w-auto h-auto mx-auto sm:hidden"
        src="/wallet.gif"
          alt="Workflow"
          data-aos="fade-in-up" data-aos-duration="800"
      />
      <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">Create A My Bank Account</h2>
      <h2 className="mt-1 text-xl text-center text-gray-900">Or <span className="text-sm text-blue-600">
        <Link href="/">Sign In To Your Account</Link></span></h2>
    </div>

    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="px-4 py-8 bg-gray-50 sm:rounded-lg sm:px-5">

      <form className="grid grid-cols-1 gap-y-6 gap-x-4" onSubmit={submitForm}>
            {
                formInputs?.map((form, i)=>(
                    <div className="" key={i}>
                <label
                  htmlFor={form.id}
                  className="block text-sm font-medium text-gray-700"
                >
                  {form.label}
                </label>
                <div className="mt-1">
                  <input
                    required
                    type={form.type}
                    name={form.id}
                    id={form.id}
                    onChange={handleChange}
                    value={form.value}
                    autoComplete={form.id}
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    />
                </div>
              </div>
                    ))
                }
              <div className="flex justify-end w-full">
                <button className="text-white bg-indigo-700 rounded-md py-2 px-4">Create Account</button>
              </div>
        </form>
      </div>
    </div>
  </div>
  </div>
  </>
  )
}
