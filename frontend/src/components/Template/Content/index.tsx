export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-8 flex-1" style={{ backgroundColor: "#f5f5f5" }}>
      {children}
    </div>
  );
}
