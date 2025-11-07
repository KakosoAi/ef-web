import Link from 'next/link';
import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Tag as TagIcon, Calendar, Clock } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { NEWS_CATEGORIES, NEWS_POSTS } from '../../data';

export default async function NewsTagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = NEWS_CATEGORIES.find(c => c.slug === slug);
  if (!category) return notFound();

  const posts = NEWS_POSTS.filter(p => p.tag.slug === category.slug);

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
                  <Badge variant='outline' className='text-xs'>
                    <TagIcon className='h-3.5 w-3.5 mr-1.5' /> Category
                  </Badge>
                </div>
                <h1 className='text-2xl md:text-3xl font-bold tracking-tight text-foreground'>
                  {category.name}
                </h1>
                <p className='mt-2 text-sm md:text-base text-muted-foreground'>
                  Articles tagged with {category.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className='max-w-7xl mx-auto px-6 py-8'>
          {posts.length === 0 ? (
            <div className='text-sm text-muted-foreground'>No posts found in this category.</div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {posts.map(post => (
                <Card
                  key={post.slug}
                  className='group rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition-shadow'
                >
                  <div className='relative h-40 w-full'>
                    <Image src={post.image} alt={post.title} fill className='object-cover' />
                  </div>
                  <CardHeader className='px-5 pt-5 pb-3'>
                    <CardTitle className='text-lg leading-tight'>
                      <Link href={`/news/equipment-guide/${post.slug}`} className='hover:underline'>
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='px-5 pb-5'>
                    <p className='text-sm text-muted-foreground line-clamp-3'>{post.excerpt}</p>
                    <div className='mt-4 flex items-center gap-3 text-xs text-muted-foreground'>
                      <span className='inline-flex items-center gap-1'>
                        <Calendar className='h-3.5 w-3.5' /> {post.date}
                      </span>
                      <span className='inline-flex items-center gap-1'>
                        <Clock className='h-3.5 w-3.5' /> {post.readTime}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <div className='mt-6'>
            <Link href='/news' className='text-sm text-primary hover:underline'>
              ← Back to News
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
