
'use client'

import Navbar from 'pages/nav/Navbar';
import Footer from 'pages/footer/Footer';
import Rebuilds from 'pages/shop/rebuilds';
import Dashboard from 'pages/dashboard/dashboard';
import Store from 'pages/store/store';
// import User from 'pages/account/user/profile';
import Partners from 'pages/shop/parts/upload_part';
import Parts from 'pages/shop/parts/parts';






// import Register from 'pages/admin/login';
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
      <Store />

       {/* <Dashboard /> */}
       {/* <Parts />  */}


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
