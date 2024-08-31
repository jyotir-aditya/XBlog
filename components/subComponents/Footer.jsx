import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="w-full h-[10vh] my-4 flex justify-center items-center rounded-xl border">
        <div className="LinkStructure p-2 flex gap-x-4 gap-y-2 flex-wrap ">
          <Link href={"/legal/tos"}><div className="hover:underline">Terms of Service</div></Link>
          <Link href={"/legal/privacy"}><div className="hover:underline"> Privacy Policy</div></Link>
          <Link href={"/legal/cookie"}><div className="hover:underline">Cookie Policy</div></Link>
          {/* <div className="hover:underline">Accessibility</div> */}
          <Link href={"/legal/ads&promotion"}><div className="hover:underline">Ads info</div></Link>
          <Link href={"/posts/all"}><div className="hover:underline">Posts</div></Link>
          <div className="cursor-default">© 2024 X Blog.</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
