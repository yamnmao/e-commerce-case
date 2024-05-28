import Image from "next/image";
import { MaxWidthWrapper } from "../components/MaxWidthWrapper";

export default function Home() {
  return (
    <div className="bg-slate-50">
      <section>
        <MaxWidthWrapper/>
      </section>
    </div>
  );
}
