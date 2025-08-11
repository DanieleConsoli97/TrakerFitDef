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
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem-1px)] dark:bg-gray-950">
      {/* Header Section */}
      <div className="text-center mb-12">
        <picture className="mb-8 block">
          <img src={Logo} alt="Fitness App Control Logo" className="mx-auto max-w-md" />
        </picture>
        <h1 className="text-4xl font-bold text-white mb-4">Benvenuti in Fitness App Control</h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          La tua piattaforma completa per il controllo e il monitoraggio dei tuoi allenamenti
        </p>
      </div>

      
      <div className="w-full max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
                isPressable
              >
                <CardBody className="p-8 text-center space-y-6">
                  {/* Icon Container */}
                  <div className="flex justify-center">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Action Arrow */}
                  <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-8 py-3 hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-xl"
            endContent={<ArrowRight className="w-5 h-5" />}
          >
            Inizia il tuo Journey
          </Button>
          <p className="text-gray-400 text-sm mt-4">
            Trasforma il tuo fitness journey oggi stesso
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;