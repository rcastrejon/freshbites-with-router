import { Input } from "@/components/ui/input";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Search } from "lucide-react";

export function SearchInput() {
  const { q } = useSearch({ strict: false });
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const searchInput = form.elements.namedItem("q") as HTMLInputElement;
        void navigate({
          to: "/recipes",
          search: {
            q: searchInput.value,
          },
        });
      }}
      className="m-0 flex rounded-lg"
    >
      <Input
        key={q}
        name="q"
        className="-me-px h-9 flex-1 rounded-e-none shadow-none focus-visible:z-10 md:h-8"
        placeholder="Buscar recetas..."
        type="search"
        defaultValue={q ?? ""}
        autoComplete="off"
      />
      <button
        className="inline-flex w-9 items-center justify-center rounded-e-lg border border-input bg-background text-sm text-muted-foreground/80 ring-offset-background transition-shadow hover:bg-accent hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        aria-label="Realizar búsqueda"
        type="submit"
      >
        <Search size={16} strokeWidth={2} aria-hidden="true" />
      </button>
    </form>
  );
}
