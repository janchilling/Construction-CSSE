import React, { useEffect, useState } from "react";
import '../StatusUpdate/statusUpdate.css';
import { useParams } from "react-router-dom";

export default function UpdateStatus() {

    const [SiteManagerID, setSiteManagerID] = useState("");
    const [SiteName, setSiteName] = useState("");
    const [Date, setDate] = useState("");
    const [Materials, setMaterials] = useState([]);
    const [TotalAmount, setTotalAmount] = useState("");
    const [Status, setStatus] = useState("");

    const params = useParams();

    useEffect(() => {
        getRequisitionDetails();
    }, [])

    const getRequisitionDetails = async () => {
        let result = await fetch(`http://localhost:8070/requisitions/singleRequistions/${params.id}`);
        result = await result.json();

        setSiteManagerID(result.SiteManagerID)
        setSiteName(result.SiteName)
        setDate(result.Date)
        setMaterials(result.Materials)
        setTotalAmount(result.TotalAmount)
        setStatus(result.Status)

        console.log(result);

    }

    const UpdateStatus = async () => {
        let result = await fetch(`http://localhost:8070/requisitions/updateRequisition/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ SiteManagerID, SiteName, Date, Materials, TotalAmount, Status }),
            headers: {
                'Content-Type': 'Application/json'
            }
        });

        result = await result.json()

        if (result) {
            alert("Status Updated Successfully!")

            window.location.href = `/requestedOrders`;
        }
    }

    return (
        <div className="TJUpdatePage">
            <br />
            <h1 className="TJUpdateHeading">Status - UPDATE</h1>
            <div className="TJUpdateFormStatus">
                <br />
                <label for="subject" className="TJUpdateFormHeading">SiteManager ID: </label><br />
                <input type="text" className="TJUpdateFormInput" value={SiteManagerID} onChange={(e) => {
                    setSiteManagerID(e.target.value)
                }} readOnly />
                <br /><br />
                <label for="subject" className="TJUpdateFormHeading">Site Name: </label><br />
                <input type="text" className="TJUpdateFormInput" value={SiteName} onChange={(e) => {
                    setSiteName(e.target.value)
                }} readOnly />
                <br /><br />
                <label for="subject" className="TJUpdateFormHeading">Date: </label><br />
                <input type="email" className="TJUpdateFormInput" value={Date} onChange={(e) => {
                    setDate(e.target.value)
                }} readOnly />
                <br /><br />
                <label for="subject" className="TJUpdateFormHeading">Total Amount: </label><br />
                <input type="text" className="TJUpdateFormInput" value={TotalAmount} onChange={(e) => {
                    setTotalAmount(e.target.value)
                }} readOnly />
                <br /><br />
                <label htmlFor="materialName" className="TJUpdateFormHeading">Material Names: </label><br />
                {Materials.map((material, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            className="TJUpdateFormInputMat"
                            value={material.MaterialName}
                            onChange={(e) => {
                                setMaterials(e.target.value);
                            }}
                            readOnly
                        />
                        <input
                            type="text"
                            className="TJUpdateFormInputQty"
                            value={material.MaterialQuantity}
                            onChange={(e) => {
                                setMaterials(e.target.value);
                            }}
                            readOnly
                        />
                    </div>
                ))}
                <br />
                <label for="subject" className="TJUpdateFormHeading">Status: </label><br />
                <select
                    className="TJUpdateFormInput"
                    id="UserType"
                    name="UserType"
                    onChange={(e) => {
                        setStatus(e.target.value);
                    }}
                    style={{ backgroundColor: "aliceblue", fontWeight: "500" }}
                >
                    <option value="New">{Status}</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                </select>
                <br /><br /><br /><br /><br />

                <button className="TJUpdateSubmit" onClick={UpdateStatus}>Update</button>&nbsp;&nbsp;&nbsp;
                <button className="TJButtonCancel" onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `/requestedOrders`;
                }}>Cancel</button> <br /><br />

            </div>

            <br /><br />
        </div>
    )
}