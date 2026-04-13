"use client";

import { Mail, MessageSquare, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-white mb-4">Get in Touch</h1>
        <p className="text-neutral-500 text-lg">Have a question or want to collaborate? I'd love to hear from you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-neutral-900/50 p-8 rounded-3xl border border-neutral-800 text-center">
          <div className="bg-brand-accent/10 p-4 rounded-2xl w-fit mx-auto mb-6 text-brand-accent">
            <Mail size={24} />
          </div>
          <h3 className="font-bold text-white mb-2">Email</h3>
          <p className="text-sm text-neutral-500">tanmaymi251@gmail.com</p>
        </div>
        
        <div className="bg-neutral-900/50 p-8 rounded-3xl border border-neutral-800 text-center">
          <div className="bg-brand-accent/10 p-4 rounded-2xl w-fit mx-auto mb-6 text-brand-accent">
            <MessageSquare size={24} />
          </div>
          <h3 className="font-bold text-white mb-2">Socials</h3>
          <p className="text-sm text-neutral-500">@TanmayCloud251</p>
        </div>

        <div className="bg-neutral-900/50 p-8 rounded-3xl border border-neutral-800 text-center">
          <div className="bg-brand-accent/10 p-4 rounded-2xl w-fit mx-auto mb-6 text-brand-accent">
            <Send size={24} />
          </div>
          <h3 className="font-bold text-white mb-2">Location</h3>
          <p className="text-sm text-neutral-500">India</p>
        </div>
      </div>

      <form className="bg-neutral-900/30 p-8 md:p-12 rounded-[2rem] border border-neutral-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400 ml-1">Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-brand-accent transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-400 ml-1">Email Address</label>
            <input 
              type="email" 
              placeholder="john@example.com"
              className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-brand-accent transition-colors"
            />
          </div>
        </div>
        
        <div className="space-y-2 mb-8">
          <label className="text-sm font-medium text-neutral-400 ml-1">Message</label>
          <textarea 
            rows={5}
            placeholder="Tell me about your project..."
            className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl px-5 py-4 text-white outline-none focus:border-brand-accent transition-colors resize-none"
          />
        </div>

        <button className="w-full bg-brand-accent text-brand-dark font-bold py-4 rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
          Send Message <Send size={18} />
        </button>
      </form>
    </div>
  );
}
