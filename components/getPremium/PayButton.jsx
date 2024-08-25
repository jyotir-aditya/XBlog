"use client"
import Script from 'next/script';
import { useEffect } from 'react';

export default function RazorpayButton() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);
  }, []);

  const handlePayment = () => {
    const options = {
      key: 'key_id', // Replace with your Razorpay key_id
      subscription_id: 'sub_OnqfTHnMhJXcV4', // Replace with your subscription ID
      name: 'Acme Corp.',
      description: 'Monthly Test Plan',
      image: '/your_logo.jpg',
      callback_url: 'https://eneqd3r9zrjok.x.pipedream.net/',
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com',
        contact: '+919876543210',
      },
      notes: {
        note_key_1: 'Tea. Earl Grey. Hot',
        note_key_2: 'Make it so.',
      },
      theme: {
        color: '#F37254',
      },
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
  };

  return (
    <button id="rzp-button1" onClick={handlePayment}>
      <div className='text-lg border-2 border-black px-4 rounded-full hover:text-white hover:bg-black hover:border-white hover: '>Buy</div>
    </button>
  );
}
