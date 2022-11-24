import React from "react";
import Layout from "../components/Layout";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Header from "../components/Header";
import Form from "../components/Form";
import Tabs from "../components/Tabs";
import AutoComplete from "../components/AutoComplete";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { USERACCOUNT, TRANSFER } from "../api/apiUrl";
import { queryKeys } from "../api/queryKey";
import { getRequest, postRequest } from "../api/apiCall";
import jwtDecode from "jwt-decode";
import { Banks } from "../components/Banks";
import { useToasts } from "react-toast-notifications";
import Pagination from "../components/Pagination";

export default function Transfer() {
  const { addToast } = useToasts();
  const mybank =
    typeof window !== "undefined" &&
    jwtDecode(localStorage?.getItem("my_bank_token"));
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);
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
    full_name: "",
    account: "",
    amount: "",
    bank: "",
  });
  const OtherBanksFormInputs = [
    {
      label: "Full name",
      id: "full_name",
      value: state.full_name,
      type: "string",
    },
    {
      label: "Account Number",
      id: "account",
      value: state.account,
      type: "number",
    },
    { label: "Amount", id: "amount", value: state.amount, type: "number" },
  ];
  const MyBankFormInputs = [
    {
      label: "Account Number",
      id: "account",
      value: state.account,
      type: "number",
    },
    { label: "Amount", id: "amount", value: state.amount, type: "number" },
  ];
  const [banks, setBanks] = React.useState<
    {
      name: string;
      slug: string;
      code: string;
      ussd: string;
      logo: string;
    }[]
  >([...Banks]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  // React.useEffect(() => {
  //   let unMounted = false;
  //   fetch("https://nigerianbanks.xyz/")
  //     .then((res) => res.json())
  //     .then((res) => {
  //       if (!unMounted) {
  //         setBanks(res);
  //       }
  //     })
  //     .catch((err) => console.error(err));
  //   return () => {
  //     unMounted = true;
  //   };
  // }, []);
  const [selected, setSelected] = React.useState<{
    name: string;
    slug: string;
    code: string;
    ussd: string;
    logo: string;
  }>(banks[0]);
  React.useEffect(() => {
    setSelected(banks[0]);
  }, [banks]);
  const tabs = ["Other Banks", "My Bank"];
  const [tab, setTab] = React.useState(tabs[0]);
  const [accountNumber, setAccountNumber] = React.useState(null);
  const [showAmount, setShowAmount] = React.useState(false);
  const CheckAccountNumber = (e: any) => {
    e.preventDefault();
    setAccountNumber(state.account);
  };
  const { data: userAccount, status: userAccountStatus } = useQuery(
    [queryKeys.getUserAccount, accountNumber],
    async () => await getRequest({ url: USERACCOUNT(accountNumber) }),
    {
      retry: 2,
      enabled: !!accountNumber,
    }
  );
  const [UserAccount, SetUserAccount] = React.useState(userAccount?.data);
  React.useEffect(() => {
    SetUserAccount(userAccount?.data);
    userAccountStatus === "success" && setShowAmount(true);
  }, [userAccount?.data, accountNumber]);
  React.useEffect(() => {
    setState({
      ...state,
      bank: selected?.name,
    });
  }, [selected]);
  const {
    data: transactionList,
    status,
    isFetching,
  } = useQuery(
    [queryKeys.getTransfers],
    async () => await getRequest({ url: TRANSFER }),
    {
      retry: 2,
    }
  );
  const [transactions, setTransactions] = React.useState(transactionList?.data);
  React.useEffect(() => {
    setTransactions(transactionList?.data);
  }, [transactionList?.data]);
  const cache = useQueryClient();
  const { mutate } = useMutation(postRequest, {
    onSuccess(data) {
      console.log(data);
      setDisabled(false);
      if (data?.message != "Insufficient funds") {
        addToast(data?.message, { appearance: "success", autoDismiss: true });
        setOpen(false);
        setShowAmount(false);
        setAccountNumber(null)
        SetUserAccount({});
        cache.invalidateQueries();
        setState({ full_name: "", account: "", amount: "", bank: "" });
      } else {
        addToast(data?.message, { appearance: "error", autoDismiss: true });
      }
    },
  });
  const submitForm = (e: any) => {
    e.preventDefault();
    setDisabled(true);
    mutate({
      url: TRANSFER,
      data: {
        ...state,
        bank: tab === "My Bank" ? tab : state.bank,
        account: tab === "My Bank" ? UserAccount?.account : state.account,
        full_name: tab === "My Bank" ? UserAccount?.full_name : state.full_name,
      },
    });
  };
  return (
    <>
      <Modal
        open={open}
        action={handleCloseNav}
        animate={animate}
        title="Make Transfer"
      >
        <Tabs tabs={tabs} tab={tab} setTab={setTab} />
        {tab !== "My Bank" ? (
          <Form
            formInputs={OtherBanksFormInputs}
            buttonValue="Transfer"
            title="Transfer To"
            account={state?.account}
            person={state?.full_name}
            change={handleChange}
            disabled={disabled}
            submit={submitForm}
          >
            <AutoComplete
              banks={banks}
              selected={selected}
              setSelected={setSelected}
            />
          </Form>
        ) : (
          <Form
            formInputs={[]}
            buttonValue="Transfer"
            title="Transfer To"
            account={UserAccount?.account}
            person={UserAccount?.full_name}
            change={handleChange}
            disabled={disabled}
            submit={submitForm}
          >
            <div className="">
              <label
                htmlFor={"account"}
                className="block text-sm font-medium text-gray-700"
              >
                {"Account Number"}
              </label>
              <div className="mt-1">
                <input
                  required
                  type={"number"}
                  name={"account"}
                  id={"account"}
                  onChange={handleChange}
                  value={state.account}
                  autoComplete={"account"}
                  className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
              </div>
            </div>
            {!showAmount && (
              <div className="flex justify-end w-full">
                <button
                  type="button"
                  className="text-white bg-indigo-700 rounded-md p-2"
                  onClick={CheckAccountNumber}
                >
                  {"check"}
                </button>
              </div>
            )}
            {showAmount && (
              <div className="">
                <label
                  htmlFor={"amount"}
                  className="block text-sm font-medium text-gray-700"
                >
                  {"Amount"}
                </label>
                <div className="mt-1">
                  <input
                    required
                    type={"number"}
                    name={"amount"}
                    id={"amount"}
                    onChange={handleChange}
                    value={state.amount}
                    autoComplete={"amount"}
                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>
            )}
          </Form>
        )}
      </Modal>
      <Layout>
        <Header
          open={open}
          action={handleOpenNav}
          title="Transfer History"
          buttonValue="Transfer"
        />
        <Pagination
          transactions={transactions}
          status={status}
          isFetching={isFetching}
        />
      </Layout>
    </>
  );
}
