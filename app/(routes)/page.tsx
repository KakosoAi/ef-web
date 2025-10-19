import { PopularBrands } from '@/features/brands';
import CategoriesServer from '@/features/categories/components/CategoriesServer';
import BrowseListingsBanner from '@/features/equipment/components/BrowseListingsBanner';
import EquipmentDetail from '@/features/equipment/components/EquipmentDetail';
import FeaturedEquipment from '@/features/equipment/components/FeaturedEquipment';
import TopEquipmentForSale from '@/features/equipment/components/TopEquipmentForSale';
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
        {/* 1. Hero Section */}
        <HomeClient />

        {/* 2. Categories Section */}
        <CategoriesServer />

        {/* 3. Trusted Equipment Rental & Sales Platform - Informational content */}
        <div className='py-8 bg-gray-50 mt-8'>
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
        </div>

        {/* 4. Featured Equipment - Showcase section */}
        <FeaturedEquipment websiteMode={'general'} />

        {/* 5. Top Equipment For Sale - Now positioned right after Featured Equipment */}
        <TopEquipmentForSale websiteMode={'general'} />

        {/* 6. Popular Testimonials - Customer reviews */}
        <TestimonialsSection
          title='What Our Customers Say'
          description='Trusted by thousands of construction professionals across the Middle East'
          testimonials={[
            {
              author: {
                name: 'Ahmed Al-Rashid',
                title: 'Construction Manager',
                company: 'Dubai Construction Co.',
                avatar: '/api/placeholder/40/40',
              },
              text: 'Equipment Finders helped us find the perfect excavator for our project. The process was smooth and the equipment quality exceeded our expectations.',
              href: '#',
            },
            {
              author: {
                name: 'Sarah Johnson',
                title: 'Project Director',
                company: 'Gulf Infrastructure',
                avatar: '/api/placeholder/40/40',
              },
              text: "Outstanding service and reliable equipment. We've been using their platform for over 2 years and never had any issues.",
              href: '#',
            },
            {
              author: {
                name: 'Mohammed Hassan',
                title: 'Site Engineer',
                company: 'Emirates Heavy Works',
                avatar: '/api/placeholder/40/40',
              },
              text: 'The variety of equipment and competitive pricing makes this our go-to platform for all heavy machinery needs.',
              href: '#',
            },
          ]}
        />

        {/* 7. Popular Brands - Brand showcase */}
        <PopularBrands websiteMode={'general'} />

        {/* 8. Banners - Marketing banners at the bottom */}
        <div className='py-8 bg-white'>
          <BrowseListingsBanner />
        </div>

        <div className='py-8 bg-gray-50'>
          <BannerIraqConstruct />
        </div>
      </main>
      <Footer />
    </div>
  );
}
