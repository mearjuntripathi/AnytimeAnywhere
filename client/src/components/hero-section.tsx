import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function HeroSection() {
  const [, setLocation] = useLocation();

  const scrollToCurriculum = () => {
    const element = document.getElementById('curriculum');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-hero text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            RTPR AI PathShala
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Expert AI/ML career support with IIT alumni and top professionals from Google, Jio, IISc Bangalore, and leading research institutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
              onClick={scrollToCurriculum}
            >
              Start Learning
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg font-semibold"
              onClick={scrollToCurriculum}
            >
              Explore Curriculum
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
