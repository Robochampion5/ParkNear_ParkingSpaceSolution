export default function Footer() {
  return (
    <footer className="border-t border-border/50 mt-auto pt-8 text-center text-muted-foreground text-sm">
      <div className="max-w-7xl mx-auto px-4">
        <p className="mb-2">
          © {new Date().getFullYear()} ParkNear. All rights reserved.
        </p>
        <p className="text-xs">
          Made with &hearts; for smarter cities
        </p>
      </div>
    </footer>
  );
}