import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';

const FloatingWhatsApp: React.FC = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      `🛒 *WEBSITE INQUIRY*\n\nHello! I'm interested in your products. Can you help me with more information?`
    );
    window.open(`https://wa.me/254795523752?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
      title="Chat with us on WhatsApp"
    >
      <WhatsAppIcon className="w-6 h-6" />
    </button>
  );
};

export default FloatingWhatsApp; 