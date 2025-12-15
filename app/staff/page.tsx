import Image from 'next/image';

type Staff = {
  name: string;
  role: string;
  photo: string; // /images/staff/name.jpg
};

const staff: Staff[] = [
  {
    name: 'Rhoda Adjei',
    role: 'Administrator',
    photo: '/images/staff/rhoda.jpg',
  },
  {
    name: 'Rebecca  Efua Mankoh',
    role: 'Admin Academic Affairs',
    photo: '/images/staff/becky.jpg',
  },
  {
    name: 'Sarah Narki Dzamefe',
    role: 'Facilitator',
    photo: '/images/staff/IMG_4309.jpg',
  },
  {
    name: 'Ruth Dugbe Botchwey',
    role: 'Facilitator',
    photo: '/images/staff/ruth.jpg',
  },
  {
    name: 'Priscilla Okyere',
    role: 'Facilitator',
    photo: '/images/staff/IMG_4359.jpg',
  },
   {
    name: 'Samuel Ofosu Yeboah',
    role: 'Facilitator',
    photo: '/images/staff/IMG_4333.jpg',
  },
  {
    name: 'Justine Dzovakpor',
    role: 'Facilitator',
    photo: '/images/staff/jestine.jpg',
  },
 
  {
    name: 'Prosper Akouete',
    role: 'French Facilitator',
    photo: '/images/staff/french.jpg',
  },
  {
    name: 'Pearl Asuako Osei',
    role: 'Facilitator',
    photo: '/images/staff/pearl.jpg',
  },
  {
    name: 'Edith Ayensu',
    role: 'Facilitator',
    photo: '/images/staff/edit.jpg',
  },
  {
    name: 'Sefa Boakye Nana Ama',
    role: 'Facilitator',
    photo: '/images/staff/IMG_4323.jpg',
  },
  {
    name: 'Mary Osei',
    role: 'Facilitator',
    photo: '/images/staff/IMG_4402.jpg',
  },
  
  {
    name: 'Priscilla Gagakuma',
    role: 'Facilitator',
    photo: '/images/staff/Priscilla.jpg',
  },
   {
    name: 'Sophia P. Dotse',
    role: 'Cook',
    photo: '/images/staff/IMG_4365.jpg',
  },
   {
    name: 'Tetteh Richard',
    role: 'Driver',
    photo: '/images/staff/TT.jpg',
  },
    {
    name: 'Florence Ayensu',
    role: 'Genitor',
    photo: '/images/staff/Florince2.jpg',
  },
  















  //more staff members here
];

export default function StaffPage() {
  return (
    <div className="min-h-screen bg-fuchsia-50 pt-40 pb-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        
        {/* --- PAGE HEADER --- */}
        {/* UPDATED: Changed mb-24 to mb-32. 
            Since images pull up by 24 (-mt-24), mb-32 gives 
            a net visual gap of 8 (approx 30px) between text and heads. */}
        <div className="text-center mb-32">
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#7e1b84] sm:text-3xl">
            Meet Our Facilitators
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Meet the dedicated educators and professionals supporting every child
            at B-Weh Schools Montessori.
          </p>
        </div>

        {/* --- STAFF GRID --- */}
        {/* UPDATED: 
            - xl:grid-cols-4: Adds the 4th column on large screens.
            - max-w-none: Allows the grid to expand fully.
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-32 justify-items-center">
          {staff.map((s) => (
            <div
              key={s.name}
              className="group relative bg-white rounded-2xl shadow-md px-4 pb-8 pt-0 transition-shadow duration-300 hover:shadow-xl max-w-[280px] w-full"
            >
              {/* 1. THE IMAGE CIRCLE */}
              <div className="flex justify-center -mt-24 mb-6 relative z-10">
                <div className="relative w-64 h-64 rounded-full p-[3px] bg-gradient-to-tr from-[#7e1b84] to-fuchsia-300 shadow-lg">
                  <div className="relative w-full h-full rounded-full bg-white overflow-hidden">
                    <Image
                      src={s.photo}
                      alt={s.name}
                      fill
                      className="object-cover" 
                    />
                  </div>
                </div>
              </div>

              {/* 2. TEXT CONTENT */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#7e1b84] transition-colors">
                  {s.name}
                </h3>
                
                {/* Role Pill Design */}
                <div className="inline-block rounded-full bg-fuchsia-100 px-4 py-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#7e1b84]">
                    {s.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}