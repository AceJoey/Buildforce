import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - in a real app, this would send to a backend
    const whatsappMessage = encodeURIComponent(
      `Hello Buildforce,\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nSubject: ${formData.subject}\n\nMessage: ${formData.message}`
    );
    window.open(`https://wa.me/254795523752?text=${whatsappMessage}`, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact <span className="text-green-600">Us</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-yellow-400 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with our team for expert advice, quotes, or any questions about our tools and machinery.
          </p>
        </div>

        <div className="space-y-8">
          {/* Contact Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex items-center space-x-3">
                    <a
                      href="tel:+254795523752"
                      className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center flex-shrink-0 hover:from-green-700 hover:to-green-800 transition-colors"
                    >
                      <Phone className="w-6 h-6 text-white" />
                    </a>
                    {/* WhatsApp Icon for Mobile */}
                    <a
                      href="https://wa.me/254795523752?text=Hello%20Buildforce,%20I%20need%20assistance%20with..."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lg:hidden w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center flex-shrink-0 hover:from-green-700 hover:to-green-800 transition-colors"
                    >
                      <WhatsAppIcon className="w-6 h-6 text-white" />
                    </a>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">+254-795-523-752</p>
                  </div>
                  {/* WhatsApp Button for Desktop */}
                  <a
                    href="https://wa.me/254795523752?text=Hello%20Buildforce,%20I%20need%20assistance%20with..."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden lg:flex bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-3 text-white hover:from-green-700 hover:to-green-800 transition-colors items-center space-x-2"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span className="text-sm font-semibold">Chat with us on WhatsApp now</span>
                  </a>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-green-800" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">info@buildforce.co.ke</p>
                    <p className="text-gray-600">sales@buildforce.co.ke</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600">Signage Arcade, Basement 2</p>
                    <p className="text-gray-600">Shop B2 13, Nairobi</p>
                    <p className="text-gray-600">Near Simba Coach River Rd.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-green-800" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 8:00 AM - 4:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Product Quote">Product Quote</option>
                      <option value="Technical Support">Technical Support</option>
                      <option value="Bulk Order">Bulk Order</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-md"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Interactive Map - Full Width */}
          <div id="map" className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Us</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                Visit our new location at Signage Arcade, Basement 2, Shop B2 13, Nairobi. 
                We're conveniently located near Simba Coach River Road.
              </p>
              <div className="relative h-96 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8199999999997!2d36.8175!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTcnMzEuNiJTIDM2wrA0OScwMy4wIkU!5e0!3m2!1sen!2ske!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Buildforce Tools Location"
                  className="absolute inset-0"
                ></iframe>
              </div>
              <div className="flex items-center justify-center space-x-4 pt-4">
                <a
                  href="https://maps.google.com/?q=Signage+Arcade+Basement+2+Shop+B2+13+Nairobi+Near+Simba+Coach+River+Rd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Open in Google Maps
                </a>
                <a
                  href="tel:+254795523752"
                  className="inline-flex items-center bg-yellow-400 text-green-800 px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call When There
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}