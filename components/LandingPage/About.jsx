import React from "react";
import Button from "./Button";
import Card from "./Card";
import { signIn } from "next-auth/react";

const About = () => {
  const cardData = [
    {
      heading: "Explore Diverse Content",
      content:
        "Dive into a wide range of topics, from technology and lifestyle to personal growth and beyond. Our curated articles are designed to inform, inspire, and challenge your perspectives.",
      buttonTitle: "Explore now",
      buttonOnclick: () => {
        signIn("google");
      },
    },
    {
      heading: "Share Your Voice",
      content:
        "Got something to say? Xblog empowers you to create your own content, whether it’s a detailed guide, a reflective essay, or a creative piece. Share your knowledge and insights with a growing audience.",
      buttonTitle: "Start writing",
      buttonOnclick: () => {
        signIn("google");
      },
    },
    {
      heading: "Support Creators",
      content:
        "Choose from our subscription plans to access premium content and support your favorite creators. Your contributions help us continue to bring high-quality content to the community.",
      buttonTitle: "Support now",
      buttonOnclick: () => {
        signIn("google");
      },
    },
    {
      heading: "Connect with Like-minded Individuals",
      content:
        "Join a vibrant community of readers and writers. Engage in meaningful discussions, exchange ideas, and build connections that go beyond the screen.",
      buttonTitle: "Join the community",
      buttonOnclick: () => {
        signIn("google");
      },
    },
    {
      heading: "Stay Updated with the Latest Trends",
      content:
        "Never miss a beat with our regularly updated content. Stay ahead of the curve with the latest trends, tips, and expert advice across various fields.",
      buttonTitle: "Stay updated",
      buttonOnclick: () => {
        signIn("google");
      },
    },
  ];

  return (
    <div>
      <div className="w-full h-fit flex flex-col items-center  mt-[2rem]">
        <div className="flex flex-col justify-center  items-center h-fit ">
          <h1 className="text-4xl sm:text-8xl font-bold font-robo">Welcome to Xblog</h1>
          <p className="text-xl sm:text-5xl font-medium tracking-tighter mb-2 sm:mb-4">
            -Your Gateway to Insightful Content
          </p>
          <p className="font-slab text-lg mb-2 sm:mb-4">Discover. Create. Connect.</p>
          <p className="text-base w-[90vw] sm:text-lg sm:w-[60vw] text-center text-gray-500">
            "Xblog is more than just a blogging platform; it’s a community where
            ideas flourish and connections are made. Whether you’re here to read
            thought-provoking articles, share your expertise, or find
            inspiration, Xblog offers a space for everyone to grow and engage."
          </p>
        </div>
        <div className="w-full h-fit flex justify-center  ">
          <div className="flex flex-wrap justify-center gap-8 mt-12 w-[80vw] mx-auto">
            {cardData.map((card, index) => (
              <Card
                key={index}
                heading={card.heading}
                content={card.content}
                buttonTitle={card.buttonTitle}
                buttonOnclick={card.buttonOnclick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
