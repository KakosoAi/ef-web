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
import { Button } from '@/shared/ui/button';
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
                <div className='flex items-center gap-2 mb-3 text-muted-foreground'>
                  <Link href={`/news/tag/${post.tag.slug}`} className='inline-flex items-center'>
                    <Badge variant='outline' className='text-xs'>
                      <Tag className='h-3.5 w-3.5 mr-1.5' /> {post.tag.name}
                    </Badge>
                  </Link>
                </div>
                <h1 className='text-4xl md:text-5xl font-extrabold tracking-tight text-foreground'>
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

        {/* Content - left-aligned reading column within site container */}
        <div className='max-w-7xl mx-auto px-6 py-12 md:py-16'>
          <div className='max-w-3xl mx-0 space-y-10 md:space-y-12'>
            {/* Lead */}
            <p className='text-lg md:text-xl text-foreground/80 leading-8 md:leading-9'>
              {post.excerpt}
            </p>

            {/* Hero Image - edge-to-edge on mobile, rounded on desktop with soft overlay */}
            <div className='relative -mx-6 md:mx-0 md:rounded-2xl overflow-hidden md:border bg-muted/10 md:shadow-sm'>
              <AspectRatio ratio={4 / 3}>
                <Image src={post.image} alt={post.title} fill className='object-cover' />
                {/* Subtle gradient overlay on mobile for readability */}
                <div className='absolute inset-0 md:hidden bg-gradient-to-t from-black/30 via-black/10 to-transparent' />
              </AspectRatio>
            </div>

            {/* Quick TOC - section chips for fast navigation */}
            {post.body?.length > 1 && (
              <div className='-mx-2 md:mx-0 flex gap-2 overflow-x-auto py-2'>
                {post.body.map((section, idx) => (
                  <a key={idx} href={`#section-${idx}`} className='shrink-0'>
                    <Button variant='outline' size='sm' className='rounded-full'>
                      {section.heading}
                    </Button>
                  </a>
                ))}
              </div>
            )}

            <Separator className='my-10 md:my-12' />

            {/* Article */}
            <article className='space-y-14 md:space-y-16 text-left'>
              {post.body.map((section, idx) => (
                <section key={idx} id={`section-${idx}`} className='space-y-6 md:space-y-8'>
                  <h2 className='text-left text-2xl md:text-3xl font-extrabold tracking-tight'>
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((para, pidx) => (
                    <p
                      key={pidx}
                      className={
                        'text-left text-lg md:text-xl leading-8 md:leading-9 text-foreground/90 ' +
                        (idx === 0 && pidx === 0
                          ? 'first-letter:text-5xl first-letter:font-extrabold first-letter:mr-3 first-letter:float-left first-letter:leading-[1]'
                          : '')
                      }
                    >
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
