
const handleSort = (key, userData, setUserData , setSort , sort) => {
  const sortedData = [...userData].sort((a, b) => {
    let Akey = new Date(a[key])
    let Bkey = new Date(b[key])
    if (key === "lastSeen") return sort ? Akey - Bkey : Bkey - Akey ;
    else return  sort ? a[key] - b[key] : b[key] - Akey ;
  }
  );
  setSort(!sort)
  setUserData(sortedData);
};

export default handleSort