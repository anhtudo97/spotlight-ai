'use client';

import { sidebarData } from '@/lib/data';
import SpotlightIcon from '../icons/Spotlight';
import { Tooltip, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="w-18 sm:w-28 h-screen sticky top-0 py-10 px-2 sm:px-6 border-r bg-background border-border flex flex-col items-center justify-start gap-10">
      <div>
        <SpotlightIcon />
      </div>

      <div className="size-full justify-between items-center flex flex-col">
        <div className="w-full h-fit flex flex-col gap-4 items-center justify-center">
          {sidebarData.map((item) => {
            const { link, id } = item;
            return (
              <TooltipProvider key={id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={link}
                      className={twMerge(
                        'flex items-center gap-2 cursor-pointer rounded-lg p-2',
                        pathname.includes(link) ? 'iconBackground' : '',
                      )}
                    >
                      <item.icon
                        className={twMerge(
                          'size-4',
                          !pathname.includes(link) ? 'opacity-80' : '',
                        )}
                      />
                    </Link>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
        <UserButton />
      </div>
    </div>
  );
};

export default Sidebar;
