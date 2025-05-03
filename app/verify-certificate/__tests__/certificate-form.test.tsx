import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CertificateVerificationForm } from "../certificate-form";
import { vi } from "vitest";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: () => null,
  }),
}));

// Mock fetch
global.fetch = vi.fn();

function mockFetch(success: boolean) {
  (global.fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          isValid: success,
          studentDetails: success
            ? {
                fullName: "John Doe",
                fatherName: "James Doe",
                dateOfBirth: "1990-01-01",
                course: "Advanced Web Development",
                issueDate: "2024-03-15",
                grade: "A+",
              }
            : undefined,
          message: success
            ? "Certificate verified successfully!"
            : "Certificate not found or details do not match our records.",
        }),
    })
  );
}

describe("CertificateVerificationForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all form fields", () => {
    render(<CertificateVerificationForm />);

    expect(screen.getByLabelText(/Certificate Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Father's Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Verify Certificate/i })).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    render(<CertificateVerificationForm />);
    
    fireEvent.click(screen.getByRole("button", { name: /Verify Certificate/i }));

    await waitFor(() => {
      expect(screen.getByText(/Certificate number must be at least 6 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/Full name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/Father's name must be at least 2 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/Date of birth is required/i)).toBeInTheDocument();
    });
  });

  it("handles successful verification", async () => {
    const mockResponse = {
      isValid: true,
      studentDetails: {
        fullName: "John Doe",
        fatherName: "James Doe",
        dateOfBirth: "1990-01-01",
        course: "Computer Science",
        issueDate: "2023-12-25",
        grade: "A",
      },
      message: "Certificate verified successfully!",
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(<CertificateVerificationForm />);
    
    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/Certificate Number/i), {
      target: { value: "CERT123456" },
    });
    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Father's Name/i), {
      target: { value: "James Doe" },
    });
    
    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /Verify Certificate/i }));

    await waitFor(() => {
      expect(screen.getByText(/Certificate Verified/i)).toBeInTheDocument();
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/Computer Science/i)).toBeInTheDocument();
    });
  });

  it("handles verification failure", async () => {
    const mockResponse = {
      isValid: false,
      message: "Certificate not found in our records.",
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(<CertificateVerificationForm />);
    
    // Fill in form fields with invalid data
    fireEvent.change(screen.getByLabelText(/Certificate Number/i), {
      target: { value: "INVALID123" },
    });
    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: "Invalid Name" },
    });
    fireEvent.change(screen.getByLabelText(/Father's Name/i), {
      target: { value: "Invalid Father" },
    });
    
    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /Verify Certificate/i }));

    await waitFor(() => {
      expect(screen.getByText(/verification failed/i)).toBeInTheDocument();
      expect(screen.getByText(/certificate not found or details do not match/i)).toBeInTheDocument();
    });
  });

  it("handles network errors", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => Promise.reject(new Error("Network error")));
    render(<CertificateVerificationForm />);

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/certificate number/i), {
      target: { value: "RK2024001" },
    });
    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/father's name/i), {
      target: { value: "James Doe" },
    });
    
    // Select date
    fireEvent.click(screen.getByRole("button", { name: /pick a date/i }));
    fireEvent.click(screen.getByRole("button", { name: "1990-01-01" }));

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: /verify certificate/i }));

    await waitFor(() => {
      expect(screen.getByText(/an error occurred during verification/i)).toBeInTheDocument();
    });
  });
}); 