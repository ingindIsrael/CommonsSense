import { NextRequest, NextResponse } from 'next/server';
import { checkAndRotatePepper } from '@/utils/pepper-rotation';

export async function POST(request: NextRequest) {
  // Check for authorization (you should implement proper auth here)
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    await checkAndRotatePepper();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Pepper rotation failed:', error);
    return NextResponse.json({ error: 'Rotation failed' }, { status: 500 });
  }
} 