// Simple client-side mock API using localStorage and BroadcastChannel for cross-tab updates
import { v4 as uuidv4 } from "uuid";
import Fuse from "fuse.js";

const STORAGE_KEY = "zidio_posts_v1";
const CHANNEL_NAME = "zidio_posts_channel_v1";

function now() {
  return new Date().toISOString();
}

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const sample = [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sample));
    return sample;
  }
  try {
    return JSON.parse(raw);
  } catch {
    console.error("Failed to parse posts");
    return [];
  }
}

// Seed sample post for initial testing if none exist
(function seedIfEmpty() {
  try {
    const all = load();
    if (!all || all.length === 0) {
      const sample = [
        {
          id: "a1b2c3d4-e021-0000-0000-000000000021",
          title: "How Artificial Intelligence Is Transforming Everyday Life",
          excerpt:
            "A deep dive into how AI tools, automation, and smart systems are reshaping the modern world.",
          content:
            "Artificial Intelligence has rapidly moved from futuristic predictions to everyday reality. From voice assistants to personalized recommendations, AI is present everywhere. In this article, we explore how AI improves healthcare, enhances business decision-making, automates tasks, and creates personalized digital experiences. Modern AI systems not only increase efficiency but also unlock new possibilities for innovation. However, concerns regarding privacy, ethics, and employment displacement must also be addressed for sustainable AI growth.",
          category: "Technology",
          author: "Admin",
          createdAt: now(),
          updatedAt: now(),
          likes: 0,
          comments: [],
        },
        {
          id: "a1b2c3d4-e022-0000-0000-000000000022",
          title: "10 Budget-Friendly Travel Destinations in India",
          excerpt:
            "Explore the best affordable travel destinations for solo and family trips across India.",
          content:
            "Traveling doesn't always need a big budget. India offers several beautiful destinations where you can enjoy mountains, beaches, historical places, and cultural experiences without overspending. Places like Rishikesh, McLeod Ganj, Varanasi, Jaipur, and Pondicherry are great for budget-conscious travelers. In this blog, we list the best places to stay, how to commute cheaply, and must-try local foods. With proper planning, you can explore India's beauty beyond limits.",
          category: "Travel",
          author: "Travel Desk",
          createdAt: now(),
          updatedAt: now(),
          likes: 0,
          comments: [],
        },
        {
          id: "a1b2c3d4-e023-0000-0000-000000000023",
          title: "10 High-Protein Foods for Faster Muscle Growth",
          excerpt:
            "A guide to the best natural protein sources for gym-goers and athletes.",
          content:
            "Protein is the building block of muscles. Whether you want to bulk up or maintain a lean physique, protein plays a crucial role. Foods like eggs, chicken breast, paneer, tofu, Greek yogurt, lentils, almonds, and fish provide essential amino acids. This blog discusses their nutritional benefits and how to include them in a daily diet. Additionally, post-workout meals and hydration tips are shared for maximizing results.",
          category: "Fitness",
          author: "Fitness Coach",
          createdAt: now(),
          updatedAt: now(),
          likes: 0,
          comments: [],
        },
        {
          id: "a1b2c3d4-e024-0000-0000-000000000024",
          title: "The Future of Web Development: What to Learn in 2025",
          excerpt:
            "A practical guide for new developers to choose the right tech stack.",
          content:
            "Web development is evolving rapidly with frameworks like React, Next.js, Vue, and Svelte gaining popularity. AI coding assistants, low-code tools, and cloud integrations are shaping the future. In this article, we discuss MERN stack advantages, backend trends like serverless architecture, and essential skills such as TypeScript, APIs, CI/CD, and database optimization. Beginners will also learn how to build a learning roadmap.",
          category: "Coding",
          author: "Dev Insights",
          createdAt: now(),
          updatedAt: now(),
          likes: 0,
          comments: [],
        },
        {
          id: "a1b2c3d4-e025-0000-0000-000000000025",
          title: "Mastering Personal Finance: How to Save Smart in Your 20s",
          excerpt:
            "Beginner-friendly financial planning tips for young adults.",
          content:
            "Most people struggle with money management in their 20s. This article covers the basics of budgeting, emergency funds, investments, SIPs, and how to avoid unnecessary expenses. We also explore the importance of compounding, side income sources, and digital financial tools. With the right habits, one can build long-term financial stability and reduce future stress.",
          category: "Finance",
          author: "Money Mentor",
          createdAt: now(),
          updatedAt: now(),
          likes: 0,
          comments: [],
        },
        {
          id: "a1b2c3d4-e026-0000-0000-000000000026",
          title: "10 Easy Recipes You Can Cook in 20 Minutes",
          excerpt:
            "Quick and delicious recipes for students and busy professionals.",
          content:
            "Cooking fast meals doesn't mean compromising on taste. In this blog, we share recipes like masala oats, paneer bhurji, veg pasta, egg fried rice, lemon rice, and quick sandwiches. These recipes require minimal ingredients and are ideal for bachelors, hostel students, or working individuals. Tips on grocery planning and time management are included for a smoother cooking experience.",
          category: "Food",
          author: "Chef Diary",
          createdAt: now(),
          updatedAt: now(),
          likes: 0,
          comments: [],
        },
        {
          id: "a1b2c3d4-e027-0000-0000-000000000027",
          title: "How to Improve Mental Health in a Busy Lifestyle",
          excerpt:
            "Practical techniques to reduce stress and achieve emotional balance.",
          content:
            "Modern life is stressful and mentally exhausting. This article explains strategies like mindfulness meditation, journaling, nature walks, healthy sleep cycles, and avoiding digital overload. We also cover how social support and therapy can positively affect mental well-being. Small daily habits can bring long-lasting emotional clarity and peace.",
          category: "Mental Health",
          author: "Wellness Hub",
          createdAt: now(),
          updatedAt: now(),
          likes: 0,
          comments: [],
        },
        {
          id: "a1b2c3d4-e028-0000-0000-000000000028",
          title: "The Power of Habit Building for Personal Growth",
          excerpt: "Learn how daily habits shape your identity and success.",
          content:
            "Your habits define your future. Whether it's waking up early, exercising, reading, or focusing on your goals, consistency is key. This blog explains the science of habit loops and how to build systems instead of relying on motivation. Step-by-step habit-building strategies are included to help readers achieve long-term success.",
          category: "Self Improvement",
          author: "Life Coach",
          createdAt: now(),
          updatedAt: now(),
          likes: 0,
          comments: [],
        },
        {
          id: "a1b2c3d4-e029-0000-0000-000000000029",
          title: "UI/UX Trends Designers Must Know in 2025",
          excerpt:
            "Emerging user-interface design trends to implement in new projects.",
          content:
            "UI/UX design is shifting towards minimalism, bold typography, neumorphism, micro-interactions, and AI-assisted user experiences. Designers must understand accessibility, emotional design, and human-centered interfaces. This guide helps developers and designers stay updated with upcoming design trends and practical examples.",
          category: "Design",
          author: "Creative Studio",
          createdAt: now(),
          updatedAt: now(),
          likes: 0,
          comments: [],
        },
        {
          id: "a1b2c3d4-e030-0000-0000-000000000030",
          title: "What Is Cybersecurity? A Complete Beginner’s Guide",
          excerpt:
            "A simple explanation of cyber attacks, security tools, and best practices.",
          content:
            "Cybersecurity protects systems and networks from digital attacks. This article covers malware, phishing, ransomware, brute force attacks, and essential tools like firewalls, VPNs, and antivirus software. We also discuss best practices for individuals and developers such as strong passwords, 2FA, and secure coding habits. Cybersecurity will continue to grow as one of the most in-demand career fields.",
          category: "Cybersecurity",
          author: "Security Lab",
          createdAt: now(),
          updatedAt: now(),
          likes: 0,
          comments: [],
        },
        {
          id: "a1b2c3d4-e031-0000-0000-000000000031",
          title: "The Rise of Freelancing: Why 2025 Is the Best Time to Start",
          excerpt:
            "A complete guide on why freelancing is booming and how beginners can start their journey.",
          content:
            "Freelancing has transformed from a side hustle into a full-time career option. Platforms like Upwork, Fiverr, and Freelancer have made it easier to find global clients. The flexibility of working from anywhere, choosing your projects, and earning based on your skills has attracted millions. In 2025, the gig economy will grow even faster as companies adopt remote culture. Beginners can start freelancing by learning high-demand skills like UI design, web development, content writing, SEO, and social media marketing. Building a strong portfolio and maintaining client relationships is the key to long-term success.",
          category: "Career",
          author: "Career Desk",
          createdAt: now(),
          updatedAt: now(),
          likes: 0,
          comments: [],
        },
        {
          id: "a1b2c3d4-e032-0000-0000-000000000032",
          title: "Why Morning Routines Improve Productivity",
          excerpt:
            "An explanation of how a structured morning routine can change your life.",
          content:
            "A strong morning routine sets the tone for the entire day. Waking up early allows your mind to prepare for tasks ahead. Activities like hydration, meditation, light exercise, and planning your priorities can significantly improve focus and efficiency. A morning routine also strengthens self-discipline, reduces stress, and boosts energy. The goal is not to do many things but to do the right things that align with your daily targets. Even a simple 20-minute morning routine can transform productivity levels.",
          category: "Productivity",
          author: "Mindset Hub",
          createdAt: now(),
          updatedAt: now(),
          likes: 0,
          comments: [],
        },
        {
          id: "a1b2c3d4-e033-0000-0000-000000000033",
          title: "How to Start Investing as a Beginner",
          excerpt:
            "A beginner-friendly investment guide covering SIPs, stocks, gold, and emergency funds.",
          content:
            "Investing early is the smartest financial decision you can make. Beginners should start with emergency funds before entering stocks or mutual funds. SIPs (Systematic Investment Plans) are a great option for long-term wealth creation. Gold ETFs, index funds, and digital gold are also reliable for beginners. The key is consistency. Small monthly investments, when compounded over years, generate massive returns. Avoid emotional decisions, research before investing, and take advice from certified financial planners if needed.",
          category: "Finance",
          author: "Money Mentor",
          createdAt: now(),
          updatedAt: now(),
          likes: 0,
          comments: [],
        },
        {
          id: "a1b2c3d4-e034-0000-0000-000000000034",
          title: "Benefits of Solo Travel and Why Everyone Should Try It",
          excerpt:
            "An inspiring article on the personal growth that comes from solo travel.",
          content:
            "Solo travel gives you the freedom to explore at your own pace. It builds confidence, teaches independence, and helps you discover yourself. You meet new people, experience different cultures, and learn decision-making. Places like Kasol, Rishikesh, Goa, Dharamshala, and Pondicherry are perfect for first-time solo travelers. Always plan ahead, keep emergency contacts, and stay connected with your family. Solo trips become life-changing memories when done responsibly.",
          category: "Travel",
          author: "Travel Soul",
          createdAt: now(),
          updatedAt: now(),
          likes: 0,
          comments: [],
        },
        {
          id: "a1b2c3d4-e035-0000-0000-000000000035",
          title: "5 Simple Yoga Poses for Stress Relief",
          excerpt:
            "Easy-to-follow yoga poses that help reduce stress and anxiety.",
          content:
            "Yoga calms the mind and relaxes the muscles. Poses like Child’s Pose, Cat-Cow Stretch, Forward Fold, Bridge Pose, and Shavasana help reduce stress. Deep breathing exercises further enhance relaxation. Practicing these poses for even 10 minutes daily can lower stress hormones, improve flexibility, and promote emotional stability. Yoga is not just a workout—it's a lifestyle that connects the body with the mind.",
          category: "Health",
          author: "Health Studio",
          createdAt: now(),
          updatedAt: now(),
          likes: 0,
          comments: [],
        },
        {
          id: "a1b2c3d4-e036-0000-0000-000000000036",
          title: "10 Ways to Improve Your Reading Habits",
          excerpt:
            "A list of practical strategies to develop a daily reading habit.",
          content:
            "Reading expands your knowledge and sharpens your thinking skills. To build a reading habit, choose books you genuinely enjoy. Begin with short sessions and avoid distractions like social media. Carry a book or e-book everywhere and set small daily targets like 10 pages per day. Joining a reading club or listening to audiobooks can also help. Reading before sleep improves focus and reduces screen time. Over time, consistent reading will transform your thinking, vocabulary, and creativity.",
          category: "Self Improvement",
          author: "Life Coach",
          createdAt: now(),
          updatedAt: now(),
          likes: 0,
          comments: [],
        },
        {
          id: "a1b2c3d4-e037-0000-0000-000000000037",
          title: "Best Food Photography Tips for Beginners",
          excerpt:
            "A detailed beginner guide to taking professional-looking food photos.",
          content:
            "Food photography requires good lighting, composition, and creativity. Natural light is the best for capturing real colors. Use simple backgrounds to highlight the food. Try different angles—flat lay, 45-degree, and close-up shots. Props like cutlery, napkins, and textured surfaces add depth. Editing apps like Lightroom and Snapseed enhance contrast and sharpness. With practice and consistent shooting, anyone can master the art of food photography.",
          category: "Photography",
          author: "Creative Kitchen",
          createdAt: now(),
          updatedAt: now(),
          likes: 0,
          comments: [],
        },
        {
          id: "a1b2c3d4-e038-0000-0000-000000000038",
          title: "Top 10 Digital Marketing Trends in 2025",
          excerpt:
            "A complete guide to upcoming digital marketing trends and tools.",
          content:
            "Digital marketing is evolving rapidly with AI-driven campaigns, personalized content, voice search optimization, micro-influencers, and short-form videos taking over. Brands now focus on customer experience and authenticity. Chatbots, automated emails, and data-driven ads increase efficiency. Understanding analytics and customer behavior helps in building stronger campaigns. Businesses must adapt to these trends to stay competitive in 2025.",
          category: "Marketing",
          author: "Marketing Desk",
          createdAt: now(),
          updatedAt: now(),
          likes: 0,
          comments: [],
        },
        {
          id: "a1b2c3d4-e039-0000-0000-000000000039",
          title: "Understanding Cloud Computing: A Beginner’s Guide",
          excerpt:
            "Explains cloud services, deployment models, and how businesses use the cloud.",
          content:
            "Cloud computing allows users to store and access data over the internet instead of physical drives. It is cost-effective, secure, and scalable. Major cloud platforms like AWS, Azure, and Google Cloud offer services such as computing power, databases, analytics, and AI tools. There are three main service models: IaaS, PaaS, and SaaS. Cloud adoption enables businesses to innovate faster while reducing operational costs. Understanding cloud basics is essential for students and professionals entering the tech industry.",
          category: "Technology",
          author: "Tech World",
          createdAt: now(),
          updatedAt: now(),
          likes: 0,
          comments: [],
        },
        {
          id: "a1b2c3d4-e040-0000-0000-000000000040",
          title: "How to Build a Strong Resume as a Fresher",
          excerpt:
            "Complete resume-writing tips for students and freshers entering the job market.",
          content:
            "A resume is your first impression in the hiring process. Freshers should focus on projects, internships, certifications, and skills rather than experience. Use a clean layout with clear headings. Highlight technical and soft skills. Quantify your achievements when possible. Adding GitHub projects, LinkedIn profile, and a short summary can enhance credibility. Keep the resume one page and free from unnecessary details. Proofread carefully before sending it to recruiters.",
          category: "Career",
          author: "Career Mentor",
          createdAt: now(),
          updatedAt: now(),
          likes: 0,
          comments: [],
        },
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sample));
    }
  } catch {
    // ignore
  }
})();

function save(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  try {
    bc.postMessage({ type: "update", posts });
  } catch {
    // ignore
  }
}

const bc =
  typeof window !== "undefined" && "BroadcastChannel" in window
    ? new BroadcastChannel(CHANNEL_NAME)
    : { postMessage: () => {}, onmessage: null };

const subscribers = new Set();
if (bc && bc.addEventListener) {
  bc.addEventListener("message", (ev) => {
    if (ev.data && ev.data.type === "update") {
      subscribers.forEach((fn) => fn(ev.data.posts));
    }
  });
}

export const api = {
  subscribe(fn) {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  },
  list({ page = 1, perPage = 5, search = "", category = "" } = {}) {
    const all = load();
    let filtered = all.slice().reverse(); // newest first
    if (search) {
      // Use Fuse.js for fuzzy full-text search and relevance ranking
      const fuse = new Fuse(filtered, {
        keys: [
          { name: "title", weight: 0.6 },
          { name: "excerpt", weight: 0.2 },
          { name: "content", weight: 0.1 },
          { name: "category", weight: 0.05 },
          { name: "author", weight: 0.05 },
        ],
        includeScore: true,
        threshold: 0.4,
        ignoreLocation: true,
      });
      const results = fuse.search(search);
      filtered = results.map((r) => r.item);
    }
    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }
    const total = filtered.length;
    const start = (page - 1) * perPage;
    const items = filtered.slice(start, start + perPage);
    return Promise.resolve({ items, total });
  },
  get(id) {
    const all = load();
    const found = all.find((p) => p.id === id);
    return Promise.resolve(found || null);
  },
  create({
    title,
    content,
    excerpt = "",
    category = "General",
    author = "Anonymous",
  }) {
    const all = load();
    const post = {
      id: uuidv4(),
      title,
      content,
      excerpt,
      category,
      author,
      createdAt: now(),
      updatedAt: now(),
      likes: 0,
      comments: [],
    };
    all.push(post);
    save(all);
    return Promise.resolve(post);
  },
  update(id, patch) {
    const all = load();
    const idx = all.findIndex((p) => p.id === id);
    if (idx === -1) return Promise.resolve(null);
    all[idx] = { ...all[idx], ...patch, updatedAt: now() };
    save(all);
    return Promise.resolve(all[idx]);
  },
  remove(id) {
    let all = load();
    all = all.filter((p) => p.id !== id);
    save(all);
    return Promise.resolve(true);
  },
  like(id) {
    const all = load();
    const idx = all.findIndex((p) => p.id === id);
    if (idx === -1) return Promise.resolve(null);
    all[idx].likes = (all[idx].likes || 0) + 1;
    save(all);
    return Promise.resolve(all[idx].likes);
  },
  addComment(id, { author = "Anon", text }) {
    const all = load();
    const idx = all.findIndex((p) => p.id === id);
    if (idx === -1) return Promise.resolve(null);
    const comment = { id: uuidv4(), author, text, createdAt: now() };
    all[idx].comments = all[idx].comments || [];
    all[idx].comments.push(comment);
    save(all);
    return Promise.resolve(comment);
  },
};
