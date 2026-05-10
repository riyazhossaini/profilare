import { templates } from "./templates";
import { profileData } from "./profile";

export type AccountProfileDraft = {
  templateId: string;
  fullName: string;
  username: string;
  profileTitle: string;
  bio: string;
  location: string;
  photo?: string;
};

const STORAGE_KEY = "profilare:account-profile";

export function saveAccountProfileDraft(data: AccountProfileDraft) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  profileData.name = data.fullName || profileData.name;
  profileData.username = data.username || profileData.username;
  profileData.headline = data.profileTitle || profileData.headline;
  profileData.location = data.location || profileData.location;
}

export function getAccountProfileDraft(): AccountProfileDraft | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AccountProfileDraft;
  } catch {
    return null;
  }
}

export function getTemplateSections(templateId: string): string[] {
  return templates.find((t) => t.id === templateId)?.sections || [];
}

export function clearAccountProfileDraft() {
  localStorage.removeItem(STORAGE_KEY);
}

