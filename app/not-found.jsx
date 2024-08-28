import Link from "next/link";

// export const metadata = {
//   title: 'Page Not Found - XBlog',
//   description: 'Sorry, the page you are looking for does not exist. Please check the URL or return to the homepage.',
//   robots: {
//     index: false,
//     follow: true,
//   },
// };

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-6">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="mb-4 text-center font-robo">
        Sorry, the page you are looking for does not exist. It might have been
        moved or deleted.
      </p>
      <div className="mb-6 text-center font-robo">
        Please check the URL or return to the{" "}
          <div className="font-robo">homepage</div>
        .
      </div>
      <div className="mt-6">
        <Link href="/">
          <div className="text-lg font-medium text-white bg-black font-robo px-6 py-3 rounded-full transition-colors duration-200">
            Go Back to Homepage
          </div>
        </Link>
      </div>
    </div>
  );
}
