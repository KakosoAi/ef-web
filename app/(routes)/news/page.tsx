import Image from 'next/image';
import Link from 'next/link';
import Header from '@/features/layout/components/Header';
import Footer from '@/features/layout/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Tag, Calendar, Clock, Newspaper, MessageSquare } from 'lucide-react';
import { NEWS_CATEGORIES, NEWS_POSTS } from './data';
import { AspectRatio } from '@/shared/ui/aspect-ratio';
import { Button } from '@/shared/ui/button';

export default function NewsPage() {
  const categories = NEWS_CATEGORIES;
  const posts = NEWS_POSTS;

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
                  <Newspaper className='h-5 w-5' />
                  <span className='text-sm font-medium'>Industry Updates</span>
                </div>
                <h1 className='text-3xl md:text-4xl font-bold tracking-tight text-foreground'>
                  News & Equipment Guides
                </h1>
                <p className='mt-3 text-base md:text-lg text-muted-foreground'>
                  Insights, tips, and best practices for heavy equipment, rentals, safety, and more.
                </p>
                <div className='mt-4'>
                  <Button asChild variant='default' className='gap-2'>
                    <Link href='/inquiry-board'>
                      <MessageSquare className='h-4 w-4' /> Open Inquiry Board
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className='mt-6 flex flex-wrap gap-2'>
              {categories.map(cat => (
                <Link key={cat.slug} href={`/news/tag/${cat.slug}`}>
                  <Badge variant='outline' className='text-xs hover:bg-accent'>
                    <Tag className='h-3.5 w-3.5 mr-1.5' /> {cat.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className='max-w-7xl mx-auto px-6 py-8'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            {posts.map(post => (
              <Card
                key={post.slug}
                className='group rounded-2xl overflow-hidden border bg-white shadow-sm hover:shadow-md transition-all'
              >
                <div className='relative'>
                  <div className='overflow-hidden'>
                    <AspectRatio ratio={16 / 9}>
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className='object-cover transition-transform duration-300 group-hover:scale-[1.03]'
                      />
                    </AspectRatio>
                  </div>
                  <div className='absolute left-3 top-3'>
                    <Link href={`/news/tag/${post.tag.slug}`}>
                      <Badge variant='secondary' className='text-xs/6 backdrop-blur-sm'>
                        <Tag className='h-3.5 w-3.5 mr-1.5' /> {post.tag.name}
                      </Badge>
                    </Link>
                  </div>
                </div>
                <CardHeader className='px-5 pt-5 pb-3'>
                  <CardTitle className='text-xl leading-snug'>
                    <Link href={`/news/equipment-guide/${post.slug}`} className='hover:underline'>
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className='px-5 pb-5'>
                  <p className='text-base text-muted-foreground line-clamp-3'>{post.excerpt}</p>
                  <div className='mt-4 flex items-center gap-3 text-xs text-muted-foreground'>
                    <Link
                      href={`/news/tag/${post.tag.slug}`}
                      className='inline-flex items-center gap-1 hover:underline'
                    >
                      <Tag className='h-3.5 w-3.5' /> {post.tag.name}
                    </Link>
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
