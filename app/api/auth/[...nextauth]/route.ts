import NextAuth, { NextAuthOptions, Session, User } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { sessionStore } from '@/lib/session';
import { log } from '@/lib/logger';
import { JWT } from 'next-auth/jwt';
import { createError } from '@/middleware/error-handler';

interface ExtendedUser extends User {
  role?: string;
}

interface ExtendedSession extends Session {
  user: {
    id: string;
    role: string;
    email: string;
    name?: string | null;
  };
}

interface ExtendedJWT extends JWT {
  role?: string;
  userId?: string;
  sessionId?: string;
  email?: string;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: '/login',
    signOut: '/',
    error: '/login',
    verifyRequest: '/verify-email',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw createError.badRequest('Email and password are required');
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
            select: {
              id: true,
              email: true,
              name: true,
              password: true,
              role: true,
              emailVerified: true,
              failedAttempts: true,
              lockedUntil: true,
            },
          });

          if (!user) {
            throw createError.unauthorized('Invalid credentials');
          }

          // Check if account is locked
          if (user.lockedUntil && user.lockedUntil > new Date()) {
            throw createError.unauthorized('Account is temporarily locked. Please try again later.');
          }

          if (!user.emailVerified) {
            throw createError.unauthorized('Please verify your email first');
          }

          const isValid = await compare(credentials.password, user.password!);

          if (!isValid) {
            // Increment failed attempts and possibly lock account
            const failedAttempts = user.failedAttempts + 1;
            const updateData: any = {
              failedAttempts,
            };

            // Lock account after 5 failed attempts
            if (failedAttempts >= 5) {
              updateData.lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
            }

            await prisma.user.update({
              where: { id: user.id },
              data: updateData,
            });
            
            throw createError.unauthorized('Invalid credentials');
          }

          // Reset failed attempts on successful login
          await prisma.user.update({
            where: { id: user.id },
            data: {
              failedAttempts: 0,
              lockedUntil: null,
              lastLogin: new Date(),
            },
          });

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          log.error('Authorization error:', error as Error);
          throw error;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const typedUser = user as ExtendedUser;
        // Create a new session when user signs in
        const sessionId = await sessionStore.createSession(
          typedUser.id,
          typedUser.email!,
          typedUser.role || 'user'
        );

        token.sessionId = sessionId;
        token.role = typedUser.role;
        token.userId = typedUser.id;
        token.email = typedUser.email;
      }

      return token;
    },
    async session({ session, token }): Promise<ExtendedSession> {
      const extendedToken = token as ExtendedJWT;
      
      if (extendedToken.sessionId) {
        const storedSession = await sessionStore.getSession(extendedToken.sessionId);
        
        if (!storedSession) {
          throw new Error('Session expired');
        }

        // Extend session TTL
        await sessionStore.extendSession(extendedToken.sessionId);

        if (!extendedToken.email) {
          throw new Error('Invalid session: missing email');
        }

        return {
          ...session,
          user: {
            ...session.user,
            id: extendedToken.userId!,
            role: extendedToken.role || 'user',
            email: extendedToken.email,
          },
        };
      }

      throw new Error('Invalid session');
    },
  },
  events: {
    async signIn({ user, account }) {
      try {
        log.info('User signed in', { 
          userId: user.id,
          provider: account?.provider 
        });

        // If it's a Google sign in, ensure we have refresh token
        if (account?.provider === 'google' && !account?.refresh_token) {
          throw new Error('No refresh token received from Google');
        }

        // Update last login time for all providers
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date() },
        });
      } catch (error) {
        log.error('Error during sign in event:', error as Error);
      }
    },
    async signOut({ token }) {
      const extendedToken = token as ExtendedJWT;
      if (extendedToken.sessionId) {
        try {
          await sessionStore.deleteSession(extendedToken.sessionId);
          log.info('User signed out', { userId: extendedToken.userId });
        } catch (error) {
          log.error('Error during sign out', error as Error);
        }
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 