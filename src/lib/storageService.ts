import { supabase, isSupabaseConfigured } from './supabase';
import { StorageBucket, CloudFileItem } from '../types';

const STORAGE_REGISTRY_KEY = 'jft_cbt_cloud_storage_registry_v1';

// Max file sizes in bytes
export const BUCKET_LIMITS: Record<StorageBucket, { maxSize: number; acceptedTypes: string[] }> = {
  'exam-pdfs': {
    maxSize: 50 * 1024 * 1024, // 50MB
    acceptedTypes: ['application/pdf']
  },
  'audio-tracks': {
    maxSize: 30 * 1024 * 1024, // 30MB
    acceptedTypes: ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg', 'audio/webm', 'audio/aac', 'audio/m4a']
  },
  'stimulus-images': {
    maxSize: 10 * 1024 * 1024, // 10MB
    acceptedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif']
  },
  'documents': {
    maxSize: 25 * 1024 * 1024, // 25MB
    acceptedTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/json']
  },
  'user-avatars': {
    maxSize: 5 * 1024 * 1024, // 5MB
    acceptedTypes: ['image/jpeg', 'image/png', 'image/webp']
  }
};

/**
 * Retrieve the list of all uploaded files from the registry (localStorage cache)
 */
export function getStoredFiles(bucket?: StorageBucket): CloudFileItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_REGISTRY_KEY);
    if (!raw) return [];
    const items: CloudFileItem[] = JSON.parse(raw);
    if (bucket) {
      return items.filter(item => item.bucket === bucket);
    }
    return items;
  } catch (err) {
    console.error('Error reading storage registry:', err);
    return [];
  }
}

/**
 * Record a file in the local registry
 */
function recordFileInRegistry(item: CloudFileItem): void {
  try {
    const items = getStoredFiles();
    const updated = [item, ...items.filter(i => i.id !== item.id)];
    localStorage.setItem(STORAGE_REGISTRY_KEY, JSON.stringify(updated.slice(0, 100))); // Keep last 100
  } catch (err) {
    console.warn('Could not update storage registry:', err);
  }
}

/**
 * Validate a file against bucket limits
 */
export function validateFileForBucket(bucket: StorageBucket, file: File): { valid: boolean; error?: string } {
  const rules = BUCKET_LIMITS[bucket];
  if (!rules) return { valid: true };

  if (file.size > rules.maxSize) {
    const maxMb = Math.round(rules.maxSize / (1024 * 1024));
    return {
      valid: false,
      error: `File "${file.name}" exceeds maximum allowed size of ${maxMb}MB for bucket ${bucket}.`
    };
  }

  // Type validation: check if mime matches or if extension matches
  const ext = file.name.split('.').pop()?.toLowerCase();
  const isTypeAllowed = rules.acceptedTypes.some(type => {
    if (file.type && file.type.toLowerCase().includes(type)) return true;
    if (ext && type.includes(ext)) return true;
    return false;
  });

  if (!isTypeAllowed && file.type) {
    return {
      valid: false,
      error: `File type "${file.type}" is not supported for ${bucket}. Supported: ${rules.acceptedTypes.join(', ')}`
    };
  }

  return { valid: true };
}

/**
 * Core upload function: Uploads to Supabase Cloud Storage with automated fallback
 * to high-performance Blob URL & Local Storage Base64 caching
 */
export async function uploadFileToBucket(
  bucket: StorageBucket,
  file: File,
  options?: { uploadedBy?: string; customName?: string }
): Promise<{ url: string; item: CloudFileItem }> {
  // 1. Validate
  const validation = validateFileForBucket(bucket, file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const cleanName = (options?.customName || file.name).replace(/[^a-zA-Z0-9._-]/g, '_');
  const fileExt = cleanName.split('.').pop() || 'bin';
  const fileKey = `${bucket}/${Date.now()}_${Math.random().toString(36).substring(2, 8)}_${cleanName}`;
  const fileId = `file_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  let finalUrl = '';

  // 2. Try Supabase Storage if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(fileKey, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (!error && data) {
        const { data: publicData } = supabase.storage
          .from(bucket)
          .getPublicUrl(data.path);

        if (publicData?.publicUrl) {
          finalUrl = publicData.publicUrl;
        }
      } else {
        console.warn(`Supabase Storage upload warning (${bucket}):`, error?.message);
      }
    } catch (supabaseErr) {
      console.warn('Supabase Storage exception, using memory fallback:', supabaseErr);
    }
  }

  // 3. Fallback to Blob URL if Supabase not configured or failed
  if (!finalUrl) {
    finalUrl = URL.createObjectURL(file);

    // For smaller files (like stimulus images, avatars, or audio under 3MB), also attempt base64 cache
    if (file.size < 3 * 1024 * 1024) {
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64 = e.target?.result as string;
          if (base64) {
            try {
              localStorage.setItem(`jft_cloud_file_${fileId}`, base64);
            } catch (_) {
              // quota exceeded
            }
          }
        };
        reader.readAsDataURL(file);
      } catch (_) {
        // ignore
      }
    }
  }

  // 4. Construct file record
  const fileItem: CloudFileItem = {
    id: fileId,
    bucket,
    name: file.name,
    size: file.size,
    mime_type: file.type || `application/${fileExt}`,
    url: finalUrl,
    uploaded_at: new Date().toISOString(),
    uploaded_by: options?.uploadedBy || 'system'
  };

  recordFileInRegistry(fileItem);

  return { url: finalUrl, item: fileItem };
}

/**
 * Upload an Exam Question Paper PDF
 */
export async function uploadExamPdf(file: File, uploadedBy?: string): Promise<string> {
  const result = await uploadFileToBucket('exam-pdfs', file, { uploadedBy });
  // Also register as current active PDF for Live Exam split-screen
  try {
    localStorage.setItem('jft_admin_active_pdf_url', result.url);
    localStorage.setItem('jft_admin_active_pdf_name', file.name);
  } catch (err) {
    console.warn('Failed to cache active PDF in local storage:', err);
  }
  return result.url;
}

/**
 * Upload an Audio Track for Listening Questions
 */
export async function uploadAudioTrack(file: File, uploadedBy?: string): Promise<string> {
  const result = await uploadFileToBucket('audio-tracks', file, { uploadedBy });
  return result.url;
}

/**
 * Upload a Stimulus Graphic / Signage Image
 */
export async function uploadStimulusImage(file: File, uploadedBy?: string): Promise<string> {
  const result = await uploadFileToBucket('stimulus-images', file, { uploadedBy });
  return result.url;
}

/**
 * Upload a Document / Resource / Certificate
 */
export async function uploadDocument(file: File, uploadedBy?: string): Promise<string> {
  const result = await uploadFileToBucket('documents', file, { uploadedBy });
  return result.url;
}

/**
 * Upload a Profile Avatar
 */
export async function uploadAvatar(file: File, uploadedBy?: string): Promise<string> {
  const result = await uploadFileToBucket('user-avatars', file, { uploadedBy });
  return result.url;
}

/**
 * Delete a file record from registry and optionally Supabase Storage
 */
export async function deleteStoredFile(bucket: StorageBucket, fileId: string): Promise<void> {
  const files = getStoredFiles();
  const file = files.find(f => f.id === fileId);

  if (file && isSupabaseConfigured && supabase) {
    try {
      await supabase.storage.from(bucket).remove([file.name]);
    } catch (err) {
      console.warn('Supabase delete error:', err);
    }
  }

  const updated = files.filter(f => f.id !== fileId);
  localStorage.setItem(STORAGE_REGISTRY_KEY, JSON.stringify(updated));
  localStorage.removeItem(`jft_cloud_file_${fileId}`);
}

/**
 * Storage Quota and Status summary
 */
export function getCloudStorageStatus(): {
  isCloudConnected: boolean;
  provider: 'Supabase Cloud Storage' | 'Local Browser Storage (IndexedDB/Blob)';
  totalFiles: number;
  totalBytes: number;
  buckets: Record<StorageBucket, { count: number; bytes: number }>;
} {
  const files = getStoredFiles();
  const totalBytes = files.reduce((acc, f) => acc + (f.size || 0), 0);

  const buckets: Record<StorageBucket, { count: number; bytes: number }> = {
    'exam-pdfs': { count: 0, bytes: 0 },
    'audio-tracks': { count: 0, bytes: 0 },
    'stimulus-images': { count: 0, bytes: 0 },
    'documents': { count: 0, bytes: 0 },
    'user-avatars': { count: 0, bytes: 0 }
  };

  files.forEach(f => {
    if (buckets[f.bucket]) {
      buckets[f.bucket].count += 1;
      buckets[f.bucket].bytes += f.size || 0;
    }
  });

  return {
    isCloudConnected: isSupabaseConfigured,
    provider: isSupabaseConfigured ? 'Supabase Cloud Storage' : 'Local Browser Storage (IndexedDB/Blob)',
    totalFiles: files.length,
    totalBytes,
    buckets
  };
}
