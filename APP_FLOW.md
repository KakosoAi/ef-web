Application Overview & Flow

This document provides a high-level overview of the EF Web application, a comprehensive marketplace for heavy equipment such as excavators, trucks, and cranes.

User Section Public Website
This is the public-facing platform accessible to buyers, sellers, and general visitors.

1. Home Page: The landing page features a central search bar allowing users to quickly find machinery.
2. Search: Users can search for specific equipment e.g. excavator and filter results by brand, category, or other specifications. (Path: /search)
3. Equipments: A browsing section allowing users to explore inventory by industry type, such as Construction or Farming. (Path: /equipments)
4. Details: Detailed product pages displaying photos, pricing, technical specifications, and descriptions. (Path: /products/[type]/[slug]/[id])
5. Inquiry: Interested buyers can send messages directly to sellers. These conversations are managed in the Inquiry Board. (Path: /inquiry-board)
6. Stores: Dedicated profiles for vendors/sellers, showcasing their full inventory and company information. (Path: /store)
7. Post Ad: The interface for Vendors to list new machinery for sale. (Path: /post-ad)
8. News: A content hub for industry guides, blogs, and news updates. (Path: /news)

Admin Section Backend Management
Restricted access area for internal staff to manage platform operations.

1. Dashboard: Provides an analytics overview with key metrics such as total users and active listings. (Path: /admin/dashboard)
2. Catalog Management: Tools to manage the structured data used in search filters.
   Categories: Manage equipment types e.g. Excavators, Loaders. (Path: /admin/catalog/categories)
   Brands: Manage manufacturers e.g. Caterpillar, Komatsu. (Path: /admin/catalog/brands)
   Models: Manage specific machine models e.g. 320D. (Path: /admin/catalog/models)
   Engines: Manage engine types and specifications. (Path: /admin/catalog/engines)
3. Ads Management: Interface to review, approve, or reject vendor listings to ensure quality. (Path: /admin/ads)
4. Inquiries: Monitor the communication flow between buyers and sellers. (Path: /admin/inquiries)
5. Stores: Administrative tools to manage vendor accounts and store profiles. (Path: /admin/stores)
6. Blogs: Content management system for creating and editing articles for the News section. (Path: /admin/blogs)

User Roles & Permissions
The application defines specific roles to manage access and responsibilities.

1. Super Manager: Complete system access with full administrative control.
2. SEO: Focused on optimizing site content and improving search engine rankings.
3. Accountant: Manages financial records, payments, and transaction verification.
4. Manager: Oversees team operations and general staff management.
5. Admin: Handles day-to-day operations, including catalog updates and ad moderation.
6. Vendor: Sellers who can list products, manage their inventory, and customize their store profile.
7. Customer: Buyers who use the platform to search for equipment and contact sellers.

Current Status & Missing Features
The application is currently under active development.

Some admin pages are in the early stages of implementation.
The Post Ad workflow for vendors requires further refinement.
Role-based permissions are currently being finalized and applied across the platform.
