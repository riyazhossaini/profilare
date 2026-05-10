const PROFILE_EDIT_KEY = "profilare:profile-hub-edits";

type ProfileHubEdits = {
  header?: {
    photoUrl?: string;
  };
};

export function getGlobalProfileAvatarUrl(): string {
  if (typeof window === "undefined") return "";
  try {
    const raw = window.localStorage.getItem(PROFILE_EDIT_KEY);
    if (!raw) return "";
    const parsed = JSON.parse(raw) as ProfileHubEdits;
    return parsed.header?.photoUrl?.trim() || "";
  } catch {
    return "";
  }
}
