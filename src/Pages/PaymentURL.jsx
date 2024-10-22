import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';
import { createOrder } from '../Utils/Apis';

const PaymentURl = () => {


    const [amount, setAmount] = useState("");
    const [accountNumber, setaccountNumber] = useState('');
    const [bankName, setbankName] = useState('');
    const [callbackUrl, setcallbackUrl] = useState('');
    const [ifsc, setifsc] = useState('')


    const secretKey = "django-insecure-t4c5!_l0l$#@@o0+#=crk84#2662ev(f6ir@#)y%pzz2r&h&k%";

    const CreatePayment = async () => {
        if (amount === "") {
            toast.error("Amount is required");
            return;
        }
        const data = {
            account_number: accountNumber,
            amount: parseFloat(amount),
            bank_name: bankName,
            callback_url: callbackUrl,
            ifsc: ifsc
        };
        const hmac = CryptoJS.HmacSHA256(JSON.stringify(data), secretKey).toString();
        try {
            const response = await createOrder(data, hmac);
            console.log(response, "Hello")
            if (response.status === 201) {
                alert("Order Created Successfully");
                setAmount('');
                setaccountNumber('');
                setbankName('');
                setcallbackUrl('');
                setifsc('');
            }
        } catch (err) {
            console.error("Error creating order:", err);
            alert(err?.response?.data?.[0] || "Failed to create order");
        }
    };

    return (
        <>
            <main className="container d-flex flex-column vh-100">
                <div className="row align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                    <div className="col-12 col-md-8 col-lg-6 col-xxl-4">
                        <div className="card shadow-sm">
                            <div className="card-body p-4">
                                <div className="text-center mb-4">
                                    <h1 className="mb-3">Transfer Your Fund</h1>
                                </div>
                                <form onSubmit={(e) => { e.preventDefault(); CreatePayment(); }}>
                                    <div className="mb-3">
                                        <label htmlFor="amount" className="form-label">
                                            Enter account number <span style={{ color: "#f02929" }}>*</span>
                                        </label>
                                        <input
                                            onChange={(e) => setaccountNumber(e.target.value)}
                                            type="text"
                                            className="form-control"
                                            id="amount"
                                            name="amount"
                                            placeholder="Account number"
                                            value={accountNumber}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="amount" className="form-label">
                                            Enter Amount <span style={{ color: "#f02929" }}>*</span>
                                        </label>
                                        <input
                                            onChange={(e) => setAmount(e.target.value)}
                                            maxLength="10"
                                            type="text"
                                            className="form-control"
                                            id="amount"
                                            name="amount"
                                            placeholder="Amount"
                                            value={amount}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="amount" className="form-label">
                                            Enter Bank name <span style={{ color: "#f02929" }}>*</span>
                                        </label>
                                        <input
                                            onChange={(e) => setbankName(e.target.value)}
                                            type="text"
                                            className="form-control"
                                            id="amount"
                                            name="amount"
                                            placeholder="Bank Name"
                                            value={bankName}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="amount" className="form-label">
                                            Enter IFSC <span style={{ color: "#f02929" }}>*</span>
                                        </label>
                                        <input
                                            onChange={(e) => setifsc(e.target.value)}
                                            type="text"
                                            className="form-control"
                                            id="amount"
                                            name="amount"
                                            placeholder="IFSC"
                                            value={ifsc}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="amount" className="form-label">
                                            Enter Callback URL <span style={{ color: "#f02929" }}>*</span>
                                        </label>
                                        <input
                                            onChange={(e) => setcallbackUrl(e.target.value)}
                                            type="text"
                                            className="form-control"
                                            id="amount"
                                            name="amount"
                                            placeholder="Callback URL"
                                            value={callbackUrl}
                                            required
                                        />
                                    </div>
                                    <div className="d-grid gap-2">
                                        <button type="submit" className="btn btn-primary">
                                            + ADD
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default PaymentURl;




