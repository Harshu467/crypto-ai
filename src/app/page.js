import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import Why_Use from "@/components/Why_Use/Why_Use";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />  
      <Why_Use /> 
      <Footer />
    </div>
  );
}
