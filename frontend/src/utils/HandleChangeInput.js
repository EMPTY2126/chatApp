const handleChangeInput = (e)=>{
    const { name, value } = e.target;
    setUserDetail((prevData) => ({
      ...prevData,    
      [name]: value,
    }));
  }

  export default handleChangeInput