"use client";

import { Github, Linkedin, Instagram, ExternalLink, Code, Server, Brain } from "lucide-react";

export default function AboutPage() {
  const projects = [
    {
      title: "VideoTube",
      description: "A full-featured video sharing platform built with Next.js, Node.js, and MongoDB.",
      link: "https://github.com/TanmayCloud251/VideoTube",
      tags: ["Next.js", "Node.js", "MongoDB", "Tailwind"]
    },
    {
      title: "MegaBlog",
      description: "A scalable blogging platform with a modern UI and powerful content management features.",
      link: "https://github.com/TanmayCloud251/MegaBlog",
      tags: ["Next.js", "TypeScript", "Tailwind", "Firebase"]
    },
    {
      title: "DevOps Pipeline",
      description: "Automated CI/CD infrastructure for microservices deployment on Kubernetes.",
      link: "https://github.com/TanmayCloud251/DevOps-Pipeline",
      tags: ["Kubernetes", "Docker", "Jenkins", "Terraform"]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-20">
        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-brand-accent/20 shadow-2xl">
          <img 
            src="https://avatars.githubusercontent.com/u/101416251?v=4" 
            alt="Tanmay Mishra" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Tanmay Mishra
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-brand-accent mb-6">
            Full Stack / DevOps / AI Engineer
          </h2>
          <p className="text-neutral-400 text-lg leading-relaxed mb-8 max-w-2xl">
            Passionate engineer dedicated to building scalable, high-performance applications 
            and automated infrastructures. I specialize in the intersection of full-stack 
            development, cloud-native solutions, and artificial intelligence.
          </p>
          
          <div className="flex justify-center md:justify-start gap-4">
            <a href="https://github.com/TanmayCloud251" target="_blank" className="p-3 bg-neutral-800 rounded-xl hover:bg-neutral-700 transition-colors text-white">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/tanmaymi251/" target="_blank" className="p-3 bg-neutral-800 rounded-xl hover:bg-neutral-700 transition-colors text-white">
              <Linkedin size={24} />
            </a>
            <a href="https://www.instagram.com/tanmaymishra251/" target="_blank" className="p-3 bg-neutral-800 rounded-xl hover:bg-neutral-700 transition-colors text-white">
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Expertise */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        <div className="bg-neutral-900/50 p-8 rounded-3xl border border-neutral-800 hover:border-brand-accent/30 transition-all group">
          <div className="bg-brand-accent/10 p-4 rounded-2xl w-fit mb-6 text-brand-accent group-hover:scale-110 transition-transform">
            <Code size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Full Stack Development</h3>
          <p className="text-neutral-500 leading-relaxed">Crafting responsive interfaces and robust backends using modern frameworks like Next.js, Node.js, and Express.</p>
        </div>

        <div className="bg-neutral-900/50 p-8 rounded-3xl border border-neutral-800 hover:border-brand-accent/30 transition-all group">
          <div className="bg-brand-accent/10 p-4 rounded-2xl w-fit mb-6 text-brand-accent group-hover:scale-110 transition-transform">
            <Server size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Cloud & DevOps</h3>
          <p className="text-neutral-500 leading-relaxed">Expertise in AWS, Kubernetes, Docker, and CI/CD pipelines to ensure seamless application delivery.</p>
        </div>

        <div className="bg-neutral-900/50 p-8 rounded-3xl border border-neutral-800 hover:border-brand-accent/30 transition-all group">
          <div className="bg-brand-accent/10 p-4 rounded-2xl w-fit mb-6 text-brand-accent group-hover:scale-110 transition-transform">
            <Brain size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">AI Implementation</h3>
          <p className="text-neutral-500 leading-relaxed">Integrating machine learning models and AI capabilities into web ecosystems for smarter user experiences.</p>
        </div>
      </div>

      {/* Live Projects */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-4">
          <span className="h-10 w-2 bg-brand-accent rounded-full" />
          Live Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="bg-neutral-900/30 p-6 rounded-3xl border border-neutral-800 flex flex-col hover:bg-neutral-900 transition-colors">
              <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>
              <p className="text-neutral-500 text-sm mb-6 flex-1">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-widest font-bold px-2 py-1 bg-neutral-800 text-neutral-400 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
              
              <a 
                href={project.link} 
                className="flex items-center gap-2 text-brand-accent text-sm font-bold hover:gap-3 transition-all"
              >
                View Project <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
