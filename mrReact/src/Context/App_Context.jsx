import { createContext  } from 'react'
// import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export const AppContext  = createContext(null);


export const AppContextProvider = (props) => {
  const { children } = props; // Destructure children from props


  let API_base_url
  let testProd = false // determines which API_base_url to be used on build with local testing
  if(process.env.NODE_ENV === "production"  && process.env.testProd === true ){
    console.log('testProd', testProd)
    console.log('case1')
    // API_base_url = "https://zenager.onrender.com/"
    API_base_url = "https://mrsofthubportal.onrender.com/"
  }
  else if (process.env.NODE_ENV === 'production' && process.env.testProd === false ){
    console.log('case2')

    // Zenager
    // API_base_url = "http://localhost:7800/"
    // MRSOFT HUB
    API_base_url = "http://localhost:7990/"
  }

else if (process.env.NODE_ENV === 'production'){
  console.log('case3')

    // API_base_url = "https://zenager.onrender.com/"
    API_base_url = "https://mrsofthubportal.onrender.com/"
    console.log('API_base_url', API_base_url)
  }
  else{
    console.log('case4')
    // Zenager
    // API_base_url = "http://localhost:7800/"
    // MRSOFT HUB
    API_base_url = "http://localhost:7990/"
    console.log('API_base_url', API_base_url)
  }


    const APP_NAME = 'MRSoftHubPortal'
  

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


  // const scrollToRef = (ref) => {
  //   if (ref.current) {
  //     ref.current.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     });
  //   }
  // };


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


const contextValue = { APP_NAME, API_base_url, handleAlreadyLoggedIn, getStoredToken, getStoredUserObj, userRole, StoreToken, StoreUserObj, logout, isLoggedIn }

return (
  <AppContext.Provider value={ contextValue } >
      { children }
  </AppContext.Provider> 
)
}

// PropTypes validation for AppContextProvider props
AppContextProvider.propTypes = {
children: PropTypes.node.isRequired, // Validate children prop
};