import { github, linkedin, mail, resume } from '../utils';

export const navList = [
    { "name" : "github" , "link" : "https://github.com/adityaj08" , "logo": github, } ,
    { "name" : "linkedIn" , "link" : "https://linked.in/adityaj08" ,"logo": linkedin, },
    { "name" : "resume" , "link"  : "/assets/resume.pdf" , "logo": resume ,},
];

export const Email = { "mailId": "adityajoshi0817@gmail.com" , "mailIcon" : mail};

export const introLinesByPersona = {
    default: "I'm Aditya Joshi, a Software Engineer Crafting Digital Experiences",
    hr: "I'm Aditya Joshi, a Detail-Oriented Professional Ready to Add Value to Your Team",
    creative: "I'm Aditya Joshi, a Creative Developer Building Digital Magic",
    interviewer: "I'm Aditya Joshi, a Problem Solver Passionate About Clean Code",
    professional: "I'm Aditya Joshi, a Full-Stack Developer Focused on Scalable Solutions",
    client: "I'm Aditya Joshi, Your Trusted Partner Delivering Excellence in Development",
    secret: "Broo, I'm Aditya Joshi, lowkey vibin' with the tech game fr"
};

export const experience = [
    {"role": "Web Developer Intern", "company" : "Octanet Services Pvt Ltd  ","duration":"May 2024 - June 2024"},
    {"role": "Co Founder | Developer", "company" : " The Espadas SUK ","duration":"Aug 2022 - present"}
]
