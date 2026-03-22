

import React from "react";
import instagram from "../assets/images/instagram.png";
import twitter from "../assets/images/twitter.png";
import youtube from "../assets/images/youtube.png";
import facebook from "../assets/images/facebook.png";
import linkedin from "../assets/images/linkedin.png";
import tiktok from "../assets/images/tik-tok.png";
import mastercard from "../assets/images/mastercard.png";
import mpesa_icon from "../assets/images/mpesa_icon.png";
import paypal from "../assets/images/paypal.png";
import visa from "../assets/images/visa.png";
import pinterest from "../assets/images/pinterest.png";

const Footer = () => {
  return (
    <footer className="bg-[#292929] text-[#d1d1d1] w-full py-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="flex flex-col gap-1">
            <p className="text-white font-semibold">NEED HELP</p>
            <a href="#message">Chat With Us</a>
            <a href="#">Help Center</a>
            <a href="#">Contact Us</a>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-white font-semibold">ABOUT UNIXART</p>
            <a href="#about">About Us</a>
            <a href="#">Terms and Conditions</a>
            <a href="#">Cookie Policy</a>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-white font-semibold">MAKE MONEY WITH UNIXART</p>
            <a href="#">Sell Your Collections</a>
            <a href="#">Share your collection</a>
            <a href="https://whatsapp.com/channel/0029VbBaD8aADTO9IU0eXR1G">Join Channel</a>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-white font-semibold">WHAT'S NEW</p>
            <a href="/#available">New Deals</a>
            <a href="/best_art">Best Art</a>
            <a href="/buy">Buy Art</a>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-gray-700 pt-6">
          {/* Social Links */}
          <div>
            <p className="text-white font-semibold mb-3">JOIN US ON</p>
            <div className="flex gap-5">
              <a href="#"><img src={twitter} alt="twitter" className="h-6" /></a>
              <a href="https://www.facebook.com/profile.php?id=61578456511256"><img src={facebook} alt="facebook" className="h-7" /></a>
              <a href="https://www.intagram.com/unixartke?igsh=YTM4dNuYnBtZG02"><img src={instagram} alt="instagram" className="h-7" /></a>
              <a href="https://www.tiktok.com/@unixart1?_r=1&_t=ZS-94qa7reTTSD"><img src={tiktok} alt="tiktok" className="h-7" /></a>
              <a href="https://youtube.com/@unixart-i5k?si=1Ufb9qsBVY7KNmHZ"><img src={youtube} alt="youtube" className="h-8" /></a>
              <a href="https://wwww.linkedin.com/in/unix-art-045b443b8/"><img src={linkedin} alt="linkedin" className="h-7" /></a>
              <a href="https://pin.it/75cFtjKPF"><img src={pinterest} alt="pinterest" className="h-7" /></a>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <p className="text-white font-semibold mb-3">PAYMENT METHODS</p>
            <div className="flex gap-4 flex-wrap">
              <img src={mastercard} alt="mastercard" className="h-10" />
              <img src={visa} alt="visa" className="h-10" />
              <img src={paypal} alt="paypal" className="h-10" />
              <img src={mpesa_icon} alt="mpesa" className="h-8 w-12 object-contain" />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400 mt-8">
          © {new Date().getFullYear()} UnixArt. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
