import { render, screen, fireEvent } from "@testing-library/react";
import { QrScanner } from "../qr-scanner";
import { vi } from "vitest";

declare const Html5QrcodeScanner: jest.Mock;

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock html5-qrcode
vi.mock("html5-qrcode", () => ({
  Html5QrcodeScanner: vi.fn().mockImplementation(() => ({
    render: vi.fn(),
    clear: vi.fn(),
  })),
}));

describe("QrScanner", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders start scanning button initially", () => {
    render(<QrScanner />);
    expect(screen.getByText(/Start Scanning/i)).toBeInTheDocument();
  });

  it("shows stop button when scanning is active", () => {
    render(<QrScanner />);
    fireEvent.click(screen.getByText(/Start Scanning/i));
    expect(screen.getByText(/Stop Scanning/i)).toBeInTheDocument();
  });

  it("shows camera permissions message", () => {
    render(<QrScanner />);
    expect(screen.getByText(/Make sure you have given camera permissions/i)).toBeInTheDocument();
  });

  it("initializes QR scanner on start", () => {
    render(<QrScanner />);
    fireEvent.click(screen.getByText(/Start Scanning/i));
    expect(Html5QrcodeScanner).toHaveBeenCalledWith(
      "qr-reader",
      expect.objectContaining({
        fps: 10,
        qrbox: 250,
      }),
      false
    );
  });

  it("cleans up scanner on unmount", () => {
    const { unmount } = render(<QrScanner />);
    fireEvent.click(screen.getByText(/Start Scanning/i));
    unmount();
    expect(Html5QrcodeScanner.prototype.clear).toHaveBeenCalled();
  });
}); 