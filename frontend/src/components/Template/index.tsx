import Sidebar from "../Sidebar";
import Content from "./Content";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <Content>{children}</Content>
    </div>
  );
}
