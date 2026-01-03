'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Activity, Scale } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultCardProps {
    prediction: number;
    probability: number;
    riskLabel: string;
    bmi: number;
}

export default function ResultCard({ prediction, probability, riskLabel, bmi }: ResultCardProps) {
    const isHighRisk = prediction === 1;
    const percent = (probability * 100).toFixed(1);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
        >
            <Card className={cn(
                "border-l-4 overflow-hidden transition-all duration-300",
                isHighRisk ? "border-l-destructive" : "border-l-secondary"
            )}>
                <div className={cn("absolute top-0 left-0 w-full h-1", isHighRisk ? "bg-destructive/20" : "bg-secondary/20")} />

                <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                        <Badge variant={isHighRisk ? "destructive" : "secondary"} className="h-8 w-8 rounded-full p-0 flex items-center justify-center">
                            {isHighRisk ? <AlertCircle className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
                        </Badge>
                        <div>
                            <CardTitle className="text-xl text-foreground">
                                {isHighRisk ? "High Risk Detected" : "Low Risk Detected"}
                            </CardTitle>
                            <CardDescription>
                                Based on the analysis of your health metrics.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                <Activity className="h-4 w-4" /> Probability
                            </div>
                            <div className="text-2xl font-bold text-foreground">{percent}%</div>
                            <div className="w-full bg-muted h-2 rounded-full mt-2 overflow-hidden">
                                <motion.div
                                    className={cn("h-full rounded-full", isHighRisk ? "bg-destructive" : "bg-secondary")}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percent}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                />
                            </div>
                        </div>
                        <div className="p-4 bg-muted/50 rounded-lg">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                <Scale className="h-4 w-4" /> BMI
                            </div>
                            <div className="text-2xl font-bold text-foreground">{bmi.toFixed(1)}</div>
                            <p className="text-xs text-muted-foreground mt-1">Normal: 18.5 - 24.9</p>
                        </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-border">
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Actionable Tips</h4>
                        <ul className="grid gap-2 text-sm text-foreground/80">
                            {isHighRisk ? (
                                <>
                                    <li className="flex items-start gap-2">
                                        <span className="text-destructive mt-1">•</span>
                                        <span>Consult a cardiologist specifically for further tests.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-destructive mt-1">•</span>
                                        <span>Monitor your blood pressure daily.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-destructive mt-1">•</span>
                                        <span>Reduce salt and saturated fats in your diet.</span>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="flex items-start gap-2">
                                        <span className="text-secondary mt-1">•</span>
                                        <span>Maintain your healthy lifestyle!</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-secondary mt-1">•</span>
                                        <span>Keep active with regular moderate exercise.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-secondary mt-1">•</span>
                                        <span>Continue a balanced diet.</span>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">
                    <AlertCircle className="inline h-3 w-3 mr-1" />
                    This is an algorithmic prediction, not a medical diagnosis. In emergencies, contact your family doctor.
                </p>
            </div>
        </motion.div>
    );
}
