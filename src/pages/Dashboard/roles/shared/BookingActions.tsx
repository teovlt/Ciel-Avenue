import { Button } from "@/components/ui/button";
import { Train, MapPin, Building } from "lucide-react";
import { useTranslation } from "react-i18next";

interface BookingActionsProps {
  className?: string;
}

export function BookingActions({ className = "" }: BookingActionsProps) {
  const { t } = useTranslation();

  return (
    <div className={`flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-border/50 ${className}`}>
      <span className="text-xs text-muted-foreground mr-1">{t("bookingActions.book", "Réserver :")}</span>

      <Button
        variant="outline"
        size="sm"
        className="h-7 px-2 text-[10px] bg-blue-50/50 hover:bg-blue-100 text-blue-700 hover:text-blue-800 border-blue-200 dark:bg-blue-950/30 dark:hover:bg-blue-900/50 dark:text-blue-400 dark:border-blue-800"
        title={t("bookingActions.train", "Train")}
        onClick={() => window.open("https://www.sncf-connect.com/", "_blank")}
      >
        <Train className="h-3 w-3 mr-1" />
        Train
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="h-7 px-2 text-[10px] bg-rose-50/50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 border-rose-200 dark:bg-rose-950/30 dark:hover:bg-rose-900/50 dark:text-rose-400 dark:hover:text-rose-300 dark:border-rose-800"
        title={t("bookingActions.airbnb", "Airbnb")}
        onClick={() => window.open("https://www.airbnb.fr/", "_blank")}
      >
        <MapPin className="h-3 w-3 mr-1" />
        Airbnb
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="h-7 px-2 text-[10px] bg-sky-50/50 hover:bg-sky-100 text-sky-700 hover:text-sky-800 border-sky-200 dark:bg-sky-950/30 dark:hover:bg-sky-900/50 dark:text-sky-400 dark:border-sky-800"
        title={t("bookingActions.booking", "Booking.com")}
        onClick={() => window.open("https://www.booking.com/", "_blank")}
      >
        <Building className="h-3 w-3 mr-1" />
        Hotel
      </Button>
    </div>
  );
}
