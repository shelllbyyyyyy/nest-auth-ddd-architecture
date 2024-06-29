import { Inject, Injectable } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';
import { PG_CONNECTION } from './constant';

@Injectable()
export class DatabaseService {
  constructor(@Inject(PG_CONNECTION) private readonly pool: Pool) {}

  async query(text: string, params?: any[]): Promise<any[]> {
    const client = await this.pool.connect();
    try {
      const result: QueryResult<any> = await client.query(text, params);

      if (result.rows.length === 0) {
        return null;
      }

      return result.rows;
    } catch (error) {
      throw error;
    } finally {
      client.release();
    }
  }
}
