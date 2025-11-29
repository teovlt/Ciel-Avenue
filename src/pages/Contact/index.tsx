import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, CheckCircle2 } from "lucide-react";

export function Contact() {
  const { t } = useTranslation();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-primary/5 to-background">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-24 lg:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 text-sm font-medium text-foreground">
              <MessageSquare className="h-4 w-4 text-primary" />
              {t("contact.hero.badge")}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight text-balance">{t("contact.hero.title")}</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty">{t("contact.hero.description")}</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <Card className="border-border bg-card shadow-lg">
                <CardContent className="p-8">
                  {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-semibold text-foreground">{t("contact.form.successTitle")}</h3>
                      <p className="text-muted-foreground">{t("contact.form.successMessage")}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-foreground">
                          {t("contact.form.name")}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                          placeholder={t("contact.form.namePlaceholder")}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-foreground">
                          {t("contact.form.email")}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                          placeholder={t("contact.form.emailPlaceholder")}
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-medium text-foreground">
                          {t("contact.form.subject")}
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formState.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                        >
                          <option value="">{t("contact.form.subjectPlaceholder")}</option>
                          <option value="general">{t("contact.form.subjects.general")}</option>
                          <option value="buyer">{t("contact.form.subjects.buyer")}</option>
                          <option value="seller">{t("contact.form.subjects.seller")}</option>
                          <option value="expert">{t("contact.form.subjects.expert")}</option>
                          <option value="partnership">{t("contact.form.subjects.partnership")}</option>
                          <option value="other">{t("contact.form.subjects.other")}</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-foreground">
                          {t("contact.form.message")}
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all resize-none"
                          placeholder={t("contact.form.messagePlaceholder")}
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                        <Send className="mr-2 h-5 w-5" />
                        {t("contact.form.submit")}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Info */}
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t("contact.info.title")}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{t("contact.info.description")}</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{t("contact.info.email.title")}</h3>
                    <p className="text-muted-foreground">{t("contact.info.email.description")}</p>
                    <a href="mailto:contact@ciel-avenue.fr" className="text-primary hover:underline font-medium">
                      contact@ciel-avenue.fr
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{t("contact.info.phone.title")}</h3>
                    <p className="text-muted-foreground">{t("contact.info.phone.description")}</p>
                    <a href="tel:+33123456789" className="text-primary hover:underline font-medium">
                      +33 1 23 45 67 89
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{t("contact.info.address.title")}</h3>
                    <p className="text-muted-foreground">{t("contact.info.address.description")}</p>
                    <p className="text-foreground">123 Avenue des Champs-Élysées, 75008 Paris</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{t("contact.info.hours.title")}</h3>
                    <p className="text-muted-foreground">{t("contact.info.hours.description")}</p>
                    <p className="text-foreground">{t("contact.info.hours.schedule")}</p>
                  </div>
                </div>
              </div>

              {/* FAQ Teaser */}
              <Card className="border-border bg-muted/50">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">{t("contact.faq.title")}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{t("contact.faq.description")}</p>
                  <div className="space-y-2">
                    <p className="text-sm text-foreground">• {t("contact.faq.question1")}</p>
                    <p className="text-sm text-foreground">• {t("contact.faq.question2")}</p>
                    <p className="text-sm text-foreground">• {t("contact.faq.question3")}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
