import { NextRequest, NextResponse } from 'next/server';
import { backupPepperValues, restorePepperFromBackup } from '@/utils/pepper-backup';

export async function POST(request: NextRequest) {
  // Check for authorization
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const backupId = await backupPepperValues();
    return NextResponse.json({ success: true, backupId });
  } catch (error) {
    console.error('Pepper backup failed:', error);
    return NextResponse.json({ error: 'Backup failed' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  // Check for authorization
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const { backupId } = await request.json();
    await restorePepperFromBackup(backupId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Pepper restore failed:', error);
    return NextResponse.json({ error: 'Restore failed' }, { status: 500 });
  }
} 