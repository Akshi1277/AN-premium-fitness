@echo off
setlocal enabledelayedexpansion

:: Create directories if they don't exist
if not exist "public\images\products" mkdir "public\images\products"
if not exist "public\images\categories" mkdir "public\images\categories"
if not exist "public\images\avatars" mkdir "public\images\avatars"

echo Downloading images...

:: Download product images
curl -L "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=80" -o "public\images\products\dumbbell-set.jpg"
curl -L "https://images.unsplash.com/photo-1545389336-ff677ae4c523?w=800&auto=format&fit=crop&q=80" -o "public\images\products\yoga-mat.jpg"
curl -L "https://images.unsplash.com/photo-1571019614242-c6e2ad3ad63b?w=800&auto=format&fit=crop&q=80" -o "public\images\products\bench.jpg"
curl -L "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=800&auto=format&fit=crop&q=80" -o "public\images\products\resistance-bands.jpg"

:: Download category images
curl -L "https://images.unsplash.com/photo-1530490125459-847a6d437825?w=800&auto=format&fit=crop&q=80" -o "public\images\categories\weights-category.jpg"
curl -L "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&auto=format&fit=crop&q=80" -o "public\images\categories\cardio-category.jpg"
curl -L "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80" -o "public\images\categories\yoga-category.jpg"
curl -L "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=800&auto=format&fit=crop&q=80" -o "public\images\categories\accessories-category.jpg"

:: Download avatar images
curl -L "https://randomuser.me/api/portraits/women/44.jpg" -o "public\images\avatars\avatar1.jpg"
curl -L "https://randomuser.me/api/portraits/men/32.jpg" -o "public\images\avatars\avatar2.jpg"
curl -L "https://randomuser.me/api/portraits/women/68.jpg" -o "public\images\avatars\avatar3.jpg"

echo All images downloaded successfully!
pause
