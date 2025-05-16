import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    py,
    wp,
    acc,
    figma,
    aws,
    DD,
    BubbleWorld,
    Wergex,
    TBI,
    Ecell,
    FoodApp,
    Trip,
    YouTube,
    Spontent,
    whatsapp,
    twitter,
    instagram,
    G1, G2, G3, G4,
    architects,
    jindalfoams,
    aptusfasteners,
    rishabgoel,
    CokeStore,
    Noorulquran,
    threejs,
    github,
    ig,
    pintrst,
    image,
    vp,
    linkedin,
    Cet
} from "../assets/index";

export const navLinks = [
    {
        id: "about",
        title: "About",
    },
    {
        id: "work",
        title: "Work",
    },
    {
        id: "contact",
        title: "Contact",
    },
];

const services = [
    {
        title: "Web Developer",
        icon: web,
    },
    {
        title: "Mobile App Developer",
        icon: mobile,
    },
    {
        title: "Graphic Designer",
        icon: backend,
    },
    {
        title: "UI & UX Designer",
        icon: creator,
    },
    {
        title: "Front End Developer",
        icon: web,
    },
];

const technologies = [
    {
        name: "HTML 5",
        icon: html,
    },
    {
        name: "CSS 3",
        icon: css,
    },
    {
        name: "JavaScript",
        icon: javascript,
    },
    {
        name: "TypeScript",
        icon: typescript,
    },
    {
        name: "React JS",
        icon: reactjs,
    },
    {
        name: "Redux Toolkit",
        icon: redux,
    },
    {
        name: "Tailwind CSS",
        icon: tailwind,
    },
    {
        name: "Python",
        icon: py,
    },
    {
        name: "WordPress",
        icon: wp,
    },
    {
        name: "Three JS",
        icon: threejs,
    },
    {
        name: "Creative Cloud",
        icon: acc,
    },
    {
        name: "figma",
        icon: figma,
    },
    {
        name: "aws",
        icon: aws,
    },
];

const experiences = [
    {
        title: "Frontend Developer",
        company_name: "Coder Edge Technology PVT LTD.",
        icon: Ecell,
        iconBg: "#38",
        icon: Cet,
        iconBg: "#f0f0f0",
        date: "Jan 2025 - Present",
        points: [
            "Developing and maintaining web applications using React.js and other related technologies.",
            "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
            "Enhanced application performance by implementing best practices in state management and component reusability.",
            "Participating in code reviews and providing constructive feedback to other developers.",
            "Worked in Agile environment, participating in regular stand-ups and sprint planning."
        ],
    }
];

const testimonials = [
    {
        testimonial:
            "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
        name: "Sara Lee",
        designation: "CFO",
        company: "Acme Co",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
        testimonial:
            "I've never met a web developer who truly cares about their clients' success like Rick does.",
        name: "Chris Brown",
        designation: "COO",
        company: "DEF Corp",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
        testimonial:
            "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
        name: "Lisa Wang",
        designation: "CTO",
        company: "456 Enterprises",
        image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
];

const projects = [
    {
        name: "TripEasy - Ai Trip Planer",
        description:
            "Designed a seamless UI/UX for an AI-powered trip planning platform using React Native.Created responsive and user-friendly interfaces for itinerary customization and budget management",
        tags: [
            {
                name: "ReactNative",
                color: "blue-text-gradient",
            },
            // {
            //     name: "Redux",
            //     color: "green-text-gradient",
            // },
            {
                name: "TailWind",
                color: "pink-text-gradient",
            },
            // {
            //     name: "Sanity CMS",
            //     color: "blue-text-gradient",
            // },
            {
                name: "MobileApp",
                color: "green-text-gradient",
            },
        ],
        image: Trip,
        source_code_link: "https://github.com/anshj791/cp-III-Ai-Trip-Planer",
    },
    {
        name: "Insta Clone",
        description:
            "Built an Instagram clone with React, featuring responsive design and interactive UI components Integrated functionalities for user authentication, post creation, and dynamic feed updates",
        tags: [
            {
                name: "HTML",
                color: "blue-text-gradient",
            },
            {
                name: "Css",
                color: "green-text-gradient",
            },
            {
                name: "JavaSCript",
                color: "pink-text-gradient",
            },
            {
                name: "React js",
                color: "green-text-gradient",
            },
            {
                name: "Node js",
                color: "pink-text-gradient",
            },
        ],
        image: ig,
        source_code_link: "https://github.com/anshj791/instaclone",
    },
    {
        name: "Pintrest Clone",
        description:
            "Developed a Pinterest clone using React, focusing on a visually appealing grid layout,Implemented features for pin creation, saving, and board organization",
        tags: [
            {
                name: "HTML",
                color: "blue-text-gradient",
            },
            {
                name: "Css",
                color: "green-text-gradient",
            },
            {
                name: "JavaSCript",
                color: "pink-text-gradient",
            },
            {
                name: "React js",
                color: "green-text-gradient",
            },
            {
                name: "Node js",
                color: "green-text-gradient",
            },
        ],
        image: pintrst,
        source_code_link: "https://github.com/anshj791/Pinterest-Clone",
    },
    {
        name: "Golf Website",
        description:
            "",
        tags: [
            {
                name: "Html",
                color: "pink-text-gradient",
            },
            {
                name: "Java Script",
                color: "blue-text-gradient",
            },
            {
                name: "Css",
                color: "green-text-gradient",
            },
        ],
        image: image,
        source_code_link: "https://github.com/anshj791/Golf-booking-Website",
    },
    // {
    //     name: "BubbleWorld",
    //     description:
    //         "",
    //     tags: [
    //         // {
    //         //     name: "nextjs",
    //         //     color: "blue-text-gradient",
    //         // },
    //     ],
    //     image: tripguide,
    //     source_code_link: "https://github.com/",
    // },
    {
        name: "Vision Pro Clone",
        description:
            "",
        tags: [
            {
                name: "Html",
                color: "green-text-gradient",
            },
            {
                name: "Java Script",
                color: "blue-text-gradient",
            },
            {
                name: "Css",
                color: "pink-text-gradient",
            },
        ],
        image: vp,
        source_code_link: "https://github.com/anshj791/Vision-Pro-Clone",
    },
    // {
    //     name: "Jindal Foams",
    //     description:
    //         "",
    //     tags: [
    //         {
    //             name: "WordPress",
    //             color: "blue-text-gradient",
    //         },
    //     ],
    //     image: jindalfoams,
    //     source_code_link: "https://jindalfoam.in/",
    // },
    // {
    //     name: "Aptusfasteners",
    //     description:
    //         "",
    //     tags: [
    //         {
    //             name: "WordPress",
    //             color: "blue-text-gradient",
    //         },
    //     ],
    //     image: aptusfasteners,
    //     source_code_link: "https://aptusfasteners.in/",
    // },
    // {
    //     name: "Jabalexim",
    //     description:
    //         "",
    //     tags: [
    //         // {
    //         //     name: "nextjs",
    //         //     color: "blue-text-gradient",
    //         // },
    //     ],
    //     image: tripguide,
    //     source_code_link: "https://github.com/",
    // },
    // {
    //     name: "Rishabh Goel",
    //     description:
    //         "",
    //     tags: [
    //         {
    //             name: "WordPress",
    //             color: "blue-text-gradient",
    //         },
    //     ],
    //     image: rishabgoel,
    //     source_code_link: "https://rishabhgoel.in/",
    // },

];

const Gallery = [
    {
        image: G1,
    },
    {
        image: G2,
    },
    {
        image: G3,
    },
    {
        image: G4,
    },

];

const socialIcons = [
 
    {
        name: "GitHub",
        icon: github,
        socialLink: 'https://github.com/anshj791'
    },
    {
        name: "Twitter",
        icon: twitter,
        socialLink: 'https://twitter.com/anshj791'
    },
    {
        name: "WhatsApp",
        icon: whatsapp,
        socialLink: 'https://wa.me/+918200616553'
    },
    {
        name: "Linkedin",
        icon: linkedin,
        socialLink: 'https://www.linkedin.com/in/ansh-jain-6b783822b/'
    },

]

export { services, technologies, experiences, testimonials, projects, Gallery, socialIcons };