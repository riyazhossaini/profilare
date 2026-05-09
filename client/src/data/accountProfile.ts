import { templates } from "./templates";

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

