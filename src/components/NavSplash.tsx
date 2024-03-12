import Link from 'next/link';
import { NavLink, links } from './Nav';
import {
  Card, CardContent,
} from './ui/card';

/**
 * This is best for "full screen" nav views
 */
export default function NavSplash() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-1 gap-4 mt-5">
      {links.filter((l) => l.text.toLocaleLowerCase() !== 'home').map((link: NavLink) => (
        <Card
          key={link.text}
          className="bg-slate-200 dark:bg-slate-800 hover:dark:bg-slate-600 hover:bg-slate-400 mx-3"
        >
          <Link href={link.url}>
            <CardContent>
              <div className="flex flex-col justify-center items-center">
                <div className="text-xl my-3">
                  {link.text}
                </div>
                <div className="">
                  {link.icon}
                </div>
              </div>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}
