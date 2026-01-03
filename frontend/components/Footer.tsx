export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="w-full border-t bg-background/50 backdrop-blur-lg py-12">
            <div className="container px-4 md:px-6">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 items-start">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-extrabold tracking-tighter text-primary">
                            CardioCare
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                            Advanced AI-powered cardiovascular risk assessment platform designed to help you make informed health decisions.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground">Platform</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                            <li><a href="/model-info" className="hover:text-primary transition-colors">Model Insights</a></li>
                            <li><a href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground">Resources</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-primary transition-colors pointer-events-none">Documentation</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors pointer-events-none">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors pointer-events-none">Terms of Service</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold tracking-wide uppercase text-foreground">Connect</h3>
                        <div className="flex items-center gap-4">
                            <a href="https://github.com/virajodedra" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">
                        &copy; {currentYear} CardioCare. All rights reserved.
                    </p>
                    <p className="text-xs text-muted-foreground/60">
                        Not a medical device. In emergencies, contact your family doctor.
                    </p>
                </div>
            </div>
        </footer>
    );
}
