import React, { useState } from 'react'
import axios from 'axios'
import { CSVLink } from "react-csv";

const DownloadCSV = () => {
    const [mid, setMid] = useState();
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [csv,setCSV]=useState([])
    const filter = (e) => {
        e.preventDefault()
        axios.get('http://localhost:4242/api/payments').then((res) => {
            let y = res.data.filter((el) => {
                return (el.mid == mid &&
                    el.createdAt > startDate &&
                    el.createdAt < endDate
                )
            })
            setCSV(y)
        });
    }

    return (
            <div className="form">
                <form>
                    <div className="form-contents">
                        <div className="form-elements">
                            <label>Merchant : </label>
                        <select defaultValue={'DEFAULT'} onChange={e => { setMid(e.target.value) }}>
                            <option value="DEFAULT" disabled>
                                    Select Merchant ID
                                </option>
                                <option value="1">Merchant 1</option>
                                <option value="2">Merchant 2</option>
                                <option value="3">Merchant 3</option>
                                <option value="4">Merchant 4</option>
                            </select>
                        </div>
                        <div className="form-elements">
                            <label>Start Date : </label>
                            <input type="date" value={startDate} onChange={e => { setStartDate(e.target.value) }}></input>
                        </div>
                        <div className="form-elements">
                            <label>End Date : </label>
                            <input type="date" value={endDate} onChange={e => { setEndDate(e.target.value) }}></input>
                        </div>
                        <div className="form-elements">
                            <button className='btn-filter' onClick={filter} >Filter</button>
                        </div>
                    </div>
                    <div className='csv-button'>
                    <CSVLink className='anchor-button' data={csv}>Download Full CSV file</CSVLink>
                    </div>
                </form>
        </div>
    )
}

export default DownloadCSV