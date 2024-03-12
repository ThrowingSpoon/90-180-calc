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
      <div className="text-red-600 text-xl mx-5 mt-5">
        The calculator is a helping tool only, it does not constitute a right to stay for a period resulting
        from its calculation. It is always for the Member States’ competent authorities to implement the
        provisions and make a decision on the length of the authorised stay or on the overstay.
      </div>
    </div>
  );
}
