import SideBarDashboard from "./_components/SideBarDashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-screen">
        <SideBarDashboard />
        <main className="flex-1 bg-white px-4 py-8">{children}</main>
      </div>
    </>
  );
}
