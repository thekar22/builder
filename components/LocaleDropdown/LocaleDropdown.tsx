// components/LocaleDropdown.tsx
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export interface LocaleDropdownProps {
  className?: string;
}

export function LocaleDropdown({
  className,
}: LocaleDropdownProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLoc = e.target.value;
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('activeLocale', newLoc);
    // Create the new URL with updated query parameters
    const newUrl = `${pathname}?${newSearchParams.toString()}`;   
    // Update the URL with the new query parameter
    router.replace(newUrl);
  };

  return (
    <select
      className={className}
      value={searchParams.get('activeLocale') || 'en-US'}
      onChange={handleChange}
    >
      <option value="en-US">English</option>
      <option value="fil-PH">Filipino</option>
      <option value="fr-FR">French</option> 

    </select>
  );
}
