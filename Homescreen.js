import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Room from '../components/Room';
import moment from 'moment'
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker, Space } from 'antd';

const Homescreen = () => {
 
  const [data, setData] = useState([])
  const[loading , setloading] = useState()
  const[error , seterror] = useState()
  const { RangePicker } = DatePicker;
const[fromdate, setfromdate]=useState()
const[todate, settodate]=useState()

  useEffect(() => {
    const fetchData = async () =>{
 
      try {
        setloading(true)
        const {data: response} = await axios.get('/api/rooms/getallrooms');
        
        setData(response);
        setloading(false)

      } catch (error) {
        seterror(true)
        console.error(error.message);
        setloading(false)
      }
  
    }

    fetchData();
  }, []);


  function filerByDate(dates){
    // console.log(moment(dates[0].format('YYYY-MM-DD'))._i)
    // console.log(moment(dates[1].format('YYYY-MM-DD')))
  
    setfromdate(moment(dates[0].format('YYYY-MM-DD'))._i)
    settodate(moment(dates[1].format('YYYY-MM-DD'))._i)
  }

  return (
    <div className='container'>
      <div className='row mt-5' >

        <div className='col-md-3'>
            
        <RangePicker format='YYYY-MM-DD' onChange={filerByDate} />

        </div>
        

      </div>
        <div className='row justify-content-center mt-5'>
        {loading ? (
          <h1><Loader/></h1>
          ) : data.length>1 ? (
            data.map((rooms)=>{
              return <div className='col-md-9 mt-3'>
                      <Room rooms={rooms} fromdate={fromdate} todate={todate}  />
              </div>;
       })
            ) : (
              <error/>
             )}

        </div>
    </div>
  )
}

export default Homescreen;