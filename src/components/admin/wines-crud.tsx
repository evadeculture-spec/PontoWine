"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Star, RotateCcw } from "lucide-react";
import type { Wine, WineType, WineRegion } from "@/data/wines";
import { upsertWine, deleteWine, resetWines } from "@/lib/storage";
import { demoId, formatEUR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TYPES: WineType[] = ["Tinto", "Branco", "Rosé", "Espumante"];
const REGIONS: WineRegion[] = [
  "Beira Interior",
  "Douro",
  "Dão",
  "Alentejo",
  "Vinho Verde",
  "Bairrada",
];

function emptyWine(): Wine {
  return {
    id: demoId(),
    name: "",
    region: "Beira Interior",
    type: "Tinto",
    producer: "",
    price: 0,
    stock: 0,
    description: "",
    pairing: "",
    temperature: "",
    grapes: [],
    isFeatured: false,
    b2bAvailable: false,
  };
}

function WineForm({
  initial,
  onSave,
  onClose,
}: {
  initial: Wine;
  onSave: (w: Wine) => void;
  onClose: () => void;
}) {
  const [w, setW] = useState<Wine>(initial);
  const set = <K extends keyof Wine>(k: K, v: Wine[K]) =>
    setW((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="grid max-h-[70vh] gap-4 overflow-y-auto pr-1">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Nome</Label>
          <Input value={w.name} onChange={(e) => set("name", e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label>Produtor</Label>
          <Input value={w.producer} onChange={(e) => set("producer", e.target.value)} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label>Tipo</Label>
          <Select value={w.type} onValueChange={(v) => set("type", v as WineType)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {TYPES.map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Região</Label>
          <Select value={w.region} onValueChange={(v) => set("region", v as WineRegion)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {REGIONS.map((r) => (
                <SelectItem key={r} value={r}>{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label>Preço (€)</Label>
          <Input
            type="number"
            step="0.5"
            value={w.price}
            onChange={(e) => set("price", Number(e.target.value))}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Stock</Label>
          <Input
            type="number"
            value={w.stock}
            onChange={(e) => set("stock", Number(e.target.value))}
          />
        </div>
        <div className="space-y-1.5">
          <Label>Temperatura</Label>
          <Input
            value={w.temperature}
            placeholder="16–18 °C"
            onChange={(e) => set("temperature", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Castas (separadas por vírgula)</Label>
        <Input
          value={w.grapes.join(", ")}
          onChange={(e) =>
            set(
              "grapes",
              e.target.value.split(",").map((g) => g.trim()).filter(Boolean)
            )
          }
        />
      </div>

      <div className="space-y-1.5">
        <Label>Harmonização</Label>
        <Input value={w.pairing} onChange={(e) => set("pairing", e.target.value)} />
      </div>

      <div className="space-y-1.5">
        <Label>Descrição</Label>
        <Textarea
          value={w.description}
          onChange={(e) => set("description", e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex items-center gap-2 text-sm text-cream/80">
          <input
            type="checkbox"
            checked={w.isFeatured}
            onChange={(e) => set("isFeatured", e.target.checked)}
            className="accent-gold"
          />
          Destaque
        </label>
        <label className="flex items-center gap-2 text-sm text-cream/80">
          <input
            type="checkbox"
            checked={w.b2bAvailable}
            onChange={(e) => set("b2bAvailable", e.target.checked)}
            className="accent-gold"
          />
          Disponível para B2B
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="ghost" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          onClick={() => {
            onSave(w);
            onClose();
          }}
          disabled={!w.name.trim()}
        >
          Guardar
        </Button>
      </div>
    </div>
  );
}

export function WinesCrud({ data }: { data: Wine[] }) {
  const [editing, setEditing] = useState<Wine | null>(null);
  const [open, setOpen] = useState(false);

  function openNew() {
    setEditing(emptyWine());
    setOpen(true);
  }
  function openEdit(w: Wine) {
    setEditing(w);
    setOpen(true);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm" onClick={openNew}>
          <Plus className="h-4 w-4" />
          Adicionar vinho
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="ml-auto"
          onClick={() => {
            if (confirm("Repor o catálogo inicial? As alterações demo serão perdidas.")) {
              resetWines();
            }
          }}
        >
          <RotateCcw className="h-4 w-4" />
          Repor catálogo
        </Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-white/[0.03] text-left text-xs uppercase tracking-wider text-cream/50">
            <tr>
              <th className="p-3">Vinho</th>
              <th className="p-3">Tipo / Região</th>
              <th className="p-3">Preço</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Flags</th>
              <th className="p-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.map((w) => (
              <tr key={w.id} className="hover:bg-white/[0.02]">
                <td className="p-3">
                  <span className="text-cream">{w.name}</span>
                  <span className="block text-xs text-cream/50">{w.producer}</span>
                </td>
                <td className="p-3 text-cream/70">
                  {w.type}
                  <span className="block text-xs text-cream/50">{w.region}</span>
                </td>
                <td className="p-3 text-gold">{formatEUR(w.price)}</td>
                <td className="p-3 text-cream/70">{w.stock}</td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {w.isFeatured && (
                      <Badge variant="default">
                        <Star className="mr-1 h-3 w-3" /> Destaque
                      </Badge>
                    )}
                    {w.b2bAvailable && <Badge variant="outline">B2B</Badge>}
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex justify-end gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => openEdit(w)}
                      aria-label="Editar"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        if (confirm(`Apagar "${w.name}"?`)) deleteWine(w.id);
                      }}
                      aria-label="Apagar"
                    >
                      <Trash2 className="h-4 w-4 text-red-300" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editing && data.some((w) => w.id === editing.id)
                ? "Editar vinho"
                : "Novo vinho"}
            </DialogTitle>
          </DialogHeader>
          {editing && (
            <WineForm
              initial={editing}
              onSave={upsertWine}
              onClose={() => setOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
