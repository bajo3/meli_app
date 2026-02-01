import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Jesús Díaz Automotores",
};

export default function Page() {
  return <HomeClient />;
}
