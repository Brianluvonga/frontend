
'use client'

import Navbar from 'pages/nav/Navbar';
import Footer from 'pages/footer/Footer';
import Rebuilds from 'pages/shop/rebuilds';
import Dashboard from 'pages/dashboard/dashboard';
import Fully from 'pages/dashboard/cars/fully_restored/full_restored';



import Search from 'pages/search/search';
import Buy from 'pages/shop/shop';

import ContactSection from 'pages/contacts/contact';


import Subscribe from 'pages/subscribe/Subscribe';

import './globals.css';



export default function Home() {


  return (
    <div>

      {/* menu item */}
      {/* <Navbar /> */}

      {/* partners */}
      {/* <Fully /> */}

       <Dashboard /> 

      {/* Rebuilds */}
      {/* <Rebuilds /> */}

      {/* Parts Section */}
      {/* <Buy /> */}

      {/* Contact Section */}
      {/* <ContactSection /> */}

      {/* Subscribe Section */}
      {/* <Subscribe />  */}

      {/* footer section */}
      {/* <Footer /> */}

    </div>
  )
}
