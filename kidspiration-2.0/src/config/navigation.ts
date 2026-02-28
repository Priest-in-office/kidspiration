export interface NavItem {
  path: string;
  label: string;
}

export const navItems: NavItem[] = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About Us" },
  { path: "/live", label: "Live" },
  { path: "/partner", label: "Partner" },
  // { path: "/shop", label: "Shop" },
  { path: "/4ps", label: "4Ps" },
  { path: "/stories", label: "Impact Stories" },
];