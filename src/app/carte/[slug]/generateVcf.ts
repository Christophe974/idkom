import type { VCardData } from '@/lib/api';

function vcardEscape(value: string | null): string {
  if (!value) return '';
  return value
    .replace(/\\/g, '\\\\')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
    .replace(/\n/g, '\\n');
}

export function generateVcfContent(card: VCardData): string {
  const lines: string[] = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${vcardEscape(card.last_name)};${vcardEscape(card.first_name)};;;`,
    `FN:${vcardEscape(card.first_name + ' ' + card.last_name)}`,
  ];

  if (card.company) lines.push(`ORG:${vcardEscape(card.company)}`);
  if (card.job_title) lines.push(`TITLE:${vcardEscape(card.job_title)}`);
  if (card.phone) lines.push(`TEL;TYPE=WORK,VOICE:${vcardEscape(card.phone)}`);
  if (card.phone_secondary) lines.push(`TEL;TYPE=CELL,VOICE:${vcardEscape(card.phone_secondary)}`);
  if (card.email) lines.push(`EMAIL;TYPE=WORK:${vcardEscape(card.email)}`);
  if (card.address) lines.push(`ADR;TYPE=WORK:;;${vcardEscape(card.address)};;;;`);
  if (card.website) lines.push(`URL:${vcardEscape(card.website)}`);
  if (card.linkedin) lines.push(`X-SOCIALPROFILE;TYPE=linkedin:${vcardEscape(card.linkedin)}`);
  if (card.instagram) lines.push(`X-SOCIALPROFILE;TYPE=instagram:${vcardEscape(card.instagram)}`);
  if (card.bio) lines.push(`NOTE:${vcardEscape(card.bio)}`);
  if (card.photo) lines.push(`PHOTO;VALUE=URI:${card.photo}`);

  lines.push(`URL:${window.location.href}`);
  lines.push(`REV:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`);
  lines.push('END:VCARD');

  return lines.join('\r\n') + '\r\n';
}

export function downloadVcf(card: VCardData): void {
  const content = generateVcfContent(card);
  const blob = new Blob([content], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${card.first_name}_${card.last_name}.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  // Track download via API (fire and forget)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.idkom.fr';
  fetch(`${apiUrl}/vcards.php?action=download&slug=${encodeURIComponent(card.slug)}`).catch(() => {});
}
