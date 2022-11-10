import Timer from "../components/Timer";
import ShadowCard from "../components/UI/ShadowCard";

export default function Home() {
  return (
    <div className="h-screen w-full bg-gray-50 flex justify-center items-center">
      <ShadowCard>
        <Timer />
      </ShadowCard>
    </div>
  );
}
