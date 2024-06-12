import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; 

function App() {
  const [items, setPirItems] = useState([]);

  const fetchData = () => {
    axios.get("http://192.168.1.12:2727/all")
      .then((response) => {
        const data = response.data.slice(-100).map(item => ({
          ...item,
          atTime: formatTime(item.atTime) 
        }));
        setPirItems(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const resetData = () => {
    
  };
  const formatTime = (isoString) => {
    const date = new Date(isoString);
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 5000); 
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className ="all">
   
      <h2>Thông Tin Số Liệu Nồng Độ Cồn</h2>
      <table className="history" border = "5">
        <tr classname="header">
          <td>MÃ TEST</td>
          <td>Thời Gian Đo</td>
          <td>Chỉ Số nồng độ cồn</td>
          <td>Tình trạng</td>
        </tr>{items.map((item)=>(
             <tr>
              <td>{item.id}</td>
              <td>{item.atTime}</td>
              <td>{item.acoholvalue}</td>
              <td>{item.tinhtrang}</td>
         </tr>
            ))}
      </table>
      <div className="now">     <h1>HIỆN TẠI ĐO ĐƯỢC</h1>
      {items.length > 0 && (
    <table className="new" border="5">
      <tr className="header">
        <td>MÃ TEST</td>
        <td>Thời Gian Đo</td>
        <td>Chỉ Số nồng độ cồn</td>
        <td>Tình trạng</td>
      </tr>
      <tr>
        <td>{items[items.length - 1].id}</td>
        <td>{items[items.length - 1].atTime}</td>
        <td>{items[items.length - 1].acoholvalue}</td>
        <td>{items[items.length - 1].tinhtrang}</td>
      </tr>
    </table>
  )}
      <img src="hihi.jpg" alt="minhhoa" />
    </div>
 
    </div>
  );
}
export default App;
