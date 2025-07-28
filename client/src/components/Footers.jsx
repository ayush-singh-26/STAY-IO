import { FaAirbnb, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { IoMdMail } from "react-icons/io";
import { MdPhone } from "react-icons/md";
import { TiHome } from "react-icons/ti";

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
                    {/* Logo and About */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center mb-4">
                            <TiHome className='text-3xl text-indigo-600 mr-2' />
                            <span className="text-white text-xl font-bold">STAY-IO</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Discover the perfect place to stay at amazing prices in 191+ countries.
                            Whether you're looking for a hotel, apartment, or unique stay, we've got you covered.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <FaFacebook className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <FaTwitter className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <FaInstagram className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <FaLinkedin className="text-xl" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                <FaYoutube className="text-xl" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-700 pb-2">Explore</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-white transition-colors flex items-center"><FiChevronRight className="mr-1 text-sm" /> Countries</a></li>
                            <li><a href="#" className="hover:text-white transition-colors flex items-center"><FiChevronRight className="mr-1 text-sm" /> Regions</a></li>
                            <li><a href="#" className="hover:text-white transition-colors flex items-center"><FiChevronRight className="mr-1 text-sm" /> Cities</a></li>
                            <li><a href="#" className="hover:text-white transition-colors flex items-center"><FiChevronRight className="mr-1 text-sm" /> Districts</a></li>
                        </ul>
                    </div>

                    {/* Accommodations */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-700 pb-2">Stays</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-white transition-colors flex items-center"><FiChevronRight className="mr-1 text-sm" /> Hotels</a></li>
                            <li><a href="#" className="hover:text-white transition-colors flex items-center"><FiChevronRight className="mr-1 text-sm" /> Apartments</a></li>
                            <li><a href="#" className="hover:text-white transition-colors flex items-center"><FiChevronRight className="mr-1 text-sm" /> Resorts</a></li>
                            <li><a href="#" className="hover:text-white transition-colors flex items-center"><FiChevronRight className="mr-1 text-sm" /> Villas</a></li>
                        </ul>
                    </div>

                    {/* Contact & Support */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4 border-b border-gray-700 pb-2">Support</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <MdPhone className="mt-1 mr-2 text-blue-400" />
                                <div>
                                    <p className="text-sm text-gray-400">24/7 Customer Support</p>
                                    <a href="tel:+916389394206" className="hover:text-white transition-colors">+91 6389394206</a>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <IoMdMail className="mt-1 mr-2 text-blue-400" />
                                <div>
                                    <p className="text-sm text-gray-400">Email Us</p>
                                    <a href="mailto:support@stayease.com" className="hover:text-white transition-colors">support@stayio.com</a>
                                </div>
                            </li>
                            <li><a href="#" className="hover:text-white transition-colors flex items-center"><FiChevronRight className="mr-1 text-sm" /> Help Center</a></li>
                           
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 my-6"></div>

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-gray-500 text-sm mb-4 md:mb-0">
                        © {new Date().getFullYear()} StayEase, Inc. All rights reserved.
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Accessibility</a>
                        <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Sitemap</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;