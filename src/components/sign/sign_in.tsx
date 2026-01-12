"use client";

import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/app";
import { useTranslations } from "next-intl";

export default function SignIn() {
  const t = useTranslations();
  const { setShowSignModal } = useAppContext();

  return (
    <Button
      variant="ghost"
      onClick={() => setShowSignModal(true)}
      className="h-10 px-4 rounded-[10px] border border-indigo-200/70 bg-indigo-50/70 text-slate-600 text-sm font-medium transition-all duration-200 hover:bg-indigo-50/90 hover:border-indigo-300 hover:text-indigo-600 hover:-translate-y-0.5 active:bg-indigo-100/80 shadow-sm"
    >
      {t("user.sign_in")}
    </Button>
  );
}
