// Product Data Structure for Dynamic Product Details
const productData = {
    'elegant-summer-dress': {
        id: 'elegant-summer-dress',
        name: 'Elegant Summer Dress',
        price: '2500 Da',
        originalPrice: '3500 Da',
        discount: '29% OFF',
        rating: 4.8,
        reviewCount: 124,
        images: {
            main: 'images/product1.JPG',
            thumbnails: [
                'images/product1.JPG',
                'images/product15.JPG',
                'images/product16.JPG',
                'images/product17.JPG'
            ]
        },
        description: 'This elegant summer dress combines comfort with style, featuring a flattering silhouette that\'s perfect for both casual and semi-formal occasions. Made from high-quality, breathable fabric that feels soft against the skin.',
        features: [
            'Lightweight and breathable fabric',
            'Flattering A-line silhouette',
            'Hidden side zipper',
            'Lined for opacity',
            'Machine washable'
        ],
        specifications: {
            'Material': '65% Cotton, 35% Polyester',
            'Care Instructions': 'Machine wash cold, tumble dry low',
            'Fit': 'Regular fit, A-line silhouette',
            'Length': 'Knee-length (Size M: 95cm)',
            'Model': 'Height 5\'8", wearing size S'
        },
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: [
            { name: 'black', color: '#000' },
            { name: 'white', color: '#fff' },
            { name: 'blue', color: '#4169e1' },
            { name: 'red', color: '#dc143c' }
        ]
    },
    'casual-cotton-shirt': {
        id: 'casual-cotton-shirt',
        name: 'Casual Cotton Shirt',
        price: '2500 Da',
        originalPrice: '3200 Da',
        discount: '22% OFF',
        rating: 4.6,
        reviewCount: 89,
        images: {
            main: 'images/product2.JPG',
            thumbnails: [
                'images/product2.JPG',
                'images/product18.JPG',
                'images/product19.JPG',
                'images/product20.JPG'
            ]
        },
        description: 'A versatile casual cotton shirt that offers both comfort and style. Perfect for everyday wear, this shirt features a relaxed fit and premium cotton fabric that gets softer with every wash.',
        features: [
            '100% premium cotton',
            'Relaxed comfortable fit',
            'Button-down collar',
            'Chest pocket detail',
            'Easy care fabric'
        ],
        specifications: {
            'Material': '100% Cotton',
            'Care Instructions': 'Machine wash warm, tumble dry medium',
            'Fit': 'Relaxed fit',
            'Collar': 'Button-down collar',
            'Model': 'Height 6\'0", wearing size M'
        },
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'white', color: '#fff' },
            { name: 'blue', color: '#4169e1' },
            { name: 'gray', color: '#808080' },
            { name: 'navy', color: '#000080' }
        ]
    },
    'designer-jacket': {
        id: 'designer-jacket',
        name: 'Designer Jacket',
        price: '2500 Da',
        originalPrice: '4000 Da',
        discount: '38% OFF',
        rating: 4.9,
        reviewCount: 156,
        images: {
            main: 'images/product3.JPG',
            thumbnails: [
                'images/product3.JPG',
                'images/product21.JPG',
                'images/product22.JPG',
                'images/product23.JPG'
            ]
        },
        description: 'A sophisticated designer jacket that elevates any outfit. Crafted with attention to detail, this jacket features premium materials and a tailored fit that flatters every silhouette.',
        features: [
            'Premium designer fabric',
            'Tailored fit',
            'Multiple pockets',
            'Lined interior',
            'Professional finish'
        ],
        specifications: {
            'Material': '70% Wool, 30% Polyester',
            'Care Instructions': 'Dry clean only',
            'Fit': 'Tailored fit',
            'Closure': 'Button closure',
            'Model': 'Height 5\'9", wearing size M'
        },
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: [
            { name: 'black', color: '#000' },
            { name: 'navy', color: '#000080' },
            { name: 'gray', color: '#808080' },
            { name: 'brown', color: '#8B4513' }
        ]
    },
    'trendy-denim-jeans': {
        id: 'trendy-denim-jeans',
        name: 'Trendy Denim Jeans',
        price: '2900 Da',
        originalPrice: '3800 Da',
        discount: '24% OFF',
        rating: 4.7,
        reviewCount: 203,
        images: {
            main: 'images/product4.JPG',
            thumbnails: [
                'images/product4.JPG',
                'images/product24.JPG',
                'images/product25.JPG',
                'images/product26.JPG'
            ]
        },
        description: 'Modern trendy denim jeans with a perfect fit and contemporary styling. Made from premium denim with just the right amount of stretch for comfort and movement.',
        features: [
            'Premium stretch denim',
            'Modern slim fit',
            'Five-pocket styling',
            'Reinforced stitching',
            'Fade-resistant color'
        ],
        specifications: {
            'Material': '98% Cotton, 2% Elastane',
            'Care Instructions': 'Machine wash cold, hang dry',
            'Fit': 'Slim fit',
            'Rise': 'Mid-rise',
            'Model': 'Height 5\'10", wearing size 32'
        },
        sizes: ['28', '30', '32', '34', '36', '38'],
        colors: [
            { name: 'dark blue', color: '#191970' },
            { name: 'light blue', color: '#87CEEB' },
            { name: 'black', color: '#000' },
            { name: 'gray', color: '#808080' }
        ]
    },
    'stylish-blouse': {
        id: 'stylish-blouse',
        name: 'Stylish Blouse',
        price: '2500 Da',
        originalPrice: '3300 Da',
        discount: '24% OFF',
        rating: 4.5,
        reviewCount: 78,
        images: {
            main: 'images/product5.JPG',
            thumbnails: [
                'images/product5.JPG',
                'images/product12.jpg',
                'images/product13.jpg',
                'images/product14.jpg'
            ]
        },
        description: 'An elegant stylish blouse that transitions seamlessly from day to night. Features delicate details and a flattering cut that complements any wardrobe.',
        features: [
            'Elegant design',
            'Versatile styling',
            'Comfortable fit',
            'Quality construction',
            'Easy care fabric'
        ],
        specifications: {
            'Material': '95% Polyester, 5% Elastane',
            'Care Instructions': 'Machine wash cold, low heat dry',
            'Fit': 'Regular fit',
            'Neckline': 'Round neck',
            'Model': 'Height 5\'7", wearing size S'
        },
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: [
            { name: 'white', color: '#fff' },
            { name: 'black', color: '#000' },
            { name: 'pink', color: '#FFC0CB' },
            { name: 'blue', color: '#4169e1' }
        ]
    },
    'premium-winter-coat': {
        id: 'premium-winter-coat',
        name: 'Premium Winter Coat',
        price: '1900 Da',
        originalPrice: '2800 Da',
        discount: '32% OFF',
        rating: 4.8,
        reviewCount: 145,
        images: {
            main: 'images/product6.jpg',
            thumbnails: [
                'images/product6.jpg',
                'images/product7.jpg',
                'images/product8.JPG',
                'images/product9.JPG'
            ]
        },
        description: 'A premium winter coat designed to keep you warm and stylish during the coldest months. Features high-quality insulation and weather-resistant materials.',
        features: [
            'Premium insulation',
            'Weather-resistant',
            'Multiple pockets',
            'Adjustable hood',
            'Durable construction'
        ],
        specifications: {
            'Material': 'Outer: 100% Polyester, Lining: 100% Nylon',
            'Care Instructions': 'Machine wash cold, tumble dry low',
            'Fit': 'Regular fit',
            'Insulation': 'Synthetic fill',
            'Model': 'Height 5\'8", wearing size M'
        },
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'black', color: '#000' },
            { name: 'navy', color: '#000080' },
            { name: 'brown', color: '#8B4513' },
            { name: 'gray', color: '#808080' }
        ]
    },
    'cozy-knit-sweater': {
        id: 'cozy-knit-sweater',
        name: 'Cozy Knit Sweater',
        price: '2800 Da',
        originalPrice: '3600 Da',
        discount: '22% OFF',
        rating: 4.6,
        reviewCount: 92,
        images: {
            main: 'images/product7.jpg',
            thumbnails: [
                'images/product7.jpg',
                'images/product10.JPG',
                'images/product11.JPG',
                'images/product6.jpg'
            ]
        },
        description: 'A cozy knit sweater perfect for layering or wearing on its own. Made from soft, warm materials that provide comfort without sacrificing style.',
        features: [
            'Soft knit fabric',
            'Comfortable fit',
            'Versatile styling',
            'Warm and cozy',
            'Easy care'
        ],
        specifications: {
            'Material': '60% Acrylic, 40% Cotton',
            'Care Instructions': 'Machine wash cold, lay flat to dry',
            'Fit': 'Relaxed fit',
            'Neckline': 'Crew neck',
            'Model': 'Height 5\'6", wearing size M'
        },
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: [
            { name: 'cream', color: '#F5F5DC' },
            { name: 'gray', color: '#808080' },
            { name: 'navy', color: '#000080' },
            { name: 'burgundy', color: '#800020' }
        ]
    },
    'professional-suit': {
        id: 'professional-suit',
        name: 'Professional Suit',
        price: '2500 Da',
        originalPrice: '4200 Da',
        discount: '40% OFF',
        rating: 4.9,
        reviewCount: 167,
        images: {
            main: 'images/product8.JPG',
            thumbnails: [
                'images/product8.JPG',
                'images/product3.JPG',
                'images/product21.JPG',
                'images/product22.JPG'
            ]
        },
        description: 'A professional suit that commands respect and confidence. Tailored to perfection with premium materials and attention to detail for the modern professional.',
        features: [
            'Professional tailoring',
            'Premium fabric',
            'Perfect fit',
            'Versatile styling',
            'Quality construction'
        ],
        specifications: {
            'Material': '80% Wool, 20% Polyester',
            'Care Instructions': 'Dry clean only',
            'Fit': 'Tailored fit',
            'Style': 'Two-piece suit',
            'Model': 'Height 6\'1", wearing size 42R'
        },
        sizes: ['36R', '38R', '40R', '42R', '44R', '46R'],
        colors: [
            { name: 'charcoal', color: '#36454F' },
            { name: 'navy', color: '#000080' },
            { name: 'black', color: '#000' },
            { name: 'gray', color: '#808080' }
        ]
    },
    'new-arrival': {
        id: 'new-arrival',
        name: 'New Arrival',
        price: '3000 Da',
        originalPrice: '4000 Da',
        discount: '25% OFF',
        rating: 4.7,
        reviewCount: 45,
        images: {
            main: 'images/product9.JPG',
            thumbnails: [
                'images/product9.JPG',
                'images/product1.JPG',
                'images/product2.JPG',
                'images/product3.JPG'
            ]
        },
        description: 'Our latest arrival featuring cutting-edge design and premium quality. This piece represents the newest trends in fashion with exceptional craftsmanship.',
        features: [
            'Latest design trends',
            'Premium quality',
            'Unique styling',
            'Comfortable fit',
            'Limited edition'
        ],
        specifications: {
            'Material': '85% Cotton, 15% Polyester',
            'Care Instructions': 'Machine wash cold, hang dry',
            'Fit': 'Modern fit',
            'Style': 'Contemporary',
            'Model': 'Height 5\'9", wearing size M'
        },
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: [
            { name: 'black', color: '#000' },
            { name: 'white', color: '#fff' },
            { name: 'red', color: '#dc143c' },
            { name: 'blue', color: '#4169e1' }
        ]
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = productData;
}

