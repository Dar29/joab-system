import { Navbar } from "@/src/components/layout";

export const metadata = {
  title: 'Farmacia JOAB',
  description: 'Creado',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <Navbar>{children}</Navbar>;
}
