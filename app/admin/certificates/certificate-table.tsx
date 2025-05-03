import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash, QrCode, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import QRCode from "qrcode";
import { toast } from "sonner";

interface Certificate {
  id: string;
  studentName: string;
  studentId: string;
  certificateNumber: string;
  courseTitle: string;
  issueDate: string;
  status: 'active' | 'revoked' | 'pending';
}

export function CertificateTable() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to generate QR code for a certificate
  const generateQRCode = async (certificate: Certificate) => {
    try {
      const verificationUrl = `${window.location.origin}/verify-certificate?number=${certificate.certificateNumber}`;
      const qrDataUrl = await QRCode.toDataURL(verificationUrl);
      
      // Create a download link
      const link = document.createElement('a');
      link.href = qrDataUrl;
      link.download = `certificate-${certificate.certificateNumber}-qr.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("QR code downloaded successfully");
    } catch (error) {
      toast.error("Failed to generate QR code");
      console.error("QR code generation error:", error);
    }
  };

  // TODO: Replace with actual data fetching
  // useEffect(() => {
  //   const fetchCertificates = async () => {
  //     setIsLoading(true);
  //     try {
  //       const { data, error } = await supabase
  //         .from("certificates")
  //         .select("*")
  //         .order("issueDate", { ascending: false });
  //       if (data) setCertificates(data);
  //       if (error) throw error;
  //     } catch (error) {
  //       toast.error("Failed to fetch certificates");
  //       console.error("Fetch error:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchCertificates();
  // }, []);

  const filteredCertificates = certificates.filter(
    (cert) =>
      Object.values(cert).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;
    
    try {
      // TODO: Implement delete functionality
      // const { error } = await supabase
      //   .from("certificates")
      //   .delete()
      //   .match({ id });
      // if (!error) {
      //   setCertificates(certificates.filter((cert) => cert.id !== id));
      //   toast.success("Certificate deleted successfully");
      // }
    } catch (error) {
      toast.error("Failed to delete certificate");
      console.error("Delete error:", error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Search certificates..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm"
        />
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              const csvContent = filteredCertificates
                .map(cert => Object.values(cert).join(','))
                .join('\n');
              const blob = new Blob([csvContent], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'certificates.csv';
              a.click();
            }}
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Certificate Number</TableHead>
              <TableHead>Student Name</TableHead>
              <TableHead>Student ID</TableHead>
              <TableHead>Course Title</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[150px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  Loading certificates...
                </TableCell>
              </TableRow>
            ) : filteredCertificates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No certificates found
                </TableCell>
              </TableRow>
            ) : (
              filteredCertificates.map((certificate) => (
                <TableRow key={certificate.id}>
                  <TableCell>{certificate.certificateNumber}</TableCell>
                  <TableCell>{certificate.studentName}</TableCell>
                  <TableCell>{certificate.studentId}</TableCell>
                  <TableCell>{certificate.courseTitle}</TableCell>
                  <TableCell>
                    {format(new Date(certificate.issueDate), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      certificate.status === 'active' ? 'success' :
                      certificate.status === 'revoked' ? 'error' :
                      'warning'
                    }>
                      {certificate.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => generateQRCode(certificate)}
                        title="Generate QR Code"
                      >
                        <QrCode className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(`/admin/certificates/${certificate.id}/edit`)
                            }
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(certificate.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 