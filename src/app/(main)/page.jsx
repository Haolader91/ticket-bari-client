import Banner from "@/components/Banner";
import FeaturedTickets from "@/components/FeaturedCard";
import LatestTickets from "@/components/LatestTickets";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import WhyChoose from "@/components/WhyChoose";

export default function Home() {
  return (
    <div>
      <Banner />
      <LatestTickets />
      <FeaturedTickets />
      <WhyChoose />
      <Stats />
      <Testimonials />
    </div>
  );
}
