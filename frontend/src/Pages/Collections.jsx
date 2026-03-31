import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { MdArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";
import ProductItem from '../components/ProductItem/ProductItem';
import DynamicHeropage from '../components/DynamicHeropage/DynamicHeropage';


const Collections = () => {
  const { products, currency } = useContext(ShopContext)
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('')



  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value))
    } else {
      setCategory((prev) => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value))
    } else {
      setSubCategory((prev) => [...prev, e.target.value])
    }
  }

  const applyFilter = () => {
    let filtered = products.slice()
    if (category.length > 0) {
      filtered = filtered.filter(item => category.includes(item.category))
    }
    if (subCategory.length > 0) {
      filtered = filtered.filter(item => subCategory.includes(item.subCategory))
    }
    setFilteredProducts(filtered)
  }

  const sortProducts = () => {

    let filterSortProducts = filteredProducts.slice()
    switch (sortType) {
      case 'low-high':
        setFilteredProducts(filterSortProducts.sort((a, b) => a.price - b.price))
        break;
      case 'high-low':
        setFilteredProducts(filterSortProducts.sort((a, b) => b.price - a.price))
        break;
      default:
        applyFilter()
        break;
    }
  }


  useEffect(() => {
    applyFilter()
  }, [category, subCategory, products])

  useEffect(() => {
    sortProducts()
  }, [sortType])


  return (
    <>
      <DynamicHeropage />
      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

        {/* Filters Sidebar */}
        <div className='min-w-60 md:px-10 px-5'>
          <p onClick={() => setShowFilters(!showFilters)} className='my-2 text-xl uppercase font-medium cursor-pointer'>Filters
            {showFilters ? <MdOutlineArrowDropDown className='inline-block ml-2 sm:hidden' /> : <MdArrowDropUp className='inline-block ml-2 sm:hidden' />}
          </p>

          {/* Category Filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilters ? 'block' : 'hidden'} sm:block`}>
            <p className='mb-3 text-xl font-medium uppercase'>Category</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              {['Men', 'Women', 'Kids'].map((category) => (
                <label key={category} className='flex gap-2 items-center'>
                  <input className='w-3' type='checkbox' onChange={toggleCategory} value={category} />
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilters ? 'block' : 'hidden'} sm:block`}>
            <p className='mb-3 text-xl font-medium uppercase'>Type</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
                <label key={type} className='flex gap-2 items-center'>
                  <input className='w-3' type='checkbox' onChange={toggleSubCategory} value={type} />
                  {type}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* rightSide */}

        <div className='flex-1 flex flex-col gap-5 px-5'>
          <div className='flex justify-between text-base sm:text-2xl mb-4'>
            <h2 className='font-medium uppercase'>All Collections</h2>
            {/* productsSort */}
            <select onChange={(e) => setSortType(e.target.value)} className='border-2 rounded-2xl border-gray-300 text-sm px-2 cursor-pointer'>
              <option className='rounded-2xl' value="relevant">Sort by:Relevant</option>
              <option className='rounded-2xl' value="low-high">Sort by:Low to High</option>
              <option className='rounded-2xl' value="high-low">Sort by:High to Low </option>
            </select>
          </div>

          {/* map products */}

          <div className='grid grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-4 gap-y-6'>

            {
              filteredProducts.map((item, index) => (
                <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
              ))
            }

          </div>

        </div>


      </div>

    </>
  )
}

export default Collections