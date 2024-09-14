import { Box } from "@mui/material";

import AssociatedBanks from "../Section/AssociatesBanks/NetworkBanks";
import WhyChooseUs from "../Section/whyChooseUs/whyChooseUs";
import HeroSection from "./hero";
import EducationLoanSolutions from "./services";
import CustomerSupport from "./support";
import TestimonialsSection from "./testimonal";
import CtaSection from "./ctaSection";

const CarouselComponent = () => {
  return (
    <Box sx={{ backgroundColor: "#f0f4f8" }}>
      <HeroSection />
      {/* Loan Types Section */}
      <EducationLoanSolutions />
      {/* Why Choose Us Section */}
      <WhyChooseUs />
      {/* Customer Support Section */}
      <CustomerSupport />
      {/* Testimonials Section */}
      <TestimonialsSection />
      {/* Associated Banks */}
      <AssociatedBanks />
      {/* CTA Section */}
      <CtaSection />
    </Box>
  );
};

export default CarouselComponent;
