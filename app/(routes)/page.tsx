import { PopularBrands } from '@/features/brands';
import CategoriesServer from '@/features/categories/components/CategoriesServer';
import BrowseListingsBanner from '@/features/equipment/components/BrowseListingsBanner';
import EquipmentDetail from '@/features/equipment/components/EquipmentDetail';
import FeaturedEquipment from '@/features/equipment/components/FeaturedEquipment';
import Footer from '@/features/layout/components/Footer';
import Header from '@/features/layout/components/Header';
import { BannerIraqConstruct } from '@/features/layout/components/BannerIraqConstruct';
import { TestimonialsSection } from '@/shared/ui/testimonials-with-marquee';
import HomeClient from '@/features/home/components/HomeClient';

export default function HomePage() {
  return (
    <div className='min-h-screen bg-background'>
      <Header />
      <main>
        <HomeClient />
        <CategoriesServer />

        {/* SEO Content Block 1 - After Categories */}
        {/* This block is now inside HomeClient */}

        <div className='py-8 bg-gray-50'>
          <FeaturedEquipment websiteMode={'general'} />
        </div>

        <div className='py-12 mt-16 md:mt-20 lg:mt-24 bg-white'>
          <BrowseListingsBanner />
        </div>

        {/* SEO Content Block 2 - Before Top Equipment */}
        <div className='py-8 bg-white mt-16 md:mt-20 lg:mt-24'>
          <div className='container mx-auto px-6 text-center'>
            <div className='max-w-4xl mx-auto'>
              <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>
                Trusted Equipment Rental & Sales Platform
              </h2>
              <p className='text-lg text-gray-600 leading-relaxed'>
                Whether you&apos;re looking to buy or rent construction equipment, our comprehensive
                marketplace offers competitive pricing, detailed specifications, and direct dealer
                contact. From small contractors to large construction companies, Equipment Finders
                serves as your reliable partner for all heavy machinery requirements in the Middle
                East region.
              </p>
            </div>
          </div>

          {/* Keep TopEquipmentForSale and other client sections in HomeClient if they use hooks */}
        </div>
      </main>
      <Footer />
    </div>
  );
}
