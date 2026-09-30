import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = contactFormSchema.parse(body);

    // In a real application, you would send an email or save to a database here.
    // Examples: Resend, SendGrid, Supabase, etc.
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      { message: 'Inquiry received successfully', data: validatedData },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact Form Error:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry' },
      { status: 500 }
    );
  }
}
