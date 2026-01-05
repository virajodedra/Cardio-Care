'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; // We need Label component, I'll create it inline or use basic label first. Wait, clean code -> separate Label. 
// I'll create Label component quickly or just use specific styling. Let's use shadcn-like label structure manually for now to save tool calls or create it.
// Actually, `Label` is standard shadcn; I should create it, but I'll implement standard label styling here to avoid extra file for now unless I defined it in plan.
// Plan said "Input / Label / Select". I created Input/Select, forgot Label. I will just style label directly or create generic component later.
// Let's create a local Label const.
import { Select } from '@/components/ui/select';
import ResultCard from './ResultCard';

const FormLabel = ({ children, htmlFor }: { children: React.ReactNode, htmlFor?: string }) => (
    <label htmlFor={htmlFor} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
        {children}
    </label>
);


const BACKEND_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/predict`;

export default function PredictionForm() {
    const [formData, setFormData] = useState({
        age: '',
        height: '',
        weight: '',
        sys_bp: '',
        dia_bp: '',
        gender: 'Female',
        smoke: 'No',
        alco: 'No',
        active: 'Yes',
    });

    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        if (!formData.age || !formData.height || !formData.weight || !formData.sys_bp || !formData.dia_bp) {
            setError("Please fill in all numerical fields.");
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    age: Math.floor(parseInt(formData.age) * 365),
                    height: parseFloat(formData.height),
                    weight: parseFloat(formData.weight),
                    sys_bp: parseInt(formData.sys_bp),
                    dia_bp: parseInt(formData.dia_bp),
                    gender: formData.gender,
                    smoke: formData.smoke,
                    alco: formData.alco,
                    active: formData.active,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to get prediction');
            }

            const data = await response.json();
            // Simulate a slight delay for better UX (so user sees loading state)
            await new Promise(resolve => setTimeout(resolve, 600));
            setResult(data);
        } catch (err: any) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-xl shadow-sm border p-6 md:p-8"
            >
                <h2 className="text-2xl font-bold mb-6 text-foreground tracking-tight">Heart Disease Prediction</h2>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Numerical Fields Group */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Physical Metrics</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="age" className="mb-2 block">Age (Years)</Label>
                                    <Input id="age" name="age" type="number" placeholder="50" value={formData.age} onChange={handleChange} required min="10" max="100" />
                                </div>
                                <div>
                                    <Label htmlFor="gender" className="mb-2 block">Gender</Label>
                                    <Select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="height" className="mb-2 block">Height (cm)</Label>
                                    <Input id="height" name="height" type="number" placeholder="165" value={formData.height} onChange={handleChange} required />
                                </div>
                                <div>
                                    <Label htmlFor="weight" className="mb-2 block">Weight (kg)</Label>
                                    <Input id="weight" name="weight" type="number" placeholder="70" value={formData.weight} onChange={handleChange} required />
                                </div>
                            </div>
                        </div>

                        {/* Medical Metrics Group */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Medical Stats</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="sys_bp" className="mb-2 block">Systolic BP</Label>
                                    <Input id="sys_bp" name="sys_bp" type="number" placeholder="120" value={formData.sys_bp} onChange={handleChange} required />
                                </div>
                                <div>
                                    <Label htmlFor="dia_bp" className="mb-2 block">Diastolic BP</Label>
                                    <Input id="dia_bp" name="dia_bp" type="number" placeholder="80" value={formData.dia_bp} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                                <div>
                                    <Label htmlFor="smoke" className="mb-2 block">Smoker</Label>
                                    <Select id="smoke" name="smoke" value={formData.smoke} onChange={handleChange}>
                                        <option value="No">No</option>
                                        <option value="Yes">Yes</option>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="alco" className="mb-2 block">Alcohol</Label>
                                    <Select id="alco" name="alco" value={formData.alco} onChange={handleChange}>
                                        <option value="No">No</option>
                                        <option value="Yes">Yes</option>
                                    </Select>
                                </div>
                                <div>
                                    <Label htmlFor="active" className="mb-2 block">Active</Label>
                                    <Select id="active" name="active" value={formData.active} onChange={handleChange}>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        disabled={loading}
                        className="w-full text-lg font-semibold h-14"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing...
                            </>
                        ) : 'Predict Risk'}
                    </Button>
                </form>

                {error && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="mt-6 p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20 text-sm font-medium"
                    >
                        {error}
                    </motion.div>
                )}
            </motion.div>

            <AnimatePresence>
                {result && (
                    <ResultCard
                        prediction={result.prediction}
                        probability={result.probability}
                        riskLabel={result.risk_label}
                        bmi={result.bmi}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
