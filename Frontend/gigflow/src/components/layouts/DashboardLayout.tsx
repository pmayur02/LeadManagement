// import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  return (
   <div className="w-full min-h-screen bg-gray-100">

  
  <div className="sticky top-0 z-50 w-full bg-white shadow-sm">
    <Navbar />
  </div>


  <main className="w-full px-4 py-4 sm:px-6 md:px-8 lg:px-10">
    
    <div className="max-w-7xl mx-auto">
      {children}
    </div>

  </main>

</div>
  );
};

export default DashboardLayout;