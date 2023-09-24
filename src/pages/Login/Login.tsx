import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Code, Input } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { usePostRequest } from "../../hook/usePostRequest";
import { userSchema, type User } from "../../models/User";
import { useLocalStorage } from "@uidotdev/usehooks";

type Inputs = {
  identifier: string;
  password: string;
};

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [token, setToken] = useLocalStorage("token");
  const navigation = useNavigate();

  const [loggedInUser, setLoggedInUser] = useState<User>();

  const [postData, { data: postDataResponse }] = usePostRequest<User>(
    `${import.meta.env.VITE_IMAGE_API}/api/account/login`
  );

  useEffect(() => {
    if (loggedInUser !== null && postDataResponse) {
      setLoggedInUser(userSchema.parse(postDataResponse));
    }

    if (loggedInUser?.user?.token) {
      setToken(loggedInUser.user.token);
    }
  }, [postDataResponse, setToken, loggedInUser]);

  useEffect(() => {
    if (token) {
      navigation("/?page=1&perpage=30");
    }
  }, [navigation, token]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    postData({ user: formData });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full md:w-96">
        <CardBody>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start gap-4"
          >
            <Input
              type="text"
              label="Username or Email"
              {...register("identifier", {
                required: {
                  value: true,
                  message: "Username or Email is required",
                },
                minLength: {
                  value: 4,
                  message: "Username should be at least 4 characters",
                },
              })}
            />
            {errors.identifier && (
              <Code color="danger">{errors.identifier.message}</Code>
            )}

            <Input
              {...register("password", {
                required: { value: true, message: "Password is required" },
                minLength: {
                  value: 6,
                  message: "Password should be at least 6 characters",
                },
              })}
              label="Password"
              variant="bordered"
              placeholder="Enter your password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? (
                    <AiFillEye className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <AiFillEyeInvisible className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isPasswordVisible ? "text" : "password"}
            />

            {errors.password && (
              <Code color="danger">{errors.password.message}</Code>
            )}

            <Button color="primary" type="submit">
              Login
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
