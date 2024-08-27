import React from "react";

export const metadata ={
  title:"Ads Info"
}

const PromotionInfo = () => {
  return (
    <div className="bg-gray-100 text-gray-800 pt-8">
      <div className="container sm:w-[50vw] mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-6">Ads and Promotions on Xblog</h1>

          <p className="mb-6">
            At Xblog, we prioritize the user experience by focusing on high-quality, relevant content
            without interruptions from external advertisements. We currently do not partner with
            third-party providers to display ads on our platform. Our commitment is to keep your
            reading and writing experience distraction-free, allowing you to engage deeply with the
            content that matters most to you.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Promote Your Posts</h2>
          <p className="mb-6">
            While we don’t host external ads, we offer a unique opportunity for our premium members to
            promote their own posts within the Xblog community. If you're a premium member, whether you're
            a seasoned writer looking to boost visibility for your latest article or a newcomer wanting
            to share your voice with a broader audience, our promotion feature is designed to help you
            reach your goals.
          </p>

          <h3 className="text-xl font-semibold mb-4">How Post Promotion Works:</h3>

          <h4 className="text-lg font-semibold mb-2">Eligibility</h4>
          <p className="mb-6">
            Post promotion is an exclusive feature available only to premium members. By upgrading to
            a premium plan, you gain access to tools that can significantly enhance your content’s
            visibility.
          </p>

          <h4 className="text-lg font-semibold mb-2">Promotion Placement</h4>
          <p className="mb-6">
            Promoted posts by premium members are highlighted within the platform, appearing at the top of
            relevant categories, in user feeds, and in recommended sections. This increased visibility
            helps your content stand out to readers who are interested in similar topics.
          </p>

          <h4 className="text-lg font-semibold mb-2">Customization</h4>
          <p className="mb-6">
            You can choose the duration and scope of your promotion, targeting specific audiences based
            on interests and categories. This ensures that your post reaches the readers who are most
            likely to engage with your content.
          </p>

          <h4 className="text-lg font-semibold mb-2">Transparency</h4>
          <p className="mb-6">
            We clearly label promoted posts so that users are aware of the content that has been boosted.
            This maintains the integrity of our platform while offering premium members a valuable tool
            to grow their audience.
          </p>

          <h4 className="text-lg font-semibold mb-2">Pricing</h4>
          <p className="mb-6">
            Promotion plans are available for a fee, tailored to the needs of our premium members.
            The cost of promoting a post is designed to be affordable, giving you the flexibility to
            choose the level of exposure that fits your budget.
          </p>

          <h3 className="text-xl font-semibold mb-4">Why Promote on Xblog?</h3>
          <ul className="list-disc list-inside mb-6">
            <li>Reach a Targeted Audience: Connect with readers who are genuinely interested in your content.</li>
            <li>Boost Engagement: Increase interactions, comments, and shares on your posts.</li>
            <li>Grow Your Following: Attract new followers who appreciate your insights and expertise.</li>
          </ul>

          <p className="mb-6">
            By providing post promotion as an exclusive feature for premium members, Xblog helps you
            maximize the impact of your content while maintaining a clutter-free environment for all
            users. Any updates to our promotion policies or features will be reflected on this page, 
            and the "Last Updated" date will be adjusted accordingly. If you have any questions about our 
            promotion feature or need assistance, feel free to contact our support team at{" "}
            <a
              href="mailto:customercare@xblog.co.in"
              className="text-blue-600 underline"
            >
              customercare@xblog.co.in
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromotionInfo;
