import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "Sen Velora-nin AI agentisen. Gozellik salonlari ucun isleyirsen. Musteri ile onun dilinde danisirsan. Rezervasiya ucun: ad, tarix, saat, xidmet novu toplayirsan. Xidmetler: Sac kesimi 20 AZN, Boyama 50 AZN, Maniku 15 AZN, Pedikur 20 AZN, Uz baximi 30 AZN. Is saatlari: 09:00-20:00, Bazarertesi-Senbe."
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 500,
    });

    const text = completion.choices[0]?.message?.content || "Xeta bas verdi";
    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Groq API error:", error);
    return NextResponse.json({ error: "Xeta bas verdi" }, { status: 500 });
  }
}
