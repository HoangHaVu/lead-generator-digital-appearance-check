import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Quiz from '../components/sections/Quiz';

const Questions = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 flex justify-center py-10 px-4 md:px-0">
        <Quiz />
      </main>

      <Footer />
    </div>
  );
};

export default Questions;
