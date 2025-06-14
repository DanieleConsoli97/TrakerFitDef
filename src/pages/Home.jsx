import Logo from '../assets/AppControl2.png';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <picture className="text-center mb-8">
        <img src={Logo} alt="Fitness App Control Logo" className="mx-auto" />
      </picture>
      <h1 className="text-3xl font-bold text-center">Benvenuti in Fitness App Control</h1>
    </div>
  );
};

export default Home;