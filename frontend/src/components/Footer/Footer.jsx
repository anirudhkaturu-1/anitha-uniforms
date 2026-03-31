import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="text-gray-600  bg-gray-500 rounded-tr-[100px] rounded-tl-[100px] mt-4 body-font">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        {/* Logo Section */}
        <div className="w-64 flex-s md:mx-0 mx-auto text-center md:text-left">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
           <img src={assets.logo} alt="" />
          </a>
          <p className="mt-2 text-sm text-gray-100">
            Air plant banjo lyft occupy retro adaptogen indego
          </p>
        </div>

        {/* Links Section */}
        <div className="flex-grow-2 flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          {Array(4)
            .fill()
            .map((_, index) => (
              <div key={index} className="lg:w-1/4 md:w-1/2 w-full px-4">
                <h2 className="title-font font-medium text-gray-100 tracking-widest text-sm mb-3">
                  CATEGORIES
                </h2>
                <nav className="list-none mb-10">
                  {["First Link", "Second Link", "Third Link", "Fourth Link"].map(
                    (link, i) => (
                      <li key={i}>
                        <a className="text-gray-200 hover:text-gray-300 cursor-pointer">
                          {link}
                        </a>
                      </li>
                    )
                  )}
                </nav>
              </div>
            ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-violet-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © {new Date().getFullYear()} Anitha —
            <a
              href="https://twitter.com/knyttneve"
              rel="noopener noreferrer"
              className="text-gray-600 ml-1"
              target="_blank"
            >
            
            </a>
          </p>
         <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
  {/* Social Icons */}
  {[
    {
      link: "https://www.facebook.com/profile.php?id=61581805940160#",
      icon: (
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
      ),
    },
    {
      link: "https://www.instagram.com/mafatlal_uniforms/",
      icon: (
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
      ),
    },
    {
      link: "https://www.youtube.com/@mafatlaluniforms",
      icon: (
        <>
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
        </>
      ),
    },
    {
      link: "#", // (Optional placeholder – update if needed)
      icon: (
        <>
          <path
            stroke="none"
            d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
          ></path>
          <circle cx="4" cy="4" r="2" stroke="none"></circle>
        </>
      ),
    },
  ].map((social, idx) => (
    <a
      key={idx}
      href={social.link}
      target="_blank"
      rel="noopener noreferrer"
      className="ml-3 text-gray-700 cursor-pointer"
    >
      <svg
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-5 h-5"
        viewBox="0 0 24 24"
      >
        {social.icon}
      </svg>
    </a>
  ))}
</span>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
