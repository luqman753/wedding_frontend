import React from 'react'
import { Link } from 'react-router-dom';
import "../styles/about.css"
const About = () => {
  const paragraph = 'We are in an era of ever-increasing developments in the field of mental health. Today, emphasis is placed on connection to the community and a return to normal integration within the community\'s institutions and not on exclusion and repression. As part of this process, Beit Ham, as a pioneer, leads a variety of programs to promote the contestants. These advances in the ways of treatment and healing and the hope embodied in them bring the families of the contestants as well as the contestants themselves to hope that their loved one will be able to start a family, despite the struggle. For this purpose, this program was built, which is intended for the next stage in reducing stigma and proper and correct integration of the matchmaker with mental difficulties.\nThis program consists of five distinct phases:\nIntake - a stage of getting to know the client from a clinical and systemic point of view, the purpose of which is to gather information and establish a relationship of trust with the client and the parents. This stage is also used as preparation for the group.\nPreparation for matchmaking - increasing the functional and mental readiness of the matchmaker and the parents for the appropriate maturity of the matchmaker and the establishment of a home. Individual support during the matchmaking period - support through supportive meetings that will take place during and between the meetings, refining the achievements of the previous stage and maintaining the existing one.\nPreparation for the wedding - halachic, spiritual, mental and functional - \"extended bride/groom guidance\". Couple escort after the wedding - escorting the couple in a predetermined framework of meetings for six months.\nEach stage brings to the program different levels of individual, group, support and advisory care intervention, couple therapy and guidance of grooms. Each intervention is according to the need at that stage.\n'
    const styles = {
        "--c": "#373B44",
        "--b": "5px",
        "--s": "12px",
      };
  return (
    <div
      className="about-container"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80')`, // Replace with the path to your image
      }}
    >
      <div className="about-overlay"></div>
      <div className="about-text">
        <h2 style={{fontSize:"4rem"}}>About Us</h2>
        <p style={{fontSize:"1.4rem",lineHeight:'2rem'}}>
          {paragraph}
        </p>
        <Link to="/">
        <button className='aboutbutton'>Go Back</button>
        </Link>
      </div>
    </div>
  )
}
export default About