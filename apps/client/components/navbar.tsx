import { Cannabis } from "lucide-react";

export function Navbar() {
  return (
    <nav className="p-3">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="flex items-center gap-2 text-xl sm:text-2xl md:text-3xl font-medium">
          <div className="bg-amber-500 text-white rounded">
            <Cannabis />
          </div>
          ChatGPT <span className="italic">Clone</span>
        </h1>
      </div>
    </nav>
  );
}
