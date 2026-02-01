import type { Metadata } from "next";
import NosotrosClient from "./NosotrosClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Nosotros - Jesús Díaz Automotores",
};

export default function Page() {
  return <NosotrosClient />;
}
