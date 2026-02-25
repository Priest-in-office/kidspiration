export interface NavItem {
  path: string;
  label: string;
}

export const navItems: NavItem[] = [
  { path: "/", label: "Home" },
  { path: "/partner", label: "Partner" },
  { path: "/shop", label: "Shop" },
  { path: "/about", label: "About Us" },
  { path: "/activities", label: "Activities" },
  { path: "/stories", label: "Impact Stories" },
];