import React from "react";

export const metadata ={
  title:"Terms of Service"
}

const page = () => {
  return (
    <div className="bg-gray-100 text-gray-800 pt-8 ">
      <div className="container sm:w-[50vw] mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
            Terms of Service
          </h1>
          <p className="text-gray-700 mb-6">Last Updated: 23 August 2024</p>
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Introduction
            </h2>
            <p className="text-gray-700 mb-6">
              Welcome to Xblog. This website is owned and operated by Xblog.
              By accessing or using this site, you agree to
              comply with and be bound by these Terms of Service. If you do not
              agree to these terms, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Agreement</h2>
            <p className="text-gray-700 mb-6">
              These Terms of Service ("Terms") constitute a legally binding
              agreement between you ("User" or "You") and Xblog ("We", "Us", or "Our").
              By accessing or using the website
              located at xblog.co.in (the "Site"), you agree to be bound
              by these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              User Responsibilities
            </h2>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Content</h3>
            <p className="text-gray-700 mb-4">
              You are solely responsible for the content you post on xblog. By
              posting content, you warrant that:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              <li>
                You own the rights to the content, or have obtained permission
                from the rightful owner to post it.
              </li>
              <li>
                Your content does not violate any applicable laws or
                regulations.
              </li>
              <li>
                Your content does not infringe on any third-party rights,
                including but not limited to intellectual property rights,
                privacy rights, and publicity rights.
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Prohibited Activities
            </h3>
            <p className="text-gray-700 mb-6">
              Users of this site agree not to engage in the following prohibited
              activities:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              <li>
                Spamming: Posting or sending unsolicited messages or
                advertisements.
              </li>
              <li>
                Hacking: Attempting to gain unauthorized access to the Site,
                other user accounts, or any systems or networks connected to the
                Site.
              </li>
              <li>
                Posting Illegal Content: Uploading or sharing content that is
                illegal, harmful, threatening, abusive, defamatory, or otherwise
                objectionable.
              </li>
              <li>Impersonation: Pretending to be another person or entity.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Account Responsibility
            </h2>
            <p className="text-gray-700 mb-6">
              You are responsible for maintaining the confidentiality of your
              account login credentials and are fully responsible for all
              activities that occur under your account. If you suspect any
              unauthorized use of your account, you must notify us immediately
              at customercare@xblog.co.in .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Content Ownership and Use
            </h2>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              User Content
            </h3>
            <p className="text-gray-700 mb-6">
              By posting content on xblog, you retain ownership of your content.
              However, you grant us a non-exclusive, royalty-free, worldwide,
              perpetual license to use, distribute, reproduce, modify, adapt,
              publicly display, and perform such content in connection with the
              operation of the Site and our business, including promotions and
              marketing.
            </p>

            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Website Content
            </h3>
            <div className="text-gray-700 mb-6">
              All content on this website, including but not limited to text,
              graphics, logos, images, and software, is the property of Xblog
              and is protected by applicable intellectual
              property laws. You may not use, reproduce, distribute, or create
              derivative works from any content on this site without our
              explicit written permission.
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Payment and Subscription
            </h2>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Pricing</h3>
            <p className="text-gray-700 mb-6">
              We offer various subscription plans to access premium content and
              features on xBlog. The pricing for these plans is as follows:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              <li>Basic Plan: ₹399 per month</li>
              <li>Premium Plan: ₹999 per month</li>
              <li>Premium Plus Plan: ₹1499 per month</li>
            </ul>
            <p className="text-gray-700 mb-6">
              Billing is conducted on a recurring monthly basis. You can manage
              your subscription and payment information through your account
              settings.
            </p>

            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Refund Policy
            </h3>
            <p className="text-gray-700 mb-6">
              We offer a 7-day money-back guarantee for new subscribers. If you
              are not satisfied with your subscription, you may request a refund
              within 7 days of your initial purchase. Refunds are not available
              after this period.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Disclaimer of Warranties
            </h2>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Service Availability
            </h3>
            <p className="text-gray-700 mb-6">
              The services provided on this website are offered "as is" and "as
              available." We make no warranties, whether express or implied,
              regarding the availability, reliability, or quality of our
              services. We may experience service interruptions or other issues
              that could affect your access to the Site.
            </p>

            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              No Guarantees
            </h3>
            <p className="text-gray-700 mb-6">
              We do not guarantee the accuracy, completeness, or reliability of
              any content on this Site. Use of any information or materials on
              this website is entirely at your own risk, and we shall not be
              liable for any inaccuracies or errors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Limitation of Liability
            </h2>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">Damages</h3>
            <p className="text-gray-700 mb-6">
              In no event shall Xblog, its affiliates,
              officers, directors, employees, agents, or licensors be liable for
              any indirect, incidental, special, consequential, or punitive
              damages arising out of or in connection with your use of or
              inability to use the Site or any content or services provided
              through the Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Termination
            </h2>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Right to Terminate
            </h3>
            <p className="text-gray-700 mb-6">
              We reserve the right to suspend or terminate your account at any
              time, for any reason, without notice. If your account is
              terminated, you will no longer have access to your account or the
              content you have posted on the Site. We are not liable for any
              loss or damage arising from the termination of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Governing Law
            </h2>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Jurisdiction
            </h3>
            <p className="text-gray-700 mb-6">
              These Terms are governed by and construed in accordance with the
              laws of India, without regard to its conflict of
              law principles. Any legal disputes arising from or related to
              these Terms or the use of the Site will be resolved exclusively in
              the courts of India.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Changes to the Terms of Service
            </h2>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Modification Rights
            </h3>
            <p className="text-gray-700 mb-6">
              We reserve the right to modify or update these Terms at any time.
              If we make changes to these Terms, we will notify you by posting
              the revised Terms on this page and updating the "Last Updated"
              date. Your continued use of the Site after any such changes
              constitutes your acceptance of the new Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Contact Information
            </h2>
            <h3 className="text-xl font-semibold text-gray-700 mb-3">
              Questions or Concerns
            </h3>
            <p className="text-gray-700">
              If you have any questions or concerns about these Terms of
              Service, please contact us at:
            </p>
            <div className="text-gray-700 mt-4">
              Xblog
              <br />
              Samastipur,Bihar,India,pincode-848101
              <br />
              <a href="mailto:customercare@xblog.co.in">customercare@xblog.co.in</a>
              <br />
              {/* [Your Phone Number] */}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default page;
