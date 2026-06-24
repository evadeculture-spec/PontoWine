"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { b2bSchema, type B2BFormValues } from "@/lib/validations";
import { addB2BLead } from "@/lib/storage";
import { isSupabaseConfigured, getSupabaseBrowserClient } from "@/lib/supabase/client";
import { businessTypeLabels } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormSuccess } from "@/components/forms/form-success";
import { FieldError } from "@/components/forms/field-error";
import { ConsentField } from "@/components/forms/reservation-form";

export function B2BForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<B2BFormValues>({
    resolver: zodResolver(b2bSchema),
    defaultValues: { business_type: "restaurante" },
  });

  async function onSubmit(values: B2BFormValues) {
    const { consent, nif, ...rest } = values;
    const data = { ...rest, nif: nif || undefined };

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        await supabase.from("b2b_leads").insert({ ...data, status: "novo" });
      }
    } else {
      addB2BLead(data);
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <FormSuccess
        title="Pedido enviado!"
        message="Obrigado pelo interesse em trabalhar com a Ponto Wine. A nossa equipa vai analisar o seu pedido e entrar em contacto com uma proposta à medida."
        onReset={() => {
          reset();
          setSubmitted(false);
        }}
        resetLabel="Enviar novo pedido"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="b-company">Restaurante / Empresa</Label>
          <Input id="b-company" {...register("company_name")} />
          <FieldError message={errors.company_name?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="b-contact">Pessoa responsável</Label>
          <Input id="b-contact" {...register("contact_name")} />
          <FieldError message={errors.contact_name?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="b-email">Email</Label>
          <Input id="b-email" type="email" {...register("email")} />
          <FieldError message={errors.email?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="b-phone">Telefone</Label>
          <Input id="b-phone" type="tel" {...register("phone")} />
          <FieldError message={errors.phone?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="b-location">Localidade</Label>
          <Input id="b-location" {...register("location")} />
          <FieldError message={errors.location?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="b-nif">NIF (opcional)</Label>
          <Input id="b-nif" inputMode="numeric" {...register("nif")} />
          <FieldError message={errors.nif?.message} />
        </div>
        <div className="space-y-2">
          <Label>Tipo de negócio</Label>
          <Controller
            control={control}
            name="business_type"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(businessTypeLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError message={errors.business_type?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="b-volume">Volume estimado mensal (opcional)</Label>
          <Input id="b-volume" placeholder="Ex.: 60 garrafas / mês" {...register("monthly_volume")} />
          <FieldError message={errors.monthly_volume?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="b-types">Tipo de vinhos pretendidos (opcional)</Label>
          <Input id="b-types" placeholder="Ex.: tintos do Douro, brancos frescos" {...register("wine_types")} />
          <FieldError message={errors.wine_types?.message} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="b-message">Mensagem (opcional)</Label>
        <Textarea
          id="b-message"
          placeholder="Conte-nos sobre o seu projeto, carta de vinhos ou necessidades."
          {...register("message")}
        />
        <FieldError message={errors.message?.message} />
      </div>

      <ConsentField control={control} error={errors.consent?.message} />

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        Pedir proposta B2B
      </Button>
    </form>
  );
}
