import React, { useRef, useState, useEffect } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay },
  },
});

const ContactPage = () => {
  const form = useRef();
  const [mapUrl, setMapUrl] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_fkk9haf',          // Replace with your service ID Changed
        'template_toex5lf',         // Replace with your template ID changed
        form.current,
        'qdy5hOQUalAT4RMGX'         // Replace with your public key
      )
      .then(
        (result) => {
          alert('Message sent successfully!');
          form.current.reset();
        },
        (error) => {
          alert('Failed to send message. Try again later.');
          console.error(error.text);
        }
      );
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_MAPS_API_KEY&center=${latitude},${longitude}&zoom=15`;
        setMapUrl(url);
      },
      (error) => {
        console.error('Location access denied or failed:', error);
        // fallback location
        setMapUrl('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14014.264758701355!2d77.2167216!3d28.6448004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd2f64c12e55%3A0xa89f9ff299d2d54a!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1611730971134!5m2!1sen!2sin');
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 py-16 px-4 relative overflow-hidden">
      <div className="max-w-5xl mx-auto rounded-3xl bg-white shadow-2xl p-10 sm:p-16 relative z-10">
        <motion.div className="text-center mb-12" initial="hidden" animate="visible" variants={fadeIn(0)}>
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            Let’s <span className="text-blue-500">Talk</span> 💙
          </h1>
          <p className="text-gray-600 text-lg">
            We're here to help and answer any question you might have.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.form
            ref={form}
            onSubmit={sendEmail}
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn(0.2)}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                Your Name
              </label>
              <input
                type="text"
                name="user_name"
                required
                placeholder="Enter your name"
                className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-xl shadow-sm py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Your Email
              </label>
              <input
                type="email"
                name="user_email"
                required
                placeholder="you@example.com"
                className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-xl shadow-sm py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
                Your Message
              </label>
              <textarea
                name="message"
                rows="4"
                required
                placeholder="Type your message here..."
                className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-xl shadow-sm py-3 px-5 focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-full text-lg font-bold hover:bg-green-600 transition-all shadow-lg hover:shadow-green-200"
            >
              Send Message
            </button>
          </motion.form>

          <motion.div className="flex flex-col justify-center space-y-6 text-gray-700" initial="hidden" animate="visible" variants={fadeIn(0.4)}>
            <div className="flex items-start gap-4">
              <div className="bg-pink-100 text-pink-600 p-3 rounded-xl shadow-sm">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Our Office</h4>
                <p>123 Dream Street, Delhi, India</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-xl shadow-sm">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Phone</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-green-100 text-green-600 p-3 rounded-xl shadow-sm">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Email</h4>
                <p>support@yourstore.com</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div className="mt-16 rounded-2xl overflow-hidden border-4 border-blue-100 shadow-lg" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn(0.6)}>
          {mapUrl && (
            <iframe
  title="Google Map"
  src="https://www.google.com/maps?q=Connaught+Place,New+Delhi&output=embed"
  width="100%"
  height="350"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
></iframe>

          )}
        </motion.div>
      </div>

      <div className="absolute top-10 left-0 w-40 h-40 bg-pink-200 opacity-20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-0 w-40 h-40 bg-blue-200 opacity-20 rounded-full blur-3xl -z-10"></div>

      {/* Tawk.to Live Chat Widget */}
<script
  dangerouslySetInnerHTML={{
    __html: `
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src='https://embed.tawk.to/YOUR_PROPERTY_ID/1xxxxx';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
      })();
    `,
  }}
/>

    </div>
  );
};

export default ContactPage;
