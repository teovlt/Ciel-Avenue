import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, MapPin, Clock, Calendar as CalendarIcon, ClipboardCheck, UserCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { mockVisits } from "../data/mockData";
import { BookingActions } from "./BookingActions";

export function VisitsTab() {
  const { t } = useTranslation();
  const [currentDate] = useState(new Date());
  const currentMonth = currentDate.toLocaleString("fr-FR", { month: "long" });
  const currentYear = currentDate.getFullYear();

  const daysInMonth = 30;
  const startingEmptyDays = 2; // For alignment
  const calendarDays = Array.from({ length: daysInMonth + startingEmptyDays }, (_, i) => i - startingEmptyDays + 1);

  const getAppointmentsForDay = (day: number) => {
    return mockVisits.filter((visit) => parseInt(visit.date) === day);
  };

  const getBadgeColor = (status: string) => {
    if (status === "confirmed") {
      return "bg-green-500/10 text-green-600 border-green-500/20";
    }
    return "bg-amber-500/10 text-amber-600 border-amber-500/20";
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{t("dashboard.visits.title", "Votre Agenda")}</h2>
          <p className="text-muted-foreground">Planifiez vos visites et vos rendez-vous.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-semibold px-4 capitalize">
            {currentMonth} {currentYear}
          </span>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-3">
          <Card className="border-border bg-card/80 backdrop-blur-sm overflow-hidden">
            <div className="grid grid-cols-7 border-b border-border bg-muted/50">
              {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
                <div key={day} className="py-3 text-center text-sm font-semibold text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 auto-rows-[120px] bg-border gap-[1px]">
              {calendarDays.map((day, idx) => {
                const dayAppointments = getAppointmentsForDay(day);
                const isToday = day === 15; // Just a mock today

                return (
                  <div
                    key={idx}
                    className={`p-2 bg-card hover:bg-muted/50 transition-colors ${day <= 0 ? "opacity-30 bg-muted" : ""} flex flex-col`}
                  >
                    {day > 0 && (
                      <>
                        <div className="flex justify-between items-start">
                          <span
                            className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday ? "bg-primary text-primary-foreground" : "text-foreground"}`}
                          >
                            {day}
                          </span>
                        </div>
                        <div className="mt-1 flex-1 overflow-y-auto space-y-1 scrollbar-hide">
                          {dayAppointments.map((app) => (
                            <div
                              key={app.id}
                              className={`text-xs p-1.5 rounded-md border ${getBadgeColor(app.status)} truncate`}
                              title={`${app.time} - ${app.property}`}
                            >
                              <span className="font-semibold">{app.time}</span> {app.property}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Next Appointments Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="font-bold text-lg px-1 flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5 text-primary" /> Vos prochaines visites
          </h3>
          <div className="space-y-4">
            {mockVisits
              .sort((a, b) => parseInt(a.date) - parseInt(b.date))
              .map((app) => (
                <Card key={app.id} className="border-border bg-card/50 hover:bg-card hover:shadow-md transition-all">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className={`${getBadgeColor(app.status)} flex items-center gap-1.5 px-2 py-0.5`}>
                        <CalendarIcon className="h-3 w-3" />
                        <span className="capitalize">{app.status === "confirmed" ? "Confirmé" : "En attente"}</span>
                      </Badge>
                      <span className="text-sm font-bold bg-muted px-2 py-1 rounded-md">{app.date}</span>
                    </div>

                    <div>
                      <h4 className="font-bold text-foreground leading-tight">{app.property}</h4>
                      <p className="text-sm text-primary font-medium mt-1 flex items-center gap-1">
                        <UserCircle className="h-3 w-3" /> {app.expert}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/50">
                      <div className="flex items-center gap-1 shrink-0">
                        <Clock className="h-3 w-3" />
                        {app.time}
                      </div>
                      <div className="flex items-center gap-1 truncate w-full">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate" title="Paris / IDF">
                          Paris / IDF
                        </span>
                      </div>
                    </div>
                    <BookingActions />
                  </CardContent>
                </Card>
              ))}
          </div>
          <Button className="w-full mt-4" variant="outline">
            Voir tout l'agenda
          </Button>
        </div>
      </div>
    </div>
  );
}
