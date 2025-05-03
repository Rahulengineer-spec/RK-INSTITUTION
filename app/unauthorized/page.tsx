import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">Access Denied</h1>
          <p className="text-lg text-muted-foreground mb-8">
            You don't have permission to access this page.
          </p>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This could be because:
            </p>
            <ul className="list-disc text-sm text-muted-foreground pl-5 space-y-2">
              <li>You're not logged in</li>
              <li>Your account doesn't have the required permissions</li>
              <li>Your session has expired</li>
            </ul>
          </div>
          <div className="mt-8 space-y-4">
            <Link 
              href="/auth/login" 
              className="button-primary w-full"
            >
              Log In
            </Link>
            <Link 
              href="/" 
              className="button-outline w-full"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 