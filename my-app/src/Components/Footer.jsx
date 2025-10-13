
 

// import React from 'react'
// import instagram from '../assets/images/instagram.png'
// import twitter from '../assets/images/twitter.png'
// import youtube from '../assets/images/youtube.png'
// import facebook from '../assets/images/facebook.png'
// import linkedin from '../assets/images/linkedin.png'
// import tiktok from '../assets/images/tik-tok.png'
// import mastercard from '../assets/images/mastercard.png'
// import mpesa_icon from '../assets/images/mpesa_icon.png'
// import paypal from '../assets/images/paypal.png'
// import visa from '../assets/images/visa.png'



// const Footer = () => {
//   return (
//     <div className='bg-[#292929] w-full'>
//       <div className='flex justify-center'>
//         <div className='flex flex-col'>
//           <div className='w-[900px] h-[200px] flex justify-around  text-[#d1d1d1] mt-7'>
//           <div className='flex flex-col gap-0.5'>
//             <p className='text-white font-semibold tracking-[-0.5px]'>NEED HELP</p>
//             <a href="">Chat With Us</a>
//             <a href="">Help Center</a>
//             <a href="">Contact Us</a>
//           </div>
//           <div className='flex flex-col gap-0.5'>
//             <p className='text-white font-semibold tracking-[-0.5px]'>ABOUT UNIX</p>
//             <a href="">About Us</a>
//             <a href="">Terms and Conditions</a>
//             <a href="">Cookie Policy</a>
//           </div>
//           <div className='flex flex-col gap-0.5'>
//             <p className='text-white font-semibold tracking-[-0.5px]'>MAKE MONEY WITH UNIX</p>
//             <a href="">Sell Your Products</a>
//             <a href="">Post Your Art</a>
//             <a href="">Freelance</a>
//           </div>
//           <div className='flex flex-col gap-0.5'>
//             <p className='text-white font-semibold tracking-[-0.5px]'>WHATS NEW</p>
//             <a href="">New Deals</a>
//             <a href="">Best Art</a>
//             <a href="">Flash Sales</a>
//           </div>
//         </div>
//           <div className='flex justify-start ml-10'>
//           <div>
//             <p className='text-white font-semibold tracking-[-0.5px]'>JOIN US ON</p>
//             <div className='flex justify-start gap-5'>
//                 <a href="#">
//               <img src={twitter} alt="twitter" className='h-[25px]' />
//               </a>
//             <a href="#">
//           <img src={facebook} alt="facebook" className='h-[30px]'/>
//             </a>
//             <a href="#">
//               <img src={instagram} alt="instagram" className='h-[30px]' />
//             </a>
//             <a href="#">
//               <img src={tiktok} alt="tiktok" className='h-[30px]'/>
//             </a>
//             <a href="#">
//               <img src={youtube} alt="youtube" className='h-[40px]'/>
//             </a>
//             </div>
//           </div>
//           <div>
//             <p className='text-white font-semibold tracking-[-0.5px]'>PAYMENT METHODS</p>
//             <div className='flex justify-start'>
//               <a href="#">
//                 <img src={mastercard} alt="mastercard" className='h-[60px]' />
//               </a>
//               <a href="#">
//                 <img src={visa} alt="visa"  className='h-[60px]'/>
//               </a>
//               <a href="#">
//                 <img src={mpesa_icon} alt="mpesa" className='h-[40px] w-[50px]'/>
//               </a>
//             </div>
//           </div>
//         </div>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default Footer

///////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import MasterCard from "../assets/images/mastercard.png"
import Mpesa from "../assets/images/mpesa_icon.png"
import Visa from "../assets/images/visa.png"
import PayPall from "../assets/images/paypal.png"
import Youtube from "../assets/images/youtube.png"
import Instagram from "../assets/images/instagram.png"
import TikTok from "../assets/images/tik-tok.png"
import LinkedIn from "../assets/images/linkedin.png"
import Facebook from "../assets/images/facebook.png"
import Twitter from "../assets/images/twitter.png"
import { HiChevronRight } from "react-icons/hi";


const Footer = () => {
  const footerSections = [
    {
      title: "NEED HELP",
      links: [
        { label: "Chat With Us", href: "#" },
        { label: "Help Center", href: "#" },
        { label: "Contact Us", href: "#" },
      ],
    },
    {
      title: "ABOUT UNIX",
      links: [
        { label: "About Us", href: "#" },
        { label: "Terms and Conditions", href: "#" },
        { label: "Cookie Policy", href: "#" },
      ],
    },
    {
      title: "MAKE MONEY WITH UNIX",
      links: [
        { label: "Sell Your Products", href: "#" },
        { label: "Post Your Art", href: "#" },
        { label: "Freelance", href: "#" },
      ],
    },
    {
      title: "WHAT'S NEW",
      links: [
        { label: "New Deals", href: "#" },
        { label: "Best Art", href: "#" },
        { label: "Flash Sales", href: "#" },
      ],
    },
  ];

  const socialIcons = [
    { name: "Twitter", url: "#" },
    { name: "Facebook", url: "#" },
    { name: "Instagram", url: "#" },
    { name: "TikTok", url: "#" },
    { name: "YouTube", url: "#" },
    { name: "LinkedIn", url: "#" },
  ];

  const paymentMethods = [
    { name: "Mastercard", url: "#" },
    { name: "Visa", url: "#" },
    { name: "PayPal", url: "#" },
    { name: "M-Pesa", url: "#" },
  ];

  return (
    <footer className=" bg-gray-700  text-[#8f0909]  ">
      <div className=" container pt-5 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section, index) => (
            <div key={index} className="flex flex-col gap-3">
              <p className="text-white font-semibold text-sm tracking-wide">
                {section.title}
              </p>
              <div className="h-1 w-20 bg-gradient-to-r from-transparent to-red-500 rounded-full"></div>
              {section.links.map((link, linkIndex) => (
                <a
                  key={linkIndex}
                  href={link.href}
                  className="text-[#d1d1d1] inline-flex gap-2 items-center group hover:text-red-500 transition-colors duration-200 "
                ><HiChevronRight className="group-hover:translate-x-2 duration-300" />
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 border-t border-gray-500 pt-3">
          {/* Social Links */}
          <div>
            <p className="text-white font-semibold mb-4 text-sm tracking-wide">
              JOIN US ON
            </p>
            <div className="flex gap-5">
              <a href="#" className="hover:opacity-80 transition-opacity duration-200">
                <img src={Twitter} alt="twitter" className="h-6 w-6 object-contain" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity duration-200">
                <img src={Facebook} alt="facebook" className="h-7 w-7 object-contain" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity duration-200">
                <img src={Instagram} alt="instagram" className="h-7 w-7 object-contain" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity duration-200">
                <img src={TikTok} alt="tiktok" className="h-7 w-7 object-contain" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity duration-200">
                <img src={Youtube} alt="youtube" className="h-8 w-8 object-contain" />
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity duration-200">
                <img src={LinkedIn} alt="linkedin" className="h-7 w-7 object-contain" />
              </a>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <p className="text-white font-semibold mb-2 text-sm tracking-wide">
              PAYMENT METHODS
            </p>
            <div className="flex gap-4 flex-wrap">
              <img src={MasterCard} alt="mastercard" className="h-10 object-contain hover:opacity-80 transition-opacity duration-200" />
              <img src={Visa} alt="visa" className="h-10 object-contain hover:opacity-80 transition-opacity duration-200" />
              <img src={PayPall} alt="paypal" className="h-10 object-contain hover:opacity-80 transition-opacity duration-200" />
              <img src={Mpesa} alt="mpesa" className="h-8 w-12 object-contain hover:opacity-80 transition-opacity duration-200" />
            </div>
          </div>
        </div>

        
      </div>
      {/* Copyright */}
        <div className="p-4 flex items-center justify-center text-xs text-gray-300 bg-slate-800 mt-5 border-t border-gray-700">
          © {new Date().getFullYear()} Unix. All rights reserved.
        </div>
    </footer>
  );
};

export default Footer;