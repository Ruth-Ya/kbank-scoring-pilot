import { isAdminAuthenticated } from "@/lib/auth";
import { loginAdmin, logoutAdmin } from "./actions";

export default function AdminPage({ searchParams }: { searchParams: { error?: string } }) {
  if (isAdminAuthenticated()) {
    return (
      <div className="card space-y-4">
        <h1 className="text-xl font-semibold">Admin connecté</h1>
        <a href="/admin/export" className="btn-primary">Aller à l’export</a>
        <form action={logoutAdmin}><button className="btn border">Se déconnecter</button></form>
      </div>
    );
  }

  return (
    <div className="card max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-semibold">Login Admin</h1>
      {searchParams.error && <p className="text-red-600 text-sm">Mot de passe invalide.</p>}
      <form action={loginAdmin} className="space-y-3">
        <input type="password" name="password" required className="input" placeholder="Mot de passe" />
        <button className="btn-primary w-full">Se connecter</button>
      </form>
    </div>
  );
}
