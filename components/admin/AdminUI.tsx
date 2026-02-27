'use client';
import React from 'react';

// ── Shared admin field components ────────────────────────────────────────────

export function Field({
  label, children,
}: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

export function Input({
  value, onChange, placeholder, type = 'text',
}: {
  value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string;
}) {
  return (
    <input
      suppressHydrationWarning
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="glass-input"
    />
  );
}

export function Textarea({
  value, onChange, placeholder, rows = 3,
}: {
  value: string; onChange: (v: string) => void;
  placeholder?: string; rows?: number;
}) {
  return (
    <textarea
      suppressHydrationWarning
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="glass-input resize-none"
    />
  );
}

export function SectionCard({
  title, icon, children,
}: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/5">
        <div className="w-9 h-9 glass-orange rounded-xl flex items-center justify-center flex-shrink-0">
          <i className={`${icon} text-orange-400 text-sm`} />
        </div>
        <h3 className="text-white font-bold">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export function SaveBar({
  saving, saved, onSave,
}: { saving: boolean; saved: boolean; onSave: () => void }) {
  return (
    <div className="sticky bottom-0 pt-4 pb-2">
      <button
        onClick={onSave}
        disabled={saving}
        className="btn-primary w-full justify-center text-base py-4"
      >
        {saving ? (
          <><i className="fas fa-spinner fa-spin" /> Saving...</>
        ) : saved ? (
          <><i className="fas fa-check" /> Saved!</>
        ) : (
          <><i className="fas fa-save" /> Save Changes</>
        )}
      </button>
    </div>
  );
}

// Image upload helper
export function ImageUpload({
  current, onUploaded, label = 'Image',
}: {
  current: string; onUploaded: (url: string) => void; label?: string;
}) {
  const [uploading, setUploading] = React.useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const json = await res.json();
    if (json.url) onUploaded(json.url);
    setUploading(false);
  };

  return (
    <div>
      <label className="block text-xs text-gray-500 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      <div className="flex items-center gap-3">
        {current && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={current}
            alt="current"
            className="w-16 h-16 object-cover rounded-lg border border-white/10"
          />
        )}
        <label className="btn-outline text-sm cursor-pointer flex items-center gap-2">
          {uploading ? (
            <><i className="fas fa-spinner fa-spin" /> Uploading...</>
          ) : (
            <><i className="fas fa-upload" /> Upload</>
          )}
          <input
            suppressHydrationWarning
            type="file"
            accept="image/*,video/*,.gif"
            className="hidden"
            onChange={handleFile}
            disabled={uploading}
          />
        </label>
        <span className="text-gray-600 text-xs truncate max-w-xs">{current}</span>
      </div>
    </div>
  );
}

