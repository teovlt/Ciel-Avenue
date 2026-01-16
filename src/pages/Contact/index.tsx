import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send, Clock, CheckCircle2 } from "lucide-react";

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

  const contactInfo = [
    {
      icon: Mail,
      title: t("contact.info.email.title"),
      desc: t("contact.info.email.description"),
      value: "contact@ciel-avenue.fr",
      href: "mailto:contact@ciel-avenue.fr",
    },
    {
      icon: Phone,
      title: t("contact.info.phone.title"),
      desc: t("contact.info.phone.description"),
      value: "+33 1 23 45 67 89",
      href: "tel:+33123456789",
    },
    {
      icon: MapPin,
      title: t("contact.info.address.title"),
      desc: t("contact.info.address.description"),
      value: "123 Avenue des Champs-Élysées, 75008 Paris",
    },
    {
      icon: Clock,
      title: t("contact.info.hours.title"),
      desc: t("contact.info.hours.description"),
      value: t("contact.info.hours.schedule"),
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight animate-fade-in-up">
              {t("contact.hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed animate-fade-in-up-delay-1">{t("contact.hero.description")}</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{t("contact.info.title")}</h2>
                  <p className="text-muted-foreground leading-relaxed">{t("contact.info.description")}</p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{item.desc}</p>
                        {item.href ? (
                          <a href={item.href} className="text-primary hover:underline font-medium">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-foreground">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* FAQ Preview */}
                <Card className="border-0 bg-muted/50">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-3">{t("contact.faq.title")}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{t("contact.faq.description")}</p>
                    <ul className="space-y-2 text-sm">
                      <li className="text-foreground">• {t("contact.faq.question1")}</li>
                      <li className="text-foreground">• {t("contact.faq.question2")}</li>
                      <li className="text-foreground">• {t("contact.faq.question3")}</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-3">
                <Card className="border-0 shadow-xl">
                  <CardContent className="p-8 md:p-10">
                    {isSubmitted ? (
                      <div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
                        <div className="h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                        </div>
                        <h3 className="text-2xl font-semibold text-foreground">{t("contact.form.successTitle")}</h3>
                        <p className="text-muted-foreground">{t("contact.form.successMessage")}</p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
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
                              className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                              placeholder={t("contact.form.emailPlaceholder")}
                            />
                          </div>
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
                            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
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
                            rows={6}
                            className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                            placeholder={t("contact.form.messagePlaceholder")}
                          />
                        </div>

                        <Button type="submit" size="lg" className="w-full py-6 text-lg rounded-xl">
                          <Send className="mr-2 h-5 w-5" />
                          {t("contact.form.submit")}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
