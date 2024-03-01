import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-200 dark:bg-gray-900 font-serif">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">ClassicsKe</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline">About</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Brand Center</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Blog</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Help center</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline">Docs</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Terms of Service</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Contact Us</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline">Privacy Policy</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Licensing</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">Terms &amp; Conditions</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Other</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="#" className="hover:underline">Services</a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline">App</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 md:flex md:items-center md:justify-center">
          <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">© 2024 <a href="">ClassicsKe</a>. All Rights Reserved.</span>
          {/* <div className="flex mt-4 space-x-6 sm:justify-center md:mt-0">
            <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <span className="sr-only">Facebook</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.352 2H6.648C4.843 2 3.386 3.51 3.386 5.407v10.186c0 1.897 1.457 3.407 3.262 3.407H11v-7H9V9h2V7.5c0-1.322 1.121-2.5 2.5-2.5h2V2z"
                />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <span className="sr-only">Twitter</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M21.166 4.773c-.75.335-1.555.563-2.398.665.86-.517 1.52-1.34 1.833-2.322-.805.477-1.7.824-2.652 1.01-.76-.813-1.846-1.32-3.045-1.32-2.3 0-4.156 1.855-4.156 4.133 0 .32.036.633.107.933-3.448-.174-6.505-1.845-8.556-4.377-.358.615-.565 1.328-.565 2.1 0 1.433.73 2.695 1.838 3.435-.678-.023-1.313-.208-1.866-.518v.052c0 1.998 1.422 3.66 3.306 4.037-.35.09-.715.14-1.088.14-.266 0-.525-.025-.78-.073.528 1.636 2.055 2.828 3.86 2.857-1.415 1.11-3.198 1.77-5.134 1.77-.334 0-.664-.02-.988-.06 1.834 1.178 4.005 1.86 6.338 1.86 7.61 0 11.784-6.306 11.784-11.782 0-.18-.004-.36-.014-.537.81-.584 1.516-1.31 2.075-2.138l-.047-.02z"
                />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <span className="sr-only">Instagram</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14 2H9C5.686 2 3 4.686 3 8v5c0 3.314 2.686 6 6 6h5c3.314 0 6-2.686 6-6V8c0-3.314-2.686-6-6-6zm-5 3a4 4 0 100 8 4 4 0 000-8zm5 7a2 2 0 110-4 2 2 0 010 4zm5-8a1 1 0 110 2 1 1 0 010-2z"
                />
              </svg>
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
