import { Form, Input, Select, SelectItem, Checkbox, Button, Switch, Card, CardHeader, CardBody } from "@heroui/react";
import { useState } from "react";
import EyeFilledIcon from '../assets/EyeFilledIcon'
import EyeSlashFilledIcon from '../assets/EyeSlashFilledIcon'
import Logo from '../assets/AppControl2.png';


function App() {
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  
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

  const onSubmit = (e) => {
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
      return;
    }

    if (data.terms !== "true") {
      setErrors({ terms: "Please accept the terms" });
      return;
    }

    // Clear errors and submit
    setErrors({});
    setSubmitted(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4 overflow-x-hidden">
      <Card className="w-full max-w-md py-10 mx-auto">
        <CardHeader className="flex flex-col items-center gap-3">
          <picture className="text-center mb-2">
            <img 
              src={Logo} 
              alt="Fitness App Control Logo" 
              className="mx-auto w-48 h-48 sm:w-60 sm:h-60 object-contain" 
            />
          </picture>
        </CardHeader>
        <CardBody className="px-6">
          <Form
            className="w-full justify-center items-center space-y-4"
            validationErrors={errors}
            onReset={() => setSubmitted(null)}
            onSubmit={onSubmit}
          >
            <div className="flex flex-col gap-4 w-full">
              <Input
                isRequired
                errorMessage={({ validationDetails }) => {
                  if (validationDetails.valueMissing) {
                    return "Please enter your email";
                  }
                  if (validationDetails.typeMismatch) {
                    return "Please enter a valid email address";
                  }
                }}
                label="Email"
                labelPlacement="outside"
                name="email"
                placeholder="Enter your email"
                type="email"
                className="w-full"
              />
              <Input
                className="w-full"
                isRequired
                errorMessage={getPasswordError(password)}
                isInvalid={getPasswordError(password) !== null}
                labelPlacement="outside"
                name="password"
                value={password}
                onChange={(e) => setPassword(() => e.target.value)}
                endContent={
                  <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                label="Password"
                placeholder="Enter your password"
                type={isVisible ? "text" : "password"}
              />
              <Checkbox
                isRequired
                classNames={{
                  label: "text-small",
                }}
                isInvalid={!!errors.terms}
                name="terms"
                validationBehavior="aria"
                value="true"
                onValueChange={() => setErrors((prev) => ({ ...prev, terms: undefined }))}
              >
                Aiuto con la password
              </Checkbox>
              <Checkbox
                isRequired
                classNames={{
                  label: "text-small",
                }}
                isInvalid={!!errors.terms}
                name="terms"
                validationBehavior="aria"
                value="true"
                onValueChange={() => setErrors((prev) => ({ ...prev, terms: undefined }))}
              >
                I agree to the terms and conditions
              </Checkbox>
              {errors.terms && <span className="text-danger text-small">{errors.terms}</span>}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="w-full" color="primary" type="submit">
                  Submit
                </Button>
                <Button className="w-full" type="reset" variant="bordered">
                  Reset
                </Button>
              </div>
            </div>
            {submitted && (
              <div className="text-small text-default-500 mt-4 break-all">
                Submitted data: <pre className="whitespace-pre-wrap break-all">{JSON.stringify(submitted, null, 2)}</pre>
              </div>
            )}
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default App