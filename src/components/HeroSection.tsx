import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  showButtons?: boolean;
  customContent?: React.ReactNode;
  backgroundImage?: string;
  className?: string;
}

const HeroSection = ({
  title,
  subtitle,
  showButtons = true,
  customContent,
  backgroundImage,
  className = "",
}: HeroSectionProps) => {
  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(rgba(7, 19, 3, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    : {};

  return (
    <section
      className={`relative min-h-screen flex items-center ${
        backgroundImage ? "text-white" : "bg-gradient-to-b from-primary-50 to-white"
      } ${className}`}
      style={backgroundStyle}
    >
      <div className="w-full px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl mb-10 leading-relaxed">
              {subtitle}
            </p>
          )}

          {showButtons && (
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-primary-500 hover:bg-primary-600 text-white px-8"
                >
                  Register as Guest
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 border-2"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          )}

          {customContent && <div className="mt-8">{customContent}</div>}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
