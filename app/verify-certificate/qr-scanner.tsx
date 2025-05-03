"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Camera, StopCircle } from "lucide-react";

export function QrScanner() {
  const router = useRouter();
  const [scanning, setScanning] = useState(false);
  const [scanner, setScanner] = useState<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    return () => {
      if (scanner) {
        scanner.clear();
      }
    };
  }, [scanner]);

  const startScanning = () => {
    const qrScanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250,
        aspectRatio: 1,
      },
      false
    );

    qrScanner.render(onScanSuccess, onScanError);
    setScanner(qrScanner);
    setScanning(true);
  };

  const stopScanning = () => {
    if (scanner) {
      scanner.clear();
      setScanner(null);
    }
    setScanning(false);
  };

  const onScanSuccess = (decodedText: string) => {
    try {
      const url = new URL(decodedText);
      const certificateNumber = url.searchParams.get("number");
      
      if (certificateNumber) {
        stopScanning();
        router.push(`/verify-certificate?number=${certificateNumber}`);
      } else {
        toast.error("Invalid QR code format");
      }
    } catch (error) {
      toast.error("Invalid QR code");
      console.error("QR scan error:", error);
    }
  };

  const onScanError = (error: any) => {
    // Ignore frequent scan errors
    if (error === "QR code parse error, error = NotFoundException") {
      return;
    }
    console.error("QR scan error:", error);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        {!scanning ? (
          <Button onClick={startScanning}>
            <Camera className="w-4 h-4 mr-2" />
            Start Scanning
          </Button>
        ) : (
          <Button onClick={stopScanning} variant="destructive">
            <StopCircle className="w-4 h-4 mr-2" />
            Stop Scanning
          </Button>
        )}
      </div>
      
      <div id="qr-reader" className="mx-auto max-w-sm" />
      
      <p className="text-center text-sm text-muted-foreground">
        Position the QR code within the camera view to scan automatically.
        Make sure you have given camera permissions to this website.
      </p>
    </div>
  );
} 