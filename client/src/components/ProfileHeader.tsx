import { MapPin, Pencil, Settings } from "lucide-react";
import { useState } from "react";

type ProfileHeaderProps = {
  name: string;
  username: string;
  headline: string;
  location?: string;
  bio?: string;
  photoUrl?: string;
  onEdit?: () => void;
  onLogout?: () => void;
  onDeleteAccount?: () => void;
};

export function ProfileHeader({ name, username, headline, location, bio, photoUrl, onEdit, onLogout, onDeleteAccount }: ProfileHeaderProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const cleanUsername = username.trim();
  const cleanHeadline = headline.trim();
  const cleanBio = (bio || "").trim();
  const cleanLocation = (location || "").trim();
  return (
    <header className="relative mx-auto w-full max-w-3xl rounded-3xl border border-white/60 bg-white/65 p-6 text-center shadow-[0_24px_60px_-35px_rgba(76,29,149,0.5)] backdrop-blur-sm md:p-8">
      {onLogout || onDeleteAccount ? (
        <div className="absolute left-4 top-4">
          <button onClick={() => setSettingsOpen((p) => !p)} className="rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 transition hover:bg-zinc-50">
            <Settings className="h-4 w-4" />
          </button>
          {settingsOpen ? (
            <div className="absolute left-0 top-12 z-20 min-w-44 rounded-2xl border border-zinc-200 bg-white p-2 text-left shadow-lg">
              {onLogout ? (
                <button
                  onClick={() => {
                    setSettingsOpen(false);
                    onLogout();
                  }}
                  className="w-full rounded-xl px-3 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
                >
                  Logout
                </button>
              ) : null}
              {onDeleteAccount ? (
                <button
                  onClick={() => {
                    setSettingsOpen(false);
                    onDeleteAccount();
                  }}
                  className="w-full rounded-xl px-3 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                >
                  Delete Account
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
      {onEdit ? (
        <button onClick={onEdit} className="absolute right-4 top-4 rounded-full border border-zinc-200 bg-white p-2 text-zinc-700 transition hover:bg-zinc-50">
          <Pencil className="h-4 w-4" />
        </button>
      ) : null}
      <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 text-3xl font-bold text-white shadow-xl">
        {photoUrl ? <img src={photoUrl} alt={name} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center">RH</div>}
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 md:text-4xl">{name}</h1>
      {cleanUsername ? <p className="mt-1 text-base font-medium text-zinc-600">@{cleanUsername}</p> : null}
      {cleanHeadline ? <p className="mt-3 text-lg font-semibold text-zinc-800">{cleanHeadline}</p> : null}
      {cleanBio ? <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-zinc-700">{cleanBio}</p> : null}
      {cleanLocation ? (
        <p className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-zinc-500">
          <MapPin className="h-4 w-4" />
          {cleanLocation}
        </p>
      ) : null}
    </header>
  );
}
