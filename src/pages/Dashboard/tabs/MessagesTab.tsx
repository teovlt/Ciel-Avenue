import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, UserCircle, Send } from "lucide-react";
import { mockMessages } from "../data/mockData";
import { useTranslation } from "react-i18next";

export function MessagesTab() {
  const { t } = useTranslation();

  return (
    <Card className="border-border bg-card/80 backdrop-blur-sm h-[600px] flex flex-col">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          {t("dashboard.messages.title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden flex flex-col p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mockMessages.map((msg) => (
            <div key={msg.id} className="flex gap-4 p-4 rounded-xl bg-muted/50 max-w-[80%]">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <UserCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-semibold">{msg.from}</span>
                  <span className="text-xs text-muted-foreground">{msg.time}</span>
                </div>
                <p className="text-sm">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-border bg-background/50 backdrop-blur-sm">
          <div className="flex gap-2">
            <Input placeholder={t("dashboard.messages.writePlaceholder") || "Écrivez votre message..."} />
            <Button size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
