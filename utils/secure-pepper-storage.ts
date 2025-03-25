import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Use service role key for admin operations like accessing secure storage
const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface PepperInfo {
  value: string;
  createdAt: string;
}

/**
 * Store pepper information securely in Supabase
 */
export async function storePepperInfo(pepperInfo: PepperInfo): Promise<void> {
  // Store in a secure table with RLS policies
  const { error } = await supabase
    .from('secure_pepper_storage')
    .upsert({ 
      id: 'current_pepper',
      pepper_value: pepperInfo.value,
      created_at: pepperInfo.createdAt,
      updated_at: new Date().toISOString()
    });
  
  if (error) {
    console.error('Error storing pepper info:', error);
    throw error;
  }
}

/**
 * Retrieve pepper information from Supabase
 */
export async function getPepperInfo(): Promise<PepperInfo> {
  const { data, error } = await supabase
    .from('secure_pepper_storage')
    .select('pepper_value, created_at')
    .eq('id', 'current_pepper')
    .single();
  
  if (error) {
    console.error('Error retrieving pepper info:', error);
    throw error;
  }
  
  return {
    value: data.pepper_value,
    createdAt: data.created_at
  };
}

/**
 * Store old pepper information for backward compatibility
 */
export async function storeOldPepperInfo(pepperInfo: PepperInfo): Promise<void> {
  const { error } = await supabase
    .from('secure_pepper_storage')
    .upsert({ 
      id: 'old_pepper',
      pepper_value: pepperInfo.value,
      created_at: pepperInfo.createdAt,
      updated_at: new Date().toISOString()
    });
  
  if (error) {
    console.error('Error storing old pepper info:', error);
    throw error;
  }
}

/**
 * Retrieve old pepper information
 */
export async function getOldPepperInfo(): Promise<PepperInfo | null> {
  const { data, error } = await supabase
    .from('secure_pepper_storage')
    .select('pepper_value, created_at')
    .eq('id', 'old_pepper')
    .single();
  
  if (error) {
    if (error.code === 'PGRST116') {
      // No old pepper found, which is fine
      return null;
    }
    console.error('Error retrieving old pepper info:', error);
    throw error;
  }
  
  return {
    value: data.pepper_value,
    createdAt: data.created_at
  };
} 