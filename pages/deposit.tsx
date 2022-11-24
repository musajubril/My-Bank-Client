import React from "react";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import Header from "../components/Header";
import Form from "../components/Form";
import jwtDecode from "jwt-decode";
import { useToasts } from "react-toast-notifications";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DEPOSIT } from "../api/apiUrl";
import { postRequest, getRequest } from "../api/apiCall";
import { queryKeys } from "../api/queryKey"

export default function Deposit() {
  const { addToast } = useToasts();
  const mybank =
    typeof window !== "undefined" &&
    jwtDecode(localStorage?.getItem("my_bank_token"));
  const [open, setOpen] = React.useState(false);
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
    setOpen(false);
    setAnimate({
      transition: { duration: 1 },
      initial: { opacity: 1 },
      animate: { opacity: 0 },
    });
  };
  const [state, setState] = React.useState({
    amount: "",
  });
  const formInputs = [
    { label: "Amount", id: "amount", type: "number", value: state.amount },
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const [disabled, setDisabled] = React.useState(false);
  const cache = useQueryClient()
  const { mutate } = useMutation(postRequest, {
    onSuccess(data) {
      console.log(data);
      addToast(data?.message, { appearance: "success", autoDismiss: true });
      setOpen(false)
      setDisabled(false)
      cache.invalidateQueries()
      setState({amount: ""})
    },
  });
  const submitForm = (e: any) => {
    e.preventDefault();
    setDisabled(true)
    mutate({
      url: DEPOSIT,
      data: state,
    });
  };
  const { data: transactionList, status, isFetching } = useQuery(
    [queryKeys.getDeposits],
    async () => await getRequest({ url: DEPOSIT }),
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
      <Modal
        open={open}
        action={handleCloseNav}
        animate={animate}
        title="Add Deposit"
      >
        <Form
          formInputs={formInputs}
          buttonValue="Deposit"
          title="Deposit To"
          account={mybank?.account}
          person={mybank?.full_name}
          disabled={disabled}
          change={handleChange}
          submit={submitForm}
        ></Form>
      </Modal>
      <Layout>
        <Header
          open={open}
          action={handleOpenNav}
          title="Deposit History"
          buttonValue="Make Deposit"
        />
        <Pagination transactions={transactions} status={status} isFetching={isFetching} />
      </Layout>
    </>
  );
}
