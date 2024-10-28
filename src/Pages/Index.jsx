import { useState, useEffect } from 'react';

import pic1 from '../Assets/pic1.png';
import { MdContentCopy } from "react-icons/md"; 
import { IoLogoInstagram } from "react-icons/io5";
import { BsLinkedin } from "react-icons/bs";
import { IoLogoGithub } from "react-icons/io5";
import Skills from './Skill';

import styled, { keyframes } from 'styled-components';

// Define spinner animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Style for the loader
const Loader = styled.div`
  border: 8px solid rgba(108, 92, 231, 0.2);
  border-top: 8px solid #6c5ce7;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${spin} 1s linear infinite;
`;

// Center the loader in the viewport
const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #ffffff, #f0f4ff);
`;



const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
  }
`;

const LeftSection = styled.div`
  background: linear-gradient(135deg, #6c5ce7, #5a4de7);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    height: 20vh;
    background: linear-gradient(135deg, #6c5ce7, #5a4de7);
  }
`;

const RightSection = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #ffffff, #f0f4ff);
  position: relative;

  @media (max-width: 768px) {
    justify-content: flex-start;
    align-items: center;
    text-align: center;
  }
`;

const ProfileImageWrapper = styled.div`
  position: absolute;
  left: 55%;
  z-index: 10;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  border: 10px solid #6c5ce7;
  padding: 60px;
  background-color: white;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
    left: 50%;
    top: 15%;
    transform: translateX(-50%);
    padding: 0px;
    border: 10px solid white;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 5px solid #6c5ce7;

  @media (max-width: 768px) {
    border: none;
  }
`;

const Content = styled.div`
  
  text-align: center;

  @media (max-width: 768px) {
    position: relative;
    padding-top: 20px;
  }
`;

const Name = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin: 0;
`;

const Title = styled.h2`
  font-size: 1.3rem;
  color: #777;
  margin-top: 5px;
`;

const Button = styled.a`
  display: block;
  width: 49%;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #6c5ce7;
  color: white;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #5a4de7;
  }

  @media (max-width: 768px) {
       background-color: linear-gradient(135deg, #6c5ce7, #5a4de7);
  }
`;

const SocialLinks = styled.div`
  position: absolute;
  right: 20px;
  bottom: 50%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  a {
    font-size: 30px;
    padding: 10px;
    color: #6c5ce7;
    position: relative;

    &:hover {
      color: #333;
    }

    &:hover::after {
      content: attr(data-tooltip);
      position: absolute;
      top: 50%;
      left: -80px;
      background-color: black;
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 0.8rem;
      transform: translateY(-50%);
      white-space: nowrap;
      z-index: 1;
    }
  }

  .linkedin {
    color: #0e76a8;
  }
  .github {
    color: #333;
  }
  .instagram {
    color: #c32aa3;
  }

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(135deg, #6c5ce7, #5a4de7);
    padding: 0px 0;
    flex-direction: row;
    justify-content: center;
    z-index: 12;
    

  .linkedin {
    color: white; /* Soft coral for a warm look */
  }
  .github {
    color: white; /* Bright yellow for good contrast */
  }
  .instagram {
    color: white; /* Calming blue to complement the teal */
  }

  }
`;

const Navbar = styled.nav`
  position: absolute;
  top: 20px;
  right: 5%;
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: ${(props) => (props.isOpen ? "100vh" : "0")};
    background: rgba(0, 0, 0, 0.8);
    overflow: hidden;
    transition: height 0.3s ease;
    align-items: center;
    justify-content: center;
    z-index: 20;
  }
`;

const NavbarLink = styled.a`
  color: #333;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.3rem;
  padding: 8px 12px;
  border-radius: 5px;
  transition: all 0.3s ease;

  &:hover {
    color: #ffffff;
    background-color: #6c5ce7;
    box-shadow: 0 4px 8px rgba(108, 92, 231, 0.3);
    transform: scale(0.8);
  }

  @media (max-width: 768px) {
    color: #fff;
    font-size: 1.5rem;
  }
`;

const HamburgerIcon = styled.div`
  display: none;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  z-index: 21;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: fixed;
    top: 3%;
    right: 7%;
  }

  div {
    width: 100%;
    height: 3px;
    background-color: ${(props) => (props.isOpen ? "#fff" : "#fff")};
    transition: all 0.3s ease;

    &:nth-child(1) {
      transform: ${(props) => (props.isOpen ? "rotate(45deg) translate(5px, 5px)" : "rotate(0)")};
    }
    &:nth-child(2) {
      opacity: ${(props) => (props.isOpen ? "0" : "1")};
    }
    &:nth-child(3) {
      transform: ${(props) => (props.isOpen ? "rotate(-45deg) translate(5px, -5px)" : "rotate(0)")};
    }
  }
`;


const AboutSection = styled.div`
  margin-top: 20px;
  width: 100%;
  max-width: 600px;
  text-align: left; /* Align text to the left */

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const AboutTitle = styled.h3`
  font-size: 1.5rem;
  color: #6c5ce7;
  margin: 0 0 10px 0;
`;

const AboutText = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.5;
`;


const ContactButton = styled.a`
  display: inline-block;
  padding: 10px 20px;
  color: #6c5ce7;
  background-color: transparent;
  border: 2px solid #6c5ce7;
  border-radius: 5px;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #6c5ce7;
    color: white;
  }

  &:active {
    transform: scale(0.98); /* Button tap effect */
  }
`;

const EmailButton = styled.a`
  display: inline-block;
  padding: 10px 20px;
  color: #6c5ce7;
  background-color: transparent;
  border: 2px solid #6c5ce7;
  border-radius: 5px;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
  
  

  &:active {
    transform: scale(0.98); /* Button tap effect */
  }
`;

const Notification = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #6c5ce7;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  opacity: 0.9;
  transition: opacity 0.5s ease;
  z-index: 100;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative; // Position relative for the notification
`;

const Footer = styled.div`
   width: 98.9%;
   padding: 10px;
   margin-top: 20px;
   background-color: #6c5ce7;
   display: flex;
   align-items: center;
   justify-content: center;


   @media (max-width:768px) {
    display: none;
   }


`;

const FooterText = styled.div`
   text-align: center;
   color: #fff;
   letter-spacing: 2px;

`;

function Index() {
  const [isOpen, setIsOpen] = useState(false);


  


  
  const [name, setName] = useState("Keerthiga.B");
  const [about, setAbout] = useState("");
  const [email, setEmail] = useState("keerthigabalamurugan5@gmail.com");
  const [role, setRole] = useState("");

  const [profileImage, setProfileImage] = useState(null);
  const [profileImageType, setProfileImageType] = useState("");
  const [fallbackProfileImage, setFallbackProfileImage] = useState(null);
  

  

  const [loading, setLoading] = useState(true);

  const [notificationVisible, setNotificationVisible] = useState(false); // State for notification

  // This method not working after deployement but working in localhost
  // becuase navigator api is not available after deployment
  // const copyEmailToClipboard = () => {
  //   navigator.clipboard.writeText(email)
  //     .then(() => {
  //       console.log("coming to method....", email);
  //       setNotificationVisible(true); 
  //       console.log("notification set to true for copying email");// Show notification
  //       setTimeout(() => setNotificationVisible(false), 2000);
  //       console.log("pring statement after message dissapears", email); // Hide after 2 seconds
  //     })
  //     .catch(err => {
  //       console.log("error in copying the email");
  //       console.error('Failed to copy: ', err);
  //     });
  // };



  const handleCopyEmail = () => {
    console.log("handle copy email::::", email)
    const forCopy = email ? email : "keerthigabalamurugan5@gmail.com"; // Replace with your actual email address
    
    // Create a temporary input element
    const tempInput = document.createElement('input');
    tempInput.value = forCopy;
    document.body.appendChild(tempInput);
    
    // Select the input value and copy it
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
    
    // Remove the input element
    document.body.removeChild(tempInput);
    
    // Show notification
    setNotificationVisible(true);
    console.log("method executed perfectly");
    setTimeout(() => setNotificationVisible(false), 2000); 
    console.log("setting notification visiblity false");// Hide after 2 seconds
  };


   // Function to download resume from server if available, else fallback to public resume
   const downloadCV = () => {
      const link = document.createElement('a');
      link.href = '/resume.pdf'; // Make sure the resume is placed in the public folder
      link.download = 'mohamed_haroon_resume.pdf';
      link.click();
  };


  const fetchUser = async () => {
    // Try to get data from local storage first
    const localStorageUserData = localStorage.getItem('user-details');

    
    if (localStorageUserData) {
      const data = JSON.parse(localStorageUserData);
      
      // Check if the stored data is expired
      if (Date.now() < data.expiration) {
        // If not expired, load data from local storage
        setName(data.name);
        setAbout(data.about);
        setEmail(data.email);
        setRole(data.role);
        setProfileImage(data.profileImage);
        setProfileImageType(data.profileImageType);
        setLoading(false);
        console.log("Loaded data from local storage");
        return; // Exit if data is loaded from local storage
      } else {
        // Remove expired data
        localStorage.removeItem('user-details');
        console.log("Local storage data has expired and was removed.");
      }
    }
  
    try {
      // Fetch fresh data from the API if no valid data in local storage
      const response = await fetch(`http://ec2-13-126-99-50.ap-south-1.compute.amazonaws.com:8888/api/users/get/51120029`);
      const data = await response.json();
  
      // Update state with the fetched data
      const { name, about, email, role, userImage1, userImage1Type } = data;
  
      setName(name);
      setAbout(about);
      setEmail(email);
      setRole(role);
      setProfileImage(userImage1);
      setProfileImageType(userImage1Type);
  
      // Save data to local storage with an expiration time
      const expiration = 15 * 60 * 1000; 
      localStorage.setItem('user-details', JSON.stringify({
        name,
        about,
        email,
        role,
        profileImage: userImage1,
        profileImageType: userImage1Type,
        expiration: Date.now() + expiration // Set expiration timestamp
      }));
  
      setLoading(false);
      console.log("Data has been loaded from the API");
    } catch (error) {
      // Fallback data if the fetch fails
      setName("Keerthiga .B");
      setAbout("A recent Bio Medical Graduate with a strong passion for software development");
      setEmail("keerthigabalamurugan5@gmail.com");
      setRole("FRESHER | JAVA DEVELOPER | SOFTWARE ENGINEER");
      setProfileImage(pic1); // Assuming keerthi6 is imported or defined
      console.log("Failed to fetch data from the server! Loading static data as fallback.");
    }
  };
  

  useEffect(() => {
    fetchUser();
  }, []);

 return (
    <>
      {loading ? (
         <LoaderWrapper>
         <Loader />
       </LoaderWrapper>
      ) : (
        <>
          {/* Your main component content here */}
          <Container>
            <LeftSection>
              <ProfileImageWrapper>
                <ProfileImage
                  src={profileImage ? `data:${profileImageType};base64,${profileImage}` : fallbackProfileImage}
                  alt="profileImage"
                />
              </ProfileImageWrapper>
            </LeftSection>
            <RightSection>
              <HamburgerIcon isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
                <div />
                <div />
                <div />
              </HamburgerIcon>
              <Navbar isOpen={isOpen}>
                <NavbarLink href="/">Portfolio</NavbarLink>
                <NavbarLink href="#skills">Skill</NavbarLink>
                <NavbarLink href="/project">Project</NavbarLink>
                <ContactButton href="/contact">Contact me</ContactButton>
              </Navbar>

              <Content>
                <Name>{name}</Name>
                <Title>{role}</Title>
                <AboutSection>
                  <AboutTitle>About Me</AboutTitle>
                  <AboutText>{about}</AboutText>
                </AboutSection>
                <ActionButtons>
                  <EmailButton onClick={handleCopyEmail}>
                    {email}
                    <MdContentCopy onClick={handleCopyEmail} style={{ cursor: 'pointer', marginLeft: '10px', color: '#6c5ce7' }} />
                  </EmailButton>
                  
                  <Notification visible={notificationVisible}>
                    Email copied to clipboard!
                  </Notification>
                  <Button onClick={downloadCV}>Download CV</Button>
                </ActionButtons>
              </Content>

              <SocialLinks>
                <a href="https://www.linkedin.com/in/keerthiga-b-300b501b5/" target="_blank" className="linkedin" data-tooltip="LinkedIn">
                  <BsLinkedin />
                </a>
                <a href="#" className="github" target="_blank" data-tooltip="GitHub">
                  <IoLogoGithub />
                </a>
                <a href="https://www.instagram.com/_keerthi.11._/" target="_blank" className="instagram" data-tooltip="Instagram">
                  <IoLogoInstagram />
                </a>
              </SocialLinks>
            </RightSection>
          </Container>
          <Skills className="skills" />
          <Footer>
            <FooterText>© 2024 Keerthiga | <span>Made with Precision and Passion</span></FooterText>
          </Footer>
        </>
      )}
    </>
  );
}

export default Index;
