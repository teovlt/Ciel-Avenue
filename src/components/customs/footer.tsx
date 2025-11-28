import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram, Crown } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Crown className="h-6 w-6 text-primary" />
              <div className="text-2xl font-bold text-primary">CIEL AVENUE</div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">La révolution de la gestion immobilière digitale.</p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Plateforme */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Plateforme</h3>
            <div className="flex flex-col gap-3">
              <Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Comment ça marche
              </Link>
              <Link to="/journey" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Parcours client
              </Link>
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
            </div>
          </div>

          {/* Professionnels */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Professionnels</h3>
            <div className="flex flex-col gap-3">
              <Link to="/expert" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Devenir expert
              </Link>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Espace vendeur
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Espace promoteur
              </a>
            </div>
          </div>

          {/* À propos */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">À propos</h3>
            <div className="flex flex-col gap-3">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Notre mission
              </Link>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Mentions légales
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© 2025 CIEL AVENUE. Tous droits réservés.</p>
            <p className="text-sm text-muted-foreground">
              Application web développé par{" "}
              <a href="https://teovillet.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                Téo Villet
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
