import React from 'react';

const WhyUs = () => {
  return (
    <section className="relative py-12">
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: "url('/shop1.jpg')" }}></div>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gray-800 opacity-50 z-10"></div>
      {/* Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-100 mb-6">
          Why We Use Tailwind CSS
        </h2>
        <p className="text-lg text-gray-200 leading-relaxed">
          Tailwind CSS is a utility-first CSS framework that allows us to build
          designs quickly by composing utility classes directly in our HTML. Here
          are some reasons why we prefer Tailwind for styling:
        </p>
        <ul className="mt-4 text-lg text-gray-200 leading-relaxed">
          <li className="mb-2">
            <span className="font-bold">Rapid Development:</span> Tailwind's
            utility classes enable us to prototype and iterate designs rapidly
            without writing custom CSS.
          </li>
          <li className="mb-2">
            <span className="font-bold">Consistency:</span> Tailwind promotes
            consistency across our project by providing a predefined set of
            design tokens and utilities.
          </li>
          <li className="mb-2">
            <span className="font-bold">Scalability:</span> As our project
            grows, Tailwind scales with us. We can easily extend Tailwind with
            custom configurations and plugins.
          </li>
          <li className="mb-2">
            <span className="font-bold">Maintenance:</span> With Tailwind, we
            reduce the need for writing and maintaining large amounts of custom
            CSS, leading to a more maintainable codebase.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default WhyUs;
