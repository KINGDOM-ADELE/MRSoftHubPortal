import React, { useContext, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "./Context/App_Context";




const Admin = () => {
  const { API_base_url, isLoggedIn,  userRole, StoreUserObj, getStoredToken } = useContext(AppContext)
  const navigate = useNavigate();
  let tempHandleGetMultipleData = useRef( )
  let tempIsLoggedIn = useRef( )

  useEffect(() => {
    if(!getStoredToken()){
      navigate(`/`)
    }

      const handleIsLoggedIn = () => {
        if(isLoggedIn() === false){
          navigate(`/`)
        }
        return(true)
      };

      if(isLoggedIn() && userRole() !== 'admin' ){ 
        // ensures only admin is allowed
        console.log('note admin')
          navigate(`/`) 
        }

      // handleIsLoggedIn()
      // return () => {
      // };


    }, [ isLoggedIn, navigate, getStoredToken ]);
  
  

    


  return (
    <div>
      <h2>Admin</h2>
      {/* Your admin page content goes here */}
    </div>
  );
}

export default Admin;
