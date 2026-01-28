import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFilter, FiArrowRight, FiTrendingUp, FiDollarSign } from 'react-icons/fi';
import { FaEthereum } from 'react-icons/fa';

function Properties() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: 'all',
    propertyType: 'all',
    location: '',
    minROI: '',
    maxROI: '',
    fundingStatus: 'all',
    sortBy: 'newest'
  });

  const properties = [
    {
      id: 1,
      title: 'Modern Villa with Pool',
      price: {
        usd: 850000,
        eth: 425
      },
      location: 'Beverly Hills, CA',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      type: 'villa',
      roi: '7.2%',
      metrics: {
        totalInvestors: 142,
        funded: '89%',
        minInvestment: '$10',
        monthlyIncome: '$520',
        appreciation: '4.5%'
      },
      status: 'Active Investment',
      features: ['Pool', 'Smart Home', 'Solar Panels'],
      tokenDetails: {
        totalTokens: 85000,
        availableTokens: 9350,
        tokenPrice: '$10'
      }
    },
    {
      id: 2,
      title: 'Luxury Penthouse',
      price: {
        usd: 1200000,
        eth: 600
      },
      location: 'Manhattan, NY',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      type: 'apartment',
      roi: '6.8%',
      metrics: {
        totalInvestors: 203,
        funded: '95%',
        minInvestment: '$10',
        monthlyIncome: '$680',
        appreciation: '5.2%'
      },
      status: 'Almost Funded',
      features: ['Doorman', 'Gym', 'Terrace'],
      tokenDetails: {
        totalTokens: 120000,
        availableTokens: 6000,
        tokenPrice: '$10'
      }
    },
    {
      id: 3,
      title: 'Waterfront Estate',
      price: {
        usd: 2100000,
        eth: 1050
      },
      location: 'Miami Beach, FL',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      type: 'house',
      roi: '7.5%',
      metrics: {
        totalInvestors: 89,
        funded: '45%',
        minInvestment: '$10',
        monthlyIncome: '$1200',
        appreciation: '6.1%'
      },
      status: 'New Listing',
      features: ['Waterfront', 'Dock', 'Wine Cellar'],
      tokenDetails: {
        totalTokens: 210000,
        availableTokens: 115500,
        tokenPrice: '$10'
      }
    }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredProperties = properties.filter(property => {
    if (filters.propertyType !== 'all' && property.type !== filters.propertyType) return false;
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    if (filters.minROI && parseFloat(property.roi) < parseFloat(filters.minROI)) return false;
    if (filters.maxROI && parseFloat(property.roi) > parseFloat(filters.maxROI)) return false;
    
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (max && (property.price.usd < min || property.price.usd > max)) return false;
      if (!max && property.price.usd < min) return false;
    }

    if (filters.fundingStatus !== 'all') {
      const fundedPercentage = parseInt(property.metrics.funded);
      switch (filters.fundingStatus) {
        case 'new':
          if (fundedPercentage > 30) return false;
          break;
        case 'active':
          if (fundedPercentage < 30 || fundedPercentage >= 90) return false;
          break;
        case 'almostFunded':
          if (fundedPercentage < 90) return false;
          break;
        default:
          break
      }
    }
    
    return true;
  });

  // Sort properties based on selected criteria
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (filters.sortBy) {
      case 'priceAsc':
        return a.price.usd - b.price.usd;
      case 'priceDesc':
        return b.price.usd - a.price.usd;
      case 'roiDesc':
        return parseFloat(b.roi) - parseFloat(a.roi);
      case 'fundingDesc':
        return parseInt(b.metrics.funded) - parseInt(a.metrics.funded);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-950">
      {/* Header */}
      <div className="bg-white dark:bg-secondary-800 shadow">
        <div className="container py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold dark:text-white">Investment Properties</h1>
            <div className="flex items-center space-x-4">
              <button
                className={`p-2 rounded-md ${showFilters ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400' : 'hover:bg-secondary-100 dark:hover:bg-secondary-700'} transition-colors`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <FiFilter size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white dark:bg-secondary-800 shadow-md border-t border-secondary-200 dark:border-secondary-700">
          <div className="container py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-1">
                  Price Range
                </label>
                <select
                  className="input dark:bg-secondary-700 dark:border-secondary-600"
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                >
                  <option value="all">All Prices</option>
                  <option value="0-500000">Under $500,000</option>
                  <option value="500000-1000000">$500,000 - $1,000,000</option>
                  <option value="1000000">Over $1,000,000</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Property Type
                </label>
                <select
                  className="input"
                  value={filters.propertyType}
                  onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter location"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Minimum ROI
                </label>
                <input
                  type="number"
                  className="input"
                  placeholder="Min ROI %"
                  value={filters.minROI}
                  onChange={(e) => handleFilterChange('minROI', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Funding Status
                </label>
                <select
                  className="input"
                  value={filters.fundingStatus}
                  onChange={(e) => handleFilterChange('fundingStatus', e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New Listings</option>
                  <option value="active">Active Funding</option>
                  <option value="almostFunded">Almost Funded</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Sort By
                </label>
                <select
                  className="input"
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                  <option value="roiDesc">Highest ROI</option>
                  <option value="fundingDesc">Most Funded</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Properties Grid */}
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProperties.map((property, index) => (
            <Link key={property.id} to={`/properties/${property.id}`}>
              <motion.div
                className="bg-white dark:bg-secondary-800 rounded-lg shadow-md dark:shadow-lg overflow-hidden h-full hover:shadow-xl dark:hover:shadow-2xl transition-shadow duration-300"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4, ease: "easeOut" }}
              >
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div 
                    className="absolute top-4 right-4 bg-white dark:bg-secondary-700 px-3 py-1 rounded-full text-primary-600 dark:text-primary-400 font-semibold"
                    whileHover={{ scale: 1.05 }}
                  >
                    {property.status}
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold dark:text-white mb-2 line-clamp-2">{property.title}</h3>
                  <p className="text-secondary-600 dark:text-secondary-400 mb-4">{property.location}</p>

                  {/* Price and ROI */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-secondary-500 dark:text-secondary-400">Investment Price</p>
                      <div className="flex items-center">
                        <FiDollarSign className="text-primary-600 dark:text-primary-400" />
                        <span className="font-semibold dark:text-white">${property.price.usd.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center text-sm text-primary-600 dark:text-primary-400">
                        <FaEthereum className="mr-1" />
                        <span>{property.price.eth} ETH</span>
                      </div>
                    </div>
                    <motion.div 
                      className="text-right"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <p className="text-sm text-secondary-500 dark:text-secondary-400">Annual ROI</p>
                      <div className="flex items-center justify-end text-green-600 dark:text-green-400">
                        <motion.div whileHover={{ rotate: 10 }} transition={{ type: "spring" }}>
                          <FiTrendingUp className="mr-1" />
                        </motion.div>
                        <span className="font-semibold">{property.roi}</span>
                      </div>
                    </motion.div>
                  </div>

                  {/* Investment Metrics */}
                  <div className="space-y-2 mb-4">
                    <motion.div 
                      className="flex justify-between text-sm"
                      initial={{ opacity: 0.7 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <span className="text-secondary-600 dark:text-secondary-400">Monthly Income</span>
                      <span className="font-medium dark:text-white">{property.metrics.monthlyIncome}</span>
                    </motion.div>
                    <motion.div 
                      className="flex justify-between text-sm"
                      initial={{ opacity: 0.7 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <span className="text-secondary-600 dark:text-secondary-400">Appreciation</span>
                      <span className="font-medium dark:text-white">{property.metrics.appreciation}</span>
                    </motion.div>
                    <motion.div 
                      className="flex justify-between text-sm"
                      initial={{ opacity: 0.7 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <span className="text-secondary-600 dark:text-secondary-400">Min Investment</span>
                      <span className="font-medium dark:text-white">{property.metrics.minInvestment}</span>
                    </motion.div>
                  </div>

                  {/* Funding Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-secondary-600 dark:text-secondary-400">Funding Progress</span>
                      <span className="font-medium dark:text-white">{property.metrics.funded}</span>
                    </div>
                    <motion.div 
                      className="w-full bg-secondary-100 dark:bg-secondary-700 rounded-full h-2 overflow-hidden"
                      whileInView={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                    >
                      <motion.div
                        className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: property.metrics.funded }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.25, duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
                        style={{ width: property.metrics.funded }}
                      />
                    </motion.div>
                  </div>

                  {/* Token Details */}
                  <motion.div 
                    className="bg-secondary-50 dark:bg-secondary-700 rounded-lg p-3 mb-4"
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary-600 dark:text-secondary-400">Available Tokens</span>
                      <span className="font-medium dark:text-white">
                        {property.tokenDetails.availableTokens.toLocaleString()} / {property.tokenDetails.totalTokens.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-secondary-600 dark:text-secondary-400">Token Price</span>
                      <span className="font-medium dark:text-white">{property.tokenDetails.tokenPrice}</span>
                    </div>
                  </motion.div>

                  <motion.button 
                    className="btn w-full flex items-center justify-center hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      className="flex items-center"
                    >
                      Invest Now
                      <FiArrowRight className="ml-2" />
                    </motion.span>
                  </motion.button>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Properties;