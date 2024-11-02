import {useState, useEffect, React } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



import Index from './Pages/Index';
import Contact from './Pages/Contact';
import Skill from './Pages/Skill';





function App() {


      useEffect(() => {
        fetchUser();
      }, [])


    const [email, setEmail] = useState("keerthigabalamurugan5@gmail.com");

    const fetchUser = async () => {
      try {
        // Fetch fresh data from the API if no valid data in local storage
        const response = await fetch(`http://ec2-13-126-99-50.ap-south-1.compute.amazonaws.com:8888/api/users/get/51120029`);
        const data = await response.json();
    
      
        const {email} = data;
    
        
        setEmail(email);
        
    
        
        console.log("Data has been loaded from the API");
      } catch (error) {
        
        setEmail("keerthigabalamurugan5@gmail.com");
        
        console.log("Failed to fetch data from the server! Loading static data as fallback.");
      }
    };
    
  

  return (
        <div>
       <BrowserRouter>
          
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/skill" element={<Skill />} />
            <Route path="/contact" element={<Contact email={email}/>} />
          </Routes>

        </BrowserRouter>

        </div>
      
        
      
  );
}

export default App;
