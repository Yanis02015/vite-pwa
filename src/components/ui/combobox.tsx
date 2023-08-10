"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "./scroll-area";

export function Combobox({
  data,
  placeholder,
  selected = "",
  setSelected,
  disabled = false,
}: {
  data: { key: string; value: string }[];
  placeholder: string;
  selected: string;
  setSelected: (key: string) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger disabled={disabled} asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {selected ? data.find((d) => d.key === selected)?.value : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Recherche..." />
          <CommandEmpty>Aucune données trouvée.</CommandEmpty>
          <ScrollArea className="h-[300px] rounded-md">
            <CommandGroup>
              {data.map((d) => (
                <CommandItem
                  key={d.key}
                  onSelect={() => {
                    setSelected(d.key === selected ? "" : d.key);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected === d.key ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {d.value}
                </CommandItem>
              ))}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
