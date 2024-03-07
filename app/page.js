
'use client'

import Navbar from 'pages/nav/Navbar';
import Footer from 'pages/footer/Footer';
import Rebuilds from 'pages/shop/rebuilds';
import Msg from 'pages/message/sellercontact';
import Search from 'pages/search/search';
import Buy from 'pages/shop/shop';

import ContactSection from 'pages/contacts/contact';


import Subscribe from 'pages/subscribe/Subscribe';

import './globals.css';



export default function Home() {


  return (
    <div>

      {/* menu item */}
      <Navbar />

      {/* partners */}
      <Search />
      {/* <Msg /> */}

      {/* Rebuilds */}
      {/* <Rebuilds />

      {/* Parts Section */}
      {/* <Buy /> */}

      {/* Contact Section */}
      {/* <ContactSection /> */}

      {/* Subscribe Section */}
      <Subscribe /> 

      {/* footer section */}
      <Footer />

    </div>
  )
}
