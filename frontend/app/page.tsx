'use client';

import PredictionForm from '@/components/PredictionForm';
import { ArrowDown, Activity, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <div className="relative overflow-hidden pb-20">
      {/* Background Gradient Mesh - Fixed */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="fixed top-40 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ animationDelay: '1s' }} />

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="text-center space-y-8 pt-12 md:pt-24 relative z-10"
      >
        <motion.div variants={fadeInUp} className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary shadow-sm backdrop-blur-sm">
          <Sparkles className="mr-2 h-4 w-4" />
          Next-Gen AI Health Assessment
        </motion.div>

        <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
          Protect Your <span className="text-gradient">Heart</span>,<br className="hidden md:block" /> Protect Your Life.
        </motion.h1>

        <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Advanced cardiovascular risk assessment using machine learning.
          Get instant predictions and personalized health insights in seconds.
        </motion.p>

        <motion.div variants={fadeInUp} className="flex justify-center pt-8">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown className="h-8 w-8 text-primary/50" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Main Content Area */}
      <section id="predict" className="max-w-5xl mx-auto px-4 mt-12 relative z-10">
        <PredictionForm />
      </section>

      {/* Features Grid */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 max-w-6xl mx-auto px-4"
      >
        {[
          { icon: Activity, title: "Instant Analysis", desc: "Real-time analysis powered by Random Forest algorithms trained on 70,000+ medical records.", color: "text-blue-500", bg: "bg-blue-500/10" },
          { icon: ShieldCheck, title: "Private & Secure", desc: "Your health data is processed in-memory for prediction only and is never stored permanently.", color: "text-teal-500", bg: "bg-teal-500/10" },
          { icon: Heart, title: "Actionable Insights", desc: "Receive understandable risk assessments, BMI calculation, and specific lifestyle recommendations.", color: "text-rose-500", bg: "bg-rose-500/10" }
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            variants={fadeInUp}
          >
            <Card className="h-full bg-card/50 backdrop-blur-sm border hover:border-primary/30 transition-all hover:-translate-y-2">
              <CardHeader>
                <div className={`h-14 w-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-4 ${feature.color} shadow-sm`}>
                  <feature.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground leading-relaxed">
                  {feature.desc}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
}
