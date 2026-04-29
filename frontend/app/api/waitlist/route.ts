import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "waitlist.json");

function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]", "utf-8");
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, interest, timeline, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Nome ed email sono obbligatori." },
        { status: 400 }
      );
    }

    ensureDataDir();

    const entries = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    entries.push({
      name,
      email,
      interest: interest || "",
      timeline: timeline || "",
      message: message || "",
      createdAt: new Date().toISOString(),
    });
    fs.writeFileSync(DATA_FILE, JSON.stringify(entries, null, 2), "utf-8");

    return NextResponse.json(
      { success: true, message: "Iscrizione registrata." },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Errore nel salvataggio." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    ensureDataDir();
    const entries = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    return NextResponse.json({ count: entries.length, entries });
  } catch {
    return NextResponse.json({ count: 0, entries: [] });
  }
}
