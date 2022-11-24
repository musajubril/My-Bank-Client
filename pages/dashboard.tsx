import React from 'react'
import Layout from '../components/Layout'
import Table from '../components/Table'
import Stats from '../components/stats'
import jwtDecode from "jwt-decode"
import { useQuery } from "react-query"
import { getRequest } from "../api/apiCall"
import { MYACCOUNT } from "../api/apiUrl"
import { queryKeys } from "../api/queryKey"

export default function Home() {
  const mybank =
  typeof window !== "undefined" &&
  jwtDecode(localStorage?.getItem("my_bank_token"));
  const { data: userData } = useQuery(
    [queryKeys.getMyAccount],
    async () => await getRequest({ url: MYACCOUNT }),
    {
      retry: 2,
    }
  );
  const [user, setUser] = React.useState(userData?.data)
  const [transactions, setTransactions] = React.useState(userData?.history)
  React.useEffect(()=>{
    setUser(userData?.data)
    setTransactions(userData?.history)
  },[userData?.data, userData?.history])
  console.log(user)
  return (
    <Layout>
      <Stats data={user} />
      <div className="py-4" />
      <Table transactions={transactions} />
    </Layout>
  )
}
