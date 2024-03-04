import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faHome, faCog, faFile, faFolder, faFolderOpen, faBook, faBookmark, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const router = useRouter();
  const isActive = (path) => router.pathname === path;
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="flex h-screen">
        <div className={` sidebar flex-none bg-gray-800 w-1/5 ${showSidebar ? 'block' : 'hidden'}`}>
          <div className="flex flex-col justify-between h-full p-4">
            <div className="flex flex-col space-y-2">
              <button onClick={toggleSidebar} className="text-white block lg:hidden">
                <FontAwesomeIcon icon={faBars} />
              </button>
              <Link href="/dashboard" passHref>
                <div className={`${isActive('/dashboard') ? 'bg-gray-700' : 'bg-gray-600'} text-white flex items-center px-4 py-2 rounded cursor-pointer hover:bg-gray-700`}>
                  <FontAwesomeIcon icon={faHome} className="mr-2" />
                  Home
                </div>
              </Link>
              <Link href="/dashboard/profile" passHref>
                <div className={`${isActive('/dashboard/profile') ? 'bg-gray-700' : 'bg-gray-600'} text-white flex items-center px-4 py-2 rounded cursor-pointer hover:bg-gray-700`}>
                  <FontAwesomeIcon icon={faUser} className="mr-2" />
                  Profile
                </div>
              </Link>
              <Link href="/dashboard/settings" passHref>
                <div className={`${isActive('/dashboard/settings') ? 'bg-gray-700' : 'bg-gray-600'} text-white flex items-center px-4 py-2 rounded cursor-pointer hover:bg-gray-700`}>
                  <FontAwesomeIcon icon={faCog} className="mr-2" />
                  Settings
                </div>
              </Link>
              <Link href="/dashboard/files" passHref>
                <div className={`${isActive('/dashboard/files') ? 'bg-gray-700' : 'bg-gray-600'} text-white flex items-center px-4 py-2 rounded cursor-pointer hover:bg-gray-700`}>
                  <FontAwesomeIcon icon={faFile} className="mr-2" />
                  Files
                </div>
              </Link>
              <Link href="/dashboard/folders" passHref>
                <div className={`${isActive('/dashboard/folders') ? 'bg-gray-700' : 'bg-gray-600'} text-white flex items-center px-4 py-2 rounded cursor-pointer hover:bg-gray-700`}>
                  <FontAwesomeIcon icon={faFolder} className="mr-2" />
                  Folders
                </div>
              </Link>
              <Link href="/dashboard/folders/open" passHref>
                <div className={`${isActive('/dashboard/folders/open') ? 'bg-gray-700' : 'bg-gray-600'} text-white flex items-center px-4 py-2 rounded cursor-pointer hover:bg-gray-700`}>
                  <FontAwesomeIcon icon={faFolderOpen} className="mr-2" />
                  Open Folders
                </div>
              </Link>
              <Link href="/dashboard/books" passHref>
                <div className={`${isActive('/dashboard/books') ? 'bg-gray-700' : 'bg-gray-600'} text-white flex items-center px-4 py-2 rounded cursor-pointer hover:bg-gray-700`}>
                  <FontAwesomeIcon icon={faBook} className="mr-2" />
                  Books
                </div>
              </Link>
              <Link href="/dashboard/bookmarks" passHref>
                <div className={`${isActive('/dashboard/bookmarks') ? 'bg-gray-700' : 'bg-gray-600'} text-white flex items-center px-4 py-2 rounded cursor-pointer hover:bg-gray-700`}>
                  <FontAwesomeIcon icon={faBookmark} className="mr-2" />
                  Bookmarks
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-gray-100">
          <div className="flex flex-col h-full p-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <div className="flex items-center space-x-4">
                <Link href="/dashboard/profile" passHref>
                  <div className="text-gray-600 hover:text-gray-800 cursor-pointer">
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Profile
                  </div>
                </Link>
                <Link href="/dashboard/logout" passHref>
                  <div className="text-gray-600 hover:text-gray-800 cursor-pointer">
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Logout
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
