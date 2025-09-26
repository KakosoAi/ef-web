import { memo, useMemo } from 'react';
import { Button } from '@/shared/ui/button';
import { 
  Truck, 
  Settings, 
  Building2,
  Zap,
  Wrench,
  Package,
  Mountain,
  Factory,
  ArrowRight
} from 'lucide-react';
import { Category } from '@/shared/types';

const Categories = memo(() => {
  const categories: Category[] = useMemo(() => [
    {
      name: 'Excavators',
      icon: Settings,
      count: '1,245',
      description: 'Heavy-duty excavators for construction and mining'
    },
    {
      name: 'Cranes',
      icon: Building2,
      count: '887',
      description: 'Mobile and tower cranes for lifting operations'
    },
    {
      name: 'Loaders',
      icon: Package,
      count: '672',
      description: 'Wheel and track loaders for material handling'
    },
    {
      name: 'Trucks',
      icon: Truck,
      count: '1,156',
      description: 'Dump trucks and commercial vehicles'
    },
    {
      name: 'Bulldozers',
      icon: Mountain,
      count: '423',
      description: 'Track-type tractors for earthmoving'
    },
    {
      name: 'Aerial Platforms',
      icon: Zap,
      count: '534',
      description: 'Scissor lifts and boom lifts'
    },
    {
      name: 'Generators',
      icon: Zap,
      count: '298',
      description: 'Portable and stationary power generators'
    },
    {
      name: 'Compactors',
      icon: Wrench,
      count: '187',
      description: 'Soil and asphalt compaction equipment'
    }
  ], []);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Browse by <span className="text-secondary">Category</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find the perfect heavy equipment for your construction projects from our extensive categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category) => (
            <div key={category.name} className="group cursor-pointer">
              <div className="bg-white border border-border rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                      <category.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-foreground">{category.count.toString().slice(-1)}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count}+ Available</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-4 font-semibold"
          >
            View All Categories
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-xl bg-gradient-card border border-border">
            <div className="text-3xl font-bold text-secondary mb-2">50+</div>
            <div className="text-muted-foreground">Equipment Brands</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-card border border-border">
            <div className="text-3xl font-bold text-secondary mb-2">15</div>
            <div className="text-muted-foreground">Major Categories</div>
          </div>
          <div className="text-center p-6 rounded-xl bg-gradient-card border border-border">
            <div className="text-3xl font-bold text-secondary mb-2">24/7</div>
            <div className="text-muted-foreground">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Categories;