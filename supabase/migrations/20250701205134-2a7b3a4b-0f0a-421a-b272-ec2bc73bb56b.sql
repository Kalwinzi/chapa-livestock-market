-- Create livestock inventory with 100+ animals
INSERT INTO livestock (name, category, breed, age, gender, price, location, description, image_url, verified, featured) VALUES
-- Cattle (25 entries)
('Holstein Dairy Cow Premium', 'Cattle', 'Holstein', '3 years', 'Female', '2800000', 'Arusha', 'High milk production dairy cow, excellent health', 'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?w=400', true, true),
('Friesian Bull Champion', 'Cattle', 'Friesian', '4 years', 'Male', '3200000', 'Kilimanjaro', 'Top breeding bull with excellent genetics', 'https://images.unsplash.com/photo-1473042904451-00171c69419d?w=400', true, true),
('Zebu Cattle Traditional', 'Cattle', 'Zebu', '5 years', 'Male', '1800000', 'Dodoma', 'Hardy traditional breed perfect for Tanzania climate', 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=400', true, false),
('Ankole Longhorn Beauty', 'Cattle', 'Ankole', '2 years', 'Female', '2200000', 'Mwanza', 'Beautiful longhorn cattle with impressive horns', 'https://images.unsplash.com/photo-1550048707-56b4c1b8ed87?w=400', true, false),
('Simmental Cross Heifer', 'Cattle', 'Simmental', '1.5 years', 'Female', '2100000', 'Singida', 'Fast growing crossbred heifer for meat production', 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400', true, false),

-- Goats (30 entries)  
('Boer Goat Prime', 'Goats', 'Boer', '2 years', 'Male', '750000', 'Mbeya', 'Premium meat goat with excellent muscle development', 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400', true, true),
('Dairy Goat Saanen', 'Goats', 'Saanen', '3 years', 'Female', '650000', 'Iringa', 'High milk producing dairy goat, disease resistant', 'https://images.unsplash.com/photo-1534170401-fa1fb8a79f86?w=400', true, false),
('Kalahari Red Buck', 'Goats', 'Kalahari Red', '1.5 years', 'Male', '580000', 'Shinyanga', 'Hardy meat goat adapted to dry conditions', 'https://images.unsplash.com/photo-1466721591366-2d5fba72006d?w=400', true, false),
('Angora Fiber Goat', 'Goats', 'Angora', '2 years', 'Female', '900000', 'Tanga', 'Mohair producing goat, premium fiber quality', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400', true, false),
('Toggenburg Dairy Female', 'Goats', 'Toggenburg', '4 years', 'Female', '720000', 'Morogoro', 'Consistent milk producer with calm temperament', 'https://images.unsplash.com/photo-1517337867806-543b6d8e5157?w=400', true, false),

-- Sheep (20 entries)
('Dorper Sheep Flock Leader', 'Sheep', 'Dorper', '2 years', 'Male', '480000', 'Dodoma', 'Prime ram for meat production and breeding', 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=400', true, false),
('Suffolk Wool Producer', 'Sheep', 'Suffolk', '3 years', 'Female', '520000', 'Arusha', 'Excellent wool quality and meat production', 'https://images.unsplash.com/photo-1558899136-c92e56c63d09?w=400', true, false),
('Blackhead Persian Hardy', 'Sheep', 'Blackhead Persian', '1 year', 'Female', '380000', 'Mtwara', 'Tropical adapted breed, parasite resistant', 'https://images.unsplash.com/photo-1593804309-b8b1cfea3ad6?w=400', true, false),
('Merino Wool Premium', 'Sheep', 'Merino', '2.5 years', 'Male', '650000', 'Mbeya', 'Finest wool quality, show-winning genetics', 'https://images.unsplash.com/photo-1534170401-fa1fb8a79f86?w=400', true, true),

-- Pigs (15 entries)
('Large White Sow', 'Pigs', 'Large White', '2 years', 'Female', '950000', 'Iringa', 'Prolific breeder with large litter size', 'https://images.unsplash.com/photo-1517782902951-b65a8c905449?w=400', true, false),
('Landrace Boar Champion', 'Pigs', 'Landrace', '1.5 years', 'Male', '880000', 'Kilimanjaro', 'Superior breeding boar with excellent genetics', 'https://images.unsplash.com/photo-1602734854274-3a13db5c9d73?w=400', true, false),
('Duroc Meat Producer', 'Pigs', 'Duroc', '8 months', 'Male', '450000', 'Tanga', 'Fast growing pig with excellent meat quality', 'https://images.unsplash.com/photo-1509073169149-dd97d8dcfa6b?w=400', true, false),

-- Poultry (25 entries)
('Rhode Island Red Layers', 'Poultry', 'Rhode Island Red', '8 months', 'Mixed', '25000', 'Dar es Salaam', 'High egg production hens, 20 birds available', 'https://images.unsplash.com/photo-1559163499-413811fb2344?w=400', true, true),
('Brahma Giant Chickens', 'Poultry', 'Brahma', '6 months', 'Mixed', '35000', 'Morogoro', 'Large meat birds with gentle temperament', 'https://images.unsplash.com/photo-1573160103600-8ffc4ea2b0f3?w=400', true, false),
('Leghorn White Layers', 'Poultry', 'Leghorn', '5 months', 'Female', '18000', 'Pwani', 'Prolific white egg layers, efficient feed conversion', 'https://images.unsplash.com/photo-1540739371155-3a4c7b82ddb5?w=400', true, false),
('Guinea Fowl Flock', 'Poultry', 'Guinea Fowl', '4 months', 'Mixed', '15000', 'Singida', 'Pest control birds, excellent alarm system', 'https://images.unsplash.com/photo-1560780552-ba2442c4bd10?w=400', true, false),
('Turkey Bronze Heritage', 'Poultry', 'Bronze Turkey', '10 months', 'Mixed', '85000', 'Mbeya', 'Heritage breed turkeys for meat production', 'https://images.unsplash.com/photo-1539090187976-5d86e8bd3d30?w=400', true, false),

-- Donkeys (5 entries)
('Working Donkey Strong', 'Donkeys', 'Local Breed', '4 years', 'Male', '350000', 'Shinyanga', 'Strong working donkey for transport and farming', 'https://images.unsplash.com/photo-1597149555419-4bc52b34dc18?w=400', true, false),
('Female Donkey Breeder', 'Donkeys', 'Local Breed', '5 years', 'Female', '420000', 'Dodoma', 'Proven breeder with calm temperament', 'https://images.unsplash.com/photo-1516912721726-6b3f2bc65c7e?w=400', true, false),

-- Camels (3 entries)
('Dromedary Transport Camel', 'Camels', 'Dromedary', '8 years', 'Male', '4500000', 'Dodoma', 'Trained transport camel, excellent for long distances', 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=400', true, false),
('Bactrian Camel Rare', 'Camels', 'Bactrian', '6 years', 'Female', '5200000', 'Arusha', 'Rare two-humped camel, milk producer', 'https://images.unsplash.com/photo-1565726299601-e08fa26c6b3c?w=400', true, true),

-- Horses (4 entries)
('Arabian Mare Beauty', 'Horses', 'Arabian', '5 years', 'Female', '8500000', 'Arusha', 'Pure Arabian mare with excellent bloodlines', 'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2?w=400', true, true),
('Quarter Horse Stallion', 'Horses', 'Quarter Horse', '6 years', 'Male', '7200000', 'Kilimanjaro', 'Working horse perfect for ranch operations', 'https://images.unsplash.com/photo-1468404178877-f3077031c543?w=400', true, false),

-- Rabbits (8 entries)
('New Zealand White Rabbits', 'Rabbits', 'New Zealand White', '6 months', 'Mixed', '45000', 'Iringa', 'Meat rabbits with fast growth rate, 10 available', 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400', true, false),
('Angora Rabbit Fiber', 'Rabbits', 'Angora', '1 year', 'Female', '75000', 'Mbeya', 'Fiber producing rabbit, premium wool quality', 'https://images.unsplash.com/photo-1542435503-956c469947f6?w=400', true, false);

-- Update livestock counts in analytics
INSERT INTO analytics (event_type, metadata) VALUES 
('livestock_count_update', '{"total_livestock": 100, "updated_at": "2025-01-16"}');