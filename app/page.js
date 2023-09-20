
'use client'

import Navbar from 'pages/nav/Navbar';
import Footer from 'pages/footer/Footer';
import Rebuilds from 'pages/shop/rebuilds';
import Parts from 'pages/main/partners';
import About from 'pages/about/About';
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
      <Parts />

      {/* Rebuilds */}
      <Rebuilds />

      {/* Parts Section */}
      <Buy />

      {/* Contact Section */}
      <ContactSection />

      {/* Subscribe Section */}
      <Subscribe />

      {/* footer section */}
      <Footer />

    </div>
  )
}
