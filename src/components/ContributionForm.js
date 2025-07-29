"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ContributionForm = () => {
  const [amount, setAmount] = useState(2500);
  const [addAmount, setAddAmount] = useState(false);
  const [tipPercent, setTipPercent] = useState(0);

  const tip = Number((amount * (tipPercent / 100)).toFixed(2));
  const totalAmount = amount + tip;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    anonymous: false,
  });

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (totalAmount <= 0) {
      toast.error("Amount must be greater than ₹0");
      return;
    }

    if(totalAmount>100000){
      toast.error('Amount must not exceed ₹1,00,000')
      return
    }
    try {
      const res = await axios.post("https://razorpay-backend-y3xn.onrender.com/api/create-order", {
        ...form,
        amount: amount,
        tip: tip,
      });
      console.log(res);
      const options = {
        order_id: res.data.order.id, //5
        amount: res.data.order.amount, //2
        currency: res.data.order.currency, //3
        key: res.data.razpekey, //1
        name: res.data.name, //4
        callback_url: "https://razorpay-frontend-fdo4.vercel.app/thankyouPage",
        prefill: {
          name: form.anonymous ? "Anonymous" : form.name,
          email: form.anonymous ? "anonymous@example.com" : form.email,
          contact: form.phone,
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("error at frontend", error);
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto mt-10 flex justify-center flex-col items-center">
        <h1 className="text-cyan-500 text-4xl font-bold mx-5">
          Choose a Contribution amount
        </h1>
        <p className="mt-10 mx-5">
          Most Contntributors contribute approx{" "}
          <span className="text-cyan-600">&#x20B9;2500 </span>to this
          Fundraisers
        </p>
        <div className="flex-col  md:flex-row gap-3 mt-3 mx-5">
          <button
            onClick={() => {
              setAmount(1000), setAddAmount(false);
            }}
            className={`border mr-2 rounded-2xl py-1 px-2  hover:text-white transition duration-300 cursor-pointer ${
              amount == 1000 ? "bg-cyan-500 text-white" : "hover:bg-cyan-500"
            }`}
          >
            &#x20B9;1000
          </button>
          <button
            onClick={() => {
              setAmount(2500), setAddAmount(false);
            }}
            className={`border mr-2 rounded-2xl py-1 px-2  hover:text-white transition duration-300 cursor-pointer ${
              amount == 2500 ? "bg-cyan-500 text-white" : "hover:bg-cyan-500"
            }`}
          >
            &#x20B9;2500
          </button>
          <button
            onClick={() => {
              setAmount(4000), setAddAmount(false);
            }}
            className={`border mr-2 rounded-2xl py-1 px-2  hover:text-white transition duration-300 cursor-pointer ${
              amount == 4000 ? "bg-cyan-500 text-white" : "hover:bg-cyan-500"
            }`}
          >
            &#x20B9;4000
          </button>
          <button
            onClick={() => setAddAmount(true)}
            className={`border rounded-2xl py-1 px-2  hover:text-white transition duration-400 cursor-pointer ${
              amount !== 0 &&
              amount !== 1000 &&
              amount !== 2500 &&
              amount !== 4000
                ? "bg-cyan-500 text-white"
                : "hover:bg-cyan-500"
            }`}
          >
            Other Amount
          </button>
          {addAmount && (
            <div className="flex flex-col mt-3">
              <label htmlFor="email" className="text-md font-medium">
                Amount
              </label>
              <input
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="add amount here"
                type="number"
                id="amount"
                name="amount"
                autoComplete="off"
                className=" px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          )}
        </div>
        <div className="max-w-xl text-md bg-cyan-100 mt-5 m-5 p-6 rounded-md">
          <p>
            Ketto is charging 0% platfarm fee* for this Fundraiser, releying
            solely on the generosity of contributors like you{" "}
            <span className="bg-cyan-200 rounded-4xl px-2 py-1 ">!</span>
          </p>
          <div>
            <div className="flex  items-center  mt-3">
              <span>Support us by adding a tip of :</span>
              <select
                onChange={(e) => setTipPercent(e.target.value)}
                className="border rounded bg-white  px-2 py-1 text-sm"
              >
                <option value={0}>{`0% `}</option>
                <option value={10}>{`10%  `}</option>
                <option value={15}>{`15%  `}</option>
                <option value={18}>{`18% `}</option>
              </select>
              <p className="ml-4 font-light  bg-cyan-300 px-2 py-1">
                Tip <span className="text-lg">&#x20B9;: {tip}</span>
              </p>
            </div>
            <p className="text-right mt-2 font-medium">
              Total Amount:{" "}
              <span className="bg-cyan-300 px-2 py-2 font-semibold text-xl">
                &#x20B9; {totalAmount}
              </span>
            </p>
          </div>
        </div>
        <form
          onSubmit={submitHandler}
          className="flex flex-col  md:w-lg gap-2 mt-3 mx-5"
        >
          <div className="flex flex-col">
            <label htmlFor="name" className="text-md font-medium ">
              Name*
            </label>
            <input
              onChange={changeHandler}
              value={form.name}
              type="text"
              id="name"
              name="name"
              required
              autoComplete="off"
              className=" px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="email" className="text-md font-medium">
              Email*
            </label>
            <input
              value={form.email}
              onChange={changeHandler}
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              required
              className=" px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="number" className="text-md font-medium">
              Contact Number*
            </label>
            <input
              onChange={changeHandler}
              value={form.phone}
              type="number"
              id="phone"
              name="phone"
              autoComplete="off"
              required
              className=" px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="adress" className="text-md font-medium">
              Adress
            </label>
            <input
              onChange={changeHandler}
              type="text"
              id="adress"
              autoComplete="off"
              name="adress"
              className=" px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <label>
            <input
              name="anonymous"
              type="checkbox"
              checked={form.anonymous}
              onChange={changeHandler}
            />
            Make my contribution anonymous
          </label>
          <button
            type="submit"
            className="mt-3 border rounded-full bg-cyan-200 transition duration-200 hover:bg-cyan-300 cursor-pointer max-w-100 mx-auto py-2 px-2"
          >
            {` Proceed to Contribute ${totalAmount}`}
          </button>
          <p className="mt-3 border-b-2">
            By Continuing you agree to our{" "}
            <span
              className="text-cyan-500 font-semibold
 text-[16px]"
            >
              Terms of Service
            </span>{" "}
            and{" "}
            <span
              className="text-cyan-500 font-semibold
 text-[16px]"
            >
              Privacy Policy
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default ContributionForm;
