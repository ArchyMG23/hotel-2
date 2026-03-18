import React from 'react';

interface ImageUploadProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxSizeMB?: number;
}

export default function ImageUpload({ label, value, onChange, maxSizeMB = 50 }: ImageUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`L'image dépasse la taille maximale de ${maxSizeMB}MB.`);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-royal-green/80 mb-2">{label}</label>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="URL de l'image ou uploadez un fichier"
          className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold"
        />
        <div className="flex items-center gap-4">
          <label className="cursor-pointer bg-royal-green text-royal-silk px-4 py-2 rounded hover:bg-royal-green/90 transition-colors text-sm">
            Uploader une image (Max {maxSizeMB}MB)
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          {value && value.startsWith('data:image') && (
            <span className="text-xs text-green-600">Image locale chargée</span>
          )}
        </div>
      </div>
    </div>
  );
}
