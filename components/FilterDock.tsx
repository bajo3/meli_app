"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function FilterDock({
  visible = true,
  children,
}: {
  visible?: boolean;
  children: React.ReactNode;
}) {
  const [hiddenByNav, setHiddenByNav] = useState(false);

  useEffect(() => {
    const handleNav = (e: Event) => {
      const detail = (e as CustomEvent).detail as boolean;
      setHiddenByNav(detail);
    };
    window.addEventListener("nav:open", handleNav);
    return () => window.removeEventListener("nav:open", handleNav);
  }, []);

  if (!visible || hiddenByNav) return null;

  return (
    <AnimatePresence>
      {visible && !hiddenByNav && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          className="fixed inset-x-3 bottom-3 z-50 rounded-2xl border border-white/10 bg-black/70 p-2 backdrop-blur md:hidden filter-dock"
        >
          <div className="flex flex-wrap items-center gap-2">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
