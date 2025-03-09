import React, { useState, useContext } from "react";
import { CrowdFundingContext } from "@/Context/CrowdFunding";
import { Logo, Menu } from "./index";

const Navbar = () => {
  const { currentAccount, connectWallet } = useContext(CrowdFundingContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuList = ["White Paper", "Project", "Donation", "Members"];

  return (
    <div className="bg-gray-900 text-white">
      <div className="px-4 py-5 mx-auto max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          {/* Left - Logo and Menu */}
          <div className="flex items-center">
            <a href="/" className="inline-flex items-center mr-8">
              {/* Logo Visible Now */}
              <Logo color="text-white" className="w-10 h-10" />
              <span className="ml-2 text-xl font-bold tracking-wide uppercase">
                Company
              </span>
            </a>
            <ul className="hidden space-x-8 lg:flex">
              {menuList.map((el, i) => (
                <li key={i + 1}>
                  <a
                    href="/"
                    className="font-medium tracking-wide text-gray-300 transition-colors duration-200 hover:text-white"
                  >
                    {el}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Connect Wallet Button */}
          {!currentAccount && (
            <ul className="hidden lg:flex items-center space-x-8">
              <li>
                <button
                  onClick={connectWallet}
                  className="h-12 px-6 text-white font-medium bg-purple-600 hover:bg-purple-700 transition duration-200 rounded shadow-md focus:outline-none"
                >
                  Connect Wallet
                </button>
              </li>
            </ul>
          )}

          {/* Mobile Menu Button */}
          <div className="lg:hidden z-40">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 transition duration-200 rounded focus:outline-none"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-0 left-0 w-full bg-gray-900 text-white">
            <div className="p-5 border rounded shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <a href="/" className="inline-flex items-center">
                  {/* Logo Visible in Mobile Menu */}
                  <Logo color="text-white" className="w-10 h-10" />
                  <span className="ml-2 text-xl font-bold tracking-wide uppercase">
                    Company
                  </span>
                </a>
                <button
                  aria-label="Close Menu"
                  title="Close Menu"
                  className="p-2 transition duration-200 rounded hover:bg-gray-700 focus:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-5 text-gray-300" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M19.7 4.3c-.4-.4-1-.4-1.4 0L12 10.6 5.7 4.3c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l6.3 6.3-6.3 6.3c-.4.4-.4 1 0 1.4s1 .4 1.4 0l6.3-6.3 6.3 6.3c.4.4 1 .4 1.4 0s.4-1 0-1.4L13.4 12l6.3-6.3c.4-.4.4-1 0-1.4z"
                    />
                  </svg>
                </button>
              </div>

              <nav>
                <ul className="space-y-4">
                  {menuList.map((el, i) => (
                    <li key={i + 1}>
                      <a
                        href="/"
                        className="font-medium tracking-wide text-gray-300 transition-colors duration-200 hover:text-white"
                      >
                        {el}
                      </a>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={connectWallet}
                      className="h-12 w-full text-white font-medium bg-purple-600 hover:bg-purple-700 transition duration-200 rounded shadow-md focus:outline-none"
                    >
                      Connect Wallet
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
