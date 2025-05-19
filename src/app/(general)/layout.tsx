import { Navbar } from "@/src/components/layout";
import RouteLoader from "@/src/components/RouteLoader"

export const metadata = {
  title: 'Farmacia JOAB',
  description: 'Creado',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RouteLoader />
      <Navbar>{children}</Navbar>
    </>
  );
}
