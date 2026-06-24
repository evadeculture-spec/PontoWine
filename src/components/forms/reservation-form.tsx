"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import {
  reservationSchema,
  type ReservationFormValues,
} from "@/lib/validations";
import { addReservation } from "@/lib/storage";
import { isSupabaseConfigured, getSupabaseBrowserClient } from "@/lib/supabase/client";
import { businessInfo } from "@/data/business-info";
import { reservationKindLabels } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSuccess } from "@/components/forms/form-success";
import { FieldError } from "@/components/forms/field-error";

export function ReservationForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: { party_size: 2, kind: "jantar" },
  });

  async function onSubmit(values: ReservationFormValues) {
    const { consent, ...data } = values;

    // Quando o Supabase estiver configurado, persistir na base de dados.
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        await supabase.from("reservations").insert({
          name: data.name,
          phone: data.phone,
          email: data.email,
          date: data.date,
          time: data.time,
          party_size: data.party_size,
          kind: data.kind,
          notes: data.notes ?? null,
          status: "pendente",
        });
      }
    } else {
      // MODO DEMO — guardar localmente (visível no /admin).
      addReservation(data);
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <FormSuccess
        title="Reserva recebida!"
        message="Obrigado. Vamos confirmar a sua reserva o mais breve possível. Em caso de urgência, ligue-nos diretamente."
        onReset={() => {
          reset();
          setSubmitted(false);
        }}
        resetLabel="Fazer nova reserva"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="r-name">Nome</Label>
          <Input id="r-name" placeholder="O seu nome" {...register("name")} />
          <FieldError message={errors.name?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="r-phone">Telefone</Label>
          <Input id="r-phone" type="tel" placeholder="9XX XXX XXX" {...register("phone")} />
          <FieldError message={errors.phone?.message} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="r-email">Email</Label>
        <Input id="r-email" type="email" placeholder="email@exemplo.pt" {...register("email")} />
        <FieldError message={errors.email?.message} />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="r-date">Data</Label>
          <Input id="r-date" type="date" {...register("date")} />
          <FieldError message={errors.date?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="r-time">Hora</Label>
          <Input id="r-time" type="time" {...register("time")} />
          <FieldError message={errors.time?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="r-size">Pessoas</Label>
          <Input id="r-size" type="number" min={1} max={40} {...register("party_size")} />
          <FieldError message={errors.party_size?.message} />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Tipo de reserva</Label>
        <Controller
          control={control}
          name="kind"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Escolha o tipo" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(reservationKindLabels).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError message={errors.kind?.message} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="r-notes">Observações (opcional)</Label>
        <Textarea
          id="r-notes"
          placeholder="Alergias, ocasião especial, preferências..."
          {...register("notes")}
        />
        <FieldError message={errors.notes?.message} />
      </div>

      <ConsentField control={control} error={errors.consent?.message} />

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        Confirmar reserva
      </Button>
    </form>
  );
}

/** Campo de consentimento RGPD reutilizável. */
export function ConsentField({
  control,
  error,
}: {
  control: any;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <Controller
        control={control}
        name="consent"
        render={({ field }) => (
          <label className="flex cursor-pointer items-start gap-3 text-sm text-cream/70">
            <Checkbox
              checked={Boolean(field.value)}
              onCheckedChange={field.onChange}
              aria-invalid={Boolean(error)}
            />
            <span>
              Autorizo o tratamento dos meus dados para resposta a este pedido.{" "}
              <span className="text-cream/50">{businessInfo.legal.gdprNotice}</span>
            </span>
          </label>
        )}
      />
      <FieldError message={error} />
    </div>
  );
}
