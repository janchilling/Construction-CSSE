import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../UpdateAllocateBudget/UpdateAllocateBudget.css'

export default function UpdateStatus() {
    const [SiteName, setSiteName] = useState("");
    const [AllocateBudget, setAllocateBudget] = useState("");
    const [TotalAmountRequired, setTotalAmountRequired] = useState("");
    const [StartDate, setStartDate] = useState("");
    const [EndDate, setEndDate] = useState("");

    const params = useParams();

    useEffect(() => {
        getRequisitionDetails();
    }, []);

    const getRequisitionDetails = async () => {
        let result = await fetch(`http://localhost:8070/allocate/singleAllocate/${params.id}`);
        result = await result.json();

        setSiteName(result.SiteName);
        setAllocateBudget(result.AllocateBudget);
        setTotalAmountRequired(result.TotalAmountRequired);
        setStartDate(result.StartDate);
        setEndDate(result.EndDate);
    }

    const updateStatus = async () => {
        let result = await fetch(`http://localhost:8070/allocate/updateAllocate/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify({ SiteName, AllocateBudget, TotalAmountRequired, StartDate, EndDate }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        result = await result.json();

        if (result) {
            setTimeout(() => {
                window.location.href = `/allocatedBudgets`;
            }, 2000);
            toast.success('Status Updated Successfully..!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    return (
        <div className="MGUpdatePage">
            <br />
            <h1 className="MGUpdateHeading">Status - UPDATE</h1>
            <div className="MGUpdateFormStatus">
                <br />
                <label htmlFor="subject" className="MGUpdateFormHeading">Site Name: </label><br />
                <input type="text" className="MGUpdateFormInput" value={SiteName} onChange={(e) => setSiteName(e.target.value)} />
                <br /><br />
                <label htmlFor="subject" className="MGUpdateFormHeading">Allocate Budget: </label><br />
                <input type="text" className="MGUpdateFormInput" value={AllocateBudget} onChange={(e) => setAllocateBudget(e.target.value)} />
                <br /><br />
                <label htmlFor="subject" className="MGUpdateFormHeading">Total Amount Required: </label><br />
                <input type="text" className="MGUpdateFormInput" value={TotalAmountRequired} onChange={(e) => setTotalAmountRequired(e.target.value)} readOnly />
                <br /><br />
                <label htmlFor="subject" className="MGUpdateFormHeading">StartDate: </label><br />
                <input type="date" className="MGUpdateFormInput" value={StartDate} onChange={(e) => setStartDate(e.target.value)} />
                <br />
                <label htmlFor="subject" className="MGUpdateFormHeading">Status: </label><br />
                <input type="date" className="MGUpdateFormInput" value={EndDate} onChange={(e) => setEndDate(e.target.value)} />
                <br /><br /><br /><br /><br />
                <button className="MGUpdateSubmit" onClick={updateStatus}>Update</button>&nbsp;&nbsp;&nbsp;
                <button className="MGButtonCancel" onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/allocatedBudgets`;
                }}>Cancel</button> <br /><br />
            </div>
            <br /><br />
            <ToastContainer />
        </div>
    )
}
