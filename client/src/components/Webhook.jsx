import axios from 'axios'
import React,{useState, useEffect} from 'react'
import DataTable from 'react-data-table-component';
import moment from 'moment';

const Webhook = () => {


    const [webhooks, setWebhook] = useState([])
    const [search, setSearch] = useState("")
    const [filteredWebhook, setFilteredWebhook] = useState([])

    const getWebhook = async ()=>{
        try {
            const response = await axios.get('http://localhost:4242/api/payments')
            setWebhook(response.data)
            setFilteredWebhook(response.data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getWebhook()
    }, [])
    

    const columns = [
        {
            name: "S.NO.",
            selector: row => row.id,
        },
        {
            name: 'UUID',
            selector: row => row.uuid,
        },
        {
            name: 'STATUS',
            selector: row => row.status,
        },
        {
            name: 'MID',
            selector: row => row.mid,
        },
        {
            name: 'DATE',
            selector: row => moment(row.createdAt).format('MM-D-YYYY'),
        }
    ];

    useEffect(() => {
      const result = webhooks.filter(webhook=>{
        return webhook.status.toLowerCase().match(search.toLowerCase())
      })
      setFilteredWebhook(result)
    }, [search])


    return (
        <DataTable
            title="Webhook Payment List"
            columns={columns}
            data={filteredWebhook}
            pagination
            fixedHeader
            fixedHeaderScrollHeight='800px'
            selectableRows
            selectableRowsHighlight
            subHeader
            subHeaderComponent={
                <input 
                type="text" 
                placeholder='Search Status' 
                className='w-25 form-control'
                value={search} 
                onChange={(e)=>setSearch(e.target.value)}
                />
            }
            subHeaderAlign="right"
            
        />
    );
}

export default Webhook