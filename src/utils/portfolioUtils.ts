import { ProjectItem } from '../types';

export const PROJECT_STATUS_ORDER = ['Ongoing', 'Upcoming', 'Completed'] as const;

export function groupProjectsByStatus(projects: ProjectItem[]) {
  return PROJECT_STATUS_ORDER.map((status) => ({
    status,
    projects: projects.filter((p) => (p.statusBadge || 'Upcoming') === status),
  })).filter((group) => group.projects.length > 0);
}

export function filterProjectsByStatus(projects: ProjectItem[], filter: string): ProjectItem[] {
  if (!filter || filter === 'All') return projects;
  return projects.filter((p) => p.status === filter);
}

export function isFlagshipMysaProject(project: Pick<ProjectItem, 'id'>): boolean {
  return project.id === 'mysa-villas' || project.id === 'mysa';
}

export function validateVillaAccessInput(phone: string, email: string): { valid: boolean; error?: string } {
  const cleanPhone = phone.replace(/[\s\-()]/g, '').trim();
  if (cleanPhone.length < 8) {
    return { valid: false, error: 'Please provide a valid contact phone number (at least 8 digits).' };
  }
  const cleanEmail = email.trim();
  if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }
  return { valid: true };
}
