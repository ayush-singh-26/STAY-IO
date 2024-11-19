import React from "react";

function Footers() {
    return (
        <div className="bg-gray-900 text-white py-10">
            <div className="max-w-6xl mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    <ul className="space-y-2">
                        <li className="font-semibold">Countries</li>
                        <li>Regions</li>
                        <li>Cities</li>
                        <li>Districts</li>
                        <li>Airports</li>
                        <li>Hotels</li>
                    </ul>
                    <ul className="space-y-2">
                        <li className="font-semibold">Homes</li>
                        <li>Apartments</li>
                        <li>Resorts</li>
                        <li>Villas</li>
                        <li>Hostels</li>
                        <li>Guest houses</li>
                    </ul>
                    <ul className="space-y-2">
                        <li className="font-semibold">Unique stays</li>
                        <li>Reviews</li>
                        <li>Travel articles</li>
                        <li>Communities</li>
                        <li>Holiday deals</li>
                    </ul>
                    <ul className="space-y-2">
                        <li className="font-semibold">Services</li>
                        <li>Car rental</li>
                        <li>Flight Finder</li>
                        <li>Restaurant reservations</li>
                        <li>Travel Agents</li>
                    </ul>
                    <ul className="space-y-2">
                        <li className="font-semibold">About</li>
                        <li>Customer Service</li>
                        <li>Partner Help</li>
                        <li>Careers</li>
                        <li>Sustainability</li>
                        <li>Press Center</li>
                        <li>Safety Resources</li>
                        <li>Investor Relations</li>
                        <li>Terms & Conditions</li>
                    </ul>
                </div>
                <div className="mt-8 text-center text-gray-400">
                    © 2024 AyushSingh. All rights reserved.
                </div>
            </div>
        </div>
    );
}

export default Footers;
