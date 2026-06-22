import Banner from "@/components/Banner";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import WhyChoose from "@/components/WhyChoose";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner />
      <WhyChoose />
      <Stats />
      <Testimonials />
    </div>
  );
}
