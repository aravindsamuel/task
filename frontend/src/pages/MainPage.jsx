import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function MainPage() {
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const contactRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false); // Close menu after click
  };

  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-yellow-600">BuildPro</h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 font-semibold">
            <li>
              <button onClick={() => scrollToSection(aboutRef)} className="hover:text-yellow-600">
                About
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection(servicesRef)} className="hover:text-yellow-600">
                Services
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection(contactRef)} className="hover:text-yellow-600">
                Contact
              </button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <HiX className="w-7 h-7" /> : <HiMenu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white shadow-md px-6 py-4 space-y-4 font-semibold"
            >
              <li>
                <button
                  onClick={() => scrollToSection(aboutRef)}
                  className="block w-full text-left hover:text-yellow-600"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection(servicesRef)}
                  className="block w-full text-left hover:text-yellow-600"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection(contactRef)}
                  className="block w-full text-left hover:text-yellow-600"
                >
                  Contact
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section
        className="h-screen flex flex-col justify-center items-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url('/images/hero-bg-construction.jpg')` }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-white drop-shadow-xl"
        >
          Building Your Dreams
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-4 text-lg font-bold md:text-xl text-white max-w-2xl drop-shadow-xl"
        >
          We bring your construction projects to life with precision, passion, and excellence.
        </motion.p>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-yellow-600"
          >
            About Us
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-6 text-center max-w-3xl mx-auto text-lg text-gray-700"
          >
            With over 20 years in the industry, BuildPro has been at the forefront of creating iconic
            structures. We combine innovative designs, sustainable practices, and top-notch engineering
            to deliver projects that exceed expectations.
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-yellow-600"
          >
            Our Services
          </motion.h3>
          <div className="grid gap-8 mt-10 md:grid-cols-3">
            {[
              {
                title: "Residential Construction",
                img: "/images/service1img.jpg",
                desc: "We design and build beautiful, sustainable homes tailored to your lifestyle."
              },
              {
                title: "Commercial Projects",
                img: "/images/service2img.jpg",
                desc: "From offices to retail spaces, we create functional and stylish commercial structures."
              },
              {
                title: "Renovations & Remodeling",
                img: "/images/service3img.jpg",
                desc: "Transform your existing space into something fresh, modern, and functional."
              }
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <img src={service.img} alt={service.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h4 className="text-xl font-bold text-yellow-600">{service.title}</h4>
                  <p className="mt-2 text-gray-700">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-yellow-600"
          >
            Contact Us
          </motion.h3>
          <motion.form
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mt-8 bg-gray-50 p-6 rounded-lg shadow-md"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Your Name"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
              />
            </div>
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full mt-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
            ></textarea>
            <button
              type="submit"
              className="mt-4 px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-yellow-600 text-white py-6 text-center">
        © {new Date().getFullYear()} BuildPro. All rights reserved.
      </footer>
    </div>
  );
}
