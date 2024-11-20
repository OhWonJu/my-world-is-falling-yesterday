import { useNavigate } from "react-router-dom";

interface NavigatorProps {
  id?: string;
  image?: string;
  pathName: string;
}

const Navigator = ({ image, pathName }: NavigatorProps) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed translate-x-0 flex bottom-0 h-[60px] w-full max-w-xl justify-around border-t border-neutral-200 bg-background">
      <button onClick={() => navigate("/cases/case1?case=case1")}>CASE1</button>
      <button onClick={() => navigate("/cases/case2/?case=case2")}>
        CASE2
      </button>
      <button onClick={() => navigate("/cases/case3")}>CASE3</button>
      <button onClick={() => navigate("/cases/case4")}>CASE4</button>
    </nav>
  );
};

export default Navigator;
