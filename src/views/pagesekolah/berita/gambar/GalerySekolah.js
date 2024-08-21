import React from 'react';
import NavbarSekolah from "../../../../component/NavbarSekolah";
import FooterSekolah from "../../../../component/FooterSekolah";
import ImageCard from './ImageCard'; // Assuming ImageCard is in the same directory

const galleryData = [
  { id: 1, image: 'https://via.placeholder.com/300x200?text=Image+1', title: 'Sunrise Over Mountains', content: 'A beautiful sunrise over the mountain range, casting a warm glow across the landscape.' },
  { id: 2, image: 'https://via.placeholder.com/300x200?text=Image+2', title: 'Cityscape at Dusk', content: 'The city lights start to sparkle as the sun sets behind the skyscrapers.' },
  { id: 3, image: 'https://via.placeholder.com/300x200?text=Image+3', title: 'Forest Path', content: 'A tranquil forest path covered in autumn leaves, with rays of sunlight filtering through the trees.' },
  { id: 4, image: 'https://via.placeholder.com/300x200?text=Image+4', title: 'Ocean Waves', content: 'Gentle ocean waves crashing on a sandy beach, with a clear blue sky above.' },
  { id: 5, image: 'https://via.placeholder.com/300x200?text=Image+5', title: 'Desert Dunes', content: 'The vast expanse of golden sand dunes in the desert, stretching to the horizon under a bright sun.' },
  { id: 6, image: 'https://via.placeholder.com/300x200?text=Image+6', title: 'Snow-Capped Peaks', content: 'Majestic snow-capped mountain peaks with a clear blue sky in the background.' },
  { id: 7, image: 'https://via.placeholder.com/300x200?text=Image+7', title: 'Blooming Flowers', content: 'A vibrant field of blooming flowers in a variety of colors, with a fresh and lively atmosphere.' },
  { id: 8, image: 'https://via.placeholder.com/300x200?text=Image+8', title: 'Old Lighthouse', content: 'An old, weathered lighthouse standing tall on a rugged coastline, guiding ships safely to shore.' },
  { id: 9, image: 'https://via.placeholder.com/300x200?text=Image+9', title: 'Rustic Barn', content: 'A charming rustic barn surrounded by open fields and a clear, sunny sky.' },
  { id: 10, image: 'https://via.placeholder.com/300x200?text=Image+10', title: 'Mountain Lake', content: 'A serene mountain lake reflecting the surrounding peaks and forest in its calm waters.' },
  { id: 11, image: 'https://via.placeholder.com/300x200?text=Image+11', title: 'Waterfall in Forest', content: 'A majestic waterfall cascading down rocks in a lush, green forest.' },
  { id: 12, image: 'https://via.placeholder.com/300x200?text=Image+12', title: 'Ancient Ruins', content: 'Ruins of an ancient civilization with crumbling stone structures amidst overgrown vegetation.' },
  { id: 13, image: 'https://via.placeholder.com/300x200?text=Image+13', title: 'Starry Night Sky', content: 'A breathtaking view of the night sky filled with countless stars, with the Milky Way visible.' },
  { id: 14, image: 'https://via.placeholder.com/300x200?text=Image+14', title: 'Coastal Cliffs', content: 'Dramatic coastal cliffs overlooking the ocean, with waves crashing against the rocks below.' },
  { id: 15, image: 'https://via.placeholder.com/300x200?text=Image+15', title: 'Wildlife Encounter', content: 'A close-up of a wild animal in its natural habitat, capturing the beauty of wildlife.' },
  { id: 16, image: 'https://via.placeholder.com/300x200?text=Image+16', title: 'Serene River', content: 'A calm river winding through a peaceful valley, with lush greenery on either side.' },
  { id: 17, image: 'https://via.placeholder.com/300x200?text=Image+17', title: 'Vibrant Market', content: 'A bustling market filled with colorful stalls, vibrant produce, and lively interactions.' },
  { id: 18, image: 'https://via.placeholder.com/300x200?text=Image+18', title: 'Foggy Morning', content: 'A misty morning scene with fog rolling over rolling hills and a soft, diffused light.' },
  { id: 19, image: 'https://via.placeholder.com/300x200?text=Image+19', title: 'Historic Castle', content: 'An imposing historic castle with towering walls and ancient architecture set against a dramatic sky.' },
  { id: 20, image: 'https://via.placeholder.com/300x200?text=Image+20', title: 'Peaceful Countryside', content: 'A tranquil countryside scene with rolling green fields, grazing animals, and a clear blue sky.' }
];

function GalerySekolah() {
  return (
    <>
      <NavbarSekolah />
      <div className="gallery-container">
        {galleryData.map(item => (
          <ImageCard 
            key={item.id} 
            image={item.image} 
            title={item.title} 
            content={item.content} 
          />
        ))}
      </div>
      <FooterSekolah />
    </>
  );
}

export default GalerySekolah;
