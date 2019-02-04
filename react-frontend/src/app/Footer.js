import React from 'react';


const Footer = () => (
    <footer className='text-center'>
        <p>
            <i className='fa fa-copyright'/> {(new Date()).getFullYear()} by Patmanlabs
        </p>
    </footer>
);

export default Footer;