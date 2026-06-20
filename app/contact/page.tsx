"use client";

import { useState } from "react";
import { Mail, MessageSquare, Send, Github, Linkedin, Instagram, CheckCircle, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill out all fields.");
      return;
    }

    // Email address formatting check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      // Simulate API submit delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Clear success overlay after 5 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 5000);
    } catch (err) {
      setStatus("error");
      setErrorMessage("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-white mb-4">Get in Touch</h1>
        <p className="text-neutral-500 text-lg">Have a question or want to collaborate? I'd love to hear from you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Email */}
        <div className="bg-neutral-900/50 p-8 rounded-3xl border border-neutral-800 text-center hover:border-brand-accent/20 transition-all duration-300">
          <div className="bg-brand-accent/10 p-4 rounded-2xl w-fit mx-auto mb-6 text-brand-accent">
            <Mail size={24} />
          </div>
          <h3 className="font-bold text-white mb-2">Email</h3>
          <a 
            href="mailto:tanmaymi251@gmail.com" 
            className="text-sm text-neutral-500 hover:text-brand-accent transition-colors"
          >
            tanmaymi251@gmail.com
          </a>
        </div>
        
        {/* Socials */}
        <div className="bg-neutral-900/50 p-8 rounded-3xl border border-neutral-800 text-center hover:border-brand-accent/20 transition-all duration-300">
          <div className="bg-brand-accent/10 p-4 rounded-2xl w-fit mx-auto mb-6 text-brand-accent">
            <MessageSquare size={24} />
          </div>
          <h3 className="font-bold text-white mb-2">Socials</h3>
          <div className="flex justify-center gap-4 mt-3">
            <a 
              href="https://www.instagram.com/tanmaymishra251/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 bg-neutral-950 border border-neutral-850 hover:border-brand-accent/40 rounded-xl text-neutral-450 hover:text-brand-accent transition-all hover:-translate-y-0.5"
              title="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a 
              href="https://www.linkedin.com/in/tanmaymi251/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 bg-neutral-950 border border-neutral-850 hover:border-brand-accent/40 rounded-xl text-neutral-450 hover:text-brand-accent transition-all hover:-translate-y-0.5"
              title="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a 
              href="https://github.com/TanmayCloud251" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 bg-neutral-950 border border-neutral-850 hover:border-brand-accent/40 rounded-xl text-neutral-450 hover:text-brand-accent transition-all hover:-translate-y-0.5"
              title="GitHub"
            >
              <Github size={18} />
            </a>
          </div>
        </div>

        {/* Location */}
        <div className="bg-neutral-900/50 p-8 rounded-3xl border border-neutral-800 text-center hover:border-brand-accent/20 transition-all duration-300">
          <div className="bg-brand-accent/10 p-4 rounded-2xl w-fit mx-auto mb-6 text-brand-accent">
            <Send size={24} />
          </div>
          <h3 className="font-bold text-white mb-2">Location</h3>
          <p className="text-sm text-neutral-500">India</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-neutral-900/30 p-8 md:p-12 rounded-[2rem] border border-neutral-800 relative overflow-hidden">
        
        {/* Success Dialog Overlay */}
        {status === "success" && (
          <div className="absolute inset-0 bg-neutral-950/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 z-10 animate-fade-in">
            <div className="bg-emerald-500/10 text-emerald-400 p-4 rounded-full mb-4">
              <CheckCircle size={48} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Message Sent Successfully!</h3>
            <p className="text-neutral-450 max-w-sm">
              Thank you for reaching out, Tanmay has received your message and will get back to you shortly.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400 ml-1">Full Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              disabled={status === "submitting"}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-brand-accent disabled:opacity-50 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400 ml-1">Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              disabled={status === "submitting"}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-brand-accent disabled:opacity-50 transition-colors"
            />
          </div>
        </div>
        
        <div className="space-y-2 mb-8">
          <label className="text-sm font-medium text-neutral-400 ml-1">Message</label>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            placeholder="Tell me about your project..."
            required
            disabled={status === "submitting"}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-brand-accent disabled:opacity-50 transition-colors resize-none"
          />
        </div>

        {status === "error" && (
          <p className="text-sm text-red-500 font-bold mb-6 ml-1">
            {errorMessage}
          </p>
        )}

        <button 
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-brand-accent text-brand-dark font-extrabold py-4 rounded-2xl hover:opacity-90 active:scale-[0.99] disabled:opacity-75 disabled:active:scale-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          {status === "submitting" ? (
            <>
              Sending Message...
              <Loader2 size={18} className="animate-spin" />
            </>
          ) : (
            <>
              Send Message <Send size={18} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
