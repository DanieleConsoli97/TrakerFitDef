import Logo from '../assets/AppControl2.png';
import { Card, CardBody, Button } from "@heroui/react";
import { TrendingUp, Target, Trophy, ArrowRight } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "Traccia i Progressi",
      description: "Monitora ogni PR e visualizza i tuoi miglioramenti con grafici dettagliati",
      gradient: "from-green-400 to-blue-500",
      bgColor: "bg-green-100"
    },
    {
      icon: Target,
      title: "Obiettivi Personalizzati", 
      description: "Imposta e raggiungi i tuoi traguardi fitness con piani su misura",
      gradient: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-100"
    },
    {
      icon: Trophy,
      title: "Celebra i Successi",
      description: "Ogni nuovo record personale viene riconosciuto e premiato",
      gradient: "from-yellow-400 to-orange-500",
      bgColor: "bg-orange-100"
    }
  ];

   return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem-1px)] dark:bg-gray-950 md:px-4 px-2">
      {/* Header Section */}
      <div className="text-center mb-8 sm:mb-12">
        <picture className="mb-6 sm:mb-8 block">
          <img src={Logo} alt="Fitness App Control Logo" className="mx-auto md:max-w-md" />
        </picture>
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 px-2">
          Benvenuti in Fitness App Control
        </h1>
        <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
          La tua piattaforma completa per il controllo e il monitoraggio dei tuoi allenamenti
        </p>
      </div>

      <div className="w-full max-w-6xl px-0 sm:px-4">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 sm:transform sm:hover:scale-105 sm:hover:-translate-y-2"
                isPressable
              >
                <CardBody className="p-4 sm:p-6 md:p-8 text-center space-y-4 sm:space-y-6">
                  {/* Icon Container */}
                  <div className="flex justify-center">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-2 sm:space-y-3">
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Action Arrow */}
                  <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-8 sm:mt-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-6 py-2 sm:px-8 sm:py-3 hover:from-purple-600 hover:to-pink-600 sm:transform sm:hover:scale-105 transition-all duration-300 shadow-xl"
            endContent={<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
          >
            Inizia il tuo Journey
          </Button>
          <p className="text-gray-400 text-xs sm:text-sm mt-3 sm:mt-4">
            Trasforma il tuo fitness journey oggi stesso
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;