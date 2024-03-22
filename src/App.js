import React, { useEffect, useState } from 'react';
import user from "./components/User.json";
import "./App.css";
import handleSort from './components/Sort';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const App = () => {
  const [userData, setUserData] = useState(user);
  const [search, setSearch] = useState("")
  const [Gender, setGender] = useState("All")
  const [sort, setSort] = useState(true)
  const [year, setYear] = useState("All")
  const [show , setShow] = useState("")
  const [searchOptions, setSearchOptions] = useState('Name-Salary')
  const [lastPurchased, setLastPurchased] = useState("All")
  const applyFilters = () => {
    let filteredData = user;

    //Last Purchased Filter
    if(lastPurchased !== "All"){
      filteredData = [...filteredData].sort((a, b)=>{
        let Akey = new Date(a.time)
        let Bkey = new Date(b.time)
        return  Bkey - Akey ;
      });
      let NewFilter = []
      for(let i  = 0;  i < +lastPurchased ; i++){
        if(i >= filteredData.length )continue;
        else NewFilter.push(filteredData[i])
      }
      filteredData = NewFilter
    }
    // search filter
    if (search.length > 0) {
      // For String search
      if(searchOptions === "Name-Salary"){
        if (isNaN(search % 2)) filteredData = filteredData.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));
        // For Salary Search
        if (search % 2 === 1 || search % 2 === 0) filteredData = filteredData.filter(user => user.salary.toString().slice(0, search.length).includes(search) );
      }
      if(searchOptions === "age"){
        filteredData = filteredData.filter(user => user.age.toString().slice(0, search.length).includes(search));
      }
      if(searchOptions === "totalSepet"){
        filteredData = filteredData.filter(user => user.totalSepet.toString().slice(0, search.length).includes(search) );
      }

      
      
    }
    //  gender filter
    if (Gender !== "All") {
      filteredData = filteredData.filter(user => user.gender.toLowerCase() === Gender.toLowerCase());
    }
    // year filter
    if (year !== "All") {
      filteredData = filteredData.filter(user => new Date(user.lastSeen).getFullYear() === +year);
    }
    // Update userData state with the filtered data
    setUserData(filteredData);
  }
  useEffect(() => {
    // Call applyFilters whenever search, Gender, or year changes
       
    applyFilters();
  }, [search, Gender,year ,searchOptions, lastPurchased])

  return (
    <div className="table">
      <div className="search">
        <div>
          <p>
            Select Field For Search
            </p>
        <select  value={searchOptions} onChange={(e)=> setSearchOptions(e.target.value)}>
          <option value="Name-Salary">Name-Salary</option>
          <option value="age">Age</option>
          <option value="totalSepet">Totel Spents</option>
        </select></div>
        <input type="text" placeholder='Search..' value={search} onChange={(e) => { setSearch(e.target.value); }} />
        <div className="checkbox">
          Gender
          <select name="" id="" value={Gender} onChange={(e) => setGender(e.target.value)}>
            <option value="All">All Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="lastseen">
          Last Active
          <select name="" id="" value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="All" >All Year</option>
            {[...new Set(user.map(user => new Date(user.lastSeen).getFullYear()))]
              .sort((a, b) => a - b)
              .map((year, index) => (
                <option key={index}>{year}</option>
              ))}
          </select>
        </div>
        <div>
        Last Purchase
        <select value={lastPurchased} onChange={(e)=> setLastPurchased(e.target.value)}>
          <option value="All" >All</option>
          <option value="2">Last 2 Purchase </option>
          <option value="5">Last 5 Purchase </option>
          <option value="10">Last 10 Purchase </option>
        </select>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('id', userData, setUserData, setSort, sort, setShow, show )}>ID{(show === "id" && (sort ? <FaArrowUp /> : <FaArrowDown />))}</th>
            <th >Customer Name</th>
            <th onClick={() => handleSort('age', userData, setUserData, setSort, sort, setShow, show )}>Age{(show === "age" && (sort ? <FaArrowUp /> : <FaArrowDown />))}</th>
            <th>Gender</th>
            <th>Email</th>
            <th onClick={() => handleSort('salary', userData, setUserData, setSort, sort, setShow, show )}>Salary{(show === "salary" && (sort ? <FaArrowUp /> : <FaArrowDown />))}</th>
            <th onClick={() => handleSort('order', userData, setUserData, setSort, sort ,setShow, show )}>Order{(show === "order" && (sort ? <FaArrowUp /> : <FaArrowDown />))}</th>
            <th onClick={() => handleSort('lastSeen', userData, setUserData, setSort, sort ,setShow, show )} >LastSeen{(show === "lastSeen" && (sort ? <FaArrowUp /> : <FaArrowDown />))}</th>
            <th onClick={() => handleSort('totalSepet', userData, setUserData, setSort, sort, setShow , show )}>Total Spents{(show === "totalSepet" && (sort ? <FaArrowUp /> : <FaArrowDown />))}</th>
            <th onClick={() => handleSort('time', userData, setUserData, setSort, sort, setShow , show )}>Last Purchase{(show === "time" && (sort ? <FaArrowUp /> : <FaArrowDown />))}</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => {
            let time = new Date(user.time)
            let fullDate = (time.toDateString())
            let fullTime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
           return <tr key={user.id}>
              <td>{user.id}</td>
              <td className='profileName'><img src={user.imgUrl} alt='UserProfile' />{user.name}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.email}</td>
              <td>{user.salary} USD$</td>
              <td>{user.order}</td>
              <td>{user.lastSeen}</td>
              <td>{user.totalSepet} USD$</td>
              <td>{fullDate} {fullTime}</td>
            </tr>

})}
          {userData.length <= 0 && <h1>No Data Found</h1>}
        </tbody>
      </table>
    </div>
  );
};

export default App;
