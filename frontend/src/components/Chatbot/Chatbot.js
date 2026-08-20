// src/components/Chatbot/Chatbot.js
import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Namaste! 🇮🇳 I'm your India travel expert with information about 85+ destinations across India. Ask me about any destination and I'll provide detailed information with useful action buttons!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Destinations database (showing sample - you can add all 85+)
  const destinations = {
  // Historic Destinations (1-20)
    'taj mahal': {
        name: 'Taj Mahal',
        state: 'Uttar Pradesh',
        category: 'historic',
        price: 6000,
        response: `🏛️ **Taj Mahal - Agra**\n\nOne of the Seven Wonders of the World, this stunning white marble mausoleum was built by Emperor Shah Jahan for his wife Mumtaz Mahal.\n\n✨ **Highlights:**\n• Sunrise and sunset views\n• Beautiful Mughal gardens\n• Moonlight viewing on full moon nights\n• Intricate marble craftsmanship\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1-2 days\n💰 **Budget:** ₹5,000-7,000\n⭐ **Rating:** 5/5`,
        tips: ['Book tickets online to avoid queues', 'Visit at sunrise for best photos and fewer crowds', 'Hire a licensed guide for historical insights'],
        images: 'https://www.google.com/search?q=taj+mahal+images&tbm=isch',
        info: 'https://www.google.com/search?q=taj+mahal+official+information+agra+tourism'
    },
    'agra fort': {
        name: 'Agra Fort',
        state: 'Uttar Pradesh',
        category: 'historic',
        price: 6500,
        response: `🏰 **Agra Fort**\n\nUNESCO World Heritage site and massive 16th-century Mughal fortress made of red sandstone. Served as the main residence of Mughal emperors.\n\n✨ **Highlights:**\n• Jahangir Palace\n• Khas Mahal\n• Musamman Burj\n• Diwan-i-Khas and Diwan-i-Am\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1 day\n💰 **Budget:** ₹5,000-8,000\n⭐ **Rating:** 4.5/5`,
        tips: ['Combine with Taj Mahal visit', 'Evening visit offers beautiful lighting', 'Wear comfortable shoes for walking'],
        images: 'https://www.google.com/search?q=agra+fort+images&tbm=isch',
        info: 'https://www.google.com/search?q=agra+fort+official+information'
    },
    'red fort': {
        name: 'Red Fort',
        state: 'Delhi',
        category: 'historic',
        price: 6500,
        response: `🔴 **Red Fort - Delhi**\n\nHistoric fort that served as the main residence of Mughal Emperors, known for its massive red sandstone walls and impressive architecture.\n\n✨ **Highlights:**\n• Light and Sound Show\n• Lahori Gate\n• Mumtaz Mahal\n• Rang Mahal\n• Pearl Mosque\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1 day\n💰 **Budget:** ₹5,000-8,000\n⭐ **Rating:** 4.5/5`,
        tips: ['Attend the evening light and sound show', 'Visit on weekdays to avoid crowds', 'Prime Minister addresses from here on Independence Day'],
        images: 'https://www.google.com/search?q=red+fort+delhi+images&tbm=isch',
        info: 'https://www.google.com/search?q=red+fort+delhi+official+information'
    },
    'amber fort': {
        name: 'Amber Fort',
        state: 'Rajasthan',
        category: 'historic',
        price: 6500,
        response: `🕌 **Amber Fort - Jaipur**\n\nMagnificent fort palace known for its artistic Hindu style elements, beautiful mirror work, and grand architecture.\n\n✨ **Highlights:**\n• Elephant Ride to entrance\n• Sheesh Mahal (Mirror Palace)\n• Sukh Niwas\n• Ganesh Pol gateway\n• Diwan-i-Aam\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1 day\n💰 **Budget:** ₹5,000-8,000\n⭐ **Rating:** 4.5/5`,
        tips: ['Take elephant ride for authentic experience', 'Visit early morning to avoid heat and crowds', 'Don\'t miss the light show in evening'],
        images: 'https://www.google.com/search?q=amber+fort+jaipur+images&tbm=isch',
        info: 'https://www.google.com/search?q=amber+fort+official+information'
    },
    'gateway of india': {
        name: 'Gateway of India',
        state: 'Maharashtra',
        category: 'historic',
        price: 6500,
        response: `🌊 **Gateway of India - Mumbai**\n\nIconic arch monument built during the 20th century, overlooking the Arabian Sea. Symbol of Mumbai and Indian history.\n\n✨ **Highlights:**\n• Marine Drive view\n• Boat rides to Elephanta Caves\n• Taj Hotel view\n• Evening lights and street food\n\n📅 **Best Time:** November to February\n⏰ **Duration:** 1 day\n💰 **Budget:** ₹5,000-8,000\n⭐ **Rating:** 4.3/5`,
        tips: ['Visit during sunset for beautiful views', 'Try street food at nearby stalls', 'Take boat ride to Elephanta Caves'],
        images: 'https://www.google.com/search?q=gateway+of+india+mumbai+images&tbm=isch',
        info: 'https://www.google.com/search?q=gateway+of+india+official+information'
    },
    'victoria memorial': {
        name: 'Victoria Memorial',
        state: 'West Bengal',
        category: 'historic',
        price: 6000,
        response: `🏛️ **Victoria Memorial - Kolkata**\n\nMagnificent white marble building dedicated to Queen Victoria, showcasing colonial architecture and history.\n\n✨ **Highlights:**\n• Light and sound show\n• Museum with historical artifacts\n• Beautiful gardens\n• Colonial history exhibits\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1 day\n💰 **Budget:** ₹5,000-7,000\n⭐ **Rating:** 4.4/5`,
        tips: ['Visit museum for historical insights', 'Evening light show is must-see', 'Enjoy stroll in surrounding gardens'],
        images: 'https://www.google.com/search?q=victoria+memorial+kolkata+images&tbm=isch',
        info: 'https://www.google.com/search?q=victoria+memorial+official+information'
    },
    'hampi': {
        name: 'Hampi Ruins',
        state: 'Karnataka',
        category: 'historic',
        price: 7000,
        response: `🏺 **Hampi Ruins**\n\nUNESCO World Heritage site with ancient ruins of Vijayanagara Empire's capital, featuring magnificent stone structures and temples.\n\n✨ **Highlights:**\n• Virupaksha Temple\n• Stone Chariot\n• Lotus Mahal\n• Sunset points\n• Ancient market ruins\n\n📅 **Best Time:** October to February\n⏰ **Duration:** 2-3 days\n💰 **Budget:** ₹4,000-10,000\n⭐ **Rating:** 4.6/5`,
        tips: ['Rent bicycle for easy exploration', 'Visit during sunrise and sunset', 'Carry water and sun protection'],
        images: 'https://www.google.com/search?q=hampi+ruins+images&tbm=isch',
        info: 'https://www.google.com/search?q=hampi+official+information'
    },
    'khajuraho': {
        name: 'Khajuraho Temples',
        state: 'Madhya Pradesh',
        category: 'historic',
        price: 5500,
        response: `🛕 **Khajuraho Temples**\n\nUNESCO site famous for ancient Hindu and Jain temples with intricate and detailed erotic carvings and sculptures.\n\n✨ **Highlights:**\n• Kandariya Mahadeva Temple\n• Light and sound show\n• Sculpture museum\n• Ancient art and architecture\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1-2 days\n💰 **Budget:** ₹3,000-8,000\n⭐ **Rating:** 4.5/5`,
        tips: ['Hire guide to understand symbolism', 'Visit light and sound show', 'Respect religious sentiments'],
        images: 'https://www.google.com/search?q=khajuraho+temples+images&tbm=isch',
        info: 'https://www.google.com/search?q=khajuraho+official+information'
    },
    'ellora caves': {
        name: 'Ellora Caves',
        state: 'Maharashtra',
        category: 'historic',
        price: 5000,
        response: `⛰️ **Ellora Caves**\n\nUNESCO World Heritage Site featuring spectacular rock-cut cave temples and monasteries from ancient times.\n\n✨ **Highlights:**\n• Kailasa Temple (Cave 16)\n• Buddhist caves\n• Jain caves\n• Rock-cut architecture\n\n📅 **Best Time:** June to March\n⏰ **Duration:** 1-2 days\n💰 **Budget:** ₹3,000-7,000\n⭐ **Rating:** 4.7/5`,
        tips: ['Start with Buddhist caves', 'Kailasa Temple requires most time', 'Carry water and wear comfortable shoes'],
        images: 'https://www.google.com/search?q=ellora+caves+images&tbm=isch',
        info: 'https://www.google.com/search?q=ellora+caves+official+information'
    },
    'ajanta caves': {
        name: 'Ajanta Caves',
        state: 'Maharashtra',
        category: 'historic',
        price: 5000,
        response: `🎨 **Ajanta Caves**\n\nUNESCO World Heritage site with ancient Buddhist rock-cut cave monuments and beautiful paintings dating back to 2nd century BCE.\n\n✨ **Highlights:**\n• Ancient Buddhist paintings\n• Rock-cut architecture\n• Sculptures of Buddha\n• Historical significance\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1 day\n💰 **Budget:** ₹3,000-7,000\n⭐ **Rating:** 4.6/5`,
        tips: ['Visit with guide for better understanding', 'No photography allowed inside caves', 'Combine with Ellora Caves visit'],
        images: 'https://www.google.com/search?q=ajanta+caves+images&tbm=isch',
        info: 'https://www.google.com/search?q=ajanta+caves+official+information'
    },

    // Beach Destinations (21-30)
    'goa': {
        name: 'Goa',
        state: 'Goa',
        category: 'beach',
        price: 4500,
        response: `🏖️ **Goa - Beach Paradise**\n\nFamous for its golden beaches, Portuguese heritage, vibrant nightlife, and delicious seafood cuisine.\n\n✨ **Popular Beaches:**\n• Calangute - Most popular beach\n• Baga - Nightlife and water sports\n• Anjuna - Flea markets and parties\n• Palolem - Scenic and peaceful\n• Vagator - Cliff views\n\n📅 **Best Time:** November to February\n⏰ **Duration:** 3-5 days\n💰 **Budget:** ₹4,000-8,000\n⭐ **Rating:** 4.5/5`,
        tips: ['Rent a scooter for beach hopping', 'Try local fish curry rice', 'Visit Portuguese churches in Old Goa', 'Experience Wednesday flea market at Anjuna'],
        images: 'https://www.google.com/search?q=goa+beaches+images&tbm=isch',
        info: 'https://www.google.com/search?q=goa+tourism+official+travel+guide'
    },
    'andaman': {
        name: 'Andaman Islands',
        state: 'Andaman and Nicobar Islands',
        category: 'beach',
        price: 6000,
        response: `🏝️ **Andaman Islands**\n\nTropical paradise with crystal-clear waters, white sandy beaches, and excellent snorkeling and diving opportunities.\n\n✨ **Must Visit:**\n• Radhanagar Beach - Asia's best beach\n• Cellular Jail - Historical significance\n• Havelock Island - Diving and snorkeling\n• Neil Island - Peaceful beaches\n• Baratang Island - Limestone caves\n\n📅 **Best Time:** October to May\n⏰ **Duration:** 5-7 days\n💰 **Budget:** ₹8,000-15,000\n⭐ **Rating:** 4.8/5`,
        tips: ['Book ferry tickets in advance', 'Try scuba diving at Havelock', 'Visit Cellular Jail light and sound show', 'Carry cash as ATMs are limited'],
        images: 'https://www.google.com/search?q=andaman+islands+beaches+images&tbm=isch',
        info: 'https://www.google.com/search?q=andaman+tourism+official+guide'
    },
    'alibaug': {
        name: 'Alibaug Beaches',
        state: 'Maharashtra',
        category: 'beach',
        price: 4000,
        response: `🌊 **Alibaug Beaches**\n\nCoastal town with pristine beaches, historic forts, and perfect weekend getaway spots near Mumbai.\n\n✨ **Beach Experience:**\n• Beach activities and water sports\n• Kolaba Fort access during low tide\n• Clean sandy beaches\n• Fresh seafood restaurants\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1-2 days\n💰 **Budget:** ₹3,000-6,000\n⭐ **Rating:** 4.2/5`,
        tips: ['Visit Kolaba Fort during low tide', 'Try local seafood delicacies', 'Perfect weekend getaway from Mumbai'],
        images: 'https://www.google.com/search?q=alibaug+beaches+images&tbm=isch',
        info: 'https://www.google.com/search?q=alibaug+tourism+official+guide'
    },
    'ganpatipule': {
        name: 'Ganpatipule',
        state: 'Maharashtra',
        category: 'beach',
        price: 5000,
        response: `🌅 **Ganpatipule**\n\nBeautiful beach destination with a self-originated Ganesha idol and pristine shores along Konkan coast.\n\n✨ **Spiritual Beach:**\n• Swayambhu Ganesha Temple\n• White sand beach\n• Beautiful sunset views\n• Peaceful atmosphere\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1-2 days\n💰 **Budget:** ₹4,000-8,000\n⭐ **Rating:** 4.3/5`,
        tips: ['Visit the ancient Ganesha temple', 'Enjoy beach sunset', 'Try Konkani seafood cuisine'],
        images: 'https://www.google.com/search?q=ganpatipule+beach+images&tbm=isch',
        info: 'https://www.google.com/search?q=ganpatipule+tourism+official+guide'
    },

    // Spiritual Destinations (31-50)
    'varanasi': {
        name: 'Varanasi',
        state: 'Uttar Pradesh',
        category: 'spiritual',
        price: 4000,
        response: `🕉️ **Varanasi - Spiritual Capital**\n\nOne of the world's oldest continuously inhabited cities, spiritual heart of India on the banks of Ganges River.\n\n✨ **Spiritual Experiences:**\n• Ganga Aarti at Dashashwamedh Ghat\n• Boat ride on Ganges at sunrise\n• Visit Kashi Vishwanath Temple\n• Walk through narrow ancient lanes\n• Witness funeral ceremonies at Manikarnika Ghat\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 2-3 days\n💰 **Budget:** ₹3,000-6,000\n⭐ **Rating:** 4.7/5`,
        tips: ['Attend early morning Ganga Aarti', 'Take boat ride at sunrise', 'Respect photography restrictions at ghats', 'Try local street food and sweets'],
        images: 'https://www.google.com/search?q=varanasi+ghats+images&tbm=isch',
        info: 'https://www.google.com/search?q=varanasi+tourism+official+guide'
    },
    'golden temple': {
        name: 'Golden Temple',
        state: 'Punjab',
        category: 'spiritual',
        price: 3000,
        response: `🕌 **Golden Temple - Amritsar**\n\nHoliest Gurdwara of Sikhism, known for its stunning golden architecture, peaceful atmosphere, and community kitchen serving free meals.\n\n✨ **Experience:**\n• Spiritual atmosphere and prayers\n• Langar (community meal) experience\n• Sarovar (holy tank) visit\n• Sikh Museum\n• Nighttime illumination\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1-2 days\n💰 **Budget:** ₹2,000-5,000\n⭐ **Rating:** 4.8/5`,
        tips: ['Cover head before entering', 'Participate in Langar service', 'Visit during early morning or evening', 'Combine with Wagah Border ceremony'],
        images: 'https://www.google.com/search?q=golden+temple+amritsar+images&tbm=isch',
        info: 'https://www.google.com/search?q=golden+temple+official+information'
    },
    'meenakshi temple': {
        name: 'Meenakshi Temple',
        state: 'Tamil Nadu',
        category: 'spiritual',
        price: 4750,
        response: `🛕 **Meenakshi Temple - Madurai**\n\nMagnificent temple complex famous for its Dravidian architecture and colorful gopurams (tower gateways).\n\n✨ **Architectural Marvel:**\n• Colorful gopurams\n• Intricate sculptures\n• Temple tank\n• Hall of Thousand Pillars\n• Daily rituals and festivals\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1-2 days\n💰 **Budget:** ₹2,500-7,000\n⭐ **Rating:** 4.6/5`,
        tips: ['Visit during temple festivals', 'Marvel at evening ceremony', 'Respect temple dress code', 'Hire guide for architectural insights'],
        images: 'https://www.google.com/search?q=meenakshi+temple+images&tbm=isch',
        info: 'https://www.google.com/search?q=meenakshi+temple+official+information'
    },
    'tirupati': {
        name: 'Tirupati Balaji Temple',
        state: 'Andhra Pradesh',
        category: 'spiritual',
        price: 0,
        response: `🙏 **Tirupati Balaji Temple**\n\nOne of the richest and most visited religious sites in the world, dedicated to Lord Venkateswara.\n\n✨ **Spiritual Journey:**\n• Divine darshan experience\n• Laddu prasadam\n• Queue complex facilities\n• Temple architecture\n• Hill surroundings\n\n📅 **Best Time:** September to March\n⏰ **Duration:** 1-2 days\n💰 **Budget:** Free (Donation based)\n⭐ **Rating:** 4.8/5`,
        tips: ['Book darshan tickets online', 'Follow queue system patiently', 'Respect temple traditions', 'Carry minimal belongings'],
        images: 'https://www.google.com/search?q=tirupati+temple+images&tbm=isch',
        info: 'https://www.google.com/search?q=tirupati+official+information'
    },
    'akshardham': {
        name: 'Akshardham Temple',
        state: 'Delhi',
        category: 'spiritual',
        price: 0,
        response: `💎 **Akshardham Temple - Delhi**\n\nModern temple complex known for its intricate carvings, exhibitions, and architectural grandeur.\n\n✨ **Modern Spirituality:**\n• Intricate carvings and architecture\n• Water show and exhibitions\n• Beautiful gardens\n• Cultural programs\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1 day\n💰 **Budget:** Free\n⭐ **Rating:** 4.7/5`,
        tips: ['Don\'t miss the water show', 'Visit exhibitions for cultural insights', 'Respect photography restrictions', 'Arrive early to avoid crowds'],
        images: 'https://www.google.com/search?q=akshardham+temple+delhi+images&tbm=isch',
        info: 'https://www.google.com/search?q=akshardham+official+information'
    },

    // Nature & Hill Stations (51-70)
    'kerala': {
        name: 'Kerala',
        state: 'Kerala',
        category: 'nature',
        price: 8000,
        response: `🌴 **Kerala - God's Own Country**\n\nKnown for serene backwaters, lush hill stations, Ayurvedic treatments, and rich cultural heritage.\n\n✨ **Must Experience:**\n• Houseboat stay in Alleppey backwaters\n• Tea plantations in Munnar\n• Kathakali dance performances\n• Beaches of Kovalam and Varkala\n• Wildlife in Periyar National Park\n\n📅 **Best Time:** September to March\n⏰ **Duration:** 5-7 days\n💰 **Budget:** ₹6,000-12,000\n⭐ **Rating:** 4.6/5`,
        tips: ['Book houseboats in advance during season', 'Try Ayurvedic massage treatments', 'Experience traditional Kerala sadhya meal', 'Visit during Onam festival for cultural experience'],
        images: 'https://www.google.com/search?q=kerala+backwaters+images&tbm=isch',
        info: 'https://www.google.com/search?q=kerala+tourism+official+guide'
    },
    'ladakh': {
        name: 'Ladakh',
        state: 'Ladakh',
        category: 'adventure',
        price: 12000,
        response: `🏔️ **Ladakh - Adventure Paradise**\n\nHigh-altitude cold desert with stunning landscapes, Buddhist monasteries, and adventure activities.\n\n✨ **Adventure & Culture:**\n• Pangong Lake - Famous blue lake\n• Nubra Valley - Sand dunes and double-humped camels\n• Monasteries - Hemis, Thiksey, Diskit\n• Magnetic Hill - Optical illusion\n• Khardung La - World's highest motorable road\n\n📅 **Best Time:** May to September\n⏰ **Duration:** 7-10 days\n💰 **Budget:** ₹10,000-20,000\n⭐ **Rating:** 4.8/5`,
        tips: ['Acclimatize properly to avoid AMS', 'Carry warm clothes even in summer', 'Get inner line permits for restricted areas', 'Rent bikes for best exploration'],
        images: 'https://www.google.com/search?q=ladakh+pangong+lake+images&tbm=isch',
        info: 'https://www.google.com/search?q=ladakh+tourism+official+guide'
    },
    'manali': {
        name: 'Manali',
        state: 'Himachal Pradesh',
        category: 'hill station',
        price: 7000,
        response: `⛰️ **Manali - Adventure Hub**\n\nPopular Himalayan hill station offering skiing, trekking, paragliding, and stunning mountain views.\n\n✨ **Adventure Activities:**\n• Skiing in Solang Valley\n• Paragliding over valleys\n• River rafting in Beas River\n• Trekking to Hampta Pass\n• Visiting ancient Hadimba Temple\n\n📅 **Best Time:** October to June\n⏰ **Duration:** 3-4 days\n💰 **Budget:** ₹5,000-10,000\n⭐ **Rating:** 4.5/5`,
        tips: ['Carry woolens even in summer', 'Book adventure activities with licensed operators', 'Visit Rohtang Pass for snow experience', 'Try local Himachali cuisine'],
        images: 'https://www.google.com/search?q=manali+hill+station+images&tbm=isch',
        info: 'https://www.google.com/search?q=manali+tourism+official+guide'
    },
    'shimla': {
        name: 'Shimla',
        state: 'Himachal Pradesh',
        category: 'hill station',
        price: 5000,
        response: `🏞️ **Shimla - Queen of Hill Stations**\n\nBritish-era hill station with colonial architecture, toy train, and scenic beauty of Himalayas.\n\n✨ **Colonial Charm:**\n• Mall Road shopping and walks\n• Christ Church\n• Toy train journey\n• Winter sports\n• Colonial architecture\n\n📅 **Best Time:** March to June\n⏰ **Duration:** 2-3 days\n💰 **Budget:** ₹4,000-7,000\n⭐ **Rating:** 4.4/5`,
        tips: ['Take toy train from Kalka', 'Walk on Mall Road during evening', 'Visit during winter for snow', 'Try local Himachali dishes'],
        images: 'https://www.google.com/search?q=shimla+hill+station+images&tbm=isch',
        info: 'https://www.google.com/search?q=shimla+tourism+official+guide'
    },
    'darjeeling': {
        name: 'Darjeeling',
        state: 'West Bengal',
        category: 'hill station',
        price: 5500,
        response: `🍃 **Darjeeling - Queen of Hills**\n\nFamous for tea gardens, toy train, and stunning views of Kanchenjunga peak.\n\n✨ **Experiences:**\n• Toy train ride through hills\n• Tea garden tours and tasting\n• Tiger Hill sunrise view\n• Buddhist monastery visits\n• Local market exploration\n\n📅 **Best Time:** March to May, September to November\n⏰ **Duration:** 3-4 days\n💰 **Budget:** ₹4,000-8,000\n⭐ **Rating:** 4.5/5`,
        tips: ['Book toy train tickets in advance', 'Wake up early for Tiger Hill sunrise', 'Buy authentic Darjeeling tea from gardens', 'Carry warm clothes'],
        images: 'https://www.google.com/search?q=darjeeling+tea+gardens+images&tbm=isch',
        info: 'https://www.google.com/search?q=darjeeling+tourism+official+guide'
    },
    'munnar': {
        name: 'Munnar',
        state: 'Kerala',
        category: 'hill station',
        price: 6000,
        response: `🌿 **Munnar - Tea Gardens**\n\nBeautiful hill station known for sprawling tea plantations, misty mountains, and pleasant climate.\n\n✨ **Tea Experience:**\n• Tea plantation tours\n• Tea museum visit\n• Eravikulam National Park\n• Mattupetty Dam\n• Spice plantation visits\n\n📅 **Best Time:** September to May\n⏰ **Duration:** 2-3 days\n💰 **Budget:** ₹5,000-9,000\n⭐ **Rating:** 4.6/5`,
        tips: ['Visit tea factories for processing demo', 'Carry umbrella for sudden rains', 'Try different tea varieties', 'Visit during blooming season for Neelakurinji flowers'],
        images: 'https://www.google.com/search?q=munnar+tea+gardens+images&tbm=isch',
        info: 'https://www.google.com/search?q=munnar+tourism+official+guide'
    },
    'coorg': {
        name: 'Coorg',
        state: 'Karnataka',
        category: 'hill station',
        price: 6500,
        response: `☕ **Coorg - Scotland of India**\n\nPicturesque hill station famous for coffee plantations, misty hills, and rich Kodava culture.\n\n✨ **Coffee Experience:**\n• Coffee plantation stays\n• Abbey Falls\n• Raja's Seat viewpoint\n• Tibetan settlement at Bylakuppe\n• Adventure activities\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 3-4 days\n💰 **Budget:** ₹5,000-10,000\n⭐ **Rating:** 4.5/5`,
        tips: ['Stay in plantation resorts', 'Try local Kodava cuisine', 'Visit during coffee blossom season', 'Carry light woolens'],
        images: 'https://www.google.com/search?q=coorg+coffee+plantations+images&tbm=isch',
        info: 'https://www.google.com/search?q=coorg+tourism+official+guide'
    },
    'ooty': {
        name: 'Ooty',
        state: 'Tamil Nadu',
        category: 'hill station',
        price: 5500,
        response: `🌲 **Ooty - Queen of Nilgiris**\n\nPopular hill station in Nilgiri hills known for botanical gardens, tea estates, and pleasant weather.\n\n✨ **Nilgiri Experience:**\n• Botanical Gardens\n• Ooty Lake boating\n• Toy train journey\n• Tea factory visits\n• Doddabetta Peak views\n\n📅 **Best Time:** April to June, September to November\n⏰ **Duration:** 2-3 days\n💰 **Budget:** ₹4,000-8,000\n⭐ **Rating:** 4.4/5`,
        tips: ['Take toy train from Coonoor', 'Visit botanical gardens', 'Try local homemade chocolates', 'Carry light jackets'],
        images: 'https://www.google.com/search?q=ooty+hill+station+images&tbm=isch',
        info: 'https://www.google.com/search?q=ooty+tourism+official+guide'
    },

    // Wildlife Destinations (71-85)
    'corbett': {
        name: 'Jim Corbett National Park',
        state: 'Uttarakhand',
        category: 'wildlife',
        price: 9000,
        response: `🐅 **Jim Corbett National Park**\n\nIndia's first national park and famous tiger reserve, home to Bengal tigers, elephants, and diverse wildlife.\n\n✨ **Wildlife Experience:**\n• Jeep safaris in different zones\n• Elephant safaris for tiger tracking\n• Bird watching with 600+ species\n• Dhikala zone for best wildlife viewing\n• Corbett Museum and waterfalls\n\n📅 **Best Time:** November to June\n⏰ **Duration:** 2-3 days\n💰 **Budget:** ₹6,000-12,000\n⭐ **Rating:** 4.6/5`,
        tips: ['Book safari permits months in advance', 'Stay inside park for best experience', 'Carry binoculars and cameras', 'Follow all park rules and guidelines'],
        images: 'https://www.google.com/search?q=jim+corbett+national+park+images&tbm=isch',
        info: 'https://www.google.com/search?q=corbett+national+park+official+information'
    },
    'kaziranga': {
        name: 'Kaziranga National Park',
        state: 'Assam',
        category: 'wildlife',
        price: 10000,
        response: `🦏 **Kaziranga National Park**\n\nUNESCO World Heritage Site famous for one-horned rhinoceros and rich biodiversity in Brahmaputra floodplains.\n\n✨ **Wildlife Highlights:**\n• One-horned rhinoceros population\n• Elephant safaris through grasslands\n• Tiger sightings\n• Bird sanctuary with migratory birds\n• River Brahmaputra views\n\n📅 **Best Time:** November to April\n⏰ **Duration:** 2-3 days\n💰 **Budget:** ₹8,000-15,000\n⭐ **Rating:** 4.7/5`,
        tips: ['Elephant safari for close rhino encounters', 'Visit during elephant festival in February', 'Carry mosquito repellent', 'Book accommodations in advance'],
        images: 'https://www.google.com/search?q=kaziranga+national+park+images&tbm=isch',
        info: 'https://www.google.com/search?q=kaziranga+national+park+official+information'
    },
    'gir': {
        name: 'Gir National Park',
        state: 'Gujarat',
        category: 'wildlife',
        price: 8500,
        response: `🦁 **Gir National Park**\n\nThe only place in the world where you can see Asiatic lions in their natural habitat.\n\n✨ **Lion Experience:**\n• Asiatic lion sightings\n• Jeep safaris\n• Crocodile breeding center\n• Bird watching\n• Devalia Safari Park\n\n📅 **Best Time:** December to March\n⏰ **Duration:** 2-3 days\n💰 **Budget:** ₹7,000-12,000\n⭐ **Rating:** 4.7/5`,
        tips: ['Book safari permits early', 'Early morning safaris for best sightings', 'Visit crocodile breeding center', 'Follow all safety guidelines'],
        images: 'https://www.google.com/search?q=gir+national+park+images&tbm=isch',
        info: 'https://www.google.com/search?q=gir+national+park+official+information'
    },
    'sundarbans': {
        name: 'Sundarbans National Park',
        state: 'West Bengal',
        category: 'wildlife',
        price: 11000,
        response: `🌿 **Sundarbans National Park**\n\nUNESCO World Heritage Site and world's largest mangrove forest, famous for Royal Bengal Tigers.\n\n✨ **Mangrove Experience:**\n• Boat safaris through mangroves\n• Royal Bengal Tiger sightings\n• Bird watching\n• River dolphins\n• Mangrove ecosystem\n\n📅 **Best Time:** September to March\n⏰ **Duration:** 3-4 days\n💰 **Budget:** ₹9,000-16,000\n⭐ **Rating:** 4.6/5`,
        tips: ['Boat safaris are main attraction', 'Carry binoculars for bird watching', 'Visit during winter for better sightings', 'Follow all safety instructions'],
        images: 'https://www.google.com/search?q=sundarbans+national+park+images&tbm=isch',
        info: 'https://www.google.com/search?q=sundarbans+national+park+official+information'
    },
    'ranthambore': {
        name: 'Ranthambore National Park',
        state: 'Rajasthan',
        category: 'wildlife',
        price: 9500,
        response: `🐯 **Ranthambore National Park**\n\nFamous for its tiger population and the historic Ranthambore Fort within the park.\n\n✨ **Tiger Territory:**\n• Tiger sightings and photography\n• Ranthambore Fort visit\n• Lakes and reservoirs\n• Bird watching\n• Canyon rides\n\n📅 **Best Time:** October to June\n⏰ **Duration:** 2-3 days\n💰 **Budget:** ₹8,000-14,000\n⭐ **Rating:** 4.6/5`,
        tips: ['Book safari in different zones', 'Visit fort for panoramic views', 'Carry camera with zoom lens', 'Early morning safaris are best'],
        images: 'https://www.google.com/search?q=ranthambore+national+park+images&tbm=isch',
        info: 'https://www.google.com/search?q=ranthambore+national+park+official+information'
    },
    'periyar': {
        name: 'Periyar National Park',
        state: 'Kerala',
        category: 'wildlife',
        price: 7000,
        response: `🐘 **Periyar National Park**\n\nFamous for its artificial Periyar Lake and boat safaris to spot elephants, tigers, and diverse wildlife.\n\n✨ **Lake Safari Experience:**\n• Boat safaris on Periyar Lake\n• Elephant sightings\n• Spice plantations nearby\n• Bamboo rafting\n• Jungle patrol tours\n\n📅 **Best Time:** September to April\n⏰ **Duration:** 2 days\n💰 **Budget:** ₹6,000-10,000\n⭐ **Rating:** 4.5/5`,
        tips: ['Boat safari for wildlife viewing', 'Visit spice plantations', 'Try bamboo rafting experience', 'Carry light rain protection'],
        images: 'https://www.google.com/search?q=periyar+national+park+images&tbm=isch',
        info: 'https://www.google.com/search?q=periyar+national+park+official+information'
    },
    'bandipur': {
        name: 'Bandipur National Park',
        state: 'Karnataka',
        category: 'wildlife',
        price: 6500,
        response: `🌳 **Bandipur National Park**\n\nPart of Nilgiri Biosphere Reserve and Project Tiger, known for its healthy tiger population.\n\n✨ **Nilgiri Wildlife:**\n• Tiger and leopard sightings\n• Elephant herds\n• Bird watching\n• Nature walks\n• Mysore proximity\n\n📅 **Best Time:** October to May\n⏰ **Duration:** 2 days\n💰 **Budget:** ₹5,000-9,000\n⭐ **Rating:** 4.4/5`,
        tips: ['Combine with Mysore visit', 'Early morning safaris recommended', 'Carry binoculars for birding', 'Stay in jungle resorts for experience'],
        images: 'https://www.google.com/search?q=bandipur+national+park+images&tbm=isch',
        info: 'https://www.google.com/search?q=bandipur+national+park+official+information'
    },
    'kanha': {
        name: 'Kanha National Park',
        state: 'Madhya Pradesh',
        category: 'wildlife',
        price: 8000,
        response: `📚 **Kanha National Park**\n\nInspiration for Rudyard Kipling's "The Jungle Book", famous for hard-ground barasingha deer.\n\n✨ **Jungle Book Experience:**\n• Tiger sightings\n• Barasingha deer\n• Bamni Dadar sunset point\n• Elephant safaris\n• Jungle Book connection\n\n📅 **Best Time:** October to June\n⏰ **Duration:** 2-3 days\n💰 **Budget:** ₹7,000-12,000\n⭐ **Rating:** 4.5/5`,
        tips: ['Visit Bamni Dadar for sunset', 'Look for barasingha deer', 'Read Jungle Book before visit', 'Book safaris in core zones'],
        images: 'https://www.google.com/search?q=kanha+national+park+images&tbm=isch',
        info: 'https://www.google.com/search?q=kanha+national+park+official+information'
    },

    // Adventure Destinations (86-100+)
    'rishikesh': {
        name: 'Rishikesh',
        state: 'Uttarakhand',
        category: 'adventure',
        price: 5000,
        response: `🧘 **Rishikesh - Yoga Capital**\n\nSpiritual town on Ganges river, world-renowned for yoga, meditation, and adventure activities.\n\n✨ **Spiritual & Adventure:**\n• Yoga and meditation ashrams\n• White-water rafting on Ganges\n• Beatles Ashram visit\n• Evening Ganga Aarti\n• Bungee jumping and giant swing\n\n📅 **Best Time:** September to November, February to May\n⏰ **Duration:** 2-3 days\n💰 **Budget:** ₹3,000-8,000\n⭐ **Rating:** 4.6/5`,
        tips: ['Attend yoga sessions at Parmarth Niketan', 'Try river rafting with licensed operators', 'Visit Lakshman Jhula and Ram Jhula', 'Respect ashram rules and dress codes'],
        images: 'https://www.google.com/search?q=rishikesh+yoga+capital+images&tbm=isch',
        info: 'https://www.google.com/search?q=rishikesh+tourism+official+guide'
    },
    'bir billing': {
        name: 'Bir Billing',
        state: 'Himachal Pradesh',
        category: 'adventure',
        price: 6000,
        response: `🪂 **Bir Billing - Paragliding Capital**\n\nWorld famous paragliding destination with one of the best thermals in the world.\n\n✨ **Adventure Sports:**\n• Paragliding from Billing\n• Hang gliding\n• Tandem flights\n• Tibetan culture exploration\n• Monastery visits\n\n📅 **Best Time:** March to June, September to November\n⏰ **Duration:** 2-3 days\n💰 **Budget:** ₹5,000-10,000\n⭐ **Rating:** 4.7/5`,
        tips: ['Book paragliding with certified operators', 'Carry action camera for videos', 'Visit Tibetan colonies', 'Try local Tibetan cuisine'],
        images: 'https://www.google.com/search?q=bir+billing+paragliding+images&tbm=isch',
        info: 'https://www.google.com/search?q=bir+billing+official+information'
    },
    'auli': {
        name: 'Auli',
        state: 'Uttarakhand',
        category: 'adventure',
        price: 9000,
        response: `⛷️ **Auli - Skiing Destination**\n\nIndia's premier skiing destination with long slopes, ski lifts, and stunning views of Nanda Devi peak.\n\n✨ **Winter Sports:**\n• Skiing lessons and slopes\n• Cable car rides\n• Snow views and photography\n• Winter sports equipment\n• Nanda Devi views\n\n📅 **Best Time:** December to March\n⏰ **Duration:** 3-4 days\n💰 **Budget:** ₹8,000-15,000\n⭐ **Rating:** 4.6/5`,
        tips: ['Book skiing equipment in advance', 'Take professional lessons', 'Carry warm clothing', 'Enjoy cable car rides for views'],
        images: 'https://www.google.com/search?q=auli+skiing+images&tbm=isch',
        info: 'https://www.google.com/search?q=auli+official+information'
    },
    'gulmarg': {
        name: 'Gulmarg',
        state: 'Jammu & Kashmir',
        category: 'adventure',
        price: 11000,
        response: `🎿 **Gulmarg - Winter Wonderland**\n\nKashmir's premier skiing destination with one of the highest gondolas in the world.\n\n✨ **Winter Paradise:**\n• Skiing on powdery slopes\n• Gulmarg Gondola rides\n• Snowboarding\n• Ice skating\n• Winter trekking\n\n📅 **Best Time:** December to March\n⏰ **Duration:** 3-4 days\n💰 **Budget:** ₹9,000-18,000\n⭐ **Rating:** 4.7/5`,
        tips: ['Book gondola tickets early', 'Hire professional instructors', 'Carry proper winter gear', 'Visit during snowfall for best experience'],
        images: 'https://www.google.com/search?q=gulmarg+skiing+images&tbm=isch',
        info: 'https://www.google.com/search?q=gulmarg+official+information'
    },
        // Continue from previous code...

    // Spiritual Jyotirlingas (101-112)
    'somnath': {
        name: 'Somnath Temple',
        state: 'Gujarat',
        category: 'spiritual',
        price: 0,
        response: `🌊 **Somnath Temple - First Jyotirlinga**\n\nThe first among the twelve Jyotirlingas, located on the western coast of Gujarat. One of the most sacred pilgrimage sites.\n\n✨ **Spiritual Significance:**\n• First Jyotirlinga of Shiva\n• Aarti ceremony by sea\n• Light and sound show\n• Beach view and temple complex\n• Historical reconstructions\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1 day\n💰 **Budget:** Free\n⭐ **Rating:** 4.7/5`,
        tips: ['Attend evening aarti ceremony', 'Visit light and sound show', 'Respect temple traditions', 'Combine with nearby beaches'],
        images: 'https://www.google.com/search?q=somnath+temple+images&tbm=isch',
        info: 'https://www.google.com/search?q=somnath+temple+official+information'
    },
    'mallikarjuna': {
        name: 'Mallikarjuna Temple',
        state: 'Andhra Pradesh',
        category: 'spiritual',
        price: 0,
        response: `⛰️ **Mallikarjuna Temple - Srisailam**\n\nOne of the twelve Jyotirlingas located on Shri Shaila Mountain by the Krishna River.\n\n✨ **Mountain Spirituality:**\n• Jyotirlinga on mountain\n• River Krishna views\n• Ancient architecture\n• Forest surroundings\n• Pilgrimage significance\n\n📅 **Best Time:** October to February\n⏰ **Duration:** 1-2 days\n💰 **Budget:** Free\n⭐ **Rating:** 4.5/5`,
        tips: ['Visit during Mahashivratri', 'Carry water for mountain climb', 'Respect local traditions', 'Enjoy natural surroundings'],
        images: 'https://www.google.com/search?q=mallikarjuna+temple+srisailam+images&tbm=isch',
        info: 'https://www.google.com/search?q=mallikarjuna+temple+official+information'
    },
    'mahakaleshwar': {
        name: 'Mahakaleshwar Temple',
        state: 'Madhya Pradesh',
        category: 'spiritual',
        price: 0,
        response: `🕉️ **Mahakaleshwar Temple - Ujjain**\n\nOne of the twelve Jyotirlingas known for its unique south-facing idol and Bhasma Aarti ritual.\n\n✨ **Unique Rituals:**\n• Bhasma Aarti with sacred ashes\n• South-facing linga\n• Sacred pond\n• Historical city\n• Simhastha Kumbh site\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1 day\n💰 **Budget:** Free\n⭐ **Rating:** 4.6/5`,
        tips: ['Witness Bhasma Aarti early morning', 'Visit nearby historical sites', 'Respect ritual timings', 'Explore ancient city'],
        images: 'https://www.google.com/search?q=mahakaleshwar+temple+ujjain+images&tbm=isch',
        info: 'https://www.google.com/search?q=mahakaleshwar+temple+official+information'
    },
    'omkareshwar': {
        name: 'Omkareshwar Temple',
        state: 'Madhya Pradesh',
        category: 'spiritual',
        price: 0,
        response: `🌀 **Omkareshwar Temple**\n\nSacred island in the Narmada River shaped like the holy Om symbol, housing one of the twelve Jyotirlingas.\n\n✨ **Island Spirituality:**\n• Om-shaped island\n• Narmada River\n• Boat rides to temple\n• Natural beauty\n• Spiritual atmosphere\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1-2 days\n💰 **Budget:** Free\n⭐ **Rating:** 4.5/5`,
        tips: ['Take boat ride to island', 'Visit during sunrise', 'Respect river traditions', 'Carry minimal belongings'],
        images: 'https://www.google.com/search?q=omkareshwar+temple+images&tbm=isch',
        info: 'https://www.google.com/search?q=omkareshwar+temple+official+information'
    },
    'kedarnath': {
        name: 'Kedarnath Temple',
        state: 'Uttarakhand',
        category: 'spiritual',
        price: 0,
        response: `🏔️ **Kedarnath Temple**\n\nOne of the twelve Jyotirlingas and part of Char Dham, situated in the majestic Garhwal Himalayas.\n\n✨ **Himalayan Pilgrimage:**\n• High-altitude temple\n• Himalayan trek\n• Snow-clad peaks\n• Spiritual atmosphere\n• Adventure combined\n\n📅 **Best Time:** May to October\n⏰ **Duration:** 3-4 days\n💰 **Budget:** Free\n⭐ **Rating:** 4.8/5`,
        tips: ['Physical fitness required for trek', 'Acclimatize properly', 'Carry warm clothes', 'Follow weather updates'],
        images: 'https://www.google.com/search?q=kedarnath+temple+images&tbm=isch',
        info: 'https://www.google.com/search?q=kedarnath+temple+official+information'
    },
    'bhimashankar': {
        name: 'Bhimashankar Temple',
        state: 'Maharashtra',
        category: 'spiritual',
        price: 0,
        response: `🌳 **Bhimashankar Temple**\n\nOne of the twelve Jyotirlingas located in the Sahyadri hills, surrounded by dense forests and wildlife sanctuary.\n\n✨ **Forest Temple:**\n• Jyotirlinga in forests\n• Wildlife sanctuary\n• Ancient architecture\n• Monsoon beauty\n• Trekking routes\n\n📅 **Best Time:** August to February\n⏰ **Duration:** 1-2 days\n💰 **Budget:** Free\n⭐ **Rating:** 4.4/5`,
        tips: ['Visit during monsoon for lush greenery', 'Carry rain protection', 'Respect forest rules', 'Enjoy trekking routes'],
        images: 'https://www.google.com/search?q=bhimashankar+temple+images&tbm=isch',
        info: 'https://www.google.com/search?q=bhimashankar+temple+official+information'
    },
    'kashi vishwanath': {
        name: 'Kashi Vishwanath Temple',
        state: 'Uttar Pradesh',
        category: 'spiritual',
        price: 0,
        response: `🕉️ **Kashi Vishwanath Temple - Varanasi**\n\nOne of the most famous Jyotirlingas located in the spiritual capital of India, Varanasi.\n\n✨ **Spiritual Epicenter:**\n• Most revered Jyotirlinga\n• Ganga Aarti connection\n• Ancient city\n• Spiritual ceremonies\n• Cultural experience\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 2-3 days\n💰 **Budget:** Free\n⭐ **Rating:** 4.8/5`,
        tips: ['Combine with Ganga Aarti', 'Visit during early morning', 'Respect temple security', 'Experience spiritual atmosphere'],
        images: 'https://www.google.com/search?q=kashi+vishwanath+temple+images&tbm=isch',
        info: 'https://www.google.com/search?q=kashi+vishwanath+temple+official+information'
    },
    'trimbakeshwar': {
        name: 'Trimbakeshwar Temple',
        state: 'Maharashtra',
        category: 'spiritual',
        price: 0,
        response: `💧 **Trimbakeshwar Temple**\n\nOne of the twelve Jyotirlingas located near the source of Godavari River, known for its unique three-faced linga.\n\n✨ **River Source Temple:**\n• Godavari River source\n• Three-faced linga\n• Kumbh Mela site\n• Hill location\n• Ancient significance\n\n📅 **Best Time:** August to February\n⏰ **Duration:** 1 day\n💰 **Budget:** Free\n⭐ **Rating:** 4.5/5`,
        tips: ['Visit Godavari source', 'Respect unique linga', 'Carry water for walks', 'Explore nearby hills'],
        images: 'https://www.google.com/search?q=trimbakeshwar+temple+images&tbm=isch',
        info: 'https://www.google.com/search?q=trimbakeshwar+temple+official+information'
    },
    'vaidyanath': {
        name: 'Vaidyanath Temple',
        state: 'Jharkhand',
        category: 'spiritual',
        price: 0,
        response: `🏥 **Vaidyanath Temple - Baidyanath Dham**\n\nOne of the twelve Jyotirlingas also known as Baidyanath Dham, important pilgrimage site in Jharkhand.\n\n✨ **Healing Temple:**\n• Jyotirlinga with healing significance\n• Temple complex\n• Spiritual atmosphere\n• Cultural festivals\n• Ancient traditions\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1-2 days\n💰 **Budget:** Free\n⭐ **Rating:** 4.4/5`,
        tips: ['Visit during Shravan month', 'Participate in rituals', 'Respect local customs', 'Explore temple complex'],
        images: 'https://www.google.com/search?q=vaidyanath+temple+images&tbm=isch',
        info: 'https://www.google.com/search?q=vaidyanath+temple+official+information'
    },
    'nageshwar': {
        name: 'Nageshwar Temple',
        state: 'Gujarat',
        category: 'spiritual',
        price: 0,
        response: `🗿 **Nageshwar Temple**\n\nOne of the twelve Jyotirlingas located near Dwarka, featuring a massive 25-meter tall Shiva statue.\n\n✨ **Giant Statue Temple:**\n• Massive Shiva statue\n• Coastal location\n• Dwarka proximity\n• Ancient history\n• Spiritual significance\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1 day\n💰 **Budget:** Free\n⭐ **Rating:** 4.5/5`,
        tips: ['Visit giant Shiva statue', 'Combine with Dwarka visit', 'Enjoy coastal views', 'Respect temple timings'],
        images: 'https://www.google.com/search?q=nageshwar+temple+images&tbm=isch',
        info: 'https://www.google.com/search?q=nageshwar+temple+official+information'
    },
    'ramanathaswamy': {
        name: 'Ramanathaswamy Temple',
        state: 'Tamil Nadu',
        category: 'spiritual',
        price: 0,
        response: `🏛️ **Ramanathaswamy Temple - Rameswaram**\n\nOne of the twelve Jyotirlingas located on Rameswaram island, famous for its long corridors and sacred water tanks.\n\n✨ **Architectural Marvel:**\n• World's longest temple corridor\n• Sacred water tanks\n• Island location\n• Dravidian architecture\n• Spiritual significance\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1-2 days\n💰 **Budget:** Free\n⭐ **Rating:** 4.7/5`,
        tips: ['Walk through long corridors', 'Take sacred bath in tanks', 'Respect temple customs', 'Enjoy island beauty'],
        images: 'https://www.google.com/search?q=ramanathaswamy+temple+images&tbm=isch',
        info: 'https://www.google.com/search?q=ramanathaswamy+temple+official+information'
    },
    'grishneshwar': {
        name: 'Grishneshwar Temple',
        state: 'Maharashtra',
        category: 'spiritual',
        price: 0,
        response: `✨ **Grishneshwar Temple**\n\nThe twelfth and last Jyotirlinga located near Ellora Caves, known for its beautiful architecture.\n\n✨ **Last Jyotirlinga:**\n• Twelfth Jyotirlinga\n• Ellora Caves proximity\n• Red stone architecture\n• Ancient carvings\n• Spiritual completion\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1 day\n💰 **Budget:** Free\n⭐ **Rating:** 4.4/5`,
        tips: ['Combine with Ellora Caves visit', 'Appreciate architecture', 'Respect as last Jyotirlinga', 'Visit during festivals'],
        images: 'https://www.google.com/search?q=grishneshwar+temple+images&tbm=isch',
        info: 'https://www.google.com/search?q=grishneshwar+temple+official+information'
    },

    // Char Dham Destinations (113-116)
    'badrinath': {
        name: 'Badrinath Temple',
        state: 'Uttarakhand',
        category: 'spiritual',
        price: 0,
        response: `🏔️ **Badrinath Temple - Char Dham**\n\nOne of the four Char Dham pilgrimage sites dedicated to Lord Vishnu, situated in the Garhwal Himalayas.\n\n✨ **Himalayan Pilgrimage:**\n• Char Dham site\n• Himalayan scenery\n• Hot springs\n• Spiritual atmosphere\n• Mountain trek\n\n📅 **Best Time:** May to October\n⏰ **Duration:** 2-3 days\n💰 **Budget:** Free\n⭐ **Rating:** 4.7/5`,
        tips: ['Physical fitness required', 'Visit hot springs', 'Acclimatize properly', 'Follow weather conditions'],
        images: 'https://www.google.com/search?q=badrinath+temple+images&tbm=isch',
        info: 'https://www.google.com/search?q=badrinath+temple+official+information'
    },
    'dwarkadhish': {
        name: 'Dwarkadhish Temple',
        state: 'Gujarat',
        category: 'spiritual',
        price: 0,
        response: `🌊 **Dwarkadhish Temple - Char Dham**\n\nOne of the four Char Dham sites and ancient kingdom of Lord Krishna, located on the Gujarat coast.\n\n✨ **Krishna's Kingdom:**\n• Char Dham site\n• Krishna's capital\n• Coastal temple\n• Ancient city\n• Historical significance\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1-2 days\n💰 **Budget:** Free\n⭐ **Rating:** 4.6/5`,
        tips: ['Visit during Janmashtami', 'Explore ancient city', 'Enjoy coastal views', 'Respect temple traditions'],
        images: 'https://www.google.com/search?q=dwarkadhish+temple+images&tbm=isch',
        info: 'https://www.google.com/search?q=dwarkadhish+temple+official+information'
    },
    'jagannath': {
        name: 'Jagannath Temple',
        state: 'Odisha',
        category: 'spiritual',
        price: 0,
        response: `🎭 **Jagannath Temple - Puri**\n\nOne of the Char Dham sites famous for its annual Rath Yatra festival and unique deity traditions.\n\n✨ **Rath Yatra Temple:**\n• Char Dham site\n• Rath Yatra festival\n• Beach proximity\n• Unique traditions\n• Cultural heritage\n\n📅 **Best Time:** October to February\n⏰ **Duration:** 1-2 days\n💰 **Budget:** Free\n⭐ **Rating:** 4.7/5`,
        tips: ['Visit during Rath Yatra', 'Respect unique deity traditions', 'Combine with beach visit', 'Experience local culture'],
        images: 'https://www.google.com/search?q=jagannath+temple+puri+images&tbm=isch',
        info: 'https://www.google.com/search?q=jagannath+temple+official+information'
    },

    // Maharashtra Forts & Destinations (117-130)
    'raigad fort': {
        name: 'Raigad Fort',
        state: 'Maharashtra',
        category: 'historic',
        price: 63,
        response: `👑 **Raigad Fort - Shivaji's Capital**\n\nThe capital fort of Chhatrapati Shivaji Maharaj's kingdom, where he was crowned as the emperor.\n\n✨ **Maratha Capital:**\n• Shivaji's capital\n• Ropeway ride access\n• Coronation spot\n• Queen's quarters\n• Historical significance\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1 day\n💰 **Budget:** ₹25-100\n⭐ **Rating:** 4.5/5`,
        tips: ['Take ropeway for easy access', 'Visit coronation spot', 'Carry water and snacks', 'Wear comfortable shoes'],
        images: 'https://www.google.com/search?q=raigad+fort+images&tbm=isch',
        info: 'https://www.google.com/search?q=raigad+fort+official+information'
    },
    'sinhagad fort': {
        name: 'Sinhagad Fort',
        state: 'Maharashtra',
        category: 'historic',
        price: 35,
        response: `🦁 **Sinhagad Fort - Lion's Fort**\n\nFormerly known as Kondhana, this fort witnessed the brave battle of Tanaji Malusare.\n\n✨ **Battle Fort:**\n• Tanaji Malusare battle\n• Trekking trails\n• Historical battle site\n• Pune valley views\n• Monsoon beauty\n\n📅 **Best Time:** July to February\n⏰ **Duration:** 1 day\n💰 **Budget:** ₹20-50\n⭐ **Rating:** 4.4/5`,
        tips: ['Trek during early morning', 'Carry water and energy food', 'Enjoy monsoon greenery', 'Visit battle memorial'],
        images: 'https://www.google.com/search?q=sinhagad+fort+images&tbm=isch',
        info: 'https://www.google.com/search?q=sinhagad+fort+official+information'
    },
    'pratapgad fort': {
        name: 'Pratapgad Fort',
        state: 'Maharashtra',
        category: 'historic',
        price: 40,
        response: `⚔️ **Pratapgad Fort - Battle Site**\n\nThe fort where Chhatrapati Shivaji Maharaj defeated Afzal Khan, turning point in Maratha history.\n\n✨ **Historic Battle:**\n• Afzal Khan battle site\n• Bhavani Temple\n• Valley views\n• Historical importance\n• Strategic location\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1 day\n💰 **Budget:** ₹20-60\n⭐ **Rating:** 4.3/5`,
        tips: ['Visit battle site', 'See Bhavani Temple', 'Enjoy valley views', 'Learn historical significance'],
        images: 'https://www.google.com/search?q=pratapgad+fort+images&tbm=isch',
        info: 'https://www.google.com/search?q=pratapgad+fort+official+information'
    },
    'shivneri fort': {
        name: 'Shivneri Fort',
        state: 'Maharashtra',
        category: 'historic',
        price: 28,
        response: `👶 **Shivneri Fort - Birthplace**\n\nThe birthplace of Chhatrapati Shivaji Maharaj, located in Junnar with ancient Buddhist caves nearby.\n\n✨ **Birthplace Heritage:**\n• Shivaji's birthplace\n• Ancient caves\n• Historical significance\n• Hill fort\n• Buddhist heritage\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1 day\n💰 **Budget:** ₹15-40\n⭐ **Rating:** 4.2/5`,
        tips: ['Visit birthplace chamber', 'Explore Buddhist caves', 'Carry historical context', 'Enjoy hill views'],
        images: 'https://www.google.com/search?q=shivneri+fort+images&tbm=isch',
        info: 'https://www.google.com/search?q=shivneri+fort+official+information'
    },
    'torna fort': {
        name: 'Torna Fort',
        state: 'Maharashtra',
        category: 'historic',
        price: 35,
        response: `🚩 **Torna Fort - First Conquest**\n\nThe first fort captured by Chhatrapati Shivaji Maharaj at age 16, starting the Maratha empire.\n\n✨ **First Victory:**\n• Shivaji's first conquest\n• Trekking challenge\n• Valley views\n• Historical significance\n• Starting point of empire\n\n📅 **Best Time:** July to February\n⏰ **Duration:** 1 day\n💰 **Budget:** ₹20-50\n⭐ **Rating:** 4.4/5`,
        tips: ['Challenging trek required', 'Start early morning', 'Carry sufficient water', 'Enjoy panoramic views'],
        images: 'https://www.google.com/search?q=torna+fort+images&tbm=isch',
        info: 'https://www.google.com/search?q=torna+fort+official+information'
    },
    'rajgad fort': {
        name: 'Rajgad Fort',
        state: 'Maharashtra',
        category: 'historic',
        price: 43,
        response: `🏰 **Rajgad Fort - Former Capital**\n\nThe former capital of the Maratha Empire before Raigad, with extensive fortifications and palaces.\n\n✨ **Former Capital:**\n• Former Maratha capital\n• Extensive ruins\n• Trekking routes\n• Historical palaces\n• Strategic location\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1 day\n💰 **Budget:** ₹25-60\n⭐ **Rating:** 4.5/5`,
        tips: ['Explore palace ruins', 'Carry historical information', 'Enjoy trekking experience', 'Visit different sections'],
        images: 'https://www.google.com/search?q=rajgad+fort+images&tbm=isch',
        info: 'https://www.google.com/search?q=rajgad+fort+official+information'
    },
    'sindhudurg fort': {
        name: 'Sindhudurg Fort',
        state: 'Maharashtra',
        category: 'historic',
        price: 65,
        response: `🏝️ **Sindhudurg Fort - Sea Fort**\n\nA sea fort built by Chhatrapati Shivaji Maharaj on an island in the Arabian Sea.\n\n✨ **Island Fortress:**\n• Sea fort on island\n• Boat ride access\n• Shivaji's handprint\n• Marine beauty\n• Historical significance\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1 day\n💰 **Budget:** ₹30-100\n⭐ **Rating:** 4.4/5`,
        tips: ['Take boat to fort', 'See Shivaji\'s handprint', 'Enjoy marine surroundings', 'Carry sea sickness tablets if needed'],
        images: 'https://www.google.com/search?q=sindhudurg+fort+images&tbm=isch',
        info: 'https://www.google.com/search?q=sindhudurg+fort+official+information'
    },
    'mahabaleshwar': {
        name: 'Mahabaleshwar',
        state: 'Maharashtra',
        category: 'hill station',
        price: 175,
        response: `🍓 **Mahabaleshwar - Strawberry Hills**\n\nPopular hill station known for strawberry farms, scenic points, and colonial-era architecture.\n\n✨ **Hill Station Charm:**\n• Strawberry farms\n• View points\n• Colonial bungalows\n• Boating and activities\n• Pleasant climate\n\n📅 **Best Time:** October to June\n⏰ **Duration:** 2-3 days\n💰 **Budget:** ₹50-300\n⭐ **Rating:** 4.3/5`,
        tips: ['Visit strawberry farms', 'Enjoy viewpoint sunsets', 'Try local strawberries', 'Carry light woolens'],
        images: 'https://www.google.com/search?q=mahabaleshwar+hill+station+images&tbm=isch',
        info: 'https://www.google.com/search?q=mahabaleshwar+tourism+official+guide'
    },
    'lonavala': {
        name: 'Lonavala & Khandala',
        state: 'Maharashtra',
        category: 'hill station',
        price: 120,
        response: `🌉 **Lonavala & Khandala - Twin Hills**\n\nTwin hill stations famous for waterfalls, caves, and panoramic views of the Western Ghats.\n\n✨ **Western Ghats Beauty:**\n• Waterfalls in monsoon\n• Ancient caves\n• Valley views\n• Chikki sweets\n• Pleasant climate\n\n📅 **Best Time:** October to May\n⏰ **Duration:** 1-2 days\n💰 **Budget:** ₹40-200\n⭐ **Rating:** 4.2/5`,
        tips: ['Visit during monsoon for waterfalls', 'Try local chikki', 'Explore Karla-Bhaja caves', 'Enjoy valley viewpoints'],
        images: 'https://www.google.com/search?q=lonavala+khandala+images&tbm=isch',
        info: 'https://www.google.com/search?q=lonavala+tourism+official+guide'
    },
    'matheran': {
        name: 'Matheran',
        state: 'Maharashtra',
        category: 'hill station',
        price: 150,
        response: `🚫 **Matheran - Vehicle-Free Paradise**\n\nAsia's only automobile-free hill station with colonial charm and numerous scenic viewpoints.\n\n✨ **Eco-Friendly Hills:**\n• No vehicles allowed\n• Toy train rides\n• View points\n• Horse riding\n• Colonial architecture\n\n📅 **Best Time:** October to May\n⏰ **Duration:** 1-2 days\n💰 **Budget:** ₹50-250\n⭐ **Rating:** 4.4/5`,
        tips: ['Enjoy toy train ride', 'Try horse riding', 'Visit multiple viewpoints', 'Carry walking shoes'],
        images: 'https://www.google.com/search?q=matheran+hill+station+images&tbm=isch',
        info: 'https://www.google.com/search?q=matheran+tourism+official+guide'
    },
    'panchgani': {
        name: 'Panchgani',
        state: 'Maharashtra',
        category: 'hill station',
        price: 150,
        response: `🏞️ **Panchgani - Five Hills**\n\nHill station known for its five hills, strawberry farms, and famous Table Land plateau.\n\n✨ **Table Land Experience:**\n• Table Land plateau\n• Strawberry farms\n• View points\n• Educational institutes\n• Pleasant weather\n\n📅 **Best Time:** October to May\n⏰ **Duration:** 1-2 days\n💰 **Budget:** ₹50-250\n⭐ **Rating:** 4.3/5`,
        tips: ['Visit Table Land', 'Try strawberry products', 'Enjoy sunset points', 'Carry light jackets'],
        images: 'https://www.google.com/search?q=panchgani+hill+station+images&tbm=isch',
        info: 'https://www.google.com/search?q=panchgani+tourism+official+guide'
    },
    'shirdi': {
        name: 'Shirdi',
        state: 'Maharashtra',
        category: 'spiritual',
        price: 0,
        response: `🙏 **Shirdi - Sai Baba Town**\n\nFamous pilgrimage town dedicated to Sai Baba, attracting millions of devotees annually.\n\n✨ **Sai Baba Devotion:**\n• Sai Baba temple\n• Aarti ceremonies\n• Museum and exhibits\n• Spiritual atmosphere\n• Devotional experience\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1 day\n💰 **Budget:** Free\n⭐ **Rating:** 4.6/5`,
        tips: ['Attend aarti ceremonies', 'Visit Sai Baba museum', 'Respect temple traditions', 'Experience devotional atmosphere'],
        images: 'https://www.google.com/search?q=shirdi+temple+images&tbm=isch',
        info: 'https://www.google.com/search?q=shirdi+official+information'
    },
    'trimbak': {
        name: 'Trimbak',
        state: 'Maharashtra',
        category: 'spiritual',
        price: 0,
        response: `💧 **Trimbak - Godavari Source**\n\nHoly town at the source of Godavari River, housing the Trimbakeshwar Jyotirlinga temple.\n\n✨ **River Source Town:**\n• Godavari River source\n• Jyotirlinga temple\n• Brahmagiri hill\n• Religious significance\n• Spiritual town\n\n📅 **Best Time:** August to February\n⏰ **Duration:** 1 day\n💰 **Budget:** Free\n⭐ **Rating:** 4.3/5`,
        tips: ['Visit Godavari source', 'See Jyotirlinga temple', 'Respect religious sites', 'Enjoy hill surroundings'],
        images: 'https://www.google.com/search?q=trimbak+town+images&tbm=isch',
        info: 'https://www.google.com/search?q=trimbak+official+information'
    },
    'tadoba': {
        name: 'Tadoba National Park',
        state: 'Maharashtra',
        category: 'wildlife',
        price: 2075,
        response: `🐅 **Tadoba National Park**\n\nMaharashtra's oldest and largest national park, famous for tiger sightings and rich biodiversity.\n\n✨ **Tiger Territory:**\n• Tiger safari experiences\n• Bird watching\n• Lake views\n• Wildlife photography\n• Rich biodiversity\n\n📅 **Best Time:** October to May\n⏰ **Duration:** 2-3 days\n💰 **Budget:** ₹150-4000\n⭐ **Rating:** 4.5/5`,
        tips: ['Book safari permits early', 'Early morning safaris best', 'Carry binoculars and camera', 'Follow park guidelines'],
        images: 'https://www.google.com/search?q=tadoba+national+park+images&tbm=isch',
        info: 'https://www.google.com/search?q=tadoba+national+park+official+information'
    },
    'sawantwadi': {
        name: 'Sawantwadi',
        state: 'Maharashtra',
        category: 'cultural',
        price: 60,
        response: `🎨 **Sawantwadi - Craft Town**\n\nHeritage town known for its traditional wooden toys, crafts, and royal palace.\n\n✨ **Cultural Heritage:**\n• Wooden toy crafts\n• Royal palace\n• Local crafts\n• Cultural heritage\n• Traditional artisans\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 1 day\n💰 **Budget:** ₹20-100\n⭐ **Rating:** 4.1/5`,
        tips: ['Visit craft workshops', 'See royal palace', 'Buy traditional toys', 'Support local artisans'],
        images: 'https://www.google.com/search?q=sawantwadi+crafts+images&tbm=isch',
        info: 'https://www.google.com/search?q=sawantwadi+official+information'
    },
    'kolhapur': {
        name: 'Kolhapur City',
        state: 'Maharashtra',
        category: 'cultural',
        price: 5000,
        response: `👑 **Kolhapur - Cultural Capital**\n\nHistoric city known as 'Dakshin Kashi' famous for Mahalaxmi Temple, Kolhapuri chappals, and spicy cuisine.\n\n✨ **Cultural Experience:**\n• Mahalaxmi Temple\n• Kolhapuri chappals\n• Spicy Kolhapuri cuisine\n• Historical palaces\n• Rankala Lake\n\n📅 **Best Time:** October to March\n⏰ **Duration:** 2-3 days\n💰 **Budget:** ₹2,000-8,000\n⭐ **Rating:** 4.3/5`,
        tips: ['Visit Mahalaxmi Temple', 'Try authentic Kolhapuri food', 'Buy Kolhapuri chappals', 'Explore historical sites'],
        images: 'https://www.google.com/search?q=kolhapur+city+images&tbm=isch',
        info: 'https://www.google.com/search?q=kolhapur+tourism+official+guide'
    }


    // Add all your 85+ destinations here following the same pattern
  };

  const simulateTyping = (callback, text) => {
    setIsTyping(true);
    
    setTimeout(() => {
      callback(text);
      setIsTyping(false);
    }, 800 + Math.random() * 400);
  };

  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase().trim();

    // Greetings
    if (/(hi|hello|hey|namaste)/i.test(lowerMessage)) {
      return {
        text: "Namaste! 🇮🇳 I'm your India travel expert. I can help you discover amazing destinations with detailed information and useful action buttons for images and more info.\n\nWhat type of destination are you looking for?",
        type: 'text'
      };
    }

    // Help
    if (/(help|what can you do)/i.test(lowerMessage)) {
      return {
        text: `🛠️ **How I Can Help You:**\n\n📍 **Destination Information:**\n• Detailed descriptions and highlights\n• Best time to visit and duration\n• Budget estimates and travel tips\n• State-wise and category-wise searches\n\n🔘 **Action Buttons:**\n• 📖 More Information - Official tourism details\n• 📸 View Photos - Google image galleries\n\nTry asking about any Indian destination!`,
        type: 'text'
      };
    }

    // Check for specific destinations
    for (const [key, destination] of Object.entries(destinations)) {
      if (lowerMessage.includes(key)) {
        return {
          text: `${destination.response}\n\n💡 **Travel Tips:**\n${destination.tips.map(tip => `• ${tip}`).join('\n')}`,
          type: 'destination',
          destination: destination
        };
      }
    }

    // Category searches
    if (/(beach|beaches|sea|coastal)/i.test(lowerMessage)) {
      return {
        text: `🏖️ **Top Beach Destinations:**\n\n• **Goa** - Most popular beaches & nightlife\n• **Andaman Islands** - Pristine & exotic\n• **Kerala** - Kovalam & Varkala beaches\n• **Gokarna** - Peaceful alternative\n• **Pondicherry** - French colonial charm\n\nAsk about any specific beach destination for detailed information!`,
        type: 'text'
      };
    }

    if (/(historic|heritage|fort|palace)/i.test(lowerMessage)) {
      return {
        text: `🏛️ **Historic & Heritage Sites:**\n\n• **Taj Mahal** - World wonder in Agra\n• **Jaipur** - Forts & palaces of Rajasthan\n• **Delhi** - Mughal & British history\n• **Khajuraho** - Ancient temple art\n• **Hampi** - Ruins of Vijayanagara Empire\n\nAsk about any historic site for fascinating stories!`,
        type: 'text'
      };
    }

    // Default response
    return {
      text: "I'd love to help you explore Incredible India! 🇮🇳\n\nTry asking me about:\n• Specific destinations (Taj Mahal, Goa, Kerala, etc.)\n• Types of places (beaches, mountains, historic sites)\n• States (Rajasthan, Himachal, Kerala, etc.)\n• Or any other travel questions!\n\nWhat destination interests you?",
      type: 'text'
    };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message immediately
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Get bot response with typing simulation
    const response = getBotResponse(inputMessage);
    
    simulateTyping((responseText) => {
      const botMessage = {
        id: Date.now() + 1,
        text: responseText,
        isBot: true,
        timestamp: new Date(),
        type: response.type,
        destination: response.destination
      };

      setMessages(prev => [...prev, botMessage]);
    }, response.text);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    { text: "Taj Mahal information", emoji: "🏛️" },
    { text: "Goa beach guide", emoji: "🏖️" },
    { text: "Kerala backwaters", emoji: "🌴" },
    { text: "Ladakh adventure", emoji: "🏔️" }
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="chatbot-container">
      {/* Floating Action Button */}
      <div className={`fab ${isOpen ? 'fab-hidden' : ''}`}>
        <button 
          className="fab-button"
          onClick={() => setIsOpen(true)}
        >
          <span className="fab-icon">💬</span>
          <span className="fab-pulse"></span>
        </button>
      </div>

      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? 'chat-open' : 'chat-closed'}`}>
        {/* Chat Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-avatar">
              <span>🤖</span>
            </div>
            <div className="chat-info">
              <h3>India Travel Expert</h3>
              <span className="status">
                <span className="status-dot"></span>
                Ready to help!
              </span>
            </div>
          </div>
          <div className="chat-actions">
            <button 
              className="header-btn close-btn"
              onClick={() => setIsOpen(false)}
            >
              <span>×</span>
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.isBot ? 'message-bot' : 'message-user'}`}
            >
              {message.isBot && (
                <div className="message-avatar">
                  <span>🤖</span>
                </div>
              )}
              
              <div className="message-content">
                <div className="message-bubble">
                  {message.text.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                  
                  {/* Clean Action Buttons - No duplicate links */}
                  {message.type === 'destination' && message.destination && (
                    <div className="destination-actions">
                      <a 
                        href={message.destination.info} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="action-btn info-btn"
                      >
                        <span className="btn-icon">📖</span>
                        More Information
                      </a>
                      <a 
                        href={message.destination.images} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="action-btn images-btn"
                      >
                        <span className="btn-icon">📸</span>
                        View Photos
                      </a>
                    </div>
                  )}
                </div>
                <div className="message-time">
                  {formatTime(message.timestamp)}
                </div>
              </div>

              {!message.isBot && (
                <div className="message-avatar user">
                  <span>👤</span>
                </div>
              )}
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="message message-bot typing">
              <div className="message-avatar">
                <span>🤖</span>
              </div>
              <div className="message-content">
                <div className="message-bubble typing-bubble">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="quick-action-btn"
              onClick={() => {
                setInputMessage(action.text);
                setTimeout(handleSendMessage, 100);
              }}
            >
              <span className="action-emoji">{action.emoji}</span>
              <span className="action-text">{action.text}</span>
            </button>
          ))}
        </div>

        {/* Chat Input */}
        <div className="chat-input-container">
          <div className="chat-input-wrapper">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about Indian destinations..."
              className="chat-input"
              disabled={isTyping}
            />
            <button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="send-button"
            >
              <span className="send-icon">📤</span>
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="chat-backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Chatbot;