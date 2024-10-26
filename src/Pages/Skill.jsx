import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const SkillsSection = styled.section`
  padding: 50px 20px;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.background};
  text-align: center;
`;

const SkillsTitle = styled.h2`
  font-size: 32px;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.textColor};
  font-family: 'Arial', sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px; /* Space between cards */
  justify-items: center;
`;

const SkillCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%); /* Gradient background */
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  color: #fff;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative; /* Position for pseudo-element */
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    width: 90%; /* Make cards take 90% width on mobile */
  }
`;

const SkillIcon = styled.img`
  width: 80px; /* Increase icon size */
  height: 80px; /* Increase icon size */
  border-radius: 50%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  padding: 10px;
  object-fit: cover;
  margin-bottom: 15px; /* Space below icon */
  border: 3px solid #fff; /* Add a white border around the icon */
`;

const SkillName = styled.h3`
  font-size: 24px; /* Increase font size */
  color: #fff;
  margin: 10px 0;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); /* Add text shadow for better visibility */

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const SkillLevel = styled.p`
  color: #f0f0f0; /* Change to a lighter color for better readability */
  font-size: 16px; /* Increase font size */
  margin: 0;
  text-align: center; /* Center text */

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;



const Skills = () => {
  const [skillSet, setSkillSet] = useState([]);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const storedSkills = localStorage.getItem('skills');
    const storedTime = localStorage.getItem('skillsTimestamp');
    const currentTime = Date.now();

    if (storedSkills && storedTime) {
      const timeDiff = currentTime - storedTime;
      if (timeDiff < 3 * 60 * 1000) {
        setSkillSet(JSON.parse(storedSkills));
        return;
      }
    }

    try {
      const response = await fetch(`http://ec2-13-126-99-50.ap-south-1.compute.amazonaws.com:8888/api/skills/getAll/51120029`);
      const data = await response.json();

      if (data.length > 0) {
        const skillsData = data.map(skill => ({
          ...skill,
          skillIcon: `data:${skill.iconType};base64,${skill.skillIcon}`,
        }));
        setSkillSet(skillsData);
        localStorage.setItem('skills', JSON.stringify(skillsData));
        localStorage.setItem('skillsTimestamp', currentTime);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  return (
    <SkillsSection id="skills">
      <SkillsTitle>My Skills</SkillsTitle>
      <SkillsGrid>
        {skillSet.map(skill => (
          <SkillCard key={skill.skillName}>
            <SkillIcon src={skill.skillIcon} alt={`${skill.skillName} icon`} />
            <SkillName>{skill.skillName}</SkillName>
            <SkillLevel>{skill.level}</SkillLevel>
          </SkillCard>
        ))}
      </SkillsGrid>
    </SkillsSection>
  );
};

export default Skills;
