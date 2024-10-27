import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoLogoInstagram, IoLogoGithub } from "react-icons/io5";
import { BsLinkedin } from "react-icons/bs";
import keerthi6 from '../Assets/keerthi6.png';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Navbar = styled.nav`
  width: 98.7%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #6c5ce7;
  padding: 12px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px 5px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
  font-size: 1.2rem;
  color: white;

  @media (max-width: 480px) {
    font-size: 1rem;
    gap: 5px;
  }
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
  
  height: 89vh;
  background: linear-gradient(to bottom right, #f7f9fc, #e6e9f0);
  padding: 25px;
  

  @media (max-width: 768px) {
    padding: 20px;
  }
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

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 20px;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 60px;

  @media (max-width: 480px) {
    margin-top: 20px;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;

  img {
    width: 100%;
    max-width: 200px;
    border-radius: 50%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

    @media (max-width: 480px) {
      max-width: 150px;
    }
  }
`;

const FormSection = styled.div`
  flex: 1.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 50px;

  @media (max-width: 768px) {
    margin-top: 30px;
  }
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  color: #6c5ce7;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
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
  height: 210px;
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
    font-size: 1.5rem;
    color: #6c5ce7;
    margin-bottom: 10px;
  }

  p {
    margin: 5px 0;
    color: #666;
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 1.3rem;
    }
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
`;

const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px;
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
  z-index: 1000;
  font-weight: bold;
`;

const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 1.2rem;
  margin-top: 30px;
  align-items: flex-start;
  width: 100%;
`;

const SocialButton = styled.a`
  width: 200px;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  color: white;
  transition: all 0.3s ease;

  &.linkedin {
    background: #0077b5;

   

    &:hover {
      background: #37b9ff;
    }
  }

  &.github {
    background: #1f1e1e;

    &:hover {
      background: #c23a3a;
    }
  }

  &.instagram {
    background: #e1306c;

    &:hover {
      background: #f58529;
    }
  }

  span {
      padding-left: 10px;
  }
`;

const Footer = styled.div`
  width: 98.9%;
  height: 40px;
  padding: 10px;
  background-color: #6c5ce7;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;

  @media (max-width: 768px) {
    position: relative;
    bottom: auto;
    margin-top: 20px;
    display: none;
  }
`;

const FooterText = styled.div`
  text-align: center;
  color: #fff;
  letter-spacing: 2px;
`;

const MessageStatus = styled.p`
  color: ${({ isSuccess }) => (isSuccess ? 'green' : 'red')};
  font-size: 1.1rem;
  margin-top: 10px;
  text-align: center;
`;

const Loader = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #f76b1c;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;


function Contact({ email }) {
  const form = useRef(); 
  const [loading, setLoading] = useState(false);
  const [messageStatus, setMessageStatus] = useState(''); 
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [contactImage, setContactImage] = useState(null);
  
  const userEmail = email ? email : "keerthigbalamurugan5@gmail.com";

  useEffect(() => {
    
    const localStorageContactImage = localStorage.getItem('form-image');

    if(localStorageContactImage) {
        const data = JSON.parse(localStorageContactImage);
        setContactImage(data.formImage);
        return;
    } 
    fetchUserImage();
  }, []);

  const fetchUserImage = async () => {
    try {
      const response = await fetch(`http://ec2-13-126-99-50.ap-south-1.compute.amazonaws.com:8888/api/users/images/51120029/image2`);
      const data = await response.json();
      setContactImage(`data:${data.imageType};base64,${data.imageData}`);

      const expiration = 5 * 60 * 1000;
      localStorage.setItem('form-image', JSON.stringify({
        formImage: `data:${data.imageType};base64,${data.imageData}`,
        expiration: Date.now() + expiration
      }));
    } catch (error) {
      setContactImage(keerthi6);
      console.log("Using fallback image.", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail();
  };

  const sendEmail = () => {
    setLoading(true);

    emailjs.send('service_iz3sh5d', 'template_sbgbp2f', {
      to_name: "Keerthiga",
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    }, 'ZQ89-MUFoj4XkPHx7')
    .then(() => {
      setLoading(false);
      setMessageStatus('Email sent successfully!');
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setNotificationVisible(true);
      setTimeout(() => setNotificationVisible(false), 3000);
    })
    .catch((error) => {
      setLoading(false);
      setMessageStatus('Failed to send email. Try again later.');
      setIsSuccess(false);
      console.error('EmailJS error:', error);
    });

    setTimeout(() => setMessageStatus(''), 3000);
  };

  return (
    <ContactContainer>
      <Navbar>
        <NavLinks>
          <NavLink href="/">Portfolio</NavLink>
          <NavLink href="/project">Project</NavLink>
          <NavLink href="#contact-form">Contact</NavLink>
        </NavLinks>
      </Navbar>

      <ContactSection>
        <Left>
          <ImageWrapper>
            <img src={contactImage} alt="Profile" />
          </ImageWrapper>
          <DetailsSection>
            <h2>CONTACT ME</h2>
            <Info>
              <FaEnvelope />
              <p>{userEmail}</p>
            </Info>
            <Info>
              <FaPhone />
              <p>+91 8870257591</p>
            </Info>
            <SocialLinks>
              <SocialButton href="https://www.linkedin.com/in/keerthiga-balamurugan-96b3a7227/" className="linkedin">
                <BsLinkedin />
                <span>LinkedIn</span>
              </SocialButton>
              <SocialButton href="#" className="github">
                <IoLogoInstagram />
                <span>Github</span>
              </SocialButton>
              <SocialButton href="https://www.instagram.com/_keerthi_11/" className="instagram">
                <IoLogoInstagram />
                <span>Instagram</span>
              </SocialButton>
              
            </SocialLinks>
          </DetailsSection>
        </Left>
        <FormSection>
          <FormTitle>GET IN TOUCH</FormTitle>
          <StyledForm ref={form} onSubmit={handleSubmit} id="contact-form">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Label htmlFor="message">Message</Label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? <Loader /> : "Send Message"}
            </Button>
          </StyledForm>
         
        </FormSection>
        <Footer>
           <FooterText>@ 2024 Keerthiga | Made with passion and precisoin</FooterText>
        </Footer>
      </ContactSection>

      {notificationVisible && (
        <Notification>Email sent successfully!</Notification>
      )}
    </ContactContainer>
  );
}
export default Contact;
