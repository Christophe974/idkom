import { getMenus } from '@/lib/api';
import Navbar from './Navbar';

export default async function NavbarServer() {
  let menus;
  try {
    const allMenus = await getMenus();
    menus = allMenus.header;
  } catch {
    // Fallback si l'API ne répond pas → Navbar utilise ses defaultMenus
    menus = undefined;
  }

  return <Navbar menus={menus} />;
}
