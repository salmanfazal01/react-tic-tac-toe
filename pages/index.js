import { useFirestore } from "../src/config/firebase";

export default function Home() {
  const fb = useFirestore();

  console.log(fb);

  return <div>Home</div>;
}
