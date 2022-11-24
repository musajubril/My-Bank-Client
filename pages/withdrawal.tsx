import React from 'react'
import Layout from '../components/Layout'
import Table from '../components/Table'
import Modal from '../components/Modal'
import Header from '../components/Header'
import Form from '../components/Form'
import jwtDecode from "jwt-decode"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { getRequest, postRequest } from "../api/apiCall"
import { WITHDRAWAL } from "../api/apiUrl"
import { queryKeys } from "../api/queryKey"
import { useToasts } from "react-toast-notifications";
import Pagination from "../components/Pagination";

export default function Withdrawal() {
  const { addToast } = useToasts();
  const mybank: {account: string, full_name: string} =
  typeof window !== "undefined" &&
  jwtDecode(localStorage?.getItem("my_bank_token"));
    const [open, setOpen] = React.useState(false)
    const [animate, setAnimate] = React.useState({
        transition: { duration: 1 },
        initial: { opacity: 0 },
        animate: { opacity: 0 },
      });

  const handleOpenNav = () => {
    setOpen(true);
    setAnimate({
      transition: { duration: 1 },
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    });
  };
  const handleCloseNav = () => {
    setOpen(false)
    setAnimate({
      transition: { duration: 1 },
      initial: { opacity: 1 },
      animate: { opacity: 0 },
    });
}
const [state, setState] = React.useState({
  amount: ""
})
const formInputs = [
    {label: "Amount", id: 'amount', type: 'number', value: state.amount}
]
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setState({
      ...state,
      [e.target.name]: e.target.value
  })
}
const [disabled, setDisabled] = React.useState(false)
const cache = useQueryClient()
  const { mutate } = useMutation(postRequest, {
    onSuccess(data) {
      console.log(data);
      setDisabled(false)
      if(data?.message !== "Insufficient funds"){
        setOpen(false)
        cache.invalidateQueries()
        setState({amount: ""})
        addToast(data?.message, { appearance: "success", autoDismiss: true });
      }
      else {
        addToast(data?.message, { appearance: "error", autoDismiss: true });
      }
    },
  });
  const submitForm = (e: any) => {
    e.preventDefault();
    setDisabled(true)
    mutate({
      url: WITHDRAWAL,
      data: state,
    });
  };
const { data: transactionList, status, isFetching } = useQuery(
  [queryKeys.getWithdrawals],
  async () => await getRequest({ url: WITHDRAWAL }),
  {
    retry: 2,
  }
);
const [transactions, setTransactions] = React.useState(transactionList?.data)
React.useEffect(()=>{
  setTransactions(transactionList?.data)
},[transactionList?.data])
  return (
      <>
      <Modal open={open} action={handleCloseNav} animate={animate} title="Make Withdrawal">
      <Form formInputs={formInputs} buttonValue="Withdraw" title="Withdraw From" account={mybank?.account} person={mybank?.full_name} disabled={disabled} change={handleChange} submit={submitForm}>
        
      </Form>
      </Modal>
    <Layout>
        <Header open={open} action={handleOpenNav} title="Withdrawal History" buttonValue="Withdraw" />
        <Pagination transactions={transactions} status={status} isFetching={isFetching} />
    </Layout>
    </>
  )
}
