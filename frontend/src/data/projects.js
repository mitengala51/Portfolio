const allProjects = [
  {
    slug: "divya-collection",
    title: "Divya Collection",
    tagline: "Full-stack e-commerce store for handbags and ladies' footwear",
    summary:
      "Catalogue, live search, cart, Razorpay checkout, order emails and a Gemini shopping assistant.",
    role: "Design & full-stack development",
    stack: [
      "React 19",
      "Vite",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
      "Razorpay",
      "Gemini API",
    ],
    features: [
      "Email and Google sign-in with JWT in HTTP-only cookies",
      "Debounced live product search",
      "Razorpay checkout with server-side HMAC verification",
      "Order emails to customer and shop owner",
      "AI shopping assistant (Gemini)",
    ],
    links: {
      live: "https://divya-collection-e-commerce-website-silk.vercel.app/",
      repo: "https://github.com/mitengala51/Divya-Collection-E-Commerce-Website",
    },
    images: [
      {
        src: "../../public/Divya Collection/thumbnail.png",
        alt: "Divya Collection home page",
        // width: 1500,
        // height: 775,
      },
      {
        src: "../../public/Divya Collection/homepage.jpeg",
        alt: "Divya Collection home page",
        width: 1216,
        height: 775,
      },
      {
        src: "../../public/Divya Collection/product detail.jpeg",
        alt: "Divya Collection product detail page",
        width: 1216,
        height: 775,
      },
      {
        src: "../../public/Divya Collection/product search.jpeg",
        alt: "Divya Collection product search page",
        width: 1216,
        height: 775,
      },
      {
        src: "../../public/Divya Collection/about us.jpeg",
        alt: "Divya Collection about us page",
        width: 1216,
        height: 775,
      },
      {
        src: "../../public/Divya Collection/contact us.jpeg",
        alt: "Divya Collection contact us page",
        width: 1216,
        height: 775,
      },
      {
        src: "../../public/Divya Collection/shopping cart.jpeg",
        alt: "Divya Collection cart page",
        width: 1216,
        height: 775,
      },
    ],
  },
  {
    slug: "cabpool",
    title: "CabPool",
    tagline:
      "A ride-sharing platform connecting people travelling on similar routes",
    summary:
      "A ride-sharing platform where users can publish their travel routes and schedules, browse available rides, and discover potential ride-sharing opportunities.",
    role: "Design & full-stack development",
    stack: ["React", "Supabase", "Node.js", "Express.js"],
    features: [
      "Publish ride details with starting location, destination and travel timings",
      "Browse available ride-sharing listings",
      "View ride information and travel schedules",
      "Manage published ride details",
      "Supabase database integration for storing ride information",
      "REST API development using Node.js and Express.js",
      "Responsive interface for desktop and mobile devices",
    ],
    links: {
      live: " https://cab-pool-ebon.vercel.app",
      repo: "https://github.com/mitengala51/CabPool",
    },
    images: [
      {
        src: "../../public/CabPool/thumbnail.png",
        alt: "Cabpool Thumbnail",
        width: 1216,
        height: 775,
      },
      {
        src: "../../public/CabPool/cabpool.png",
        alt: "Cabpool Website",
        width: 1216,
        height: 775,
      },
    ],
  },
  {
    slug: "gohil-motors",
    title: "Gohil Motors",
    tagline: "Full-stack vehicle marketplace for cars",
    summary:
      "A vehicle marketplace featuring dynamic listings, advanced search and filters, detailed vehicle specifications, image galleries, and an admin dashboard for managing vehicle inventory.",
    role: "Design & full-stack development",
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "Supabase",
      "Supabase Auth",
      "Supabase Storage",
    ],
    features: [
      "Dynamic vehicle listings with search, sorting and pagination",
      "Advanced filtering by vehicle type, brand, fuel type, transmission, price and year",
      "Detailed vehicle pages with specifications and image galleries",
      "Secure admin authentication using Supabase Auth",
      "Admin dashboard with vehicle inventory statistics",
      "Complete vehicle inventory management with create, update and delete operations",
      "Vehicle image uploads using Supabase Storage",
      "REST API with protected admin routes and server-side authorization",
      "Responsive interface with dedicated home, listings, about and contact pages",
    ],
    links: {
      live: "", // Add deployed website URL
      repo: "",
    },
    images: [
      // Add actual project screenshots
      {
        src: "../../public/Gohil Motors/thumbnail.png",
        alt: "Gohil Motors thumbnail",
        width: 1216,
        height: 775,
      },
      {
        src: "../../public/Gohil Motors/gohil motors.png",
        alt: "Gohil Motors homepage",
        width: 1216,
        height: 775,
      },
    ],
  },
];


const showDrafts = import.meta.env.DEV;
export const projects = allProjects.filter((p) => showDrafts || !p.draft);
export const getProject = (slug) => projects.find((p) => p.slug === slug);
