import React from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%); /* Gradient background */
  padding: 15px 30px;
  display: flex;
  justify-content: space-around;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavButton = styled.a`
  color: #ffffff; /* White text */
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 25px;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2); /* Light background on hover */
    transform: scale(1.05); /* Slightly enlarge on hover */
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer >
      <NavButton href="/">Portfolio</NavButton>
      <NavButton href="/skill">Skills</NavButton>
      <NavButton href="/project">Projects</NavButton>
      <NavButton href="/contact">Contact Me</NavButton>
    </NavbarContainer >
  );
};

export default Navbar;
