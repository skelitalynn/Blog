import { draftMode } from "next/headers";

export function isDraftModeEnabled(): boolean {
  try {
    return draftMode().isEnabled;
  } catch {
    return false;
  }
}
