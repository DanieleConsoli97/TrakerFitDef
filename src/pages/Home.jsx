import Logo from '../assets/AppControl2.png';
import { Card, CardBody, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
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
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem-1px)] bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20 md:px-4 px-2 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary-200/20 dark:bg-primary-500/10 rounded-full blur-xl" />
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-300/30 dark:bg-purple-500/20 rounded-full blur-xl" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-200/30 dark:bg-blue-500/20 rounded-full blur-lg" />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 sm:mb-12 relative z-10"
      >
        <motion.picture
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-6 sm:mb-8 block"
        >
          <img
            src={Logo}
            alt="Fitness App Control Logo"
            className="mx-auto w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain drop-shadow-lg"
          />
        </motion.picture>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-2xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary-600 via-purple-600 to-primary-800 dark:from-primary-400 dark:via-purple-400 dark:to-primary-300 bg-clip-text text-transparent mb-3 sm:mb-4 px-2"
        >
          Benvenuto in TrakerFit
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-default-600 dark:text-default-400 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto px-4"
        >
          Il tuo compagno digitale per trasformare ogni allenamento in un successo
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="w-full max-w-6xl px-0 sm:px-4 relative z-10"
      >
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
              >
                <Card
                  className="group bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border border-white/20 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-900/80 hover:border-primary-200 dark:hover:border-primary-500/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl"
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
                      <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-default-600 dark:text-default-400 text-xs sm:text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Action Arrow */}
                    <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary-500/20 dark:bg-primary-400/20 flex items-center justify-center">
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="text-center mt-8 sm:mt-12"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary-500 via-purple-500 to-primary-600 hover:from-primary-600 hover:via-purple-600 hover:to-primary-700 text-white font-semibold px-6 py-2 sm:px-8 sm:py-3 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
            endContent={<ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
          >
            Inizia il tuo Journey
          </Button>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="text-default-500 dark:text-default-400 text-xs sm:text-sm mt-3 sm:mt-4"
          >
            Trasforma il tuo fitness journey oggi stesso
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;