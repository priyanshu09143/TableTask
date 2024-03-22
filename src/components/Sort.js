
const handleSort = (key, userData, setUserData , setSort , sort, setShow, show) => {
  const sortedData = [...userData].sort((a, b) => {
    console.log(key , sort)
    let Akey = new Date(a[key])
    let Bkey = new Date(b[key])
    if (key === "lastSeen" || key==="time") return sort ? Akey - Bkey : Bkey - Akey ;
    else return  sort ? a[key] - b[key] : b[key] - Akey ;
  }
  );
  setShow(key)
  setSort(!sort)
  setUserData(sortedData);
};

export default handleSort