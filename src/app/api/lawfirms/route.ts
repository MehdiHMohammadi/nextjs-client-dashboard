import { NextRequest, NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';

export const runtime = 'nodejs'; // ✅ استفاده از Node.js Runtime

interface LawFirm {
  name: string;
  specialization: string;
  location: string;
  languages: string;
  size: string;
  website?: string;
  email?: string;
  phone?: string;
  experience?: string;
  googleReviews?: string;
  legal500: boolean;
}

async function openDb() {
  return new Promise<sqlite3.Database>((resolve, reject) => {
    const db = new sqlite3.Database('./lawfirms.db', (err) => {
      if (err) reject(err);
      else resolve(db);
    });
  });
}

async function initializeDb(db: sqlite3.Database) {
  await new Promise<void>((resolve, reject) => {
    db.run(
      `
      CREATE TABLE IF NOT EXISTS law_firms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        specialization TEXT NOT NULL,
        location TEXT NOT NULL,
        languages TEXT NOT NULL,
        size TEXT NOT NULL,
        website TEXT,
        email TEXT,
        phone TEXT,
        experience TEXT,
        googleReviews TEXT,
        legal500 INTEGER NOT NULL
      )
      `,
      (err) => (err ? reject(err) : resolve())
    );
  });

  const count = await new Promise<number>((resolve, reject) => {
    db.get('SELECT COUNT(*) as count FROM law_firms', (err, row: any) => {
      if (err) reject(err);
      else resolve(row.count);
    });
  });
}

export async function GET() {
  try {
    const db = await openDb();
    await initializeDb(db);
    const firms = await new Promise<any[]>((resolve, reject) => {
      db.all('SELECT * FROM law_firms', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    const formattedFirms = firms.map(firm => ({
      ...firm,
      legal500: !!firm.legal500,
    }));

    return NextResponse.json(formattedFirms, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const db = await openDb();
    await initializeDb(db);
    const body = await req.json();
    const {
      name, specialization, location, languages, size,
      website, email, phone, experience, googleReviews, legal500,
    } = body;

    await new Promise<void>((resolve, reject) => {
      db.run(
        `INSERT INTO law_firms (name, specialization, location, languages, size, website, email, phone, experience, googleReviews, legal500)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, specialization, location, languages, size, website || null, email || null, phone || null, experience || null, googleReviews || null, legal500 ? 1 : 0],
        (err) => (err ? reject(err) : resolve())
      );
    });

    const updatedFirms = await new Promise<any[]>((resolve, reject) => {
      db.all('SELECT * FROM law_firms', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    const formattedFirms = updatedFirms.map(firm => ({
      ...firm,
      legal500: !!firm.legal500,
    }));

    return NextResponse.json(formattedFirms, { status: 200 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ message: 'خطا از سمت سرور' }, { status: 500 });
 }
}