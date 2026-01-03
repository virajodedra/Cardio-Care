'use client';

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
    PieChart, Pie
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Database, BarChart3, Binary, Info, Activity } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { CountUp } from '@/components/ui/count-up';

const featureImportanceData = [
    { name: 'Systolic BP', value: 0.28 },
    { name: 'Age', value: 0.18 },
    { name: 'Weight', value: 0.12 },
    { name: 'Diastolic BP', value: 0.11 },
    { name: 'Height', value: 0.08 },
    { name: 'Cholesterol', value: 0.08 },
    { name: 'Glucose', value: 0.05 },
];

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const item: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1 }
}

export default function ModelInfo() {
    return (
        <div className="max-w-6xl mx-auto pb-20 px-4 md:px-6 space-y-8">
            <section className="space-y-4 text-center md:text-left pt-8">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">Model <span className="text-gradient">Intelligence</span></h1>
                <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                    CardioCare utilizes a robust **Random Forest Classifier** trained on over 70,000 anonymized patient records.
                </p>
            </section>

            <Tabs defaultValue="metrics" className="w-full space-y-8">
                <TabsList className="grid w-full max-w-md grid-cols-3">
                    <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
                    <TabsTrigger value="analysis">Feature Analysis</TabsTrigger>
                    <TabsTrigger value="explanation">How it Works</TabsTrigger>
                </TabsList>

                {/* METRICS TAB */}
                <TabsContent value="metrics" className="space-y-6">
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        <motion.div variants={item}>
                            <Card className="hover:border-primary/50 relative overflow-hidden group h-full">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110">
                                    <Binary className="h-24 w-24" />
                                </div>
                                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-sm font-medium">Test Accuracy</CardTitle>
                                    <Binary className="h-4 w-4 text-primary" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                                        <CountUp value={73.2} />
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2 font-medium">+2.1% from baseline Decision Tree</p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={item}>
                            <Card className="hover:border-teal-500/50 relative overflow-hidden group h-full">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110">
                                    <BarChart3 className="h-24 w-24" />
                                </div>
                                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-sm font-medium">Precision</CardTitle>
                                    <BarChart3 className="h-4 w-4 text-teal-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-green-400">
                                        <CountUp value={75.1} />
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2 font-medium">High reliability in positive cases</p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={item}>
                            <Card className="hover:border-rose-500/50 relative overflow-hidden group h-full">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110">
                                    <Brain className="h-24 w-24" />
                                </div>
                                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-sm font-medium">Recall</CardTitle>
                                    <Brain className="h-4 w-4 text-rose-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">
                                        <CountUp value={70.8} />
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2 font-medium">Effectiveness in catching true risk</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>

                    {/* Dataset Info */}
                    <Card className="bg-muted/30 border-dashed hover:bg-muted/50 transition-colors">
                        <CardContent className="pt-6 flex flex-col md:flex-row items-center gap-6">
                            <div className="h-16 w-16 bg-background rounded-full flex items-center justify-center border shadow-sm flex-shrink-0">
                                <Database className="h-8 w-8 text-secondary" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">About the Dataset</h3>
                                <p className="text-muted-foreground mt-1">
                                    The model was trained on the standard Cardiovascular Disease dataset (Kaggle), consisting of 70,000 records from medical examinations.
                                    Features include objective (age, height, weight), examination (blood pressure), and subjective (lifestyle) variables.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ANALYSIS TAB */}
                <TabsContent value="analysis">
                    <Card className="overflow-hidden border-t-4 border-t-primary/20">
                        <CardHeader>
                            <CardTitle>Feature Importance</CardTitle>
                            <CardDescription>Which factors contribute most to the risk prediction?</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[500px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={featureImportanceData} layout="vertical" margin={{ left: 20, right: 20 }}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="1" y2="0">
                                            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                                            <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity={1} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
                                    <XAxis type="number" hide />
                                    <YAxis dataKey="name" type="category" width={100} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 13, fontWeight: 500 }} />
                                    <Tooltip
                                        cursor={{ fill: 'hsl(var(--primary))', opacity: 0.1, radius: 4 }}
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                        itemStyle={{ color: 'hsl(var(--foreground))', fontWeight: 'bold' }}
                                    />
                                    <Bar
                                        dataKey="value"
                                        radius={[0, 6, 6, 0]}
                                        fill="url(#colorValue)"
                                        barSize={40}
                                        animationDuration={1500}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* EXPLANATION TAB */}
                <TabsContent value="explanation">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Info className="h-5 w-5 text-primary" />
                                How Random Forest Works
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="prose dark:prose-invert text-muted-foreground w-full max-w-none">
                                <p className="text-lg">
                                    Imagine asking 100 doctors for their opinion on a patient. If 80 of them say "High Risk" and 20 say "Low Risk", you would trust the majority.
                                </p>
                                <p>
                                    Random Forest works the same way. It builds hundreds of small "Decision Trees" on random subsets of the data. Each tree votes on the outcome, and the final prediction is the average of all votes.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 hover:bg-primary/10 transition-colors">
                                    <div className="font-bold text-foreground mb-1 text-lg">Robustness</div>
                                    <div className="text-sm text-muted-foreground">Handles outliers and missing values effectively by averaging multiple trees.</div>
                                </div>
                                <div className="p-4 bg-teal-500/5 rounded-xl border border-teal-500/10 hover:bg-teal-500/10 transition-colors">
                                    <div className="font-bold text-foreground mb-1 text-lg">Non-Linear</div>
                                    <div className="text-sm text-muted-foreground">Captures complex interactions like Age vs Activity that single equations miss.</div>
                                </div>
                                <div className="p-4 bg-rose-500/5 rounded-xl border border-rose-500/10 hover:bg-rose-500/10 transition-colors">
                                    <div className="font-bold text-foreground mb-1 text-lg">Generalization</div>
                                    <div className="text-sm text-muted-foreground">Less likely to "memorize" data (overfit) than single decision trees.</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

            </Tabs>
        </div>
    );
}
