import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, MapPin, Clock, Calendar as CalendarIcon, FileSignature, Users, Video } from "lucide-react";
import { BookingActions } from "../shared/BookingActions";
// Mock data for the calendar
const mockAppointments = [
  { id: 1, date: 15, title: "Signature Compromis", client: "M. et Mme Dupont", time: "10:00", type: "signature", location: "Étude" },
  { id: 2, date: 15, title: "Rendez-vous Conseil", client: "SCI Les Mimosas", time: "14:30", type: "conseil", location: "Visioconférence" },
  { id: 3, date: 18, title: "Acte Authentique", client: "Mme Martin", time: "11:00", type: "acte", location: "Étude" },
  { id: 4, date: 22, title: "Ouverture Succession", client: "Famille Bernard", time: "09:30", type: "succession", location: "Étude" },
  { id: 5, date: 28, title: "Signature Compromis", client: "M. Lemaire", time: "16:00", type: "signature", location: "Étude" },
];

export function NotaryAgendaTab() {
  const [currentDate] = useState(new Date());
  const currentMonth = currentDate.toLocaleString("fr-FR", { month: "long" });
  const currentYear = currentDate.getFullYear();

  // Generating a simple calendar grid (assuming 30 days for visual demo and starting on a Monday)
  const daysInMonth = 30;
  const startingEmptyDays = 2; // e.g. Month starts on Wednesday
  const calendarDays = Array.from({ length: daysInMonth + startingEmptyDays }, (_, i) => i - startingEmptyDays + 1);

  const getAppointmentsForDay = (day: number) => {
    return mockAppointments.filter((app) => app.date === day);
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "signature":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "acte":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "conseil":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      case "succession":
        return "bg-orange-500/10 text-orange-600 border-orange-500/20";
      default:
        return "bg-primary/10 text-primary border-primary/20";
    }
  };

  const getIcon = (type: string, location: string) => {
    if (location.includes("Visio")) return <Video className="h-3 w-3" />;
    switch (type) {
      case "signature":
      case "acte":
        return <FileSignature className="h-3 w-3" />;
      case "conseil":
      case "succession":
        return <Users className="h-3 w-3" />;
      default:
        return <CalendarIcon className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Votre Agenda</h2>
          <p className="text-muted-foreground">Gérez vos rendez-vous et signatures à venir.</p>
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
                const isToday = day === 15; // Mocking today as the 15th

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
                              className={`text-xs p-1.5 rounded-md border ${getBadgeColor(app.type)} truncate`}
                              title={`${app.time} - ${app.title}`}
                            >
                              <span className="font-semibold">{app.time}</span> {app.title}
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
            <CalendarIcon className="h-5 w-5 text-primary" /> À venir
          </h3>
          <div className="space-y-4">
            {mockAppointments
              .sort((a, b) => a.date - b.date)
              .slice(0, 4)
              .map((app) => (
                <Card key={app.id} className="border-border bg-card/50 hover:bg-card hover:shadow-md transition-all">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className={`${getBadgeColor(app.type)} flex items-center gap-1.5 px-2 py-0.5`}>
                        {getIcon(app.type, app.location)}
                        <span className="capitalize">{app.type}</span>
                      </Badge>
                      <span className="text-sm font-bold bg-muted px-2 py-1 rounded-md">{app.date} Oct</span>
                    </div>

                    <div>
                      <h4 className="font-bold text-foreground leading-tight">{app.title}</h4>
                      <p className="text-sm text-primary font-medium mt-1">{app.client}</p>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t border-border/50">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {app.time}
                      </div>
                      <div className="flex items-center gap-1 truncate w-full">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{app.location}</span>
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
