const SearchUser = (user, search, Gender, setUserData) => {
    // eslint-disable-next-line array-callback-return
    const FilterData = user.filter((user) => {
        if (Gender === "All") return user.name.toLowerCase().includes(search.toLowerCase())
        else {
            let genderUser = user.gender.toLowerCase() === Gender.toLowerCase()
            if (genderUser) return user.name.toLowerCase().includes(search.toLowerCase())
        }
    })
    setUserData(FilterData)
}

export default SearchUser;