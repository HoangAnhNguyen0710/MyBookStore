import { Footer } from "@/components/Layouts/Footer";
import { Navbar } from "@/components/Layouts/NavBar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <Navbar />
      <div className="">{children}</div>
      <Footer />
    </div>
  );
}
