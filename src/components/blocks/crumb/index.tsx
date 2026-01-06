import { ChevronRight } from "lucide-react";
import { SafeLink } from "@/components/common/safe-link";
import { NavItem } from "@/types/blocks/base";

export default function Crumb({ items }: { items: NavItem[] }) {
  return (
    <nav className="flex items-center text-sm text-muted-foreground">
      {items.map((item, index) => {
        const isActive = item.is_active;
        return (
          <div key={index} className="flex items-center">
            <SafeLink
              href={item.url || ""}
              className={`hover:text-foreground transition-colors ${
                isActive ? "text-primary font-medium hover:text-primary" : ""
              }`}
            >
              {item.title}
            </SafeLink>

            {!isActive && (
              <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/40" />
            )}
          </div>
        );
      })}
    </nav>
  );
}
