import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import ButtonText from "@/components/button/button-text";
import { useAuthFunction } from "@/hooks/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin-ext"],
});

export default function Home() {
  const {
    dataLogout,
    function: { onSubmitLogout },
  } = useAuthFunction();

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ButtonText
          label="logout"
          styleContainer="bg-red-500"
          isLoading={dataLogout?.isLoading}
          onPress={onSubmitLogout}
        />
      </main>
    </div>
  );
}
