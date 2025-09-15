import { Form, Input, Checkbox, Button, Card, CardHeader, CardBody, addToast, Link } from "@heroui/react";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import EyeFilledIcon from '../assets/EyeFilledIcon'
import EyeSlashFilledIcon from '../assets/EyeSlashFilledIcon'
import Logo from '../assets/AppControl2.png';
import { useAuth } from "../contexts/AuthProvider";

function Login() {

  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const { loginAction } = useAuth();

  // Real-time password validation
  const getPasswordError = (value) => {
    if (value.length < 4) {
      return "Password must be 4 characters or more";
    }
    if ((value.match(/[A-Z]/g) || []).length < 1) {
      return "Password needs at least 1 uppercase letter";
    }
    if ((value.match(/[^a-z]/gi) || []).length < 1) {
      return "Password needs at least 1 symbol";
    }
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    // Custom validation checks
    const newErrors = {};

    // Password validation
    const passwordError = getPasswordError(data.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }

    // Username validation
    if (data.name === "admin") {
      newErrors.name = "Nice try! Choose a different username";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      addToast({
        type: "error",
        title: "Errore di Validazione",
        message: "Controlla i dati inseriti e riprova.",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "danger"
      });
      return;
    }

    try {
      setIsLoading(true);
      setErrors({});
      setSubmitted(data);
      await loginAction(data);

      addToast({
        type: "success",
        title: "Login Effettuato",
        message: "🎉 Accesso completato con successo!",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "success"
      });
    } catch (error) {
      addToast({
        type: "error",
        title: "Errore di Login",
        message: "Credenziali non valide. Riprova.",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
        color: "danger"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem-1px)] bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/20 flex">
      {/* Left Side - Branding/Hero Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/90 via-primary-600/80 to-purple-600/70 dark:from-primary-500/80 dark:via-purple-600/70 dark:to-purple-800/60" />
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center"
          >
            <img
              src={Logo}
              alt="Fitness App Control Logo"
              className="w-32 h-32 object-contain mx-auto mb-8 drop-shadow-lg"
            />
            <h1 className="text-4xl font-bold mb-4">
              Benvenuto in TrakerFit
            </h1>
            <p className="text-xl opacity-90 mb-8 max-w-md">
              Il tuo compagno digitale per raggiungere i tuoi obiettivi di fitness
            </p>
            <div className="flex items-center gap-6 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:check-circle" className="w-5 h-5" />
                <span>Traccia i tuoi progressi</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="lucide:target" className="w-5 h-5" />
                <span>Raggiungi i tuoi obiettivi</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-300/20 rounded-full blur-xl" />
      </motion.div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border border-white/20 dark:border-gray-700/30 shadow-2xl">
            <CardHeader className="pb-2">
              <div className="w-full text-center">
                {/* Mobile logo */}
                <div className="lg:hidden mb-6">
                  <img
                    src={Logo}
                    alt="Fitness App Control Logo"
                    className="w-20 h-20 object-contain mx-auto"
                  />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Accedi al tuo account
                </h2>
                <p className="text-default-600 text-sm">
                  Inserisci le tue credenziali per continuare
                </p>
              </div>
            </CardHeader>

            <CardBody className="pt-2 items-center">
              <Form
                className="space-y-6"
                validationErrors={errors}
                onReset={() => setSubmitted(null)}
                onSubmit={onSubmit}
              >
                <div className="space-y-4">
                  <Input
                    isRequired
                    errorMessage={({ validationDetails }) => {
                      if (validationDetails.valueMissing) {
                        return "Inserisci la tua email";
                      }
                      if (validationDetails.typeMismatch) {
                        return "Inserisci un indirizzo email valido";
                      }
                    }}
                    label="Email"
                    labelPlacement="outside"
                    name="email"
                    placeholder="nome@esempio.com"
                    type="email"
                    variant="bordered"
                    startContent={
                      <Icon icon="lucide:mail" className="w-4 h-4 text-default-400" />
                    }
                    classNames={{
                      input: "bg-transparent",
                      inputWrapper: "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-default-200 dark:border-gray-600"
                    }}
                  />

                  <Input
                    isRequired
                    errorMessage={getPasswordError(password)}
                    isInvalid={getPasswordError(password) !== null}
                    label="Password"
                    labelPlacement="outside"
                    name="password"
                    placeholder="Inserisci la tua password"
                    type={isVisible ? "text" : "password"}
                    value={password}
                    variant="bordered"
                    onChange={(e) => setPassword(() => e.target.value)}
                    startContent={
                      <Icon icon="lucide:lock" className="w-4 h-4 text-default-400" />
                    }
                    endContent={
                      <button
                        aria-label="toggle password visibility"
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    classNames={{
                      input: "bg-transparent",
                      inputWrapper: "bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-default-200 dark:border-gray-600"
                    }}
                  />

                  <div className="flex items-center justify-between">
                    <Checkbox
                      isSelected={rememberMe}
                      onValueChange={setRememberMe}
                      size="sm"
                      classNames={{
                        label: "text-small text-default-600",
                      }}
                    >
                      Ricordami
                    </Checkbox>

                    <Link
                      href="#"
                      size="sm"
                      className="text-primary-600 hover:text-primary-700"
                    >
                      Password dimenticata?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    color="primary"
                    size="lg"
                    className="w-full font-semibold bg-gradient-to-r from-primary-500 to-purple-600 hover:from-primary-600 hover:to-purple-700 transform transition-all duration-200 hover:scale-[1.02]"
                    isLoading={isLoading}
                    startContent={!isLoading && <Icon icon="lucide:log-in" className="w-4 h-4" />}
                  >
                    {isLoading ? "Accesso in corso..." : "Accedi"}
                  </Button>

                  {/* Social Login Buttons */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-default-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-content1 text-default-500">oppure continua con</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="bordered"
                      className="border-default-200 hover:bg-default-50"
                      startContent={<Icon icon="logos:google-icon" className="w-4 h-4" />}
                    >
                      Google
                    </Button>
                    <Button
                      variant="bordered"
                      className="border-default-200 hover:bg-default-50"
                      startContent={<Icon icon="logos:apple" className="w-4 h-4" />}
                    >
                      Apple
                    </Button>
                  </div>
                </div>
              </Form>

              <div className="mt-6 text-center">
                <p className="text-sm text-default-600">
                  Non hai ancora un account?{" "}
                  <Link href="/signup" className="text-primary-600 hover:text-primary-700 font-medium">
                    Registrati qui
                  </Link>
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Login