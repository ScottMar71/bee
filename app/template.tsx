import { ViewTransition } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition
      name="page"
      share="page"
      enter="page"
      exit="page"
      update="none"
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
