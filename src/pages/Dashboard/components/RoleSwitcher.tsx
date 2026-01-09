import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/providers/auth-provider";
import { clientSubtypeLabelKeys, expertSubtypeLabelKeys, type ClientSubtype, type ExpertSubtype } from "@/providers/auth-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Users, Briefcase, ChevronDown, Check, Plus } from "lucide-react";

export function RoleSwitcher() {
  const { t } = useTranslation();
  const { user, activeRole, setActiveRoleIndex, hasMultipleRoles } = useAuth();
  const navigate = useNavigate();

  if (!user || !activeRole) return null;

  const getActiveRoleLabel = () => {
    if (activeRole.type === "client") {
      return t(clientSubtypeLabelKeys[activeRole.subtype as ClientSubtype]);
    }
    return t(expertSubtypeLabelKeys[activeRole.subtype as ExpertSubtype]);
  };

  const canAddRole = () => {
    // Users can always add more roles (multiple subtypes allowed)
    return true;
  };

  const handleAddRole = () => {
    // Navigate to journey with state indicating we're adding a role
    navigate("/journey", { state: { addingRole: true } });
  };

  if (!hasMultipleRoles && !canAddRole()) {
    return (
      <Badge className={activeRole.type === "expert" ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}>
        {getActiveRoleLabel()}
      </Badge>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            {activeRole.type === "expert" ? <Briefcase className="h-4 w-4" /> : <Users className="h-4 w-4" />}
            {getActiveRoleLabel()}
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-max">
          {user.roles.map((role, index) => {
            const label =
              role.type === "client"
                ? t(clientSubtypeLabelKeys[role.subtype as ClientSubtype])
                : t(expertSubtypeLabelKeys[role.subtype as ExpertSubtype]);
            const isActive = index === user.activeRoleIndex;

            return (
              <DropdownMenuItem key={index} onClick={() => setActiveRoleIndex(index)} className="flex items-center gap-2 cursor-pointer">
                {role.type === "expert" ? <Briefcase className="h-4 w-4" /> : <Users className="h-4 w-4" />}
                <span className="flex-1">{label}</span>
                {isActive && <Check className="h-4 w-4 text-primary" />}
              </DropdownMenuItem>
            );
          })}

          {canAddRole() && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleAddRole} className="cursor-pointer text-primary">
                <Plus className="h-4 w-4 mr-2" />
                {t("dashboard.roleSwitcher.addRole")}
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
