import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import html from '../Assets/SkillImages/html.png';
import css from '../Assets/SkillImages/css.png';
import javascript from '../Assets/SkillImages/javascript.png';
import java from '../Assets/SkillImages/java.png';
import mysql from '../Assets/SkillImages/database.png';
import databases from '../Assets/SkillImages/databaseimage.png';
import problemsolving from '../Assets/SkillImages/problemsolving.png';

const SkillsSection = styled.section`
  padding: 50px 20px;
  margin-bottom: 20px;
  background-color: ${({ theme }) => theme.background};
  text-align: center;

  @media (max-width: 768px) {
    margin-top: 60px;
    
  }
`;

const SkillsTitle = styled.h2`
  font-size: 32px;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.textColor};
  font-family: 'Arial', sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    padding: 10px;
    font-size: 28px;
  }
`;

const SkillsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 80px;
  justify-content: center;
  padding: 0 10px;

  @media (max-width: 768px) {
     margin-top: 50px;
  }
`;

const SkillCard = styled.div`
  flex: 1 0 300px; /* Increase the minimum width per card */
  max-width: 300px; /* Increase the max width per card */
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  border-radius: 30px;
  padding: 50px; /* Increase padding for larger container */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
  color: #fff;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.35);
  }

  @media (max-width: 768px) {
    margin-top: 10px;
    width: 90%;
  }
`;

const SkillIcon = styled.img`
  width: 100px; /* Increase icon width */
  height: 100px; /* Increase icon height */
  border-radius: 50%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  padding: 12px; /* Increase padding for larger icon */
  object-fit: cover;
  margin-bottom: 20px; /* Increase margin for better spacing */
  border: 2px solid #fff;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.4), 0 0 15px rgba(245, 175, 25, 0.6);
  }
`;

const SkillName = styled.h3`
  font-size: 24px;
  color: #fff;
  margin: 10px 0;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const hardcodedSkills = [
  { skillId: 1, skillName: 'Java', skillIcon: java, sourceLink: '' },
  { skillId: 2, skillName: 'MySQL', skillIcon: mysql, sourceLink: '' },
  { skillId: 3, skillName: 'Problem Solving', skillIcon: problemsolving, sourceLink: '' },
  { skillId: 4, skillName: 'HTML', skillIcon: html, sourceLink: ''},
  { skillId: 5, skillName: 'CSS', skillIcon: css,  sourceLink: ''},
  { skillId: 6, skillName: 'JavaScript', skillIcon: javascript, sourceLink: '' },
  { skillId: 7, skillName: 'Databases', skillIcon: databases, sourceLink: '' },
];

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
      if (timeDiff < 15 * 60 * 1000) {
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
      setSkillSet(hardcodedSkills);
      console.error('Error fetching skills loading static data to the web...', error);
    }
  };

  return (
    <SkillsSection id="skills">
      <SkillsTitle>My Skills</SkillsTitle>
      <SkillsGrid>
        {skillSet.map(skill => (
          <SkillCard key={skill.skillId}>
            <SkillIcon src={skill.skillIcon} alt={`${skill.skillName} icon`} />
            <SkillName>{skill.skillName}</SkillName>
          </SkillCard>
        ))}
      </SkillsGrid>
    </SkillsSection>
  );
};

export default Skills;
