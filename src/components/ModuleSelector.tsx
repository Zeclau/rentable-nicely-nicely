import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { type ModuleId } from "@/data/listings";

export function ModuleSelector({ activeId, className = "" }: { activeId: ModuleId; className?: string }) {
  return (
    <nav aria-label="Seleccionar módulo" className={`items-center gap-1 rounded-md border border-border bg-background p-1 ${className}`}>
      {([1, 3] as const).map((id) => (
        <Button key={id} asChild variant={activeId === id ? "default" : "ghost"} size="sm" className="h-8 flex-1 px-3">
          <Link to={`/modulo-${id}`} aria-current={activeId === id ? "page" : undefined}>
            Módulo {id}
          </Link>
        </Button>
      ))}
    </nav>
  );
}