import { Mail, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Contact Us</h1>
      <p className="text-muted-foreground text-center mb-12">
        Have questions about our calculators? Want to report a bug or suggest a new feature?
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-2xl">
          <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
          <form className="space-y-4">
            <div>
              <label className="text-sm text-foreground/80 mb-1 block">Name</label>
              <input type="text" className="w-full bg-input/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your name" />
            </div>
            <div>
              <label className="text-sm text-foreground/80 mb-1 block">Email</label>
              <input type="email" className="w-full bg-input/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="your@email.com" />
            </div>
            <div>
              <label className="text-sm text-foreground/80 mb-1 block">Message</label>
              <textarea rows={4} className="w-full bg-input/50 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary" placeholder="How can we help?"></textarea>
            </div>
            <button type="button" className="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors">
              Send Message
            </button>
          </form>
        </div>
        
        <div className="space-y-6">
          <div className="glass-panel p-8 rounded-2xl flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Email Support</h3>
              <p className="text-muted-foreground text-sm mb-2">We aim to respond to all inquiries within 24 hours.</p>
              <a href="mailto:support@tilecalcpro.com" className="text-primary hover:underline">support@tilecalcpro.com</a>
            </div>
          </div>
          
          <div className="glass-panel p-8 rounded-2xl flex items-start gap-4 border-teal-500/20">
            <div className="w-12 h-12 bg-teal-500/20 rounded-xl flex items-center justify-center text-teal-400 shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Business Inquiries</h3>
              <p className="text-muted-foreground text-sm mb-4">Interested in TileMasterPro&apos;s enterprise solutions for your tile business?</p>
              <a href="https://www.tilemasterpro.in" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-teal-500/20 text-teal-400 rounded-lg text-sm font-medium hover:bg-teal-500/30 transition-colors">
                Visit TileMasterPro
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
