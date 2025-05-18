import { Redis } from '@upstash/redis';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';
import { log } from './logger';

// Initialize Redis client
const redis = Redis.fromEnv();

// Session configuration
const SESSION_TTL = 24 * 60 * 60; // 24 hours in seconds
const SESSION_PREFIX = 'session:';

export interface Session {
  userId: string;
  email: string;
  role: string;
  createdAt: number;
  lastAccessed: number;
  data: Record<string, any>;
}

export class SessionStore {
  private static instance: SessionStore;
  private redis: Redis;

  private constructor() {
    this.redis = redis;
  }

  public static getInstance(): SessionStore {
    if (!SessionStore.instance) {
      SessionStore.instance = new SessionStore();
    }
    return SessionStore.instance;
  }

  private getSessionKey(sessionId: string): string {
    return `${SESSION_PREFIX}${sessionId}`;
  }

  async createSession(userId: string, email: string, role: string): Promise<string> {
    const sessionId = crypto.randomUUID();
    const now = Date.now();

    const session: Session = {
      userId,
      email,
      role,
      createdAt: now,
      lastAccessed: now,
      data: {},
    };

    try {
      await this.redis.set(
        this.getSessionKey(sessionId),
        JSON.stringify(session),
        { ex: SESSION_TTL }
      );

      log.info('Session created', { userId, sessionId });
      return sessionId;
    } catch (error) {
      log.error('Failed to create session', error as Error);
      throw error;
    }
  }

  async getSession(sessionId: string): Promise<Session | null> {
    try {
      const data = await this.redis.get<string>(this.getSessionKey(sessionId));
      
      if (!data) {
        return null;
      }

      let session: Session;
      try {
        session = JSON.parse(data);
      } catch (err) {
        log.error(`Failed to parse session JSON: ${err instanceof Error ? err.message : String(err)} | data: ${data}`);
        return null;
      }
      
      // Update last accessed time
      session.lastAccessed = Date.now();
      await this.updateSession(sessionId, session);

      return session;
    } catch (error) {
      log.error('Failed to get session', error as Error);
      return null;
    }
  }

  async updateSession(sessionId: string, updates: Partial<Session>): Promise<boolean> {
    try {
      const session = await this.getSession(sessionId);
      
      if (!session) {
        return false;
      }

      const updatedSession = {
        ...session,
        ...updates,
        lastAccessed: Date.now(),
      };

      await this.redis.set(
        this.getSessionKey(sessionId),
        JSON.stringify(updatedSession),
        { ex: SESSION_TTL }
      );

      return true;
    } catch (error) {
      log.error('Failed to update session', error as Error);
      return false;
    }
  }

  async deleteSession(sessionId: string): Promise<boolean> {
    try {
      const deleted = await this.redis.del(this.getSessionKey(sessionId));
      log.info('Session deleted', { sessionId });
      return deleted > 0;
    } catch (error) {
      log.error('Failed to delete session', error as Error);
      return false;
    }
  }

  async extendSession(sessionId: string): Promise<boolean> {
    try {
      const session = await this.getSession(sessionId);
      
      if (!session) {
        return false;
      }

      await this.redis.expire(this.getSessionKey(sessionId), SESSION_TTL);
      return true;
    } catch (error) {
      log.error('Failed to extend session', error as Error);
      return false;
    }
  }

  async getAllUserSessions(userId: string): Promise<string[]> {
    try {
      const keys = await this.redis.keys(`${SESSION_PREFIX}*`);
      const sessions: string[] = [];

      for (const key of keys) {
        const session = await this.getSession(key.replace(SESSION_PREFIX, ''));
        if (session && session.userId === userId) {
          sessions.push(key.replace(SESSION_PREFIX, ''));
        }
      }

      return sessions;
    } catch (error) {
      log.error('Failed to get user sessions', error as Error);
      return [];
    }
  }

  async clearUserSessions(userId: string): Promise<boolean> {
    try {
      const sessions = await this.getAllUserSessions(userId);
      
      for (const sessionId of sessions) {
        await this.deleteSession(sessionId);
      }

      log.info('User sessions cleared', { userId });
      return true;
    } catch (error) {
      log.error('Failed to clear user sessions', error as Error);
      return false;
    }
  }
}

// Helper function to get session from request
export async function getSessionFromRequest(req: NextRequest): Promise<Session | null> {
  try {
    const token = await getToken({ req });
    
    if (!token?.sessionId) {
      return null;
    }

    const sessionStore = SessionStore.getInstance();
    return await sessionStore.getSession(token.sessionId as string);
  } catch (error) {
    log.error('Failed to get session from request', error as Error);
    return null;
  }
}

export const sessionStore = SessionStore.getInstance(); 