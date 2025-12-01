'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Building2,
  Truck,
  Wrench,
  Users,
  Phone,
  Mail,
  Heart,
  User,
  Menu,
  X,
  Construction,
  Hammer,
  Star,
  Newspaper,
} from 'lucide-react';
import {
  CaterpillarIcon,
  JCBIcon,
  KomatsuIcon,
  VolvoIcon,
  LiebherrIcon,
  HitachiIcon,
  HyundaiIcon,
  CaseIcon,
  BobcatIcon,
  MercedesIcon,
  MitsubishiIcon,
  XCMGIcon,
  TadanoIcon,
  SanyIcon,
  JohnDeereIcon,
  ManitouIcon,
  TerexIcon,
  JLGIcon,
} from '@/shared/ui/brand-icons';

import {
  NavigationMenu as NavigationMenuPrimitive,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavGridCard,
  NavSmallItem,
  NavLargeItem,
  NavItemMobile,
  type NavItemType,
} from '@/shared/ui/navigation-menu';
import { Button } from '@/shared/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/shared/ui/sheet';
import { cn } from '@/shared/lib/utils';

// Equipment links for Buy Equipment dropdown
const equipmentLinks: NavItemType[] = [
  // Categories
  {
    title: 'Crane',
    href: '/equipments/buy/brands/cranes',
    description: 'Tower cranes, mobile cranes, and lifting equipment',
    icon: Building2,
  },
  {
    title: 'Wheel Loader',
    href: '/equipments/buy/brands/wheel-loader',
    description: 'Heavy-duty wheel loaders for material handling',
    icon: Hammer,
  },
  {
    title: 'JCB Backhoe',
    href: '/equipments/buy/brands/jcb-backhoe',
    description: 'JCB backhoe loaders for construction',
    icon: Construction,
  },
  {
    title: 'Forklift',
    href: '/equipments/buy/brands/forklift',
    description: 'Industrial forklifts and material handling equipment',
    icon: Truck,
  },
  {
    title: 'Tipper Truck',
    href: '/equipments/buy/brands/tipper-truck',
    description: 'Heavy-duty tipper trucks for transportation',
    icon: Truck,
  },
  {
    title: 'Boom Loader',
    href: '/equipments/buy/brands/boom-loader',
    description: 'Boom loaders for lifting and loading operations',
    icon: Hammer,
  },
  {
    title: 'Motor Grader',
    href: '/equipments/buy/brands/motor-grader',
    description: 'Motor graders for road construction and maintenance',
    icon: Construction,
  },
  // Locations
  {
    title: 'Dubai',
    href: '/equipments/buy?location=dubai',
    description: 'Equipment for sale in Dubai',
    icon: Building2,
  },
  {
    title: 'Abu Dhabi',
    href: '/equipments/buy?location=abu-dhabi',
    description: 'Equipment for sale in Abu Dhabi',
    icon: Building2,
  },
  {
    title: 'Sharjah',
    href: '/equipments/buy?location=sharjah',
    description: 'Equipment for sale in Sharjah',
    icon: Building2,
  },
  {
    title: 'Ajman',
    href: '/equipments/buy?location=ajman',
    description: 'Equipment for sale in Ajman',
    icon: Building2,
  },
  {
    title: 'Fujairah',
    href: '/equipments/buy?location=fujairah',
    description: 'Equipment for sale in Fujairah',
    icon: Building2,
  },
  {
    title: 'Ras al-Khaimah',
    href: '/equipments/buy?location=ras-al-khaimah',
    description: 'Equipment for sale in Ras al-Khaimah',
    icon: Building2,
  },
  {
    title: 'Umm al-Quwain',
    href: '/equipments/buy?location=umm-al-quwain',
    description: 'Equipment for sale in Umm al-Quwain',
    icon: Building2,
  },
  // New Machines Section
  {
    title: 'New Machines',
    href: '/equipments/buy?condition=new',
    description: 'Brand new construction and industrial machines',
    icon: Star,
  },
  {
    title: 'Attachments',
    href: '/equipments/buy/brands/attachments',
    description: 'Equipment attachments and accessories',
    icon: Wrench,
  },
  {
    title: 'Spare Parts',
    href: '/equipments/buy/brands/spare-parts',
    description: 'Genuine spare parts for all equipment',
    icon: Wrench,
  },
  {
    title: 'Lifting Equipment',
    href: '/equipments/buy/brands/lifting-equipment',
    description: 'Cranes, hoists, and lifting solutions',
    icon: Building2,
  },
  {
    title: 'Excavators',
    href: '/equipments/buy/brands/excavators',
    description: 'Heavy-duty excavators for construction and mining',
    icon: Construction,
  },
  {
    title: 'Generators',
    href: '/equipments/buy/brands/generators',
    description: 'Power generators and electrical equipment',
    icon: Construction,
  },
  {
    title: 'Trailers',
    href: '/equipments/buy/brands/trailers',
    description: 'Heavy-duty trailers for transportation',
    icon: Truck,
  },
  {
    title: 'Cranes',
    href: '/equipments/buy/brands/cranes',
    description: 'All types of cranes and lifting equipment',
    icon: Building2,
  },
];

// Rental links for Rent Equipment dropdown
const rentalLinks: NavItemType[] = [
  // Categories
  {
    title: 'Crane',
    href: '/equipments/rent?category=crane',
    description: 'Professional crane rental services',
    icon: Building2,
  },
  {
    title: 'Wheel Loader',
    href: '/equipments/rent?category=wheel-loader',
    description: 'Wheel loader rentals for material handling',
    icon: Hammer,
  },
  {
    title: 'Excavator',
    href: '/equipments/rent?category=excavator',
    description: 'Short and long-term excavator rentals',
    icon: Construction,
  },
  {
    title: 'Forklift',
    href: '/equipments/rent?category=forklift',
    description: 'Industrial forklift rental services',
    icon: Truck,
  },
  {
    title: 'Boom loader',
    href: '/equipments/rent?category=boom-loader',
    description: 'Boom loader rentals for lifting operations',
    icon: Hammer,
  },
  {
    title: 'Motor Grader',
    href: '/equipments/rent?category=motor-grader',
    description: 'Motor grader rentals for road construction',
    icon: Construction,
  },
  {
    title: 'Road Roller',
    href: '/equipments/rent?category=road-roller',
    description: 'Road roller rentals for compaction work',
    icon: Construction,
  },
  // Locations
  {
    title: 'Dubai',
    href: '/equipments/rent?location=dubai',
    description: 'Equipment rentals in Dubai',
    icon: Building2,
  },
  {
    title: 'Abu Dhabi',
    href: '/equipments/rent?location=abu-dhabi',
    description: 'Equipment rentals in Abu Dhabi',
    icon: Building2,
  },
  {
    title: 'Sharjah',
    href: '/equipments/rent?location=sharjah',
    description: 'Equipment rentals in Sharjah',
    icon: Building2,
  },
  {
    title: 'Ajman',
    href: '/equipments/rent?location=ajman',
    description: 'Equipment rentals in Ajman',
    icon: Building2,
  },
  {
    title: 'Fujeirah',
    href: '/equipments/rent?location=fujeirah',
    description: 'Equipment rentals in Fujeirah',
    icon: Building2,
  },
  {
    title: 'Ras al-Khaimah',
    href: '/equipments/rent?location=ras-al-khaimah',
    description: 'Equipment rentals in Ras al-Khaimah',
    icon: Building2,
  },
  {
    title: 'Umm al-Quwain',
    href: '/equipments/rent?location=umm-al-quwain',
    description: 'Equipment rentals in Umm al-Quwain',
    icon: Building2,
  },
  // Industries
  {
    title: 'Construction',
    href: '/equipments/rent?industry=construction',
    description: 'Construction equipment rentals',
    icon: Construction,
  },
  {
    title: 'Material Handling Equipment',
    href: '/equipments/rent?industry=material-handling',
    description: 'Material handling equipment rentals',
    icon: Truck,
  },
  {
    title: 'Mining And Quarry Equipment',
    href: '/equipments/rent?industry=mining-quarry',
    description: 'Mining and quarry equipment rentals',
    icon: Hammer,
  },
  {
    title: 'Agriculture',
    href: '/equipments/rent?industry=agriculture',
    description: 'Agricultural equipment rentals',
    icon: Star,
  },
  {
    title: 'All Equipment',
    href: '/equipments/rent',
    description: 'Browse all available equipment for rent',
    icon: Wrench,
  },
];

// Brand links for Rent Equipment dropdown
const rentBrandLinks: NavItemType[] = [
  {
    title: 'Caterpillar',
    href: '/equipments/rent?q=caterpillar',
    description: 'Heavy machinery and construction equipment',
    icon: CaterpillarIcon,
  },
  {
    title: 'JCB',
    href: '/equipments/rent?q=jcb',
    description: 'Excavators, loaders, and construction equipment',
    icon: JCBIcon,
  },
  {
    title: 'Volvo',
    href: '/equipments/rent?q=volvo',
    description: 'Construction equipment and heavy machinery',
    icon: VolvoIcon,
  },
  {
    title: 'Komatsu',
    href: '/equipments/rent?q=komatsu',
    description: 'Mining and construction equipment',
    icon: KomatsuIcon,
  },
  {
    title: 'Liebherr',
    href: '/equipments/rent?q=liebherr',
    description: 'Cranes, excavators, and heavy equipment',
    icon: LiebherrIcon,
  },
  {
    title: 'JLG',
    href: '/equipments/rent?q=jlg',
    description: 'Aerial work platforms and lifts',
    icon: JLGIcon,
  },
  {
    title: 'Hyundai',
    href: '/equipments/rent?q=hyundai',
    description: 'Construction and heavy equipment',
    icon: HyundaiIcon,
  },
  {
    title: 'Bobcat',
    href: '/equipments/rent?q=bobcat',
    description: 'Compact equipment and skid steers',
    icon: BobcatIcon,
  },
  {
    title: 'Mercedes',
    href: '/equipments/rent?q=mercedes',
    description: 'Commercial vehicles and trucks',
    icon: MercedesIcon,
  },
  {
    title: 'Mitsubishi',
    href: '/equipments/rent?q=mitsubishi',
    description: 'Industrial equipment and machinery',
    icon: MitsubishiIcon,
  },
  {
    title: 'XCMG',
    href: '/equipments/rent?q=xcmg',
    description: 'Construction machinery and equipment',
    icon: XCMGIcon,
  },
  {
    title: 'Tadano',
    href: '/equipments/rent?q=tadano',
    description: 'Mobile cranes and lifting equipment',
    icon: TadanoIcon,
  },
  {
    title: 'Sany',
    href: '/equipments/rent?q=sany',
    description: 'Heavy machinery and construction equipment',
    icon: SanyIcon,
  },
  {
    title: 'Terex',
    href: '/equipments/rent?q=terex',
    description: 'Aerial work platforms and cranes',
    icon: TerexIcon,
  },
  {
    title: 'Generac',
    href: '/equipments/rent?q=generac',
    description: 'Power generation equipment',
    icon: Star,
  },
  {
    title: 'Toyota',
    href: '/equipments/rent?q=toyota',
    description: 'Industrial vehicles and forklifts',
    icon: Star,
  },
  {
    title: 'Kato',
    href: '/equipments/rent?q=kato',
    description: 'Mobile cranes and construction equipment',
    icon: Star,
  },
  {
    title: 'Zoomlion',
    href: '/equipments/rent?q=zoomlion',
    description: 'Construction machinery and equipment',
    icon: Star,
  },
  {
    title: 'Perkins',
    href: '/equipments/rent?q=perkins',
    description: 'Diesel engines and power solutions',
    icon: Star,
  },
  {
    title: 'Demag',
    href: '/equipments/rent?q=demag',
    description: 'Mobile cranes and lifting equipment',
    icon: Star,
  },
  {
    title: 'Dynapac',
    href: '/equipments/rent?q=dynapac',
    description: 'Road construction equipment',
    icon: Star,
  },
  {
    title: 'Doosan',
    href: '/equipments/rent?q=doosan',
    description: 'Construction and industrial equipment',
    icon: Star,
  },
  {
    title: 'Atlas',
    href: '/equipments/rent?q=atlas',
    description: 'Construction and mining equipment',
    icon: Star,
  },
  {
    title: 'Kobelco',
    href: '/equipments/rent?q=kobelco',
    description: 'Excavators and construction machinery',
    icon: Star,
  },
  {
    title: 'Fuso',
    href: '/equipments/rent?q=fuso',
    description: 'Commercial trucks and vehicles',
    icon: Star,
  },
  {
    title: 'MAN',
    href: '/equipments/rent?q=man',
    description: 'Commercial vehicles and trucks',
    icon: Star,
  },
  {
    title: 'Heli',
    href: '/equipments/rent?q=heli',
    description: 'Forklifts and material handling equipment',
    icon: Star,
  },
  {
    title: 'Hino',
    href: '/equipments/rent?q=hino',
    description: 'Commercial trucks and vehicles',
    icon: Star,
  },
  {
    title: 'Skyjack',
    href: '/equipments/rent?q=skyjack',
    description: 'Aerial work platforms and lifts',
    icon: Star,
  },
  {
    title: 'Isuzu',
    href: '/equipments/rent?q=isuzu',
    description: 'Commercial trucks and vehicles',
    icon: Star,
  },
  {
    title: 'Case',
    href: '/equipments/rent?q=case',
    description: 'Construction equipment and machinery',
    icon: CaseIcon,
  },
  {
    title: 'Haulotte',
    href: '/equipments/rent?q=haulotte',
    description: 'Aerial work platforms and lifts',
    icon: Star,
  },
  {
    title: 'Nissan',
    href: '/equipments/rent?q=nissan',
    description: 'Commercial vehicles and forklifts',
    icon: Star,
  },
  {
    title: 'Atlas Copco',
    href: '/equipments/rent?q=atlas-copco',
    description: 'Compressors and industrial equipment',
    icon: Star,
  },
  {
    title: 'Cummins',
    href: '/equipments/rent?q=cummins',
    description: 'Diesel engines and power generation',
    icon: Star,
  },
  {
    title: 'Bomag',
    href: '/equipments/rent?q=bomag',
    description: 'Road construction and compaction equipment',
    icon: Star,
  },
  {
    title: 'Hitachi',
    href: '/equipments/rent?q=hitachi',
    description: 'Construction and mining equipment',
    icon: Star,
  },
  {
    title: 'Daewoo',
    href: '/equipments/rent?q=daewoo',
    description: 'Construction and industrial equipment',
    icon: Star,
  },
  {
    title: 'Sandvik',
    href: '/equipments/rent?q=sandvik',
    description: 'Mining and construction equipment',
    icon: Star,
  },
  {
    title: 'Metso',
    href: '/equipments/rent?q=metso',
    description: 'Mining and aggregates equipment',
    icon: Star,
  },
  {
    title: 'Kubota',
    href: '/equipments/rent?q=kubota',
    description: 'Construction and agricultural equipment',
    icon: Star,
  },
  {
    title: 'Liugong',
    href: '/equipments/rent?q=liugong',
    description: 'Construction machinery and equipment',
    icon: Star,
  },
  {
    title: 'Astec',
    href: '/equipments/rent?q=astec',
    description: 'Aggregate and mining equipment',
    icon: Star,
  },
  {
    title: 'IHI',
    href: '/equipments/rent?q=ihi',
    description: 'Construction and industrial equipment',
    icon: Star,
  },
  {
    title: 'Champion',
    href: '/equipments/rent?q=champion',
    description: 'Road construction equipment',
    icon: Star,
  },
  {
    title: 'Sumitomo',
    href: '/equipments/rent?q=sumitomo',
    description: 'Excavators and construction equipment',
    icon: Star,
  },
  {
    title: 'Hamm',
    href: '/equipments/rent?q=hamm',
    description: 'Road construction and compaction equipment',
    icon: Star,
  },
  {
    title: 'Miller',
    href: '/equipments/rent?q=miller',
    description: 'Welding and industrial equipment',
    icon: Star,
  },
  {
    title: 'New Holland',
    href: '/equipments/rent?q=new-holland',
    description: 'Agricultural and construction equipment',
    icon: Star,
  },
  {
    title: 'Wacker',
    href: '/equipments/rent?q=wacker',
    description: 'Compaction and construction equipment',
    icon: Star,
  },
  {
    title: 'Grove',
    href: '/equipments/rent?q=grove',
    description: 'Mobile cranes and lifting equipment',
    icon: Star,
  },
  {
    title: 'Manitou',
    href: '/equipments/rent?q=manitou',
    description: 'Material handling and telehandlers',
    icon: Star,
  },
  {
    title: 'Linnhoff',
    href: '/equipments/rent?q=linnhoff',
    description: 'Trailers and transport equipment',
    icon: Star,
  },
  {
    title: 'Yanmar',
    href: '/equipments/rent?q=yanmar',
    description: 'Compact construction equipment',
    icon: Star,
  },
  {
    title: 'Ford',
    href: '/equipments/rent?q=ford',
    description: 'Commercial vehicles and trucks',
    icon: Star,
  },
  {
    title: 'Genie',
    href: '/equipments/rent?q=genie',
    description: 'Aerial work platforms and lifts',
    icon: Star,
  },
  {
    title: 'Manitowoc',
    href: '/equipments/rent?q=manitowoc',
    description: 'Cranes and lifting equipment',
    icon: Star,
  },
  {
    title: 'JAC',
    href: '/equipments/rent?q=jac',
    description: 'Commercial vehicles and trucks',
    icon: Star,
  },
  {
    title: 'Scania',
    href: '/equipments/rent?q=scania',
    description: 'Heavy-duty trucks and vehicles',
    icon: Star,
  },
  {
    title: 'Pramac',
    href: '/equipments/rent?q=pramac',
    description: 'Power generation equipment',
    icon: Star,
  },
];

// Brand links for Buy Equipment dropdown
const buyBrandLinks: NavItemType[] = [
  {
    title: 'Volvo',
    href: '/equipments/sale?q=volvo',
    description: 'Construction equipment and heavy machinery',
    icon: VolvoIcon,
  },
  {
    title: 'Caterpillar',
    href: '/equipments/sale?q=caterpillar',
    description: 'Heavy machinery and construction equipment',
    icon: CaterpillarIcon,
  },
  {
    title: 'Komatsu',
    href: '/equipments/sale?q=komatsu',
    description: 'Mining and construction equipment',
    icon: KomatsuIcon,
  },
  {
    title: 'JCB',
    href: '/equipments/sale?q=jcb',
    description: 'Excavators, loaders, and construction equipment',
    icon: JCBIcon,
  },
  {
    title: 'Mercedes',
    href: '/equipments/sale?q=mercedes',
    description: 'Commercial vehicles and trucks',
    icon: MercedesIcon,
  },
  {
    title: 'Hyundai',
    href: '/equipments/sale?q=hyundai',
    description: 'Construction and heavy equipment',
    icon: HyundaiIcon,
  },
  {
    title: 'Sany',
    href: '/equipments/sale?q=sany',
    description: 'Heavy machinery and construction equipment',
    icon: SanyIcon,
  },
  {
    title: 'XCMG',
    href: '/equipments/sale?q=xcmg',
    description: 'Construction machinery and equipment',
    icon: XCMGIcon,
  },
  {
    title: 'Bobcat',
    href: '/equipments/sale?q=bobcat',
    description: 'Compact equipment and skid steers',
    icon: BobcatIcon,
  },
  {
    title: 'Toyota',
    href: '/equipments/sale?q=toyota',
    description: 'Industrial vehicles and forklifts',
    icon: Star,
  },
  {
    title: 'Kato',
    href: '/equipments/sale?q=kato',
    description: 'Mobile cranes and construction equipment',
    icon: Star,
  },
  {
    title: 'Doosan',
    href: '/equipments/sale?q=doosan',
    description: 'Construction and industrial equipment',
    icon: Star,
  },
  {
    title: 'MAN',
    href: '/equipments/sale?q=man',
    description: 'Commercial vehicles and trucks',
    icon: Star,
  },
  {
    title: 'Hino',
    href: '/equipments/sale?q=hino',
    description: 'Commercial trucks and vehicles',
    icon: Star,
  },
  {
    title: 'Tadano',
    href: '/equipments/sale?q=tadano',
    description: 'Mobile cranes and lifting equipment',
    icon: TadanoIcon,
  },
  {
    title: 'Westinpower',
    href: '/equipments/sale?q=westinpower',
    description: 'Power generation equipment',
    icon: Star,
  },
  {
    title: 'Mitsubishi',
    href: '/equipments/sale?q=mitsubishi',
    description: 'Industrial equipment and machinery',
    icon: MitsubishiIcon,
  },
  {
    title: 'Zoomlion',
    href: '/equipments/sale?q=zoomlion',
    description: 'Construction machinery and equipment',
    icon: Star,
  },
  {
    title: 'Terex',
    href: '/equipments/sale?q=terex',
    description: 'Aerial work platforms and cranes',
    icon: TerexIcon,
  },
  {
    title: 'Kobelco',
    href: '/equipments/sale?q=kobelco',
    description: 'Excavators and construction machinery',
    icon: Star,
  },
  {
    title: 'Kubota',
    href: '/equipments/sale?q=kubota',
    description: 'Construction and agricultural equipment',
    icon: Star,
  },
  {
    title: 'Perkins',
    href: '/equipments/sale?q=perkins',
    description: 'Diesel engines and power solutions',
    icon: Star,
  },
  {
    title: 'Scania',
    href: '/equipments/sale?q=scania',
    description: 'Heavy-duty trucks and vehicles',
    icon: Star,
  },
  {
    title: 'Dynapac',
    href: '/equipments/sale?q=dynapac',
    description: 'Road construction equipment',
    icon: Star,
  },
  {
    title: 'Bomag',
    href: '/equipments/sale?q=bomag',
    description: 'Road construction and compaction equipment',
    icon: Star,
  },
  {
    title: 'JLG',
    href: '/equipments/sale?q=jlg',
    description: 'Aerial work platforms and lifts',
    icon: JLGIcon,
  },
  {
    title: 'Case',
    href: '/equipments/sale?q=case',
    description: 'Construction equipment and machinery',
    icon: CaseIcon,
  },
  {
    title: 'Metso',
    href: '/equipments/sale?q=metso',
    description: 'Mining and aggregates equipment',
    icon: Star,
  },
  {
    title: 'Liebherr',
    href: '/equipments/sale?q=liebherr',
    description: 'Cranes, excavators, and heavy equipment',
    icon: LiebherrIcon,
  },
  {
    title: 'Hamm',
    href: '/equipments/sale?q=hamm',
    description: 'Road construction and compaction equipment',
    icon: Star,
  },
  {
    title: 'Komac',
    href: '/equipments/sale?q=komac',
    description: 'Hydraulic breakers and attachments',
    icon: Star,
  },
  {
    title: 'Liugong',
    href: '/equipments/sale?q=liugong',
    description: 'Construction machinery and equipment',
    icon: Star,
  },
  {
    title: 'Cummins',
    href: '/equipments/sale?q=cummins',
    description: 'Diesel engines and power generation',
    icon: Star,
  },
  {
    title: 'Generac',
    href: '/equipments/sale?q=generac',
    description: 'Power generation equipment',
    icon: Star,
  },
  {
    title: 'KMCO',
    href: '/equipments/sale?q=kmco',
    description: 'Construction and industrial equipment',
    icon: Star,
  },
  {
    title: 'John Deere',
    href: '/equipments/sale?q=john-deere',
    description: 'Agricultural and construction machinery',
    icon: JohnDeereIcon,
  },
  {
    title: 'Manitou',
    href: '/equipments/sale?q=manitou',
    description: 'Material handling and telehandlers',
    icon: ManitouIcon,
  },
  {
    title: 'Zoom',
    href: '/equipments/sale?q=zoom',
    description: 'Boom lifts and aerial platforms',
    icon: Star,
  },
  {
    title: 'Nissan',
    href: '/equipments/sale?q=nissan',
    description: 'Commercial vehicles and forklifts',
    icon: Star,
  },
  {
    title: 'Pramac',
    href: '/equipments/sale?q=pramac',
    description: 'Power generation equipment',
    icon: Star,
  },
  {
    title: 'Atlas',
    href: '/equipments/sale?q=atlas',
    description: 'Construction and mining equipment',
    icon: Star,
  },
  {
    title: 'Sakai',
    href: '/equipments/sale?q=sakai',
    description: 'Road construction and compaction equipment',
    icon: Star,
  },
  {
    title: 'Ashok Leyland',
    href: '/equipments/sale?q=ashok-leyland',
    description: 'Commercial vehicles and trucks',
    icon: Star,
  },
  {
    title: 'Grove',
    href: '/equipments/sale?q=grove',
    description: 'Mobile cranes and lifting equipment',
    icon: Star,
  },
  {
    title: 'Wirtgen',
    href: '/equipments/sale?q=wirtgen',
    description: 'Road construction and milling equipment',
    icon: Star,
  },
  {
    title: 'Astec',
    href: '/equipments/sale?q=astec',
    description: 'Aggregate and mining equipment',
    icon: Star,
  },
  {
    title: 'Vogele',
    href: '/equipments/sale?q=vogele',
    description: 'Road paving equipment',
    icon: Star,
  },
  {
    title: 'Iveco',
    href: '/equipments/sale?q=iveco',
    description: 'Commercial vehicles and trucks',
    icon: Star,
  },
  {
    title: 'Yanmar',
    href: '/equipments/sale?q=yanmar',
    description: 'Compact construction equipment',
    icon: Star,
  },
  {
    title: 'Dongfeng',
    href: '/equipments/sale?q=dongfeng',
    description: 'Commercial vehicles and trucks',
    icon: Star,
  },
  {
    title: 'Sumitomo',
    href: '/equipments/sale?q=sumitomo',
    description: 'Excavators and construction equipment',
    icon: Star,
  },
  {
    title: 'Lovol',
    href: '/equipments/sale?q=lovol',
    description: 'Construction and agricultural equipment',
    icon: Star,
  },
  {
    title: 'Heli',
    href: '/equipments/sale?q=heli',
    description: 'Forklifts and material handling equipment',
    icon: Star,
  },
  {
    title: 'Ford',
    href: '/equipments/sale?q=ford',
    description: 'Commercial vehicles and trucks',
    icon: Star,
  },
  {
    title: 'Daewoo',
    href: '/equipments/sale?q=daewoo',
    description: 'Construction and industrial equipment',
    icon: Star,
  },
  {
    title: 'Foton Motor',
    href: '/equipments/sale?q=foton-motor',
    description: 'Commercial vehicles and trucks',
    icon: Star,
  },
  {
    title: 'Gesan',
    href: '/equipments/sale?q=gesan',
    description: 'Power generation equipment',
    icon: Star,
  },
  {
    title: 'Shanmon',
    href: '/equipments/sale?q=shanmon',
    description: 'Construction and industrial equipment',
    icon: Star,
  },
  {
    title: 'Locatelli',
    href: '/equipments/sale?q=locatelli',
    description: 'Concrete mixers and construction equipment',
    icon: Star,
  },
  {
    title: 'Genie',
    href: '/equipments/sale?q=genie',
    description: 'Aerial work platforms and lifts',
    icon: Star,
  },
  {
    title: 'Haulotte',
    href: '/equipments/sale?q=haulotte',
    description: 'Aerial work platforms and lifts',
    icon: Star,
  },
  {
    title: 'Manitowoc',
    href: '/equipments/sale?q=manitowoc',
    description: 'Cranes and lifting equipment',
    icon: Star,
  },
  {
    title: 'New Holland',
    href: '/equipments/sale?q=new-holland',
    description: 'Agricultural and construction equipment',
    icon: Star,
  },
  {
    title: 'Oshkosh',
    href: '/equipments/sale?q=oshkosh',
    description: 'Specialty vehicles and equipment',
    icon: Star,
  },
  {
    title: 'Palfinger',
    href: '/equipments/sale?q=palfinger',
    description: 'Loading cranes and lifting solutions',
    icon: Star,
  },
  {
    title: 'Rammax',
    href: '/equipments/sale?q=rammax',
    description: 'Compaction equipment',
    icon: Star,
  },
  {
    title: 'Takeuchi',
    href: '/equipments/sale?q=takeuchi',
    description: 'Compact excavators and track loaders',
    icon: Star,
  },
  {
    title: 'Wacker',
    href: '/equipments/sale?q=wacker',
    description: 'Compaction and construction equipment',
    icon: Star,
  },
  {
    title: 'Isuzu',
    href: '/equipments/sale?q=isuzu',
    description: 'Commercial trucks and vehicles',
    icon: Star,
  },
  {
    title: 'Telsmith',
    href: '/equipments/sale?q=telsmith',
    description: 'Crushing and screening equipment',
    icon: Star,
  },
  {
    title: 'Nordberg',
    href: '/equipments/sale?q=nordberg',
    description: 'Crushing and screening equipment',
    icon: Star,
  },
  {
    title: 'Sayal',
    href: '/equipments/sale?q=sayal',
    description: 'Construction and industrial equipment',
    icon: Star,
  },
  {
    title: 'Linnhoff',
    href: '/equipments/sale?q=linnhoff',
    description: 'Trailers and transport equipment',
    icon: Star,
  },
  {
    title: 'Aebi Schmidt',
    href: '/equipments/sale?q=aebi-schmidt',
    description: 'Municipal and airport equipment',
    icon: Star,
  },
  {
    title: 'Sanyo',
    href: '/equipments/sale?q=sanyo',
    description: 'Industrial and construction equipment',
    icon: Star,
  },
  {
    title: 'Simplex',
    href: '/equipments/sale?q=simplex',
    description: 'Lifting and jacking equipment',
    icon: Star,
  },
];

// Legacy brand links (keeping for backward compatibility)
const brandLinks: NavItemType[] = [
  {
    title: 'All Brands',
    href: '/brands',
    description: 'Browse all brands',
    icon: Building2,
  },
];

// BrandsDropdown component with two sections
function BrandsDropdown() {
  const [activeTab, setActiveTab] = React.useState<'rent' | 'buy'>('rent');

  return (
    <div className='w-[800px] p-4'>
      {/* Tab buttons */}
      <div className='flex mb-4 border-b'>
        <button
          onClick={() => setActiveTab('rent')}
          className={cn(
            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
            activeTab === 'rent'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
        >
          Rent Brands
        </button>
        <button
          onClick={() => setActiveTab('buy')}
          className={cn(
            'px-4 py-2 text-sm font-medium border-b-2 transition-colors',
            activeTab === 'buy'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
        >
          Buy Brands
        </button>
      </div>

      {/* Scrollable brand list */}
      <div className='max-h-[400px] overflow-y-auto'>
        <div className='grid grid-cols-4 gap-0'>
          {activeTab === 'rent'
            ? rentBrandLinks.map(link => (
                <NavGridCard key={link.href} link={link} className='px-1 py-1' />
              ))
            : buyBrandLinks.map(link => (
                <NavGridCard key={link.href} link={link} className='px-1 py-1' />
              ))}
        </div>
      </div>
    </div>
  );
}

// Company/About links
const companyLinks: NavItemType[] = [
  {
    title: 'About Us',
    href: '/about',
    description: 'Learn about our company and mission',
    icon: Building2,
  },
  {
    title: 'Contact',
    href: '/contact',
    description: 'Get in touch with our team',
    icon: Phone,
  },
  {
    title: 'Vendors',
    href: '/vendors',
    description: 'Partner with us as an equipment vendor',
    icon: Users,
  },
  {
    title: 'Support',
    href: '/support',
    description: 'Customer support and help center',
    icon: Mail,
  },
];

function DesktopMenu() {
  return (
    <NavigationMenuPrimitive className='hidden lg:flex'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Buy Equipment</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className='grid w-full md:w-[900px] md:grid-cols-[2fr_1fr]'>
              <ul className='grid gap-0 p-4 md:grid-cols-2 md:border-r'>
                {equipmentLinks.slice(0, 7).map(link => (
                  <li key={link.href}>
                    <NavGridCard link={link} className='px-1 py-1' />
                  </li>
                ))}
              </ul>
              <div className='p-4 space-y-4'>
                <div>
                  <h4 className='text-sm font-semibold text-gray-900 mb-3'>Locations</h4>
                  <div className='space-y-0.5'>
                    {equipmentLinks.slice(7, 14).map(link => (
                      <NavSmallItem
                        key={link.href}
                        item={link}
                        href={link.href}
                        className='gap-x-1 py-0.5'
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className='text-sm font-semibold text-gray-900 mb-3'>New Machines</h4>
                  <div className='space-y-0.5'>
                    {equipmentLinks.slice(14).map(link => (
                      <NavSmallItem
                        key={link.href}
                        item={link}
                        href={link.href}
                        className='gap-x-1 py-0.5'
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Rent Equipment</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className='grid w-full md:w-[900px] md:grid-cols-[2fr_1fr]'>
              <ul className='grid gap-0 p-4 md:grid-cols-2 md:border-r'>
                {rentalLinks.slice(0, 7).map(link => (
                  <li key={link.href}>
                    <NavGridCard link={link} className='px-1 py-1' />
                  </li>
                ))}
              </ul>
              <div className='p-4 space-y-4'>
                <div>
                  <h4 className='text-sm font-semibold text-gray-900 mb-3'>Locations</h4>
                  <div className='space-y-0.5'>
                    {rentalLinks.slice(7, 14).map(link => (
                      <NavSmallItem
                        key={link.href}
                        item={link}
                        href={link.href}
                        className='gap-x-1 py-0.5'
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className='text-sm font-semibold text-gray-900 mb-3'>Industries</h4>
                  <div className='space-y-0.5'>
                    {rentalLinks.slice(14).map(link => (
                      <NavSmallItem
                        key={link.href}
                        item={link}
                        href={link.href}
                        className='gap-x-1 py-0.5'
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Brands</NavigationMenuTrigger>
          <NavigationMenuContent>
            <BrandsDropdown />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href='/inquiry-board'
              className='group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50'
            >
              Inquiry Board
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link
              href='/news'
              className='group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50'
            >
              News
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenuPrimitive>
  );
}

function MobileNav() {
  const [open, setOpen] = React.useState(false);

  const allLinks = [
    {
      title: 'Inquiry Board',
      href: '/inquiry-board',
      icon: Users,
      description: 'Browse equipment inquiries and requests',
    },
    {
      title: 'News',
      href: '/news',
      icon: Newspaper,
      description: 'Latest equipment guides and industry updates',
    },
    ...equipmentLinks,
    ...rentalLinks,
    ...brandLinks,
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant='ghost' size='sm' className='lg:hidden'>
          <Menu className='h-5 w-5' />
          <span className='sr-only'>Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='w-[300px] sm:w-[400px]'>
        <SheetTitle className='sr-only'>Navigation Menu</SheetTitle>
        <div className='flex flex-col gap-4 py-4'>
          <div className='px-2'>
            <h2 className='text-lg font-semibold'>Navigation</h2>
          </div>
          <div className='grid gap-2'>
            {allLinks.map(item => (
              <NavItemMobile
                key={item.href}
                item={item}
                href={item.href}
                onClick={() => setOpen(false)}
              />
            ))}
          </div>
          <div className='border-t pt-4'>
            <div className='grid gap-2'>
              <Button variant='outline' className='justify-start' asChild>
                <Link href='/login'>
                  <User className='mr-2 h-4 w-4' />
                  Login
                </Link>
              </Button>
              <Button variant='outline' className='justify-start' asChild>
                <Link href='/favorites'>
                  <Heart className='mr-2 h-4 w-4' />
                  Favorites
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function NavigationMenu() {
  return (
    <div className='flex items-center gap-2'>
      <DesktopMenu />
      <MobileNav />
    </div>
  );
}
