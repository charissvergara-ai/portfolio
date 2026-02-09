import { Bird } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <img className="h-auto max-w-full animate-bounce" src="../../../../assets/images/base/owl.png" alt="Owl image"
              style={{height: 50}}/>
      <div className="h-1.5 w-48 overflow-hidden rounded-full bg-light-bg">
        <div className="h-full w-1/2 animate-[shimmer_1s_ease-in-out_infinite] rounded-full bg-primary" />
      </div>
    </div>
  );
}
