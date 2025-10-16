import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        "Explore": [
            { name: "Top Languages", href: "/" },
            { name: "Compare Languages", href: "/compare" },
            { name: "Career Paths", href: "/career-paths" },
        ],
        "Languages": [
            { name: "Python", href: "/language/python" },
            { name: "JavaScript", href: "/language/javascript" },
            { name: "TypeScript", href: "/language/typescript" },
            { name: "Java", href: "/language/java" },
            { name: "C++", href: "/language/cpp" },
            { name: "C#", href: "/language/csharp" },
            { name: "Go", href: "/language/go" },
            { name: "Rust", href: "/language/rust" },
            { name: "Swift", href: "/language/swift" },
            { name: "Kotlin", href: "/language/kotlin" },
        ],
        "Resources": [
            { name: "About", href: "#" },
            { name: "Privacy Policy", href: "#" },
            { name: "Terms of Service", href: "#" },
            { name: "Contact", href: "#" },
        ],
    };

    const socialLinks = [
        { name: "GitHub", href: "#", icon: Github },
        { name: "Twitter", href: "#", icon: Twitter },
        { name: "LinkedIn", href: "#", icon: Linkedin },
        { name: "Email", href: "mailto:contact@example.com", icon: Mail },
    ];

    return (
        <footer className="bg-background border-t">
            <div className="container mx-auto px-4 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-sm">PL</span>
                            </div>
                            <h3 className="text-lg font-semibold">Programming Languages Guide</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Discover the top programming languages for 2026. Make informed decisions about your coding journey with detailed insights, salary data, and career guidance.
                        </p>
                        <div className="flex space-x-2">
                            {socialLinks.map((social) => (
                                <Button
                                    key={social.name}
                                    variant="outline"
                                    size="icon"
                                    asChild
                                    className="h-9 w-9"
                                >
                                    <Link href={social.href} aria-label={social.name}>
                                        <social.icon className="h-4 w-4" />
                                    </Link>
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category} className="space-y-4">
                            <h4 className="text-sm font-semibold uppercase tracking-wider">
                                {category}
                            </h4>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <Separator className="my-8" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>© {currentYear} Programming Languages Guide.</span>
                        <span>Built with</span>
                        <Heart className="h-4 w-4 text-red-500 fill-current" />
                        <span>using Next.js & TypeScript</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>Last updated: October 2025</span>
                        <span>•</span>
                        <span>v1.0.0</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;