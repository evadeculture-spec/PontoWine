"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, LayoutDashboard, CalendarClock, Building2, Package, Wine } from "lucide-react";
import { adminLogout } from "@/lib/admin-auth";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { useAdminData } from "@/components/admin/use-admin-data";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dashboard } from "@/components/admin/dashboard";
import { ReservationsTable } from "@/components/admin/reservations-table";
import { B2BTable } from "@/components/admin/b2b-table";
import { OrdersTable } from "@/components/admin/orders-table";
import { WinesCrud } from "@/components/admin/wines-crud";

export function AdminShell({ onLogout }: { onLogout: () => void }) {
  const { reservations, leads, orders, wines } = useAdminData();
  const [tab, setTab] = useState("dashboard");

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-ink/60 backdrop-blur">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Logo showWordmark={false} />
            <div>
              <h1 className="font-serif text-lg text-cream">Painel de administração</h1>
              <p className="text-xs text-cream/50">
                {isSupabaseConfigured() ? (
                  <Badge variant="success">Supabase ligado</Badge>
                ) : (
                  <Badge variant="warning">Modo demo · localStorage</Badge>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/">Ver site</Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                adminLogout();
                onLogout();
              }}
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
            </TabsTrigger>
            <TabsTrigger value="reservas">
              <CalendarClock className="mr-2 h-4 w-4" /> Reservas
            </TabsTrigger>
            <TabsTrigger value="b2b">
              <Building2 className="mr-2 h-4 w-4" /> Pedidos B2B
            </TabsTrigger>
            <TabsTrigger value="encomendas">
              <Package className="mr-2 h-4 w-4" /> Encomendas
            </TabsTrigger>
            <TabsTrigger value="catalogo">
              <Wine className="mr-2 h-4 w-4" /> Catálogo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Dashboard reservations={reservations} leads={leads} orders={orders} />
          </TabsContent>
          <TabsContent value="reservas">
            <ReservationsTable data={reservations} />
          </TabsContent>
          <TabsContent value="b2b">
            <B2BTable data={leads} />
          </TabsContent>
          <TabsContent value="encomendas">
            <OrdersTable data={orders} />
          </TabsContent>
          <TabsContent value="catalogo">
            <WinesCrud data={wines} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
