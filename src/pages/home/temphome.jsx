import HeroCarousel from "../../components/Home/carousel/HeroCarousel";
import DiscountSection from "../../components/Home/Discount/DiscountSection";
import Features from "../../components/Home/features";
import ReviewPerson from "../../components/Home/Review/ReviewPerson";
import Service from "../../components/ServicesSS/Service";



const Home = () => {
  return (
    <div>
      {/* <Hero /> */}
    <HeroCarousel/>
    <Features/>
    <Service/>
    <ReviewPerson/>
    <DiscountSection/>
    </div>
  );
};

export default Home;
