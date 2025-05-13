// import { useState } from 'react';

// const Categories = ({ activeCategory, setActiveCategory }) => {
//   const categories = [
//     { id: 1, name: 'Electronics', icon: '🖥️', slug: 'electronics' },
//     { id: 2, name: 'Clothing', icon: '👕', slug: 'clothing' },
//     { id: 3, name: 'Home & hhhhhhhhhhhh Garden', icon: '🏠', slug: 'home-garden' },
//     { id: 4, name: 'Beauty', icon: '💄', slug: 'beauty' },
//     { id: 5, name: 'Sports', icon: '⚽', slug: 'sports' },
//     { id: 6, name: 'Books', icon: '📚', slug: 'books' },
//   ];

//   const handleCategoryClick = (categorySlug) => {
//     setActiveCategory(categorySlug);
//   };

//   return (
//     <section className="mb-10">
//       <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
//         {categories.map(category => (
//           <div 
//             key={category.id} 
//             onClick={() => handleCategoryClick(category.slug)}
//             className={`bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer text-center ${
//               activeCategory === category.slug ? 'ring-2 ring-blue-500' : ''
//             }`}
//           >
//             <div className="text-4xl mb-2">{category.icon}</div>
//             <h3 className="font-medium">{category.name}</h3>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Categories;



import React from 'react'

function CategoryCard() {
  return (
    <div>
      
    </div>
  )
}

export default CategoryCard
