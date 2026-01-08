import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockVisits } from "../data/mockData";
import { useTranslation } from "react-i18next";
import { Calendar, Clock, MapPin, UserCircle } from "lucide-react";

export function VisitsTab() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-foreground mb-4">{t("dashboard.visits.title")}</h2>
      <div className="space-y-4">
        {mockVisits.map((visit) => (
          <Card key={visit.id} className="border-border bg-card/80 backdrop-blur-sm">
            <CardContent className="p-4 flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0 text-center bg-muted/50 p-4 rounded-xl min-w-[100px]">
                <Calendar className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="font-bold text-lg">{visit.date}</p>
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {visit.time}
                </div>
              </div>
              <div className="flex-1 text-center md:text-left space-y-2">
                <h3 className="font-bold text-lg">{visit.property}</h3>
                <div className="flex flex-col md:flex-row gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1 justify-center md:justify-start">
                    <UserCircle className="h-4 w-4" />
                    {visit.expert}
                  </span>
                  <span className="flex items-center gap-1 justify-center md:justify-start">
                    <MapPin className="h-4 w-4" /> Paris / IDF
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <Badge variant={visit.status === "confirmed" ? "default" : "secondary"} className="justify-center">
                  {visit.status === "confirmed" ? "Confirmé" : "En attente"}
                </Badge>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    Modifier
                  </Button>
                  <Button size="sm" variant="destructive" className="flex-1">
                    Annuler
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
