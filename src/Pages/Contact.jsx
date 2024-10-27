import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoLogoInstagram, IoLogoGithub } from "react-icons/io5";
import { BsLinkedin } from "react-icons/bs";
import keerthi6 from '../Assets/keerthi6.png';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const Navbar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #6c5ce7;
  padding-top: 12px;
  padding-bottom: 12px;
  position: absolute;
  top: 0;
  z-index: 1000;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 10px;
  font-size: 1.2rem;
  color: white;
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 91.4vh;
  background: linear-gradient(to bottom right, #f7f9fc, #e6e9f0);
  padding: 40px;
  position: relative;
  overflow-x: hidden; /* Prevent horizontal overflow */
`;

const ContactSection = styled.div`
  display: flex;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 900px;
  height: 80vh;
  gap: 10px;
  margin-top: 50px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: flex-start; 
  padding: 20px; 
  margin-top: 40px;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;

  img {
    width: 100%;
    max-width: 200px;
    border-radius: 50%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

const FormSection = styled.div`
  flex: 1.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 50px;
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  color: #6c5ce7;
  margin-bottom: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  margin-bottom: 5px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background: #f9f9fb;
  color: #333;

  &:focus {
    border-color: #6c5ce7;
    outline: none;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px;
  height: 210px; /* Set a fixed height for the textarea */
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background: #f9f9fb;
  color: #333;

  &:focus {
    border-color: #6c5ce7;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #6c5ce7;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #5348c7;
  }
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  text-align: center;

  h2 {
    font-size: 1.5rem; /* Adjusted size */
    color: #6c5ce7;
    margin-bottom: 10px;
  }

  p {
    margin: 5px 0; /* Adjusted margin for better spacing */
    color: #666;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  flex-direction: column; /* Change to column */
  gap: 10px;
  font-size: 1.2rem; /* Adjusted size */
  margin-top: 30px;
  align-items: flex-start; /* Align to start */
  width: 100%; /* Make full width for alignment */
`;

const SocialButton = styled.a`
  width: 200px;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  color: white; /* Default text color */
  transition: all 0.3s ease;

  &.linkedin {
    background: #0077b5; /* LinkedIn blue */
    
    span {
      padding-left: 10px;
    }
    
    &:hover {
      background: #37b9ff;
    }
  }

  &.github {
    span {
      padding-left: 10px;
    }

    background: #1f1e1e; /* GitHub black */
    &:hover {
      background: #c23a3a; /* Keep black on hover */
    }
  }

  &.instagram {
    background: #e1306c; /* Instagram gradient color */

    span {
      padding-left: 10px;
    }

    &:hover {
      background: #f58529; /* Instagram hover color */
    }
  }
`;

const Info = styled.div`
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const InfoEmail = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin: 10px;
`;

const InfoPhone = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin-top: 10px;
  margin-left: -150px;
`;

const InfoText = styled.span`
  color: #6c5ce7;
  font-weight: 600;
  letter-spacing: 1px;
  font-size: 1.0rem;
`;

const Footer = styled.div`
   width: 100%;
   padding: 10px;
   margin-top: 20px;
   background-color: #6c5ce7;
   display: flex;
   align-items: center;
   justify-content: center;
   position: absolute;
   bottom: 0%;
`;

const FooterText = styled.div`
   text-align: center;
   color: #fff;
   letter-spacing: 2px;
`;

function Contact({email}) {
  useEffect(() => {
    fetchUserImage();
  }, []);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [contactImage, setContactImage] = useState(null);
  const [contactImageName, setContactImageName] = useState("");

  const userEmail = email ? email : "keerthigbalamurugan5@gmail.com";

  const fetchUserImage = async () => {
    try {
      const response = await fetch(`http://ec2-13-126-99-50.ap-south-1.compute.amazonaws.com:8888/api/users/images/51120029/image2`);
      const data = await response.json();
      setContactImage(`data:${data.imageType};base64,${data.imageData}`);
      setContactImageName(data.fileName);
      console.log("Image loaded from server...");
    } catch (error) {
      setContactImage(keerthi6);
      setContactImageName("fallbackContactImage");
      console.log("Failed to fetch data from server; using fallback image.", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the form data to your server
    setNotificationVisible(true);
    setFormData({ name: '', email: '', message: '' }); // Reset form
  };

  return (
    <ContactContainer>
      <Navbar>
        <NavLinks>
          <NavLink href="/">Portfolio</NavLink>
          <NavLink href="/project">Project</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </NavLinks>
      </Navbar>
      <ContactSection>
        <Left>
          <ImageWrapper>
            <img src={contactImage || keerthi6} alt="Contact" />
          </ImageWrapper>
          <DetailsSection>
            <h2>Contact Me</h2>
            <p>If you want to reach out, feel free to contact me!</p>
            <InfoEmail>
              <FaEnvelope color="#6c5ce7" size={20} />
              <InfoText>{userEmail}</InfoText>
            </InfoEmail>
            <InfoPhone>
              <FaPhone color="#6c5ce7" size={20} />
              <InfoText>91+ 8870257591</InfoText>
            </InfoPhone>
            <SocialLinks>
              <SocialButton className="linkedin" href="https://www.linkedin.com/in/your-linkedin" target="_blank">
                <BsLinkedin size={20} />
                <span>LinkedIn</span>
              </SocialButton>
              <SocialButton className="github" href="https://github.com/your-github" target="_blank">
                <IoLogoGithub size={20} />
                <span>GitHub</span>
              </SocialButton>
              <SocialButton className="instagram" href="https://instagram.com/your-instagram" target="_blank">
                <IoLogoInstagram size={20} />
                <span>Instagram</span>
              </SocialButton>
            </SocialLinks>
          </DetailsSection>
        </Left>
        <FormSection>
          <FormTitle>Get in Touch</FormTitle>
          <StyledForm onSubmit={handleSubmit}>
            <Label htmlFor="name">Name</Label>
            <Input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
            <Label htmlFor="message">Message</Label>
            <Textarea name="message" value={formData.message} onChange={handleInputChange} required />
            <Button type="submit">Send Message</Button>
          </StyledForm>
          {notificationVisible && <InfoText style={{ textAlign: 'center', color: '#28a745' }}>Message sent successfully!</InfoText>}
        </FormSection>
      </ContactSection>
      <Footer>
      <FooterText>© 2024 Keerthiga | <span>Made with Precision and Passion</span></FooterText>
      </Footer>
    </ContactContainer>
  );
}

export default Contact;
