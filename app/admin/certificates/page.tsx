import { Metadata } from "next";
import { CertificateTable } from "./certificate-table";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Certificate Management | Admin Dashboard",
  description: "Manage student certificates and details",
};

export default function CertificatesPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Certificate Management</h1>
          <p className="text-muted-foreground mt-2">
            Add, edit, and manage student certificates
          </p>
        </div>
        <Link href="/admin/certificates/new">
          <Button>
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Certificate
          </Button>
        </Link>
      </div>
      
      <CertificateTable />
    </div>
  );
} 