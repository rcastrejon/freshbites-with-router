import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, XIcon, Trash, Image } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export function NewRecipeSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="sm">
          <PlusCircle className="h-4 w-4" />
          Nueva receta
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Publicar nueva receta</SheetTitle>
          <SheetDescription className="sr-only">
            Usa el siguiente formulario para compartir tu receta con los demás.
            Asegúrate de incluir todos los detalles necesarios para que otros
            puedan prepararla.
          </SheetDescription>
        </SheetHeader>
        <NewRecipeForm />
        <SheetFooter>
          <Button type="submit" form="new-recipe-form">
            Publicar
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function ImageInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);

  function clearInput() {
    setImage(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="relative">
      <input
        className="absolute inset-0 -z-50 opacity-0"
        id="image"
        name="image"
        type="file"
        accept="image/jpeg"
        multiple={false}
        required
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setImage(file);
        }}
        ref={inputRef}
      />
      {!image ? (
        <label
          htmlFor="image"
          className="flex min-h-[150px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground/25 px-6 py-4 text-center hover:border-muted-foreground/50"
        >
          <div className="space-y-1">
            <p className="text-sm font-medium">Imagen de la receta</p>
            <p className="text-xs text-muted-foreground">
              Esta imagen será la primera impresión de tu receta. Asegúrate de
              que sea clara y apetitosa.
            </p>
          </div>
        </label>
      ) : (
        <div className="inline-flex w-full -space-x-px rounded-lg shadow-sm">
          <div className="inline-grid h-9 w-full grid-cols-[auto,_1fr] items-center rounded-l-lg border">
            <div className="inline-flex w-9 items-center justify-center">
              <Image className="h-4 w-4" />
            </div>
            <span className="truncate pr-2 text-sm">{image.name}</span>
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-none rounded-r-lg shadow-none hover:text-destructive"
            onClick={clearInput}
          >
            <Trash className="h-4 w-4" />
            <span className="sr-only">Eliminar imagen</span>
          </Button>
        </div>
      )}
    </div>
  );
}

function NewRecipeForm() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) {
      return;
    }

    const ingredientsInput = form.elements.namedItem(
      "ingredients-input",
    ) as HTMLInputElement;
    const instructionsInput = form.elements.namedItem(
      "instructions-input",
    ) as HTMLTextAreaElement;

    ingredientsInput.setCustomValidity(
      ingredients.length === 0 ? "Agrega al menos un ingrediente" : "",
    );
    instructionsInput.setCustomValidity(
      instructions.length === 0 ? "Agrega al menos una instrucción" : "",
    );
  }, [ingredients, instructions]);

  return (
    <form
      id="new-recipe-form"
      className="m-0 grid gap-4 py-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!e.currentTarget.reportValidity()) return;
        console.log("Form submitted");
      }}
      ref={formRef}
    >
      <ImageInput />
      <div className="space-y-2">
        <Label htmlFor="title">Título</Label>
        <Input id="title" name="title" autoComplete="off" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea
          id="description"
          name="description"
          autoComplete="off"
          required
          className="h-24"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="time">Tiempo</Label>
          <div className="relative">
            <Input
              id="preparationTime"
              name="preparationTime"
              className="peer pe-12"
              type="number"
              min="1"
              required
            />
            <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50">
              min
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="servings">Porciones</Label>
          <Input id="servings" name="servings" type="number" min="1" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="cost">Costo</Label>
        <div className="relative">
          <Input
            id="cost"
            name="cost"
            className="peer pe-12 ps-6"
            type="number"
            min="1"
            step="0.01"
            required
          />
          <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm text-muted-foreground peer-disabled:opacity-50">
            $
          </span>
          <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-sm text-muted-foreground peer-disabled:opacity-50">
            MXN
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="ingredients-input">Ingredientes</Label>
        <Input
          id="ingredients-input"
          name="ingredients-input"
          placeholder="Presiona Enter para agregar"
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const input = e.target as HTMLInputElement;
              if (input.value.trim()) {
                setIngredients([...ingredients, input.value.trim()]);
                input.value = "";
                input.setCustomValidity("");
              }
            }
          }}
        />
        <ul className="space-y-1">
          {ingredients.map((ingredient, i) => (
            <li
              key={i}
              className="flex justify-between rounded-md bg-muted p-2 text-sm"
            >
              <input hidden name="ingredients" defaultValue={ingredient} />
              <span>{ingredient}</span>
              <div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-muted-foreground hover:text-destructive"
                  onClick={() =>
                    setIngredients(
                      ingredients.filter((_, index) => index !== i),
                    )
                  }
                >
                  <XIcon />
                  <span className="sr-only">Eliminar ingrediente</span>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-2">
        <Label htmlFor="instructions-input">Instrucciones</Label>
        <Textarea
          id="instructions-input"
          name="instructions-input"
          placeholder="Presiona Enter para agregar"
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const input = e.target as HTMLTextAreaElement;
              if (input.value.trim()) {
                setInstructions([...instructions, input.value.trim()]);
                input.value = "";
                input.setCustomValidity("");
              }
            }
          }}
        />
        <ol className="list-inside list-decimal space-y-1">
          {instructions.map((instruction, i) => (
            <li
              key={i}
              className="flex justify-between rounded-md bg-muted p-2 text-sm"
            >
              <input hidden name="instructions" defaultValue={instruction} />
              <span>{instruction}</span>
              <div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 text-muted-foreground hover:text-destructive"
                  onClick={() =>
                    setInstructions(
                      instructions.filter((_, index) => index !== i),
                    )
                  }
                >
                  <XIcon />
                  <span className="sr-only">Eliminar instrucción</span>
                </Button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </form>
  );
}
