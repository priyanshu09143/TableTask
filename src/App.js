import React, { useEffect, useState } from 'react';
import user from "./components/User.json";
import "./App.css";
import handleSort from './components/Sort';
import SearchUser from './components/Search';

const App = () => {
  const [userData, setUserData] = useState(user);
  const [search, setSearch] = useState("")
  const [Gender, setGender] = useState("All")
  const [sort, setSort] = useState(true)
  const [year, setYear] = useState("All")
  
  const applyFilters = () => {
    let filteredData = user; 
    // search filter
    if (search.length > 0) {
      filteredData = filteredData.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));
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
  }, [search, Gender, year])

  useEffect(() => {
  
    if (userData.length === 0){
    }
  }, [userData])

  return (
    <div className="table">
      <div className="search">
        <input type="text" placeholder='Search..' value={search} onChange={(e) => { setSearch(e.target.value); }} onKeyUpCapture={() => SearchUser(user, search, Gender, setUserData)} />
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
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('id', userData, setUserData, setSort, sort)}>ID</th>
            <th >Customer Name</th>
            <th onClick={() => handleSort('age', userData, setUserData, setSort, sort)}>Age</th>
            <th>Gender</th>
            <th>Email</th>
            <th onClick={() => handleSort('salary', userData, setUserData, setSort, sort)}>Salary</th>
            <th onClick={() => handleSort('order', userData, setUserData, setSort, sort)}>Order</th>
            <th onClick={() => handleSort('lastSeen', userData, setUserData, setSort, sort)}>LastSeen</th>
            <th onClick={() => handleSort('totalSepet', userData, setUserData, setSort, sort)}>Total Spents</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.email}</td>
              <td>{user.salary}</td>
              <td>{user.order}</td>
              <td>{user.lastSeen}</td>
              <td>{user.totalSepet}</td>
            </tr>
           
          ))}
          {userData.length===0 && <h1>No Data Found</h1>}
        </tbody>
      </table>
    </div>
  );
};

export default App;
