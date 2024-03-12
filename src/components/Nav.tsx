import {
  CalendarIcon,
  HomeIcon,
  MenuIcon,
  MessageCircleQuestionIcon,
} from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

export interface NavLink {
  text: string;
  icon: ReactNode;
  url: string;
}

export const links: NavLink[] = [
  {
    text: 'Home',
    icon: <HomeIcon />,
    url: '/',
  },
  {
    text: 'Calculator',
    icon: <CalendarIcon />,
    url: '/calculator',
  },
  {
    text: 'FAQ',
    icon: <MessageCircleQuestionIcon />,
    url: '/faq',
  },
];

/**
 * This nav component will be useful for sidebars other vertical nav needs
 *
 * @returns A vertical nav component
 */
function Nav() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <MenuIcon className="absolute size-5 rotate-0" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-44">
          <div className="flex flex-col divide-y-2 pt-4">
            {links.map((v) => (
              <div
                key={v.text}
                className="flex self-center py-4 w-36 justify-center"
              >
                <Link href={v.url}>
                  <Button variant="ghost">
                    {v.text}
                    <div className="ml-3" />
                    {v.icon}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex-grow text-center">
        <div className="h-full flex justify-center items-center text-xl md:text-2xl lg:text-3xl">
          <Link href="/">90-180 day calculator</Link>
        </div>
      </div>
      <ThemeToggle />
    </>
  );
}

export default Nav;
