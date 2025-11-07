import Image from 'next/image';
import { notFound } from 'next/navigation';
import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Calendar, Clock, Tag } from 'lucide-react';
import Link from 'next/link';
import { NEWS_POSTS } from '../../data';
import { AspectRatio } from '@/shared/ui/aspect-ratio';
import { Separator } from '@/shared/ui/separator';
export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = NEWS_POSTS.find(p => p.slug === slug);
  if (!post) return notFound();

  return (
    <div className='min-h-screen bg-white'>
      <Header />
      <main>
        {/* Hero */}
        <div className='border-b bg-white'>
          <div className='max-w-7xl mx-auto px-6 py-10'>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <div className='flex items-center gap-2 mb-2 text-muted-foreground'>
                  <Link href={`/news/tag/${post.tag.slug}`} className='inline-flex items-center'>
                    <Badge variant='outline' className='text-xs'>
                      <Tag className='h-3.5 w-3.5 mr-1.5' /> {post.tag.name}
                    </Badge>
                  </Link>
                </div>
                <h1 className='text-3xl md:text-4xl font-bold tracking-tight text-foreground'>
                  {post.title}
                </h1>
                <div className='mt-4 flex items-center gap-4 text-sm text-muted-foreground'>
                  <span className='inline-flex items-center gap-1'>
                    <Calendar className='h-3.5 w-3.5' /> {post.date}
                  </span>
                  <span className='inline-flex items-center gap-1'>
                    <Clock className='h-3.5 w-3.5' /> {post.readTime}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='max-w-3xl mx-auto px-6 py-12'>
          <div className='space-y-8'>
            {/* Lead */}
            <p className='text-base md:text-lg text-muted-foreground leading-8'>{post.excerpt}</p>

            {/* Hero Image */}
            <div className='rounded-2xl overflow-hidden border bg-muted/20 shadow-sm'>
              <AspectRatio ratio={16 / 9}>
                <Image src={post.image} alt={post.title} fill className='object-cover' />
              </AspectRatio>
            </div>

            <Separator className='my-4' />

            {/* Article */}
            <article className='space-y-10'>
              {post.body.map((section, idx) => (
                <section key={idx} className='space-y-4'>
                  <h2 className='text-xl md:text-2xl font-semibold tracking-tight'>
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((para, pidx) => (
                    <p key={pidx} className='text-base md:text-lg leading-8 text-foreground/90'>
                      {para}
                    </p>
                  ))}
                </section>
              ))}
            </article>

            <div>
              <Link href='/news' className='text-sm text-primary hover:underline'>
                ← Back to News
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
