// THENAM Skills Cloud Storage Placeholder

export const storageService = {
  uploadCertificatePdf: async (blob: Blob, path: string) => {
    console.log('[Storage Mock] Uploaded PDF to:', path);
    return `https://thenamskills.edu/assets/certificates/${path}`;
  },
  uploadProjectCover: async (file: File) => {
    console.log('[Storage Mock] Uploaded project cover');
    return 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800';
  }
};
