"use client";

import { 
  Github, 
  Linkedin, 
  Instagram, 
  ExternalLink, 
  Code, 
  Server, 
  Brain, 
  Download, 
  Database, 
  Cpu, 
  Wrench, 
  Layout,
  GraduationCap,
  Award
} from "lucide-react";

export default function AboutPage() {
  const projects = [
    {
      title: "VideoTube",
      description: "A high-performance video sharing ecosystem inspired by YouTube, featuring full user authentication, likes/comments systems, playlists, history tracking, and scalable REST APIs.",
      link: "https://video-tube-frontend-sepia.vercel.app",
      github: "https://github.com/TanmayCloud251/VideoTube",
      tags: ["Next.js", "Node.js", "MongoDB", "Docker", "Express"]
    },
    {
      title: "Sangwari",
      subtitle: "Chhattisgarhi AI Chatbot",
      description: "A voice-enabled interactive chatbot supporting conversational Chhattisgarhi. Implements custom theme support, full chat history, and seamless audio input/output processing.",
      link: "https://sangwari.netlify.app",
      tags: ["React.js", "Node.js", "AI Integration", "Speech Synthesis"]
    },
    {
      title: "Rescan",
      subtitle: "ATS Resume Scanner",
      description: "An ATS-style resume analyzer that parses candidate PDFs, extracts technical skills, computes precise job-role compatibility, and returns detailed actionable feedback.",
      link: "https://rescan.netlify.app",
      tags: ["React.js", "Node.js", "ATS Parsing", "AI Scoring"]
    },
    {
      title: "MegaBlog",
      description: "A production-grade blogging platform featuring an interactive rich-text editor, multi-user management, and a high-performance content management database system.",
      link: "https://mega-blog-indol.vercel.app",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Appwrite"]
    },
    {
      title: "Personal Portfolio",
      description: "An immersive, interactive dinosaur-themed developer portfolio displaying skills, projects, and active learning paths with delightful visual cues.",
      link: "https://tanmay-dinoportfolio.netlify.app",
      tags: ["React.js", "Tailwind CSS", "Framer Motion", "Three.js"]
    }
  ];

  const skillCategories = [
    {
      title: "Languages",
      icon: <Code size={20} className="text-brand-accent" />,
      skills: ["JavaScript", "Python", "C++", "SQL"]
    },
    {
      title: "Frontend Development",
      icon: <Layout size={20} className="text-brand-accent" />,
      skills: ["React.js", "Next.js", "HTML", "CSS", "Tailwind CSS"]
    },
    {
      title: "Backend Development",
      icon: <Server size={20} className="text-brand-accent" />,
      skills: ["Node.js", "Express.js", "REST APIs"]
    },
    {
      title: "Databases",
      icon: <Database size={20} className="text-brand-accent" />,
      skills: ["MongoDB", "MySQL", "Firebase", "Appwrite"]
    },
    {
      title: "Cloud & DevOps",
      icon: <Cpu size={20} className="text-brand-accent" />,
      skills: ["Docker", "Nginx", "Linux", "Cron Jobs"]
    },
    {
      title: "Tools & Platforms",
      icon: <Wrench size={20} className="text-brand-accent" />,
      skills: ["Git", "GitHub", "Postman", "VS Code"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      
      {/* Hero / Header Section */}
      <div className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-24">
        
        {/* Profile Image with Glow Frame */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent to-neutral-800 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden border-2 border-brand-accent/40 shadow-2xl bg-neutral-900">
            <img 
              src="https://avatars.githubusercontent.com/u/101416251?v=4" 
              alt="Tanmay Mishra" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
        
        {/* Bio Details */}
        <div className="flex-1 text-center md:text-left">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-accent/10 text-brand-accent border border-brand-accent/20 uppercase tracking-widest inline-block mb-3">
            Available for Internships & Projects
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Tanmay Mishra
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-neutral-300 mb-6 flex flex-wrap justify-center md:justify-start items-center gap-2">
            <span>Full Stack Developer</span>
            <span className="text-neutral-600 hidden md:inline">•</span>
            <span>DevOps Engineer</span>
            <span className="text-neutral-600 hidden md:inline">•</span>
            <span>AI Enthusiast</span>
          </h2>
          <p className="text-neutral-400 text-lg leading-relaxed mb-8 max-w-3xl">
            Passionate software engineer dedicated to building high-performance web ecosystems, 
            cloud-native infrastructure, and voice-enabled AI agents. Experienced in developing 
            production-ready backend environments and responsive frontends. Currently pursuing my 
            B.Tech in IT at Government Engineering College Bilaspur.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-6">
            {/* Resume Button */}
            <a 
              href="/Tanmay_Mishra_Resume.pdf" 
              download
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-accent hover:bg-white text-brand-dark font-black uppercase tracking-wider text-sm rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(221,217,42,0.25)] group"
            >
              <span>Download Resume</span>
              <Download size={16} className="group-hover:translate-y-0.5 transition-transform duration-300" />
            </a>

            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="https://github.com/TanmayCloud251" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-brand-accent/50 hover:text-brand-accent transition-all text-white hover:-translate-y-0.5"
                title="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/in/tanmaymi251/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-brand-accent/50 hover:text-brand-accent transition-all text-white hover:-translate-y-0.5"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://www.instagram.com/tanmaymishra251/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-brand-accent/50 hover:text-brand-accent transition-all text-white hover:-translate-y-0.5"
                title="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Areas of Expertise */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        <div className="bg-neutral-900/40 backdrop-blur-sm p-8 rounded-3xl border border-neutral-800/80 hover:border-brand-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-accent/5 group">
          <div className="bg-brand-accent/10 p-4 rounded-2xl w-fit mb-6 text-brand-accent group-hover:scale-110 transition-transform">
            <Code size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Full Stack Development</h3>
          <p className="text-neutral-500 leading-relaxed text-sm">
            Crafting highly responsive interfaces and robust backends. Proficient in architectural patterns, state management, and optimized server configurations using Next.js, Node.js, and Express.
          </p>
        </div>

        <div className="bg-neutral-900/40 backdrop-blur-sm p-8 rounded-3xl border border-neutral-800/80 hover:border-brand-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-accent/5 group">
          <div className="bg-brand-accent/10 p-4 rounded-2xl w-fit mb-6 text-brand-accent group-hover:scale-110 transition-transform">
            <Server size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Cloud & DevOps</h3>
          <p className="text-neutral-500 leading-relaxed text-sm">
            Orchestrating containerized infrastructures and automation workflows. Experienced with Docker, Nginx, CI/CD integrations, Linux hosting, and database tuning to ensure high availability.
          </p>
        </div>

        <div className="bg-neutral-900/40 backdrop-blur-sm p-8 rounded-3xl border border-neutral-800/80 hover:border-brand-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-accent/5 group">
          <div className="bg-brand-accent/10 p-4 rounded-2xl w-fit mb-6 text-brand-accent group-hover:scale-110 transition-transform">
            <Brain size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">AI & Automation</h3>
          <p className="text-neutral-500 leading-relaxed text-sm">
            Building conversational agents and semantic processing units. Skilled in designing voice-enabled chatbots, resume parser services, and prompt optimization.
          </p>
        </div>
      </div>

      {/* Technical Skills Section */}
      <div className="mb-24">
        <h2 className="text-3xl font-black text-white mb-10 flex items-center gap-4 tracking-tight">
          <span className="h-8 w-1.5 bg-brand-accent rounded-full" />
          Technical Expertise
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="bg-neutral-900/20 border border-neutral-800/60 p-6 rounded-3xl hover:border-brand-accent/20 transition-colors duration-300">
              <div className="flex items-center gap-3 mb-4">
                {category.icon}
                <h4 className="font-bold text-white text-base">{category.title}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span 
                    key={sIdx} 
                    className="px-3 py-1 text-xs bg-neutral-800/40 border border-neutral-700/30 text-neutral-300 hover:text-brand-accent hover:border-brand-accent/30 rounded-full transition-all duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Projects */}
      <div className="mb-24">
        <h2 className="text-3xl font-black text-white mb-10 flex items-center gap-4 tracking-tight">
          <span className="h-8 w-1.5 bg-brand-accent rounded-full" />
          Featured Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="bg-neutral-900/30 backdrop-blur-sm border border-neutral-800/60 p-8 rounded-3xl flex flex-col justify-between hover:bg-neutral-900/50 hover:border-brand-accent/30 transition-all duration-300 group hover:-translate-y-1">
              <div>
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div>
                    <h4 className="text-2xl font-bold text-white group-hover:text-brand-accent transition-colors">
                      {project.title}
                    </h4>
                    {project.subtitle && (
                      <span className="text-xs font-bold text-brand-accent/80 uppercase tracking-widest block mt-1">
                        {project.subtitle}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 bg-neutral-800 border border-neutral-700/35 text-neutral-400 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-6">
                  <a 
                    href={project.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-brand-accent text-xs font-black uppercase tracking-widest hover:gap-3 transition-all"
                  >
                    <span>Visit Live Link</span> <ExternalLink size={14} />
                  </a>
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-neutral-500 hover:text-white text-xs font-black uppercase tracking-widest transition-colors"
                    >
                      <span>Code Repo</span> <Github size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education & Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-neutral-800/80 pt-16">
        <div>
          <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
            <GraduationCap className="text-brand-accent" size={24} />
            Education
          </h2>
          <div className="bg-neutral-900/20 border border-neutral-800/60 p-6 rounded-3xl">
            <h4 className="font-bold text-white text-lg">Bachelor of Technology</h4>
            <span className="text-brand-accent/80 text-xs font-bold uppercase tracking-wider block mt-1">Information Technology | 2023 - 2027</span>
            <p className="text-neutral-400 text-sm mt-3 font-medium">Government Engineering College Bilaspur, CSVTU</p>
            <p className="text-neutral-500 text-xs mt-1">Bilaspur, Chhattisgarh</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
            <Award className="text-brand-accent" size={24} />
            Leadership & Achievements
          </h2>
          <div className="bg-neutral-900/20 border border-neutral-800/60 p-6 rounded-3xl space-y-4">
            <div>
              <h4 className="font-bold text-white text-sm">Google Developer Club (GDC)</h4>
              <span className="text-neutral-500 text-xs font-semibold uppercase tracking-wider block mt-0.5">Web Development Lead</span>
              <p className="text-neutral-400 text-xs mt-1.5 leading-relaxed">
                Organized hands-on web development workshops and structured mentoring sessions for students.
              </p>
            </div>
            <div className="border-t border-neutral-800/60 pt-4">
              <h4 className="font-bold text-white text-sm">Hackathons & Performance</h4>
              <p className="text-neutral-450 text-xs mt-1.5 leading-relaxed">
                Active participant in AMD Slingshot Hackathon and Tata Elxsi TELIPORT. Singer and guitarist, performed at college events and DD Chhattisgarh television.
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
