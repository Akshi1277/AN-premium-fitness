const fs = require('fs');
const path = require('path');
const https = require('https');

// Create directories if they don't exist
const dirs = [
  'public/images/products',
  'public/images/categories',
  'public/images/avatars'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Image URLs (using placeholder services)
const images = {
  // Product images (using placeholder.pics for reliable image hosting)
  'dumbbell-set.jpg': 'https://placehold.co/800x600/3b82f6/ffffff?text=Dumbbell+Set',
  'yoga-mat.jpg': 'https://placehold.co/800x600/10b981/ffffff?text=Yoga+Mat',
  'bench.jpg': 'https://placehold.co/800x600/6366f1/ffffff?text=Adjustable+Bench',
  'resistance-bands.jpg': 'https://placehold.co/800x600/8b5cf6/ffffff?text=Resistance+Bands',
  
  // Category images
  'weights-category.jpg': 'https://placehold.co/800x600/3b82f6/ffffff?text=Weights',
  'cardio-category.jpg': 'https://placehold.co/800x600/ef4444/ffffff?text=Cardio',
  'yoga-category.jpg': 'https://placehold.co/800x600/10b981/ffffff?text=Yoga',
  'accessories-category.jpg': 'https://placehold.co/800x600/8b5cf6/ffffff?text=Accessories',
  
  // Avatar images
  'avatar1.jpg': 'https://randomuser.me/api/portraits/women/44.jpg',
  'avatar2.jpg': 'https://randomuser.me/api/portraits/men/32.jpg',
  'avatar3.jpg': 'https://randomuser.me/api/portraits/women/68.jpg'
};

// Download function
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .on('close', () => resolve(filepath));
      } else {
        reject(`Failed to download ${url}: ${response.statusCode}`);
      }
    }).on('error', reject);
  });
}

// Download all images
async function downloadAllImages() {
  console.log('Starting image downloads...');
  
  for (const [filename, url] of Object.entries(images)) {
    let dir = 'public/images/';
    
    if (filename.includes('avatar')) {
      dir += 'avatars/';
    } else if (filename.includes('category')) {
      dir += 'categories/';
    } else {
      dir += 'products/';
    }
    
    const filepath = path.join(dir, filename);
    
    try {
      await downloadImage(url, filepath);
      console.log(`Downloaded: ${filepath}`);
    } catch (error) {
      console.error(`Error downloading ${url}:`, error);
    }
  }
  
  console.log('All images downloaded!');
}

downloadAllImages().catch(console.error);
