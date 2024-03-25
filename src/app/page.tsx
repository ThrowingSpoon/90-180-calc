import NavSplash from '@/components/NavSplash';

export const metadata = {
  title: '90-180 Calc',
};

export default function Home() {
  return (
    <div id="home" className="w-fill mx-auto">
      <div className="text-center text-xl">
        Menu
      </div>
      <NavSplash />
      <div className="text-red-600 text-sm mx-5 mt-5">
        The calculator is a helping tool only, it does not constitute a right to stay for a period resulting
        from its calculation. Always manually double check any calculation you make with this calculator.
      </div>
    </div>
  );
}
