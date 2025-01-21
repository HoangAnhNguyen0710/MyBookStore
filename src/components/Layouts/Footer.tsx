import Link from "next/link";
import { Typography } from "@mui/material";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white text-xl py-8 mt-10">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center mb-4">
        <Link
          href="/"
          className="text-nowrap mr-2 flex flex-grow font-mono font-bold text-inherit text-3xl max-w-fit"
        >
          LOGO
        </Link>
        </div>
        <div className="flex justify-center space-x-6 mb-4">
          <Link href="/" className="hover:text-gray-400">
            <Typography variant="h5" className="hover:text-gray-400">
              Home
            </Typography>
          </Link>
          <Link href="/about" className="hover:text-gray-400">
            <Typography variant="h5" className="hover:text-gray-400">
              About
            </Typography>
          </Link>
          <Link href="/contact" className="hover:text-gray-400">
            <Typography variant="h5" className="hover:text-gray-400">
              Contact
            </Typography>
          </Link>
        </div>
        <Typography variant="h5" className="text-xl">
          © {new Date().getFullYear()} MyWebsite. All rights reserved.
        </Typography>
      </div>
    </footer>
  );
};
