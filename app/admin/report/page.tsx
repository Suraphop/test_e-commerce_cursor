import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function ReportPage() {
  const session = await auth();
  if (!session || session.user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Admin Report</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">This is a protected report page. Only admins can see this.</p>
          {/* Add your report content here */}
        </CardContent>
      </Card>
    </div>
  );
} 