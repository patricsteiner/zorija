import React from 'react';
import CardFooter from "reactstrap/es/CardFooter";


const Footer = ({projectCount}) => (
    <CardFooter>
        &copy; by Patmanlabs - Projectcount: {projectCount}
    </CardFooter>
);

export default Footer;