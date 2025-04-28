import { promisify } from "util";

import { RedisClientType, createClient } from "redis";
import { getUnauthorizedError } from "../utils/error";

export type KeyValueProps = Record<string, unknown>;

export interface Secrets {
  cryptKey?: string;
  iv?: string;
}

export interface SessionObject {
  jwtToken: string;
  expiry_time_in_sec: number;
  id: string;
  name: string;
  email: string;
  isAuthenticated: boolean;
}
export interface TokenType {
  accessToken: string;
  expireOn: number | string;
}
export interface IdpRefreshToken {
  sub?: string;
  idp_refresh_token: string;
  idp_refresh_token_expires_on: number;
}

export interface UnauthSessionObject {
  providers: Record<
    string,
    { provider_access_token: string; provider_expires_on: number } | undefined
  >;
}

export class SessionManager {
  public redisClient: RedisClientType;
  private asyncSetex: (
    key: string,
    seconds: number,
    value: string
  ) => Promise<string>;
  private asyncGet: (key: string) => Promise<string | null>;
  asyncDel: (sessionId: string) => Promise<number>;
  private isConnected: boolean = false;
  constructor(redisClientOpts?: RedisClientType) {
    const options = redisClientOpts || {};
    this.redisClient = createClient(options);

    this.redisClient.on("connect", () => {
      console.log("Connected to Redis");
      this.isConnected = true;
    });

    this.redisClient.on("error", (err) => {
      console.log("Redis error: ", err);
      this.isConnected = false;
    });

    this.asyncSetex = promisify(this.redisClient.setEx).bind(this.redisClient);
    this.asyncGet = promisify(this.redisClient.get).bind(this.redisClient);
    this.asyncDel = promisify(this.redisClient.del).bind(this.redisClient);
  }

  private async ensureConnected() {
    if (!this.isConnected) {
      await this.redisClient.connect();
      this.isConnected = true;
    }
  }

  async setSession(sessionId: string, expiration: number, value: any) {
    await this.ensureConnected();
    const session = JSON.stringify(value);
    return this.asyncSetex(sessionId, expiration, session);
  }

  async getSession(sessionId: string): Promise<string | null> {
    await this.ensureConnected();
    const session = this.redisClient.get(sessionId);
    console.log(session, "sess");

    return session;
  }

  async isConnectedFn(): Promise<boolean> {
    try {
      await this.ensureConnected();
      return true;
    } catch (error) {
      console.error("Redis connection error:", error);
      return false;
    }
  }

  async sessionExists(sessionId: string): Promise<boolean> {
    return !!(await this.redisClient.get(sessionId));
  }

  async clearSession(sessionId: string) {
    return this.redisClient.del(sessionId);
  }
}
