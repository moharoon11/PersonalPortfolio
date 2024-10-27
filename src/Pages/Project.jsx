import {React, useEffect} from 'react'

import styled from 'styled-components';


const Container = styled.div`
      display: flex;
      justify-content: center;
      margin-top: 300px;
`;
const Button = styled.button`
  padding: 30px 20px;
  background-color: #6c5ce7;
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 2rem;
  border-radius: 5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  

  &:hover {
    background-color: #5a4de7;
  }

  @media (max-width: 768px) {
       background-color: linear-gradient(135deg, #6c5ce7, #5a4de7);
  }
`;

function Project() {


  const fetchResume = async () => {
    try {
        const response = await fetch(`http://ec2-13-126-99-50.ap-south-1.compute.amazonaws.com:8888/api/users/resume/51120029`);
        
        // Ensure response data is parsed as JSON
        const data = await response.json();

        if (data.imageData && typeof data.imageData === 'string') {
            // Handle base64-encoded string
            const binary = Uint8Array.from(atob(data.imageData), char => char.charCodeAt(0));
            const blob = new Blob([binary], { type: data.imageType });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'from_aws_ec2_instance.pdf';
            link.click();
        } else if (data.imageData instanceof ArrayBuffer) {
            // If data is ArrayBuffer, create a Blob directly
            const blob = new Blob([data.imageData], { type: data.imageType });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'from_aws_ec2_instance.pdf';
            link.click();
        } else {
            console.error('Unsupported data format or empty image data.');
        }
        
    } catch (error) {
        console.error('Error downloading the file:', error);
    }
};


  return (
    <Container> 
         <Button onClick={() => {
            fetchResume();
         }}>Download Resume from server...</Button>
    </Container>
  )
}

export default Project;
