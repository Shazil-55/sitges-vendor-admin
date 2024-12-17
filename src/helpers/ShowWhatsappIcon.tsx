import React from 'react';
import Button from '@mui/material/Button';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const ShowWhatsAppIcon = () => {
  const handleButtonClick = () => {
    // Handle button click event here
    window.open('https://wa.me/923134031315', '_blank');
  };
  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '20px', zIndex: '999' }}>
    <Button onClick={handleButtonClick}>
      <WhatsAppIcon style={{ color: 'green', fontSize: '80px' }} />
    </Button>
  </div>
  );
};

export default ShowWhatsAppIcon;
