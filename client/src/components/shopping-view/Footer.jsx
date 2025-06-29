import { Facebook, Instagram, Linkedin, LinkedinIcon, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
   <section className="bg-white border border-5 text-gray-800 py-10 px-4 shadow-lg">
      {/* <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4"> */}
      <div className="justify-center max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        {/* About Section */}
        <div className="text-center">
          <a href="/" className="text-2xl font-semibold text-black mb-3 block">
            Shopee
          </a>
          <p>A108 Adam Street</p>
          <p>New York, NY 535022</p>
          <p className="mt-3">
            <strong>Phone:</strong> <span>+1 5589 55488 55</span>
          </p>
          <p>
            <strong>Email:</strong> <span>info@example.com</span>
          </p>

          <div className="flex gap-4 mt-4 justify-center">
            <a href="#" className="hover:text-blue-500 text-xl">
              <Twitter/>
            </a>
            <a href="#" className="hover:text-blue-500 text-xl">
              <Facebook/>
            </a>
            <a href="#" className="hover:text-blue-500 text-xl">
              <Instagram/>
            </a>
            <a href="#" className="hover:text-blue-500 text-xl">
              <LinkedinIcon/>
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div className="text-center">
          <h4 className="text-lg font-semibold mb-4">Useful Links</h4>
          <ul className="space-y-2 justify-center">
            {["Home", "About us", "Services", "Terms of services", "Privacy policy"].map((link, index) => (
              <li key={index} className="flex justify-center gap-2">
                <i className="fa-solid fa-greater-than text-sm"></i>
                <a href="#" className="hover:text-blue-400">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Services */}
        <div className="text-center">
          <h4 className="text-lg font-semibold mb-4">Our Services</h4>
          <ul className="flex flex-col space-y-2 justify-center">
            {["Web Design", "Web Development", "Product Manager", "Marketing", "Graphic Design"].map((service, index) => (
              <li key={index} className="flex justify-center gap-2">
                <i className="fa-solid fa-greater-than text-sm"></i>
                <a href="#" className="hover:text-blue-400">{service}</a>
              </li>
            ))}
          </ul>
        </div>

       </div>
    </section>
  );
};

export default Footer;
