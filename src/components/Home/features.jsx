import React from 'react';
import { FiZap, FiShield, FiSmartphone } from 'react-icons/fi';

const Features = () => {
    const features = [
        {
            title: "Swift Service",
            description: "Enjoy quick and efficient home solutions with our expert team.",
            icon: <FiZap className="text-indigo-600 text-4xl mb-4" />,
        },
        {
            title: "Trusted & Dependable",
            description: "We ensure your home’s safety with reliable, high-quality services.",
            icon: <FiShield className="text-indigo-600 text-4xl mb-4" />,
        },
        {
            title: "Easy Booking System",
            description: "Seamlessly book and manage services with our intuitive platform.",
            icon: <FiSmartphone className="text-indigo-600 text-4xl mb-4" />,
        },
    ];

    return (
        <section className="px-6 py-12 bg-gray-100">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">Our Features</h2>
                <p className="text-gray-600 mb-10">
                    Discover what makes our service stand out from the rest.
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
                        >
                            {feature.icon}
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
