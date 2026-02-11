import { getNavigation } from '@/lib/api';
import Navbar from './Navbar';

export default async function NavbarServer() {
  let menus;
  try {
    menus = await getNavigation();
  } catch {
    // Fallback si l'API ne répond pas (colonnes pas encore créées, etc.)
    menus = undefined;
  }

  return <Navbar menus={menus} />;
}
