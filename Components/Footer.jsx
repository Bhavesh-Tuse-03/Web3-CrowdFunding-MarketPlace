import React from "react";

const Footer = () => {
  const productList = ["Market", "ERC20 Token", "Donation"];
  const contactList = [
    "support@cryptoking.com",
    "info@example.com",
    "Contact Us",
  ];
  const usefulLinks = ["Home", "About Us", "Company Bio"];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-screen-xl px-6 py-10 text-center md:text-left">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Section */}
          <div>
            <h6 className="mb-4 flex items-center justify-center text-lg font-semibold uppercase md:justify-start">
              Crypto King
            </h6>
            <p className="text-gray-400">Building the future of crypto donations.</p>
          </div>

          {/* Products Section */}
          <div>
            <h6 className="mb-4 flex justify-center text-lg font-semibold uppercase md:justify-start">
              Products
            </h6>
            {productList.map((el, i) => (
              <p key={i} className="mb-2">
                <a href="#!" className="text-gray-400 hover:text-gray-300">
                  {el}
                </a>
              </p>
            ))}
          </div>

          {/* Useful Links Section */}
          <div>
            <h6 className="mb-4 flex justify-center text-lg font-semibold uppercase md:justify-start">
              Useful Links
            </h6>
            {usefulLinks.map((el, i) => (
              <p key={i} className="mb-2">
                <a href="#!" className="text-gray-400 hover:text-gray-300">
                  {el}
                </a>
              </p>
            ))}
          </div>

          {/* Contact Section */}
          <div>
            <h6 className="mb-4 flex justify-center text-lg font-semibold uppercase md:justify-start">
              Contact
            </h6>
            {contactList.map((el, i) => (
              <p key={i} className="mb-2">
                <a href="#!" className="text-gray-400 hover:text-gray-300">
                  {el}
                </a>
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-800 py-4 text-center">
        <span className="text-gray-400">
          &copy; {new Date().getFullYear()} Copyright:  
        </span>
        <a
          href="https://tailwind-elements.com/"
          className="font-semibold text-white hover:text-gray-300 ml-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Crypto King
        </a>
      </div>
    </footer>
  );
};

export default Footer;
