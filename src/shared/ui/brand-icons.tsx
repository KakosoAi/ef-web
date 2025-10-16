import React from 'react';
import Image from 'next/image';

interface BrandIconProps {
  className?: string;
}

export const CaterpillarIcon: React.FC<BrandIconProps> = ({ className = 'size-5' }) => (
  <Image
    src='/assets/brands/caterpillar.svg'
    alt='Caterpillar'
    width={20}
    height={20}
    className={className}
  />
);

export const JCBIcon: React.FC<BrandIconProps> = ({ className = 'size-5' }) => (
  <Image src='/assets/brands/jcb.svg' alt='JCB' width={20} height={20} className={className} />
);

export const KomatsuIcon: React.FC<BrandIconProps> = ({ className = 'size-5' }) => (
  <Image
    src='/assets/brands/komatsu.svg'
    alt='Komatsu'
    width={20}
    height={20}
    className={className}
  />
);

export const VolvoIcon: React.FC<BrandIconProps> = ({ className = 'size-5' }) => (
  <Image src='/assets/brands/volvo.svg' alt='Volvo' width={20} height={20} className={className} />
);

export const LiebherrIcon: React.FC<BrandIconProps> = ({ className = 'size-5' }) => (
  <Image
    src='/assets/brands/liebherr.svg'
    alt='Liebherr'
    width={20}
    height={20}
    className={className}
  />
);

export const HitachiIcon: React.FC<BrandIconProps> = ({ className = 'size-5' }) => (
  <Image
    src='/assets/brands/hitachi.svg'
    alt='Hitachi'
    width={20}
    height={20}
    className={className}
  />
);

export const HyundaiIcon: React.FC<BrandIconProps> = ({ className = 'size-5' }) => (
  <Image
    src='/assets/brands/hyundai.svg'
    alt='Hyundai'
    width={20}
    height={20}
    className={className}
  />
);

export const CaseIcon: React.FC<BrandIconProps> = ({ className = 'size-5' }) => (
  <Image src='/assets/brands/case.svg' alt='Case' width={20} height={20} className={className} />
);

export const BobcatIcon: React.FC<BrandIconProps> = ({ className = 'size-5' }) => (
  <Image
    src='/assets/brands/bobcat.svg'
    alt='Bobcat'
    width={20}
    height={20}
    className={className}
  />
);

export const MercedesIcon: React.FC<BrandIconProps> = ({ className = 'size-5' }) => (
  <Image
    src='/assets/brands/mercedes.svg'
    alt='Mercedes'
    width={20}
    height={20}
    className={className}
  />
);

export const MitsubishiIcon: React.FC<BrandIconProps> = ({ className = 'size-5' }) => (
  <Image
    src='/assets/brands/mitsubishi.svg'
    alt='Mitsubishi'
    width={20}
    height={20}
    className={className}
  />
);

export const XCMGIcon: React.FC<BrandIconProps> = ({ className = 'size-5' }) => (
  <Image src='/assets/brands/xcmg.svg' alt='XCMG' width={20} height={20} className={className} />
);

export const TadanoIcon: React.FC<BrandIconProps> = ({ className = 'size-5' }) => (
  <Image
    src='/assets/brands/tadano.svg'
    alt='Tadano'
    width={20}
    height={20}
    className={className}
  />
);

export const SanyIcon: React.FC<BrandIconProps> = ({ className = 'size-5' }) => (
  <Image src='/assets/brands/sany.svg' alt='Sany' width={20} height={20} className={className} />
);

export const JohnDeereIcon: React.FC<BrandIconProps> = ({ className = 'size-5' }) => (
  <Image
    src='/assets/brands/john-deere.svg'
    alt='John Deere'
    width={20}
    height={20}
    className={className}
  />
);

export const ManitouIcon: React.FC<BrandIconProps> = ({ className = 'size-5' }) => (
  <Image
    src='/assets/brands/manitou.svg'
    alt='Manitou'
    width={20}
    height={20}
    className={className}
  />
);

export const TerexIcon: React.FC<BrandIconProps> = ({ className = 'size-5' }) => (
  <Image src='/assets/brands/terex.svg' alt='Terex' width={20} height={20} className={className} />
);

export const JLGIcon: React.FC<BrandIconProps> = ({ className = 'size-5' }) => (
  <Image src='/assets/brands/jlg.svg' alt='JLG' width={20} height={20} className={className} />
);
