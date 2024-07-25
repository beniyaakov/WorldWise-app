import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate()
  return (
    <div>
      <h1>Page not found 😢</h1>
      <button onClick={()=> navigate("/")}>go back to the start</button>
    </div>
  );
}
