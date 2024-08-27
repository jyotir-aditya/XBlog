import React from "react";

export const metadata ={
  title:"Privacy Policy"
}

const page = () => {
  return (
    <div className="bg-gray-100 text-gray-800 pt-8">
      <div className="container sm:w-[50vw] mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-4">Last updated: 23 August 2024</p>

        <p className="mb-6">
          Welcome to Xblog. We are committed to protecting your privacy. This
          Privacy Policy outlines how we collect, use, disclose, and safeguard
          your information when you visit our website ("xblog.co.in"). By using the
          Site, you agree to the terms of this policy. If you disagree, please
          refrain from using the Site.
        </p>

        <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>

        <h3 className="text-xl font-semibold mb-2">Personal Data</h3>
        <p className="mb-4">
          When you register on Xblog, we collect the following
          information or other information provided by you at sign up:
        </p>
        <ul className="list-disc list-inside mb-6">
          <li>Name</li>
          <li>Email address</li>
          <li>Profile picture</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Payment Information</h3>
        <p className="mb-4">
          Payments are processed through secure and trusted third-party providers. We do not store
          your payment details; all payment information is securely managed by
          these third-party processors.
        </p>

        <h3 className="text-xl font-semibold mb-2">Usage Data</h3>
        <p className="mb-6">
          We may collect information about your interactions
          with the Site, including your IP address, browser type, and operating
          system, to enhance your experience.
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          2. How We Use Your Information
        </h2>
        <p className="mb-6">We use your information to:</p>
        <ul className="list-disc list-inside mb-6">
          <li>Authenticate your account and personalize your experience.</li>
          <li>
            Display your name, email, and profile picture on your profile and
            posts.
          </li>
          <li>Process payments for subscriptions and services.</li>
          <li>Analyze user behavior to improve our services.</li>
          <li>Notify you about changes to our services or policies.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">
          3. Data Storage and Security
        </h2>
        <p className="mb-6">
          Your data is stored in secure third-party providers. We adhere
          to industry-standard security practices, including encryption and
          secure access controls. However, please note that no transmission
          method over the internet is completely secure.
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          4. International Data Transfers
        </h2>
        <p className="mb-6">
          Our servers are located internationally. By using our Site, you
          consent to the transfer, storage, and processing of your information
          across different countries.
        </p>

        <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
        <p className="mb-6">You have the right to:</p>
        <ul className="list-disc list-inside mb-6">
          <li>Access the personal data we hold about you.</li>
          <li>Request corrections to inaccurate or incomplete information.</li>
          <li>Delete your account and associated data.</li>
          <li>Withdraw consent to our processing of your personal data.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4">
          6. Changes to This Privacy Policy
        </h2>
        <p className="mb-6">
          We may update this Privacy Policy periodically. Any significant
          changes will be posted on this page, and we may notify you via email.
        </p>

        <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
        <p className="mb-6">
          For any questions or concerns regarding this Privacy Policy, please
          contact us at:
        </p>
        <ul className="mb-6">
          <li>
            <strong>Company Name:</strong> Xblog
          </li>
          <li>
            <strong>Email:</strong> customercare@xblog.co.in
          </li>
          <li>
            <strong>Address:</strong> Samastipur,Bihar,India,pincode-848101
          </li>
          {/* <li>
            <strong>Phone Number:</strong> [Your Phone Number]
          </li> */}
        </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
