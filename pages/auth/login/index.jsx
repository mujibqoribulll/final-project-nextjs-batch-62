import ButtonText from "@/components/button/button-text";
import ButtonTextImage from "@/components/button/button-text-image";
import { useAuthFunction } from "@/hooks/auth";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import toast from "react-hot-toast";

const Login = () => {
  const {
    images,
    state,
    selectImage,
    dataLogin,
    function: {
      setImage,
      setSelectImage,
      handleChange,
      onSubmit,
      loginOauth,
      onSubmitLogin,
    },
  } = useAuthFunction();

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="bg-[#676279] h-screen lg:flex justify-center items-center">
      <div className="flex lg:flex-row flex-col md:mx-10 lg:mx-0 justify-center items-center bg-[#2B2738] py-3 pr-10 pl-3 gap-x-20 lg:rounded-lg h-screen lg:h-auto">
        <div className="w-[600px] h-[600px] hidden lg:flex rounded-lg bg-white overflow-hidden">
          <div className=" flex relative overflow-hidden">
            <Image
              src={images[selectImage]?.src}
              alt="image"
              objectPosition="center"
              layout="responsive"
              quality={100}
              objectFit="s"
              height={400}
              width={500}
              className=" bg-red-900 w-full h-full object-cover"
            />
            <div className="absolute w-full h-full bg-gray-900/50 z-0" />
            <div className="absolute bottom-10 w-full justify-center items-center px-5">
              <p className="text-center text-2xl text-slate-200/70 font-semibold font-mono">
                Capturing Moments
              </p>
              <p className="text-center font-mono text-sm text-slate-200/70 font-medium leading-7">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni
                voluptate repudiandae beatae nisi? Exercitationem nulla, labore
                quae excepturi beatae saepe!{" "}
              </p>
            </div>
            <div className="bottom-4 w-full justify-center flex absolute gap-3">
              {[1, 2, 3].map((item, index) => (
                <div key={index}>
                  <div
                    className={` h-1 w-14 rounded-md ${
                      index == selectImage ? "bg-white" : "bg-slate-500"
                    } hover:cursor-pointer`}
                    onClick={() => setImage(index)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="">
          <div>
            <h2 className="text-3xl text-white font-bold font-mono">Login</h2>
            <p className="text-gray-200/70 text-sm font-light py-6 font-mono">
              Don't have an account yet? Create one{" "}
              <Link
                href="/auth/register"
                className="text-[#6E54B5] font-bold underline"
              >
                here.
              </Link>
            </p>
            <form className="flex flex-col gap-y-5" onSubmit={onSubmitLogin}>
              <input
                placeholder="Email"
                type="email"
                name="email"
                value={state?.email}
                onChange={handleChange}
                className="bg-[#3B364C] font-mono text-white placeholder-white p-4 rounded-md outline-none focus:outline-[#6E54B5]  text-sm"
              />
              <input
                placeholder="Enter your passsword"
                type="password"
                name="password"
                value={state?.password}
                onChange={handleChange}
                className="bg-[#3B364C] font-mono text-white placeholder-white p-4 rounded-md outline-none focus:outline-[#6E54B5] text-sm"
              />
              <div className="flex flex-row gap-3 items-center">
                <input
                  type="checkbox"
                  checked={state?.terms}
                  name="terms"
                  onChange={handleChange}
                />
                <p className="text-white text-[11px] font-light font-mono">
                  I agree to the{" "}
                  <span className="text-[#6E54B5]">Terms & Conditions</span>
                </p>
              </div>

              <ButtonText
                label="Login"
                isLoading={dataLogin?.isLoading}
                styleContainer="bg-[#6E54B5]"
              />
            </form>
            <div className="flex items-center my-4 text-gray-400">
              <div className="flex-grow border-t border-gray-600"></div>
              <span className="mx-4 font-mono text-xs">Or Login with</span>
              <div className="flex-grow border-t border-gray-600"></div>
            </div>
            <div className="flex flex-row items-center gap-x-3">
              <ButtonTextImage
                label="Google"
                icon={<FcGoogle size={20} />}
                onPress={loginOauth}
              />
              <ButtonTextImage
                label="Apple"
                icon={<FaApple size={20} fill="white" />}
                onPress={loginOauth}
                type="submit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
