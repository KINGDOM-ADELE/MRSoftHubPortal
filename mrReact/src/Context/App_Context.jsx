import { createContext, useState, useRef } from 'react'

export const AppContext  = createContext(null);


export const AppContextProvider = (props) => {
  let API_base_url
if (process.env.NODE_ENV === 'production'){
    API_base_url = "https://zenager.onrender.com/"
    console.log('API_base_url', API_base_url)

  }
  else{
    API_base_url = "http://localhost:7800/"
    // API_base_url = "http://127.0.0.1:3000/"
    console.log('API_base_url', API_base_url)

  }

  // API_base_url= "http://localhost:5173"

    const APP_NAME = 'KINGDOM_ADELE_PORTFOLIO'
    const APP_NAME2 = `KINGDOM ADELE'S PORTFOLIO`

  // const homeRef = useRef('home');
  // const aboutRef = useRef('about');
  // const technologiesRef = useRef('technologies');
  // const projectsRef = useRef('projects');
  // const contactRef = useRef('contact');

  // const scrollToRef = (ref) => {
  //   if (ref.current) {
  //     const element = document.getElementById(ref.current);
  //     if (element) {
  //       element.scrollIntoView({
  //         behavior: "smooth",
  //         block: "start",
  //       });
  //     }
  //   }
  // };


  const scrollToRef = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };


  const logout = () => { 
    localStorage.removeItem(`${API_base_url}token`)
    localStorage.removeItem(`${API_base_url}User.serialized`)
    console.log('logged out')
 }


  const StoreToken = (token) => { 
    localStorage.setItem(`${API_base_url}token`, token)
   return(token)
 }

 const StoreUserObj = (object) => {   
    localStorage.setItem(`${API_base_url}User.serialized`, JSON.stringify(object))
   return(object)
 }

  const getStoredToken = () => { 
     const token = localStorage.getItem(`${API_base_url}token`) 
    return(token)
  }

  const getStoredUserObj = () => {   
    const userObj = JSON.parse(localStorage.getItem(`${API_base_url}User.serialized`)) 
    return(userObj)
  }


  const userRole = () => {   
    const userObj = JSON.parse(localStorage.getItem(`${API_base_url}User.serialized`)) 
    return(userObj.role )
  }
  


  const handleAlreadyLoggedIn = () => {  
    const token = getStoredToken()
    const userObj = getStoredUserObj()
    
    
    if(token === undefined || userObj === undefined || !token || !userObj ){ logout() }
    else{ 
         let path = './'
               if(userObj.role === 'super'){
                 path = `Admin`
               }
               else if(userObj.role === 'admin'){
                 path = `Admin`
               }
               else if(userObj.role === 'user'){
                path = `User`
              }
              else{
                path = `./`
               }
        return (path)
       }
   } 


  const isLoggedIn = () => {   
    const token = getStoredToken()
    const userObj = getStoredUserObj()
    let islogedin = false
    if(token === undefined || userObj === undefined || !token || !userObj ){ 
      logout() }
    else{ 
      islogedin = true
    }
    return(islogedin)
  }


const contextValue = { APP_NAME, APP_NAME2, API_base_url, handleAlreadyLoggedIn, getStoredToken, getStoredUserObj, userRole, StoreToken, StoreUserObj, logout, isLoggedIn }

  return (
    <AppContext.Provider value={ contextValue } >
        { props.children }
    </AppContext.Provider> 
  )
}