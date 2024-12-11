import React, { useState } from "react";

const AboutUs = () => {
 

  return (
    <div className="container">
      <h2 className="text-center mt-4">About Us</h2>
      
        <div style={{display:"flex",justifyContent:"center",}}>
        <p class="card-text"> <strong>Joshua Reynolds</strong> jreynold@iastate.edu </p>
       
        </div>
         <div style={{display:"flex",justifyContent:"center",}}><p class="card-text"> <strong>Aaron Gienger </strong> agienger@iastate.edu </p>
        </div>                   
         <div style={{display:"flex",justifyContent:"center",}}><p class="card-text"> <strong>COM S 3190 Construction of User Interfaces, Fall 2024 </strong> December 10th, 2024 </p>
         </div>                   
                    
      
      
    </div>
  );
};

export default AboutUs;
